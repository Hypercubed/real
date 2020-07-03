import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { parseValue, zeroPadRight, zeroPadLeft } from './util';
import { Rational } from './rational';
import { Memoize } from './decorators';

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

  static readonly ZERO = new Irrational(0, 0, Infinity);
  static readonly ONE = new Irrational(1, 0, Infinity);
  static readonly TWO = new Irrational(2, 0, Infinity);
  static readonly HALF = Irrational.TWO.inv();

  static readonly LN10 =   new Irrational('2.302585092994045684017991454684364207601101488628772976033');  // TODO: these should be computable
  static readonly E =      new Irrational('2.718281828459045235360287471352662497757247093699959574966');
  static readonly LN2 =    new Irrational('0.693147180559945309417232121458176568075500134360255254120');
  static readonly LOG10E = new Irrational('0.434294481903251827651128918916605082294397005803666566114');
  static readonly INVE =   new Irrational('0.367879441171442321595523770161460867445811131031767834507');

  static readonly DEFAULT_MAX_PRECISION = 17; // > 16 for tests

  @guard()
  static isIrrational(x: unknown): x is Irrational {
    return x instanceof Irrational;
  }

  @conversion()
  static fromRational(x: Rational): Irrational {
    const [n, d] = x.toArray().map(n => new Irrational(n, 0, Infinity));
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

  protected readonly s: bigint = 0n; // Significand
  protected readonly e: number = 0;  // Exponent
  protected readonly p: number = 0;  // Presision

  constructor(value: InputValue, e?: number, p?: number) {
    super();

    if (value instanceof Irrational) {
      return value;
    }

    [this.s, this.e, this.p] = parseValue(value);

    if (typeof e !== 'undefined') {
      this.e += e;
    }
    if (typeof p !== 'undefined') {
      this.p = p;
    }

    console.assert(this.e % 1 === 0, 'exponent must be an integer');
    console.assert(this.p >= 0, 'precision must be greater than or equal to zero' + this.p);

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

  cmp(y: Irrational): number {
    return this.sub(y).sgn();
  }

  eq(y: Irrational): boolean {
    return this.cmp(y) === 0;
  }

  gt(y: Irrational): boolean {
    return this.cmp(y) === 1;
  }

  add(y: Irrational): Irrational {
    const [high, low]: Irrational[] = (this.e > y.e) ? [this, y] : [y, this];

    const d = high.e - low.e;
    const S = 10n ** BigInt(high.e - low.e);

    const hs = high.s * S;
    const ls = low.s;

    const s = hs + ls;
    const e = low.e;

    const sl = digits(s);
    const ph = (hs === 0n ? (1-high.e) : digits(hs)) - high.p;
    const pl = (ls === 0n ? (1-low.e) : digits(ls)) - low.p;

    const m = Math.max(ph, pl);
    const p = Math.max(0, sl - m);

    return new Irrational(s, e, p);
  }

  protected inc() {
    return this.add(Irrational.ONE);
  }

  sub(y: Irrational): Irrational {
    return this.add(y.neg());
  }
  
  protected dec() {
    return this.add(Irrational.ONE.neg());
  }

  mul(y: Irrational): Irrational {
    const s = this.s * y.s;
    const e = this.e + y.e;
    const p = Math.min(this.p, y.p);
    return new Irrational(s, e, p);
  }

  protected sqr() {
    const { s, e, p } = this;
    return new Irrational(s**2n, e*2, p);
  }

  // TODO: test
  protected ipow(n: bigint): Irrational {
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

    let isExact = this.isExact() && y.isExact();
    const p = isExact ? Irrational.DEFAULT_MAX_PRECISION : Math.min(this.p, y.p);
    const n = p + 1;

    const sgnDividend = this.s < 0n ? -1n : 1n;
    const sgnDivisor = y.s < 0n ? -1n : 1n;

    let dividend = this.s * sgnDividend;
    let divisor = y.s * sgnDivisor;

    let adj = 0;
    let result = 0n;

    // TODO: test faster methods (log10(n) ~ digits(n))
    while (dividend < divisor) {
      dividend *= 10n;
      adj++;
    }

    for (;;) {
      result += dividend / divisor;
      dividend %= divisor;

      if (dividend === 0n && adj >= 0 || digits(result) > n) {
        break;
      }

      result *= 10n;
      dividend *= 10n;
      adj++;
    }

    if (dividend > 0n) {
      const r = dividend.toString()[0];
      result += BigInt(Math.round(Number(r)/10));  // TODO: rounding method
      isExact = false;
    }
    
    return new Irrational(result * sgnDividend * sgnDivisor, this.e-y.e-adj, isExact ? Infinity : p);
  }

  @Memoize()
  isInteger() {
    const u = new Irrational(this.trunc());
    return this.sub(u).isZero();
  }

  @Memoize()
  isExact() {
    return !Number.isFinite(this.p)
  }

  trunc() {
    let s = this.s;
    let e = this.e;
    if (this.e < 0) {
      s = s / 10n ** BigInt(-e);
      e = 0;
    }
    return new Irrational(s, e, this.p);
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
  // TODO: rounding
  sqrt() {
    if (this.isNegitive()) {
      throw new Error('Square root of negitive number')
    }

    if (this.isZero()) {
      return this;
    }

    let { s, e, p } = this;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_MAX_PRECISION : p;
    const S = 10n**BigInt(p);

    const s0 = Math.sqrt(this.valueOf());
    let x: Irrational = new Irrational(s0); // initial guess for sqrt(this)
    let d = x;

    let i = 0;
    while (i++ < 1000 && !d.isZero() && S > x.s / d.s) {
      const e = this.div(x);
      x = x.add(e).mul(Irrational.HALF);
      d = x.sub(e).abs();
    }

    d = x.sqr().sub(this);

    // TODO: verify this
    if (isExact && d.isZero()) {
      p = Infinity;
    }

    return x.setPrecision(p);
  }

  isqrt() {
    if (this.isNegitive()) {
      throw new Error('Square root of negitive number')
    }

    if (this.isZero()) {
      return this;
    }

    const x: Irrational = this;
    let { p } = x;

    const isExact = this.isExact();
    p = isExact ? Irrational.DEFAULT_MAX_PRECISION : p;
    const S = 10n**BigInt(p);

    const THREE_HALF = new Irrational(3, 0, Infinity).mul(Irrational.HALF);
    const x_HALF = x.mul(Irrational.HALF);

    let y: Irrational = new Irrational(Math.sqrt(x.valueOf())).inv(); // initial guess for sqrt(this);
    let d: Irrational = y;

    let i = 0;
    while (i++ < 10 && !d.isZero() && S > y.s / d.s) {
      const yp = y;
      const e = y.sqr().mul(x_HALF);
      y = y.mul(THREE_HALF.sub(e));
      d = y.sub(yp).abs();
    }

    d = y.sqr().sub(this.inv());

    // TODO: verify this
    if (isExact && d.isZero()) {
      p = Infinity;
    }

    return y.setPrecision(p);
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

    const ip = this.ip();
    const fp = this.fp();

    const x = Irrational.E.ipow(ip);

    const f = fp.expm1().inc();
    const a = f.mul(x);

    return a.setPrecision(this.p);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  // TODO: replace with bigint version
  protected expm1() {
    if (this.isZero()) {
      return new Irrational(0n, 0, this.p);
    }

    const isExact = this.isExact();
    const p = isExact ? Irrational.DEFAULT_MAX_PRECISION : this.p;
    const S = 10n ** BigInt(p + 4);

    let n: Irrational = this;  // term
    let s = n;  // summation
    let i = 1;  // index
    while (S > s.s / n.s) {
      i++;
      n = n.mul(this).div(new Irrational(i, 0, Infinity));
      s = s.add(n);
    }
    return s.setPrecision(p);
  }

  /**
   * calculates exponentiation (x^y)
   * 
   */
  pow(y: Irrational): Irrational {
    const p = Math.min(this.p, y.p);

    if (y.isZero()) {
      return new Irrational(1n, 0, p);
    }

    if (y.isNegitive()) { // x^-y = 1/x^y
      return this.pow(y.abs()).inv();
    }
    if (y.eq(Irrational.ONE)) {
      return this;
    }
    if (y.eq(Irrational.TWO)) {
      return this.sqr();
    }

    const ip = y.ip();
    
    if (y.fp().isZero() && ip < MAX_SAFE_INTEGER) {
      return this.ipow(ip).setPrecision(p);
    }

    // x^y = exp(y*ln(x))
    const a = y.mul(this.ln()).exp();
    return a.setPrecision(p);
  }

  // TODO: replace with bigint version avoid using LN10
  /**
   * cal 10^x
   */
  pow10(): Irrational {
    if (this.isNegitive()) return this.abs().pow10().inv();
    if (this.e === 0) {
      return new Irrational(10n ** this.s, 0, this.p);
    }
    if (this.e > 0) {
      const u = this.s * 10n ** BigInt(this.e);  // will be an integer
      return new Irrational(10n ** u, 0, this.p);
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
  log10() {
    if (this.eq(Irrational.ONE)) {
      return new Irrational(0n, 0, this.p);
    }

    let { s, e, p } = this.simplify();

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
    if (this.isZero()) {
      throw new Error('Logarithm of zero');
    }

    if (this.eq(Irrational.ONE)) {
      return new Irrational(0n, 0, this.p);
    }

    let s: Irrational = this;
    let n = 0;

    // reduce value to 0 < x < 1
    while (s.gt(Irrational.ONE)) {
      s = s.mul(Irrational.INVE);
      n += 1;
    }

    let a = s.dec().lnp1();

    if (n !== 0) {
      a = a.add(new Irrational(n, 0, Infinity));
    }
    return a.setPrecision(this.p);
  }

  /**
   * returns the natural logarithm (base e) of 1 + a number
   * identity in terms of the inverse hyperbolic tangent
   * high precision value for small values of x
   */
  // TODO: replace with bigint version?
  protected lnp1() {
    const t = this.inc().inc();
    const x = this.div(new Irrational(t.s, t.e));
    return x.atanh().mul(Irrational.TWO);
  }

  /**
   * calculates inverse hyperbolic tangent of x
   */
  // TODO: replace with bigint version
  atanh() {
    if (this.isZero()) {
      return this;
    }

    const p = this.isExact() ? Irrational.DEFAULT_MAX_PRECISION : this.p;
    const S = 10n**BigInt(p);

    let d = 1;
    let n: Irrational = this;
    let x = n;
    let sum = x;

    const sqrd = this.sqr();
    
    while (S > sum.s / x.s) {
      d += 2;
      n = n.mul(sqrd);
      x = n.div(new Irrational(d, 0, p));
      sum = sum.add(x);
    }
    return sum;
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
      fps.replace(/0*$/g, '');
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

  protected setPrecision(p: number) {
    return new Irrational(this.s, this.e, p)
  }

  /**
   * Rounds to n digits
   * 
   * @param n digits to round to
   */
  protected roundToPrecision(p: number = this.p) {
    return this.trimDigits(this.digits() - p).simplify();
  }

  /**
   * Rounds to n fractrional digits
   * 
   * @param n frational digits to round to
   */
  protected roundToDigits(n: number) {
    return this.trimDigits(-this.e - n).simplify();
  }

  /**
   * Removes n least significant digits
   * Rounds last digit
   * 
   * @param n number of digits to trim
   */
  protected trimDigits(n: number) {
    if (n <= 0) return this;

    let {s, e, p } = this;

    const S = 10n ** BigInt(n);
    const r = s % S * 10n / S;
    s /= S;
    e += n;
    s += BigInt(Math.round(Number(r)/10));  // TODO: use signed rounding method

    return new Irrational(s, e, p);
  }

  protected simplify() {
    const sgn = this.s < 0n ? -1n : 1n;
    let {s, e} = this.abs();
    while (s % 10n === 0n && s > 1n) { 
      s /= 10n;
      e += 1;
    }
    return new Irrational(s * sgn, e, this.p);
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


