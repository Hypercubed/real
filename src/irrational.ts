import { guard, conversion } from '@hypercubed/dynamo';
import lazyAss from 'lazy-ass';

import Real from './real';
import { ParseValueInput, parseValue, zeroPadRight, zeroPadLeft } from './utils/util';
import { Rational } from './rational';
import { Memoize } from './utils/decorators';
import { bAbs, bSqrt, bDiv, bSgn } from './utils/bigint-tools';

/**
 * modulo
 * sin, cos, tan
 * asin, acos, atan
 */

const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);

// enum RoundingMethod {
//   Truncate = 'trunc',
//   Round = 'round',
//   Floor = 'floor',
//   Ciel = 'ceil'
// }

export class Irrational extends Real {
  // static RM = RoundingMethod.Round;
  static readonly DEFAULT_PRECISION = 17;  // > 16 for tests

  static readonly ZERO = Irrational.from(0n);
  static readonly ONE =  Irrational.from(1n);
  static readonly TWO =  Irrational.from(2n);
  static readonly HALF =  Irrational.from(5n, -1);
  static readonly NEG_ONE =  Irrational.from(-1n);

  static readonly LN10 =   Irrational.from('2.302585092994045684017991454684364207601101488628772976033');  // TODO: these should be computable
  static readonly E =      Irrational.from('2.718281828459045235360287471352662497757247093699959574966');
  static readonly LN2 =    Irrational.from('0.693147180559945309417232121458176568075500134360255254120');
  static readonly LOG10E = Irrational.from('0.434294481903251827651128918916605082294397005803666566114');
  static readonly INVE =   Irrational.from('0.367879441171442321595523770161460867445811131031767834507');
  
  @guard()
  static isIrrational(x: unknown): x is Irrational {
    return x instanceof Irrational;
  }

  @conversion()
  static fromRational(x: Rational): Irrational {
    const [n, d] = x.toArray().map(n => Irrational.from(n));
    return n.div(d);
  }

  @conversion()
  static fromNumber(x: number): Irrational {
    return Irrational.from(x);
  }

  @conversion()
  static fromBigInt(s: bigint): Irrational {
    return new Irrational({
      s,
      e: 0,
      p: digits(s),
      u: 0n
    });
  }

  static from(value: ParseValueInput | Irrational | Rational, exponent: number = 0) {
    if (value instanceof Rational) {
      return Irrational.fromRational(value);
    }

    if (value instanceof Irrational) {
      return value;
    }

    // tslint:disable-next-line
    if (typeof value === 'bigint') {
      return new Irrational({
        s: value,
        e: exponent,
        p: digits(value),
        u: 0n
      });
    }

    let [significand, pe, precision] = parseValue(value);

    const isExact = !Number.isFinite(precision);

    exponent += pe;

    let u;

    // if precision is finite, normalize values
    if (isExact) {
      u = 0n;
    } else {
      u = 1n;

      if (significand === 0n) {
        exponent -= precision - 1;
        precision = 1;
        u = 1n;
      } else {
        const l = digits(significand);
        let lp = l - precision;

        significand = trimDigits(significand, lp);
        exponent += lp;
        
        // TODO: +-.5
        // significand *= 10n;
        // exponent--;
        // u = 5n;

        // precision = digits(significand);
      }
    }

    return new Irrational({
      s: significand,
      e: exponent,
      p: precision,
      u
    });
  }

  protected readonly s: bigint = 0n; // Significand
  protected readonly e: number = 0;  // Exponent
  protected readonly p: number = 0;  // Presision
  protected readonly u: bigint = 0n; // error in last place

  constructor(value: Irrational | Object) {
    super();

    if (value instanceof Irrational) {
      return value;
    }

    Object.assign(this, value);

    if (!Number.isFinite(this.p)) {  // TODO: remove these
      this.u = 0n;  
      this.p = digits(this.s);
    }

    lazyAss(
      this.e % 1 === 0, 
      () => `exponent (${this.e}) must be an integer`
    );
    lazyAss(
      this.p >= 0,
      () => `precision (${this.p}) must be greater than or equal to zero`
    );
    lazyAss(
      this.u >= 0n, 
      () => `error (${this.u}) must be greater than or equal to zero`
    );
    // lazyAss(
    //   () => this.s === 0n || this.u <= bAbs(this.s),
    //   () => `error (${this.u}) must less than the significand (${this.s})`
    // );

    Object.freeze(this);
  }

