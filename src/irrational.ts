import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { parseValue, zeroPadRight, zeroPadLeft } from './util';
import { Rational } from './rational';
import { Memoize } from './decorators';

type InputValue = bigint | number | string | Irrational;

/**
 * sqrt, modulo
 * sin, cos, tan
 * asin, acos, atan
 */

const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);

enum RoundingMethod {
  Truncate = 'trunc',
  Round = 'round',
  Floor = 'floor',
  Ciel = 'ceil'
}

export class Irrational extends Real {
  static RM = RoundingMethod.Round;

  static ZERO = new Irrational(0, 0, Infinity);
  static ONE = new Irrational(1, 0, Infinity);
  static TWO = new Irrational(2, 0, Infinity);

  static LN10 =   new Irrational('2.302585092994045684017991454684364207601101488628772976033');  // TODO: these should be computable
  static E =      new Irrational('2.718281828459045235360287471352662497757247093699959574966');
  static LN2 =    new Irrational('0.693147180559945309417232121458176568075500134360255254120');
  static LOG10E = new Irrational('0.434294481903251827651128918916605082294397005803666566114');
  static INVE =   new Irrational('0.367879441171442321595523770161460867445811131031767834507');

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

  protected s: bigint = 0n; // Significand
  protected e: number = 0;  // Exponent
  protected p: number = 0;  // Presision

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

    // console.assert(Math.trunc(this.e) === this.e);
    // console.assert(this.p >= 0);

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
    const p = sl - m;

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
  protected pown(n: bigint): Irrational {
    if (n === 0n) {
      return Irrational.ONE;
    }

    if (n < 0n) {
      return this.abs().pown(-n).inv();
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
    let { s, e, p } = this;
    p = Number.isFinite(p) ? p : 200;  // TODO: configurable
    const n = 2 * Math.max(p, s.toString().length);
    const S = 10n ** BigInt(n);

    const r = S % s * 10n / s;
    s = S / s;
    e = -e-n;

    s += BigInt(Math.round(Number(r)/10));  // TODO: rounding method

    return new Irrational(s, e, p);
  }

  div(y: Irrational): Irrational {
    if (this.isZero()) {
      return this;
    }
    return this.mul(y.inv());
  }

  @Memoize()
  isInteger() {
    const u = new Irrational(this.trunc());
    return this.sub(u).isZero();
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

  @Memoize()
  ip(): bigint {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  /**
   * maps to the frational part of x
   */
  fp() {
    return this.sub(this.trunc()).abs();
  }

  /**
   * calculates the natural exponential function
   * 
   * x = ip + fp;
   * exp(x) = exp(ip + fp)
   *        = exp(ip)*exp(fp)
   *        = E^ip*exp(fp)
   */
  exp() {
    if (this.isZero()) {
      return new Irrational(1n, 0, this.p);
    }

    const ip = this.ip();
    const fp = this.fp();

    const x = Irrational.E.pown(ip);

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
    const S = 10n ** BigInt(this.p + 4);

    let n: Irrational = this;  // term
    let s = n;  // summation
    let i = 1;  // index
    while (S > s.s / n.s) {
      i++;
      n = n.mul(this).div(new Irrational(i, 0, Infinity));
      s = s.add(n);
    }
    return s.setPrecision(this.p);
  }

  /**
   * calculates exponentiation (x^y)
   * 
   */
  pow(y: Irrational): Irrational {
    if (y.isZero()) {
      if (this.isZero()) throw new Error('Division by zero');
      return new Irrational(0n, 0, Math.min(this.p, y.p));
    }
    if (y.isNegitive()) { // x^-y = 1/x^y
      return this.pow(y.abs()).inv();
    }
    if (y.eq(Irrational.ONE)) {
      return this;
    }
    if (y.eq(Irrational.TWO)) {  // TODO: convert this to Exponentiation by squaring
      return this.mul(this);
    }

    const ip = y.ip();
    const p = Math.min(this.p, y.p);
    if (y.fp().isZero() && ip < MAX_SAFE_INTEGER) {
      return this.pown(ip).setPrecision(p);
    }

    // x^y = exp(y*ln(x))
    const a = y.mul(this.ln()).exp();
    return a.setPrecision(p);
  }

  // TODO: replace with bigint version avoid using LN10
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
    const { p } = this;

    const x = this.simplify();
    if (x.eq(Irrational.ONE)) {
      return new Irrational(0n, 0, p);
    }
    
    const n = x.e;
    const s = new Irrational(x.s, 0, p);
    const e = new Irrational(n, 0, p);

    if (x.s === 1n) {
      return e;
    }
    
    const a = s.ln().mul(Irrational.LOG10E);  // TODO: calc log10 without ln
    return (n === 0) ? a : a.add(e);
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
      throw 'Logarithm of zero';
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
  // TODO: replace with bigint version
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

    const p = Math.max(this.p, 100);
    const S = 10n**BigInt(this.p);

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
    if (Number.isFinite(this.p)) {
      return this.roundToPrecision().toExponential();
    }
    return this.toFixed();
  }

  @Memoize()
  valueOf(): number {
    return Number(this.toString());
  }

  toFixed(digits?: number): string {
    let ip = this.ip().toString();
    if (digits === 0) {
      return ip;
    }
    if (ip === '0' && this.isNegitive()) {
      ip = '-0';
    }
    const fp = this.fp();
    if (fp.isZero()) {
      return `${ip}`;
    }
    let fps = fp.s.toString();
    fps = zeroPadLeft(fps, fp.e);
    fps = (typeof digits === 'undefined') ?
      fps.replace(/0*$/g, '') :
      zeroPadRight(fps, digits);
    return `${ip}.${fps}`;
  }

  toExponential(fractionDigits: number = (this.p - 1)) { // TODO: implement rounding method
    const n = this.isNegitive() ? 2 : 1;
    const s = this.s.toString();
    const ip = s.slice(0, n);
    const fp = s.slice(n);
    const e = fp.length + this.e;
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

  // better to do this on creation?
  protected simplify() {
    const sgn = this.s < 0n ? -1n : 1n;
    let s = this.s * sgn;
    let e = this.e;

    while (s % 10n === 0n && s > 1n) { 
      s /= 10n;
      e += 1;
    }
    return new Irrational(s * sgn, e, this.p);
  }

  protected roundToPrecision(p: number = this.p) {
    const sgn = this.s < 0n ? -1n : 1n;

    let s = this.s * sgn;
    let e = this.e;

    const ss = s.toString();
    let n = ss.length - p;

    if (n > 0) {
      const S = 10n ** BigInt(n);
      const r = s % S * 10n / S;
      s /= S;
      e += n;
      s += BigInt(Math.round(Number(r)/10));  // TODO: rounding method
    }

    return new Irrational(s * sgn, e, this.p).simplify();
  }
}

function digits(n: bigint): number {
  const s = n.toString().length;
  return n < 0n ? s - 1 : s;
}
