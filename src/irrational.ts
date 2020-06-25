import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { parseValue, zeroPadRight, zeroPadLeft } from './util';
import { Rational } from './rational';

type InputValue = bigint | number | string | Irrational;

/**
 * TODO: sqrt, modulo
 * sin, cos, tan
 * asin, acos, atan
 */

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

  static LN10 =   new Irrational('2.30258509299404568401799145468');  // TODO: these should be computable
  static E =      new Irrational('2.71828182845904523536028747135');
  static LN2 =    new Irrational('0.69314718055994530941723212145');
  static LOG10E = new Irrational('0.43429448190325182765112891891');

  @guard()
  static isIrrational(x: unknown): x is Irrational {
    return x instanceof Irrational;
  }

  @conversion()
  static fromRational(x: Rational): Irrational {
    const [n, d] = x.toArray();
    return new Irrational(n).div(new Irrational(d));
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
      return this;
    }

    [this.s, this.e, this.p] = parseValue(value);

    if (typeof e !== 'undefined') {
      this.e += e;
    }
    if (typeof p !== 'undefined') {
      this.p = p;
    }
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

  // TODO: precision error!!
  add(y: Irrational): Irrational {
    let s = this.s;
    let e = this.e;
    const p = this.p; // TODO: presision should be detemined by larger number
    
    let yd = y.s;
    let xd = s;
    const d = y.e - e;
    if (d > 0) {
      yd = yd * 10n ** BigInt(d);
    } else if (d < 0) {
      xd = xd * 10n ** BigInt(-d);
      e = y.e;
    }
    s = xd + yd;
    return new Irrational(s, e, p);
  }

  sub(y: Irrational): Irrational {
    return this.add(y.neg());
  }

  mul(y: Irrational): Irrational {
    const s = this.s * y.s;
    const e = this.e + y.e;
    const p = Math.min(this.p, y.p);
    return new Irrational(s, e, p);
  }

  inv() {
    let x: Irrational = this;
    if (!Number.isFinite(this.p)) {
      x = new Irrational(x.s, x.e, 300); // TODO: can this be better?
    }
    const n = 2 * x.p;
    const S = 10n ** BigInt(n);
    return new Irrational(S * 1n / x.s, -x.e - n, x.p);
  }

  div(y: Irrational): Irrational {
    return this.mul(y.inv());
  }

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
      return t.sub(Irrational.ONE);
    }
    return t;
  }

  /**
   * maps x to the least integer greater than or equal to x
   */
  ceil() {
    const t = this.trunc();
    if (this.isPositive() && !this.fp().isZero()) {
      return t.add(Irrational.ONE);
    }
    return t;
  }

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
   */
  exp() {
    if (this.isZero()) {
      return new Irrational(1n, 0, this.p);
    }
    return this.expm1().add(Irrational.ONE);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  // TODO: improve this
  protected expm1() {
    let n: Irrational = this;
    let d = 1;
    let s = n;
    for (let i = 2; i < 300; i++) {
      n = n.mul(this);
      d *= i;
      const t = s;
      s = s.add(n.mul(new Irrational(1/d)));
      if (i > 10 && s.digits() === t.digits()) {
        return s;
      }
    }
    return s;
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
    if (y.eq(Irrational.TWO)) {  // convert this to Exponentiation by squaring
      return this.mul(this);
    }
    const u = y.ip();
    const v = y.valueOf();
    if (y.sub(new Irrational(u)).isZero() && BigInt(v) === u) {  // checks that y is a small integer?? 
      return new Irrational(this.s**u, this.e*v, this.p);
    }

    // x^y = exp(y*ln(x))
    return y.mul(this.ln()).exp();
  }

  pow10(): Irrational {
    if (this.isNegitive()) return this.abs().pow10().inv();
    if (this.e === 0) {
      return new Irrational(10n ** this.s, 0, this.p);
    }
    if (this.e > 0) {
      const u = this.s * 10n ** BigInt(this.e);  // will be an integer
      return new Irrational(10n ** u);
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
    const n = this.e;
    const s = new Irrational(this.s, 0, this.p);
    
    let a = s.ln().mul(Irrational.LOG10E);
    return (n === 0) ? a : a.add(new Irrational(n));
  }

  /**
   * calculates natural logarithm of x
   * 
   * ln(x)     = ln(s*e^n)
   *           = ln(s) + n*ln(e);
   *           = log1p(s - 1) + e
   */
  ln(): Irrational {
    if (this.eq(Irrational.ONE)) {
      return new Irrational(0n, 0, this.p);
    }

    let s = new Irrational(this.s, this.e, this.p);
    let n = 0;

    // reduce value to 0 < x < 1
    while (s.gt(Irrational.ONE)) {
      s = s.div(Irrational.E);
      n += 1;
    }

    const a = s.sub(Irrational.ONE).log1p();
    if (n === 0) {
      return a;
    }
    return a.add(new Irrational(n));
  }

  /**
   * returns the natural logarithm (base e) of 1 + a number
   * identity in terms of the inverse hyperbolic tangent
   * high precision value for small values of x
   */
  protected log1p() {
    const a = this.div(Irrational.TWO.add(this)).atanh();
    return Irrational.TWO.mul(a);
  }

  /**
   * calculates inverse hyperbolic tangent of x
   */
  protected atanh() {
    const p = this.p;
    let n = new Irrational(this.s, this.e, this.p);
    let sum = n;
    let d = 1;
    for (let i = 2; i < 300; i++) {
      d += 2;
      n = n.mul(this).mul(this);
      const t = sum;
      sum = sum.add(n.mul(new Irrational(1 / d)));
      if (sum.p === p) {
        return sum;
      }
    }
    return sum;
  }

  toString(): string {
    return this.canonicalize().toExponential(this.p - 1);
  }

  valueOf(): number {
    return Number(this.toString());
  }

  toFixed(digits: number): string {
    let ip = this.ip().toString();
    if (digits < 1) {
      return ip.toString();
    }
    if (ip === '0' && this.isNegitive()) {
      ip = '-0';
    }
    const fp = this.fp();
    const fps = zeroPadLeft(fp.s.toString(), fp.e);
    return `${ip}.${zeroPadRight(fps, digits)}`;
  }

  toExponential(fractionDigits: number) { // TODO: implement rounding method
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

  // TODO: get rid of this
  protected digits() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().slice(0, this.p + n);
  }

  protected canonicalize() {
    const sgn = this.s < 0n ? -1n : 1n;

    let s = this.s * sgn;
    let e = this.e;

    const ss = s.toString();
    let n = ss.length - this.p;

    if (n > 0) {
      const S = 10n ** BigInt(n);
      const r = s % S * 1000n / S;
      s /= S;
      e += n;

      s += BigInt(Math.round(Number(r)/1000));
    }

    while (s % 10n === 0n && s > 1n) { 
      s /= 10n;
      e += 1;
    }

    return new Irrational(s * sgn, e, this.p);
  }
}