  sgn() {
    if (this.s > 0n) return 1;
    if (this.s < 0n) return -1;
    return 0;
  }

  neg() {
    // Improve this
    return new Irrational({
      ...this,
      s: -this.s
    });
  }

  abs() {
    return (this.s < 0n) ? this.neg() : this;
  }

  isZero() {
    return this.s === 0n;
  }

  isPositive(): boolean {
    return this.s > 0n;
  }

  isNegitive(): boolean {
    return this.s < 0n;
  }

  @Memoize()
  isInteger() {
    return this.sub(this.trunc()).isZero();
  }

  isExact() {
    return this.u === 0n;
  }

  cmp(y: Irrational): number {
    // TODO: if two numbers are within precision??
    return this.sub(y).sgn();
  }

  eq(y: Irrational): boolean {
    return this.cmp(y) === 0;
  }

  gt(y: Irrational): boolean {
    return this.cmp(y) === 1;
  }

  lt(y: Irrational): boolean {
    return this.cmp(y) === -1;
  }

  add(y: Irrational): Irrational {
    const [high, low]: Irrational[] = (this.e > y.e) ? [this, y] : [y, this];

    const S = 10n ** BigInt(high.e - low.e);

    const hu = high.u * S;
    const lu = low.u;

    const hs = high.s * S;
    const ls = low.s;

    const u = bSqrt((hu*10n)**2n + (lu*10n)**2n);

    return Irrational.from(hs + ls, low.e).withError(u, low.e-1);
  }

  protected inc() {
    return this.add(Irrational.ONE);
  }

  sub(y: Irrational): Irrational {
    return this.add(y.neg());
  }
  
  protected dec() {
    return this.add(Irrational.NEG_ONE);
  }

  mul(y: Irrational): Irrational {
    const xs = this.s;
    const ys = y.s;

    const xd = this.u;
    const yd = y.u;

    const s = xs * ys;
    const e = this.e + y.e;

    const d = bSqrt((10n * xs*yd)**2n+bAbs(10n * ys*xd)**2n+bAbs(10n*xd*yd)**2n);  // Goodman's expression
    return Irrational.from(s, e).withError(d, e-1);
  }

  sqr() {
    let { s, e, u } = this;

    // u = 2n*bAbs(s)*u; // TODO: verify precision
    e *= 2;
    s **= 2n;

    u **= 2n;
    u = bSqrt( 100n*2n*s*u + 100n*u**2n ); // from Goodman's expression

    return Irrational.from(s, e).withError(u, e-1);
  }

  // TODO: test
  // error propagation
  ipow(n: bigint): Irrational {
    if (n === 0n) {
      return Irrational.ONE;
    }

    if (n < 0n) {
      return this.abs().ipow(-n).inv();
    }

    // if (n < MAX_SAFE_INTEGER) {
    //   const { s, e, p } = this;
    //   return Irrational.from(s**n, e*Number(n)).withPrecision(p);
    // }

    // TODO: improve this for very large numbers
    let x: Irrational = this;
    while (n > 1n) {
      x = this.mul(x);
      n--;
    }

    return x;  // dz = n*x*dx/x
  }

  inv() {
    return Irrational.ONE.div(this);
  }

  div(y: Irrational): Irrational {
    if (this.isZero()) {
      return this;
    }

    const sx = this.s < 0n ? -1n : 1n;
    const sy = y.s < 0n ? -1n : 1n;

    const px = this.isExact() ? Irrational.DEFAULT_PRECISION : this.p;
    const py = y.isExact() ? Irrational.DEFAULT_PRECISION : y.p;

    const psum = px + py + 1;
    const S = 10n**BigInt(psum);

    const xs = sx * this.s;
    const ys = sy * y.s;

    const xd = this.u;
    const yd = y.u;

    const ss = S * xs;
    const s = ss / ys;
    const r = ss % ys;

    const d = bSqrt((s * xd / xs)**2n + (s * yd / ys)**2n);  // verify

    const e = this.e-y.e-psum;
    return Irrational.from(sx * sy * s, e).withError((r !== 0n && d === 0n) ? 1n : d, e);
  }

