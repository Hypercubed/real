import { guard, conversion } from '@hypercubed/dynamo';
import lazyAss from 'lazy-ass';

import Real from './real';
import { ParseValueInput, parseValue, zeroPadRight, zeroPadLeft } from './utils/util';
import { Rational } from './rational';
import { Memoize } from './utils/decorators';
import { bAbs, bSqrt } from './utils/bigint-tools';

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

    if (typeof value === 'bigint') {
      return new Irrational({
        s: value,
        e: exponent,
        p: digits(value),
        u: 0n
      });
    }

    let [significand, parsed_exponent, precision] = parseValue(value);

    const isExact = !Number.isFinite(precision);

    exponent += parsed_exponent;

    // if precision is finite, normalize values
    if (!isExact) {
      if (significand === 0n) {
        exponent -= precision - 1;
        precision = 1;
      } else {
        const l = digits(significand);
        let lp = l - precision;

        significand = trimDigits(significand, lp);
        exponent += lp;
        precision = digits(significand);
      }
    }
    // else {
    //   // TODO: this should work
    //   while (significand > 10n && significand % 10n === 0n) {
    //     significand /= 10n;
    //     exponent += 1;
    //   }
    //   precision = digits(significand);
    // }

    return new Irrational({
      s: significand,
      e: exponent,
      p: precision,
      u: 1n
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
    return Irrational.from(this.s * -1n, this.e).withError(this.u);
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

  @Memoize()
  isExact() {
    return this.u === 0n;
  }

  cmp(y: Irrational): number {
    // TODO: should return zero if two numbers are within precision
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

    const d = bSqrt(hu**2n + lu**2n);

    return Irrational.from(hs + ls, low.e).withError(d);
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
    const d = bAbs(xs*yd)+bAbs(ys*xd)+xd*yd; // verify

    return Irrational.from(s, this.e + y.e).withError(d);
  }

  protected sqr() {
    const { s, e, u } = this;

    // TODO: verify precision
    const d = 2n*bAbs(s*u)+u**2n;

    return Irrational.from(s**2n, e*2).withError(d);
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

    // const d = bAbs(n) * this.u / this.s;
    // console.log({ d });

    return x;
  }

  inv() {
    return Irrational.ONE.div(this);
  }

  div(y: Irrational): Irrational {
    if (this.isZero()) {
      return this;
    }

    const sgn_x = this.s < 0n ? -1n : 1n;
    const sgn_y = y.s < 0n ? -1n : 1n;

    const px = this.isExact() ? Irrational.DEFAULT_PRECISION : this.p;
    const py = y.isExact() ? Irrational.DEFAULT_PRECISION : y.p;

    const psum = 2*Math.max(px, py);  // in gerneral should be px + py
    const S = 10n**BigInt(psum);

    const xs = sgn_x * this.s;
    const ys = sgn_y * y.s;

    const xd = this.u;
    const yd = y.u;

    const s = S * xs / ys;
    const r = S * xs % ys;
    let d = bSqrt((s * xd / xs)**2n + (s * yd / ys)**2n);  // TODO: verify
    // let d = BigInt(Math.ceil(Math.sqrt(Number(s * xd / xs)**2 + Number(s * yd / ys)**2)));
    // let d = ((S * xd) + (S * xs * yd / ys)) / ys;

    if (r !== 0n && d === 0n) {
      // console.log('****');
      d = 1n;
    }

    return Irrational.from(sgn_x * sgn_y * s, this.e-y.e-psum).withError(d);
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

    let { s, e, p } = this;

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

    // TODO: verify/improve this
    if (this.isExact() && r === 0n) {
      p = Infinity;
    }

    return Irrational.from(x, e).withPrecision(p);
  }

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

    return y.withPrecision(p);
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
    if (this.isZero() && this.e <= 0) {
      const {e, u} = this;
      const S = 10n**BigInt(-e);
      return Irrational.from(S, e).withError(u);
    }
    if (this.isNegitive()) {
      return this.neg().exp().inv();
    }
    const p = this.isExact() ? Irrational.DEFAULT_PRECISION : this.p;
    // TODO: use ulp
    return this.expm1().inc().withPrecision(p);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  protected expm1() {
    if (this.isZero()) {
      return this;
    }

    let { p } = this;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const pp = 2*p;

    const x = this.withPrecision(pp);

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

    // TODO: fix this
    // if (isExact) {
    //   p = Infinity;
    // }

    // TODO: use ulp
    return s.withPrecision(p);
  }

  /**
   * calculates exponentiation (x^y)
   * 
   */
  // TODO: error propagation
  pow(y: Irrational): Irrational {
    let p = Math.min(this.p, y.p);

    if (y.isZero()) {
      return Irrational.from(1n, 0).withPrecision(p);
    }

    if (y.isNegitive()) { // x^-y = 1/x^y
      return this.pow(y.abs()).inv();
    }
    if (y.eq(Irrational.ONE)) {
      return this;
    }

    const ip = y.ip();
    
    // If y is a small integer use the 'exponentiation by squaring' algorithm.
    if (y.fp().isZero() && ip < MAX_SAFE_INTEGER) {
      return this.ipow(ip).withPrecision(p);
    }

    const isExact = this.isExact() && y.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const n = p + 1;

    const xp = this.withPrecision(n);
    const yp = y.withPrecision(n);

    if (isExact) {
      p = Infinity;
    }

    // TODO: use ulp
    return yp.mul(xp.ln()).exp().withPrecision(p);
  }

  // TODO: replace with bigint version avoid using LN10
  /**
   * cal 10^x
   */
  pow10(): Irrational {
  
    if (this.e >= 0 && bAbs(this.s) < MAX_SAFE_INTEGER && this.isExact()) {
      const { s, e } = this;
      const x = Number(s) * 10**e;
      return Irrational.from(1n, x);
    }

    if (this.isNegitive()) return this.abs().pow10().inv();

    if (this.e >= 0) {
      const { s, e, u } = this;
      const S = 10n**BigInt(e);
      const x = s * S;
      const z = 10n**x;
      const zu = z * 2302n * S * u / 1000n;
      return Irrational.from(z, 0).withError(zu);
    }

    // 10^x = exp(x*ln(10))
    return this.mul(Irrational.LN10).exp();
  }

  /**
   * calculates logarithm of x to the base 10
   * 
   * log(x) = log(s*10^n)
   *        = log(s) + log(10^n)
   *        = ln(s)/ln(10) + n*log(10)
   *        = ln(s)*log10(e) + n
   */
  // increase precision
  log10() {
    if (this.eq(Irrational.ONE)) {
      return Irrational.from(0n, 0).withPrecision(this.p);
    }

    let { s, e, p } = this;

    const ss = Irrational.from(s, 0).withPrecision(p);
    const ee = Irrational.from(e, 0).withPrecision(p);

    if (s === 1n) {
      return ee;
    }
    
    const a = ss.ln().mul(Irrational.LOG10E);  // TODO: calc log10 without ln

    // TODO: use ulp
    return ((e === 0) ? a : a.add(ee)).withPrecision(p);
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

    const cmp = this.cmp(Irrational.ONE);

    // x = 1
    if (cmp === 0) {
      return Irrational.from(0n, 0).withPrecision(this.p);
    }

    let { s, e, p } = this;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const n = p + 8;

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
    const u = S * sm1**2n / sp1**2n;
    let xn = xn0;
    let sum = xn;

    // basically atanh
    while (xn > 0n) {
      xn = xn * u * (i++) / (++i) / S;  // xn * (s - 1n)**2n / (s + 1n)**2n * i / (i + 2)
      sum += xn;
    }

    s = 2n*sum;

    // let d = S * this.u / 10n**BigInt(adj) / this.s * s / S;

    // TODO: improve this
    if (this.isExact()) {
      // d = 1n;
      p = Infinity;
    }

    // const d = S * this.u / 10n**BigInt(adj);
    // console.log({ s, d, p }, s.toString().length - d.toString().length);

    const ne = Irrational.from(BigInt(e+adj)).mul(Irrational.LN10);

    // TODO: use ulp
    return Irrational.from(s, -n).add(ne).withPrecision(p);
  }

  /**
   * calculates inverse hyperbolic tangent of x
   */
  // TODO: replace with bigint version
  protected atanh() {
    if (this.isZero()) {
      return this;
    }

    let p = this.isExact() ? Irrational.DEFAULT_PRECISION : this.p;
    const pp = p + 1;

    let n: Irrational = this.withPrecision(pp);
    let x = n;
    let sum = x;

    const sqrd = n.sqr();
    let d = Irrational.from(1, 0).withPrecision(pp);
    let ss = 0n;
    
    while (ss !== sum.s) {
      d = d.inc().inc();
      n = n.mul(sqrd);
      x = n.div(d);
      ss = sum.s;
      sum = sum.add(x);
    }

    // TODO: improve this
    if (this.isExact()) {
      p = Infinity;
    }

    // TODO: rounding
    // TODO: use ulp
    return sum.withPrecision(p);
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
    const x = this.trimDigits(typeof digits === 'number' ? -this.e - digits : 0);
    let ip = x.ip().toString();
    if (digits === 0) {
      return ip;
    }
    if (ip === '0' && x.isNegitive()) {
      ip = '-0';
    }
    const fp = x.fp();
    if (fp.isZero() && !digits) {
      return ip;
    }

    let fps = fp.s.toString();
    fps = zeroPadLeft(fps, fp.e);
    fps = digits ?
      zeroPadRight(fps, digits) :
      fps.replace(/0*$/g, '').slice(0, Irrational.DEFAULT_PRECISION);
    return `${ip}.${fps}`;
  }

  toExponential(fractionDigits: number = (this.p - 1)) {
    // TODO: eliminate this.digits() (should be = this.p)
    const digits = this.isExact() ? this.digits() : this.p;
    const x = this.trimDigits(digits - 1 - fractionDigits);
    const n = x.isNegitive() ? 2 : 1;
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
    if (this.p === p) {
      return this;
    }

    let { s, e } = this;

    const isExact = !Number.isFinite(p);

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

  withError(u: bigint) {
    if (u === this.u) {
      return this;
    }

    const isExact = u === 0n;

    let { s, e } = this;

    if (isExact) {
      // converting to exact, can trim trailing zeros
      while (u === 0n && s > 10n && s % 10n === 0n) {
        e++;
        s /= 10n;
      } 
    } else {
      let r = 0n;
      while (u >= 10n) {
        e++;
        r = s % 10n;
        s /= 10n;
        u /= 10n;
      }
      s += BigInt(Math.round(Number(r)/10));      
    }

    return new Irrational({
      s,
      e,
      p: digits(s),
      u
    });
  }

  /**
   * Removes n least significant digits
   * Rounds last digit
   * 
   * @param n number of digits to trim
   */
  // TODO: get rid of this
  protected trimDigits(n: number) {
    if (n <= 0) return this;

    let {s, e, p} = this;

    // console.log({s, e, p, n});

    const S = 10n ** BigInt(n);
    const r = s % S * 10n / S;
    s /= S;
    e += n;
    s += BigInt(Math.round(Number(r)/10));  // TODO: use signed rounding method

    return Irrational.from(s, e).withPrecision(p);
  }

  @Memoize()
  protected digits() {  // digits should always === p
    const s = this.s.toString().length;
    return digits(this.s);
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



