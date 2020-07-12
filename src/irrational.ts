import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { parseValue, zeroPadRight, zeroPadLeft } from './util';
import { Rational } from './rational';
import { Memoize } from './decorators';

type _InputValue = bigint | number | string;
type InputValue = bigint | number | string | Irrational;

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

  static readonly ZERO = new Irrational(0, 0, Infinity);
  static readonly ONE = new Irrational(1, 0, Infinity);
  static readonly TWO = new Irrational(2, 0, Infinity);
  static readonly HALF = new Irrational(0.5, 0, Infinity);
  static readonly NEG_ONE = new Irrational(-1, 0, Infinity);

  static readonly LN10 =   new Irrational('2.302585092994045684017991454684364207601101488628772976033');  // TODO: these should be computable
  static readonly E =      new Irrational('2.718281828459045235360287471352662497757247093699959574966');
  static readonly LN2 =    new Irrational('0.693147180559945309417232121458176568075500134360255254120');
  static readonly LOG10E = new Irrational('0.434294481903251827651128918916605082294397005803666566114');
  static readonly INVE =   new Irrational('0.367879441171442321595523770161460867445811131031767834507');
  
  @guard()
  static isIrrational(x: unknown): x is Irrational {
    return x instanceof Irrational;
  }

  @conversion()
  static fromRational(x: Rational): Irrational {
    const [n, d] = x.toArray().map(n => new Irrational(n));
    return n.div(d);
  }

  @conversion()
  static fromNumber(x: number): Irrational {
    return new Irrational(x);
  }

  @conversion()
  static fromBigInt(x: bigint): Irrational {
    return new Irrational(x);
  }

  static from(value: _InputValue, ulp: _InputValue = 1n, exponent: number = 0) {
    let [value_s, value_e] = parseValue(value);
    let [ulp_s, ulp_e] = parseValue(ulp);

    value_e += exponent;
    ulp_e += exponent;

    while (ulp_s >= 10n) {
      ulp_e--;
      ulp_s /= 10n;
    }

    const d = ulp_e - value_e;
    if (d > 0n) {
      value_s *= 10n**BigInt(d);
      value_e += d;
    } else if (d < 0n) {
      value_s /= 10n**BigInt(-d);
      value_e -= d;
    }

    const o = {
      s: value_s,
      e: value_e,
      p: digits(value_s),
      ulp: ulp_s === 0n ? 0n : 1n // ulp_s  // TODO: after stop using p
    };

    return Object.setPrototypeOf(o, Irrational.prototype);
  }

  protected readonly s: bigint = 0n; // Significand
  protected readonly e: number = 0;  // Exponent
  protected readonly p: number = 0;  // Presision
  protected readonly ulp: bigint = 0n;  // error (units in the last place)

  constructor(value: InputValue, exponent: number = 0, precision?: number) {
    super();

    if (value instanceof Irrational) {
      return value;
    }

    let [significand, parsed_exponent, parsed_precision] = parseValue(value);

    // console.log({ value, significand, parsed_exponent, parsed_precision });

    let ulp = 1n;

    exponent += parsed_exponent;
    precision = typeof precision === 'undefined' ? parsed_precision : precision;

    // if precsision is finite, normalize values
    if (Number.isFinite(precision)) {
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
    } else {
      ulp = 0n;

      // console.log({ significand, exponent, precision });

      // while (significand > 10n && significand % 10n === 0n) {
      //   significand /= 10n;
      //   exponent += 1;
      // }
      // precision = digits(significand);
    }

    this.s = significand;
    this.e = exponent;
    this.p = precision;
    this.ulp = ulp;

    console.assert(exponent % 1 === 0, 'exponent must be an integer');
    console.assert(precision >= 0, 'precision must be greater than or equal to zero');
    console.assert(ulp >= 0, 'precision must be greater than or equal to zero');

    Object.freeze(this);
  }

  sgn() {
    if (this.s > 0n) return 1;
    if (this.s < 0n) return -1;
    return 0;
  }

  neg() {
    return new Irrational(this.s * -1n, this.e, this.p);
  }

  abs() {
    return (this.s < 0) ? this.neg() : this;
  }

  isZero() {
    return this.s === 0n;
  }

  isPositive(): boolean {
    return this.s > 0;
  }

  isNegitive(): boolean {
    return this.s < 0;
  }

  @Memoize()
  isInteger() {
    return this.sub(this.trunc()).isZero();
  }

  @Memoize()
  isExact() {
    return this.ulp === 0n;
  }

  cmp(y: Irrational): number {
    // TODO: should return zero if two numbers are within precision
    // abs(x - y) < 1/10^-p
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

    const hu = high.ulp * S;
    const lu = low.ulp;

    const hs = high.s * S;
    const ls = low.s;

    return new Irrational(hs + ls, low.e).withError(hu + lu);
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

    const xd = this.ulp;
    const yd = y.ulp;

    const d = nAbs(xs*yd)+nAbs(ys*xd)+xd*yd;

    return new Irrational(xs * ys, this.e + y.e).withError(d);
  }

  protected sqr() {
    const { s, e, ulp } = this;

    // TODO: verify precision
    const d = 2n*nAbs(s*ulp)+ulp**2n;

    return new Irrational(s**2n, e*2).withError(d);
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

    if (n < MAX_SAFE_INTEGER) {
      const { s, e, p } = this;
      return new Irrational(s**n, e*Number(n), p);
    }

    // TODO: improve this for very large numbers
    let x: Irrational = this;
    while (n > 1n) {
      x = this.mul(x);
      n--;
    }
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

    const pmax = 2*Math.max(px, py);
    const S = 10n**BigInt(pmax);

    const xs = sgn_x * this.s;
    const ys = sgn_y * y.s;

    const xd = this.ulp;
    const yd = y.ulp;

    const s = S * xs / ys;
    const r = S * xs % ys;
    let d = (s * xd / xs) + (s * yd / ys);  // TODO: verify
    // let d = ((S * xd) + (S * xs * yd / ys)) / ys;

    if (r !== 0n && d === 0n) {  // something wrong
      // console.log('****');
      d = 1n;
    }

    return new Irrational(sgn_x * sgn_y * s, this.e-y.e-pmax).withError(d);
  }

  trunc() {
    if (this.e >= 0) {
      return this;
    }

    const s =  this.s / 10n ** BigInt(-this.e);
    return new Irrational(s, 0, Infinity);
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

    // n must be even
    const n = 2*p;
    const S = 10n**BigInt(n);  // scale

    // Make exponent divisble by 2
    if (e % 2 !== 0) {
      e -= 1;
      s *= 10n;
    }

    s = S * s;  // scaled value
    let x = s < MAX_SAFE_INTEGER ?   // initial guess for sqrt(this)
      BigInt(Math.round(Math.sqrt(Number(s)))) :
      s / 2n;

    let xn: bigint;
    let d = 2n;
    let r: bigint = 0n;

    while (d > 1n) {
      r = s % x;
      xn = s / x;
      x = (x + xn)/2n;
      d = nAbs(x - xn);
    }

    e -= n;
    e /= 2;

    // TODO: verify/improve this
    if (this.isExact() && r === 0n) {
      p = Infinity;
    }

    return new Irrational(x, e, p);
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

    const THREE_HALF = new Irrational(3, 0, Infinity).mul(Irrational.HALF);
    const xo2 = x.mul(Irrational.HALF);

    let y: Irrational = new Irrational(Math.sqrt(x.valueOf())).inv(); // initial guess for sqrt(this);
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
    if (this.isZero()) {
      return new Irrational(1n, 0, this.p);
    }
    if (this.isNegitive()) {
      return this.neg().exp().inv();
    }

    return this.expm1().inc().withPrecision(this.p);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  protected expm1() {
    if (this.isZero()) {
      return new Irrational(0n, 0, this.p);
    }

    let { p } = this;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_PRECISION : p;
    const pp = p + 1;

    const x = this.withPrecision(pp);

    let n: Irrational = x;  // term
    let s = n;  // summation
    let i = 1n;  // index
    let ss = 0n;

    while (s.s !== ss) {
      i++;
      n = n.mul(x).div(new Irrational(i));
      ss = s.s;
      s = s.add(n);
    }

    // TODO: fix this
    // if (isExact) {
    //   p = Infinity;
    // }

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
      return new Irrational(1n, 0, p);
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

    return yp.mul(xp.ln()).exp().withPrecision(p);
  }

  // TODO: replace with bigint version avoid using LN10
  /**
   * cal 10^x
   */
  pow10(): Irrational {
    if (this.isNegitive()) return this.abs().pow10().inv();
    if (this.isZero()) {
      return new Irrational(1n, 0, this.p);
    }
    if (this.e === 0 && this.s < MAX_SAFE_INTEGER) {
      return new Irrational(1, Number(this.s), this.p);
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
      return new Irrational(0n, 0, this.p);
    }

    let { s, e, p } = this;

    const ss = new Irrational(s, 0, p);
    const ee = new Irrational(e, 0, p);

    if (s === 1n) {
      return ee;
    }
    
    const a = ss.ln().mul(Irrational.LOG10E);  // TODO: calc log10 without ln
    return (e === 0) ? a : a.add(ee);
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
      return new Irrational(0n, 0, this.p);
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

    // TODO: improve this
    if (this.isExact()) {
      p = Infinity;
    }

    s = 2n*sum;

    const ne = new Irrational(e+adj, 0, Infinity).mul(Irrational.LN10);
    return new Irrational(s, -n, Infinity).add(ne).withPrecision(p);
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
    let d = new Irrational(1, 0, pp);
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
    const x = this.trimDigits(this.digits() - 1 - fractionDigits);
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

  protected withPrecision(p: number) {
    if (this.isExact()) {
      return new Irrational(this.s, this.e, p);
    }
    if (!Number.isFinite(p)) {
      let { s, e } = this;
      while (s > 10n && s % 10n === 0n) {
        e += 1;
        s /= 10n;
      }
      return new Irrational(s, e, Infinity);
    }
    const d = this.p - p;
    const s = trimDigits(this.s, d);
    return new Irrational(s, this.e + d, p);
  }

  protected withError(ulp: bigint) {
    if (ulp === 0n) {
      return this.withPrecision(Infinity);
    }
    let p = this.isExact() ? digits(this.s) : this.p;
    while (ulp >= 10n) {
      p--;
      ulp /= 10n;
    }
    return this.withPrecision(p);
  }

  /**
   * Removes n least significant digits
   * Rounds last digit
   * 
   * @param n number of digits to trim
   */
  protected trimDigits(n: number) {
    if (n <= 0) return this;

    let {s, e, p} = this;

    // console.log({s, e, p, n});

    const S = 10n ** BigInt(n);
    const r = s % S * 10n / S;
    s /= S;
    e += n;
    s += BigInt(Math.round(Number(r)/10));  // TODO: use signed rounding method

    return new Irrational(s, e, p);
  }

  @Memoize()
  protected digits() {
    const s = this.s.toString().length;
    return this.s < 0n ? s - 1 : s;
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

function nDiv(dividend: bigint, divisor: bigint, n: number): [bigint, bigint, number] {
  const sgnDividend = dividend < 0n ? -1n : 1n;
  const sgnDivisor = divisor < 0n ? -1n : 1n;

  dividend *= sgnDividend;
  divisor *= sgnDivisor;

  let adj = 0;
  let result = 0n;

  while (dividend < divisor) {
    dividend *= 10n;
    adj++;
  }

  const S = 10n**BigInt(n);

  for (;;) {
    result += dividend / divisor;
    dividend %= divisor;

    if (dividend === 0n || result > S) {
      break;
    }

    result *= 10n;
    dividend *= 10n;
    adj++;
  }

  return [result * sgnDividend * sgnDivisor, dividend, adj];
}

function nSqr(s: bigint, e: number) {
  return [s**2n, e*2];
}

function nAbs(s: bigint) {
  return s < 0n ? -s : s;
}