  trunc() {
    if (this.e >= 0) {
      return this;
    }

    const s =  this.s / 10n ** BigInt(-this.e);
    return Irrational.from(s, 0);
  }

  /**
   * maps x to the greatest integer greater than or equal to x
   */
  floor() {
    const t = this.trunc();
    if (this.isNegitive() && !this.fp().isZero()) {
      return t.dec();
    }
    return t;
  }

  /**
   * maps x to the least integer greater than or equal to x
   */
  ceil() {
    const t = this.trunc();
    if (this.isPositive() && !this.fp().isZero()) {
      return t.inc();
    }
    return t;
  }

  /**
   * integer part of x
   */
  @Memoize()
  ip(): bigint {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  /**
   * frational part of x
   */
  fp() {
    return this.sub(this.trunc()).abs();
  }

  // TODO: implement invsqrt2 (S*1/SQRT(S) = SQRT(S))
  // TODO: improve initial guess??
  // TODO: sqrt(s*10^e) = sqrt(s)*sqrt(10^e) = sqrt(s)*10^(e/2)???
  // TODO: rounding/precision/error propagation
  sqrt(): Irrational {
    if (this.isNegitive()) {
      throw new Error('Square root of negitive number')
    }

    if (this.isZero()) {
      return this;
    }

    let { s, e, p, u } = this;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;

    // TODO: calculate desired precision

    const n = 2*p;  // n must be even
    const S = 10n**BigInt(n);  // scale

    // Make exponent divisble by 2
    if (e % 2 !== 0) {
      e -= 1;
      s *= 10n;
    }

    s = S * s;

    const x = bSqrt(s);
    const r = s % x;

    e -= n;
    e /= 2;

    const z = Irrational.from(x, e);

    const uu = (u === 0n && r !== 0n) ?   // TODO: verify
      Irrational.from(10n, z.e).div(z) :
      Irrational.from(this.u, this.e).mul(Irrational.HALF).div(z);

    return z.withError(uu);
  }

  // inv sqrt
  protected isqrt() {
    if (this.isNegitive()) {
      throw new Error('Square root of negitive number')
    }

    if (this.isZero()) {
      return this;
    }

    const x: Irrational = this;
    let { p } = x;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const S = 10n**BigInt(p);

    const THREE_HALF = Irrational.from(3n, 0).mul(Irrational.HALF);
    const xo2 = x.mul(Irrational.HALF);

    let y: Irrational = Irrational.from(Math.sqrt(x.valueOf())).inv(); // initial guess for sqrt(this);
    let d: Irrational = y;

    let i = 0;
    while (i++ < 10 && !d.isZero() && S > y.s / d.s) {
      const yp = y;
      const e = y.sqr().mul(xo2);
      y = y.mul(THREE_HALF.sub(e));
      d = y.sub(yp).abs();
    }

    d = y.sqr().sub(this.inv());

    // TODO: verify this
    if (isExact && d.isZero()) {
      p = Infinity;
    }

    return y.withPrecision(p);  // use u
  }

  /**
   * calculates the natural exponential function
   * 
   * x = ip + fp;
   * exp(x) = exp(ip + fp)
   *        = exp(ip)*exp(fp)
   *        = E^ip*exp(fp)
   */
  exp(): Irrational {
    if (this.isNegitive()) {
      return this.neg().exp().inv();
    }

    let { e, u } = this;

    if (this.isZero() && e <= 0) {
      const S = 10n**BigInt(-e);
      return Irrational.from(S, e).withError(u, e);
    }

    const z = this.withError(0).expm1().inc();
    let uu = z.mul(Irrational.from(u, e));      // z*dx
    return z.withError(uu);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  // bigint version??
  protected expm1() {
    if (this.isZero()) {
      return this;
    }

    const x = this;

    let n: Irrational = x;  // term
    let s = n;  // summation
    let i = 1n;  // index
    let ss = 0n;

    while (s.s !== ss) {
      i++;
      n = n.mul(x).div(Irrational.from(i));
      ss = s.s;
      s = s.add(n);
    }

    return s;
  }

  /**
   * calculates exponentiation (x^y)
   * 
   */
  // TODO: error propagation
  pow(y: Irrational): Irrational {
    const px =  this.isExact() ? Irrational.DEFAULT_PRECISION : this.p;
    const py = y.isExact() ? Irrational.DEFAULT_PRECISION : y.p;
    const p = Math.min(px, py);
    const po = (this.isExact() && y.isExact()) ? Infinity : p;

    if (y.isZero()) {
      if (this.isZero()) {
        throw new Error('Division by zero');
      }
      return Irrational.from(1n, 0).withPrecision(po); // dz = x*ln(x)
    }

    if (this.isZero()) {
      return Irrational.from(0n, 0).withPrecision(po);  // dz = 0 ??
    }

    if (y.isNegitive()) { // x^-y = 1/x^y
      return this.pow(y.abs()).inv();
    }

    if (this.eq(Irrational.ONE)) {
      return Irrational.from(1n, 0).withPrecision(po);  // dz = y*dx ??
    }

    if (y.eq(Irrational.ONE)) {
      return this.withPrecision(po);  // dz^2 = (dx)^2+(x*log(x))^2 ??
    }

    const ip = y.ip();

    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    if (y.fp().isZero() && ip < MAX_SAFE_INTEGER) {
      return this.ipow(ip).withPrecision(po);  
    }

    return y.mul(this.ln()).exp();
  }

  // TODO: replace with bigint version avoid using LN10
  /**
   * cal 10^x
   */
  pow10(): Irrational {
    if (this.isNegitive()) return this.abs().pow10().inv();

    const { s, e, u } = this;
    
    if (e >= 0) {
      const uu = Irrational.from(u, e);
      const x = s*10n**BigInt(e);
      const z = (x < MAX_SAFE_INTEGER) ?
        Irrational.from(1n, Number(x)) :
        Irrational.from(10n**x, 0);
      const zu = z.mul(uu).div(Irrational.LN10);  // verify
      return z.withError(zu);
    }
    
    // 10^x = exp(x*ln(10))
    return this.mul(Irrational.LN10).exp();
  }

  /**
   * calculates logarithm of x to the base 10
   * 
   * log(x) = log(s*10^e)
   *        = log(s) + log(10^e)
   *        = ln(s)/ln(10) + e*log(10)
   *        = ln(s)*log10(E) + e
   */
  // increase precision
  log10() {
    if (this.isZero() || this.isNegitive()) {
      throw new Error('Logarithm of zero');
    }

    if (this.eq(Irrational.ONE)) {
      return Irrational.from(0n, 0).withPrecision(this.p);
    }

    let { s, e, u } = this;

    const ee = Irrational.from(BigInt(e), 0);
    const uu = Irrational.from(u, e).div(this).mul(Irrational.LOG10E); // TODO: verify

    if (s === 1n) {
      return ee.withError(uu);
    }

    const ss = Irrational.from(s, 0).ln().mul(Irrational.LOG10E);
    return ee.add(ss).withError(uu);
  }

  /**
   * calculates natural logarithm of x
   * 
   * ln(x)     = ln(s*e^n)
   *           = ln(s) + n*ln(e);
   *           = lnp1(s - 1) + e
   */
  ln(): Irrational {
    // TODO: error propagation
    
    // x = 0
    if (this.isZero() || this.isNegitive()) {
      throw new Error('Logarithm of zero');
    }

    const isExact = this.isExact();

    if (this.eq(Irrational.ONE)) {
      return Irrational.from(0n, 0).withError(this.u, this.e);
    }

    let { s, e, p, u } = this;

    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const n = 2*p + 8;

    const S = 10n**BigInt(n);  // scale

    let adj = 0;
    while (s % 10n === 0n && s > 10n) {
      s /= 10n;
      adj++;
    }

    const sm1 = s - 1n;
    const sp1 = s + 1n;

    let i = 1n;
    const xn0 = S * sm1 / sp1;
    const v = S * sm1**2n / sp1**2n;
    let xn = xn0;
    let sum = xn;

    // basically atanh
    while (xn > 0n) {
      xn = xn * v * (i++) / (++i) / S;  // xn * (s - 1n)**2n / (s + 1n)**2n * i / (i + 2)
      sum += xn;
    }

    s = 2n*sum;

    const uu = Irrational.from(u, e).div(this);  // need to account for error in series

    const ne = Irrational.from(BigInt(e+adj)).mul(Irrational.LN10);
    const z = Irrational.from(s, -n).add(ne);
    if (this.u === 0n) {
      return z.withPrecision(p);
    }
    return z.withError(uu);
  }

  @Memoize()
  toString(): string {
    if (this.isExact()) {
      return this.toFixed();
    }
    return this.toExponential();
  }

  @Memoize()
  valueOf(): number {
    return Number(this.toString());
  }

  toFixed(digits?: number): string {
    const x = typeof digits === 'number' ? this.withError(1n, -digits) : this;

    let ip = x.ip().toString();
    
    if (digits === 0) return ip;  // just the ip

    if (ip === '0' && x.isNegitive()) ip = '-0';  // keep the sign

    const fp = x.fp();
    if (fp.isZero() && !digits) return ip;  // number is an integer

    let fps = fp.s.toString();
    fps = zeroPadLeft(fps, fp.e);
    fps = digits ?
      zeroPadRight(fps, digits) :
      fps.replace(/0*$/g, '').slice(0, Irrational.DEFAULT_PRECISION);
    return `${ip}.${fps}`;
  }

  toExponential(fractionDigits: number = (this.p - 1)) {
    const x = this.withPrecision(fractionDigits + 1); 
    const n = x.s < 0 ? 2 : 1;
    const s = x.s.toString();
    const ip = s.slice(0, n);
    const fp = s.slice(n);
    const e = fp.length + x.e;
    const ee = e >= 0 ? ('+' + e) : e;
 
    if (!Number.isFinite(fractionDigits)) {
      if (!fp || parseInt(fp, 10) === 0) {
        return `${ip}e${ee}`;
      }
      return `${ip}.${fp}e${ee}`;
    }
    return `${ip}.${zeroPadRight(fp, fractionDigits)}e${ee}`;
  }

  withPrecision(p: number) {
    const isExact = !Number.isFinite(p);

    if (isExact && this.isExact()) {
      return this;
    }

    if (this.p === p && !this.isExact()) {
      return this;
    }

    let { s, e } = this;

    if (isExact) {
      // converting to exact, can trim trailing zeros
      while (s > 10n && s % 10n === 0n) {
        e += 1;
        s /= 10n;
      }
      return Irrational.from(s, e);
    }

    const d = this.isExact() ? digits(s) - p : this.p - p;
    s = trimDigits(this.s, d);
    e += d;

    return new Irrational({
      s,
      e,
      p,
      u: isExact ? 0n : 1n
    });
  }

  withError(value: ParseValueInput | Irrational, exponent: number = 0) {
    // if (value instanceof Rational) {
    //   // TODO??
    // }

    let { s, e } = this;
    let u;
    let pe;

    if (value instanceof Irrational) {
      u = value.s;
      pe = value.e;
    } else {
      [u, pe] = parseValue(value);
    }
    exponent += pe;

    // courece significand and error to same exponent
    const d = e - exponent;
    if (d < 0) {
      const S = 10n**BigInt(-d);
      u *= S;
    } else {
      const S = 10n**BigInt(d);
      s *= S;
      e = exponent;
    }

    // // reduce error to 0 <= u < 20, rounding significand
    let r = 0n;
    let ru = 0n;
    while (u >= 10n) {
      while (u >= 10n) {
        e++;
        r = s;
        ru = u;
        s /= 10n;
        u /= 10n;
      }
      s += bAbs(r) % 10n >= 5 ? bSgn(r) * 1n : 0n; // round towards closest
      u += ru % 10n !== 0n ? 1n : 0n;  // round to +inf
    }

    // remove trailing zeros
    while (s > 0n && u % 10n === 0n && s % 10n === 0n) {
      e++;
      s /= 10n;
      u /= 10n;
    }

    return new Irrational({
      s,
      e,
      p: digits(s),
      u: bAbs(u)
    });
  }
}

function digits(n: bigint): number {
  const s = n.toString().length;
  return n < 0n ? s - 1 : s;
}

function trimDigits(s: bigint, d: number) {
  if (d > 0) {
    const S = 10n**BigInt(d);
    const r = s % S * 10n / S;
    s /= S;
    s += BigInt(Math.round(Number(r)/10));  // TODO: use signed rounding method
  } else if (d < 0) {
    s *= 10n**BigInt(-d);
  }
  return s;
}



