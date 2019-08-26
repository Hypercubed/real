import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { parseValue } from './util';
import Rational from './rational';

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

export default class Irrational extends Real {
  static CP = 22;
  static DP = 20;
  static RM = RoundingMethod.Round;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);
  static TWO = new Irrational(2);

  static LN10 =   new Irrational('2.30258509299404568401799145468');
  static E =      new Irrational('2.71828182845904523536028747135');
  static LN2 =    new Irrational('0.69314718055994530941723212145');
  static LOG10E = new Irrational('0.43429448190325182765112891891');

  protected s: bigint = 0n;  // Significand
  protected e: number = 0;   // Exponent

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

  constructor(value: InputValue) {
    super();

    if (value instanceof Irrational) {
      return value.clone();
    }

    [this.s, this.e] = parseValue(value);
  }

  clone() {
    const x = new Irrational(0n);
    x.s = this.s;
    x.e = this.e;
    return x;
  }

  sgn() {
    if (this.s > 0n) return 1;
    if (this.s < 0n) return -1;
    return 0;
  }

  neg() {
    const x = this.clone();
    x.s *= -1n;
    return x;
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
    const x = this.clone();
    let yd = y.s;
    let xd = x.s;
    const d = y.e - x.e;
    if (d > 0) {
      yd = yd * 10n ** BigInt(d);
    } else if (d < 0) {
      xd = xd * 10n ** BigInt(-d);
      x.e = y.e;
    }
    x.s = xd + yd;
    return x;
  }

  sub(y: Irrational): Irrational {
    return this.add(y.neg());
  }

  mul(y: Irrational): Irrational {
    const x = this.clone();
    x.s *= y.s;
    x.e += y.e;
    return x;
  }

  inv() {
    // TODO: Better??
    const x = this.clone();
    const d = Irrational.CP + this.sigfigs();
    x.s = 10n ** BigInt(d) / x.s;
    x.e = -x.e - d;
    return x;
  }

  div(y: Irrational): Irrational {
    return this.mul(y.inv());
  }

  isInteger() {
    const u = new Irrational(this.trunc());
    return this.sub(u).isZero();
  }

  trunc(): bigint {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  /**
   * maps x to the greatest integer greater than or equal to x
   */
  floor(): bigint {
    const ip = this.trunc();
    if (this.isNegitive() && !this.sub(new Irrational(ip)).isZero()) {
      return ip - 1n;
    }
    return ip;
  }

  /**
   * maps x to the least integer greater than or equal to x
   */
  ceil(): bigint {
    const ip = this.trunc();
    if (this.isPositive() && !this.sub(new Irrational(ip)).isZero()) {
      return ip + 1n;
    }
    return ip;
  }

  /**
   * maps tp the frational part of x
   */
  fp() {
    const t = -this.trunc();
    return this.add(new Irrational(t)).abs();
  }

  /**
   * calculates the natural exponential function
   */
  exp() {
    const one = Irrational.ONE;
    return this.isZero() ? one.clone() : this.expm1().add(one);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  protected expm1() {
    let n = this.simplify();
    let d = 1;
    let s = n;
    for (let i = 2; i < 100; i++) {
      n = n.mul(this);
      d = d * i;
      const t = s;
      s = s.add(n.div(new Irrational(d)));
      if (s.digits() === t.digits()) {
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
      return Irrational.ZERO.clone();
    }
    if (y.isNegitive()) { // x^-y = 1/x^y
      return this.pow(y.abs()).inv();
    }
    if (y.eq(Irrational.ONE)) {
      return this.clone();
    }
    if (y.eq(Irrational.TWO)) {  // convert this to Exponentiation by squaring
      return this.mul(this);
    }
    const u = y.trunc();
    const v = y.valueOf();
    if (y.sub(new Irrational(u)).isZero() && BigInt(v) === u) {  // checks that y is a small integer?? 
      const x = this.clone();
      x.s = x.s**u;
      x.e = x.e * v;
      return x;
    }

    // x^y = exp(y*ln(x))
    return y.mul(this.ln()).exp();
  }

  pow10(): Irrational {
    if (this.isNegitive()) return this.abs().pow10().inv();
    if (this.e === 0) {
      return new Irrational(10n ** this.s);
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
    let s = this.simplify();
    let n = s.e;

    s = new Irrational(this.s);
    
    let a = s.ln().mul(Irrational.LOG10E);
    if (n === 0) {
      return a
    }
    return a.add(new Irrational(n));
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
      return Irrational.ZERO;
    }

    let s = this.clone();
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
    let n = this.clone();
    let sum = n;
    let d = 1;
    for (let i = 2; i < 300; i++) {
      d += 2;
      n = n.mul(this).mul(this);
      const t = sum;
      sum = sum.add(n.mul(new Irrational(1 / d)));
      if (sum.digits() === t.digits()) {
        return sum;
      }
    }
    return sum;
  }

  toString(): string {
    const x = this.roundToPrecision(Irrational.DP);
    const n = x.isNegitive() ? 2 : 1;
    let ss = x.s.toString();
    x.e += ss.length - n;
    ss = ss.slice(0, n) + '.' + ss.slice(n);
    if (ss.length < Irrational.DP + n) {
      const d = Irrational.DP + n - ss.length;
      ss += '0'.repeat(d);
    }
    ss = ss.slice(0, Irrational.DP + n);
    const se = x.e >= 0 ? '+' + x.e : x.e;
    return ss + 'e' + se;
  }

  valueOf(): number {
    return Number(this.toString());
  }

  protected sigfigs() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().length - n;
  }

  protected digits() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().slice(0, Irrational.CP + n);
  }

  protected normalize() {
    if (this.s === 0n) this.e = 0;
    this.e = this.e | 0;
  }

  protected simplify() {
    this.normalize();
    const sgn = BigInt(this.sgn());
    const x = this.abs();
    while (x.s % 10n === 0n && x.s > 1n) { 
      x.s /= 10n;
      x.e += 1;
    }
    x.s *= sgn;
    return x;
  }

  protected roundToPrecision(n: number) {
    const x = this.clone();
    x.normalize();

    // TODO: Rounding method
    const neg = x.isNegitive();
    n += neg ? 1 : 0;
    const ss = x.s.toString();
    const l = ss.length;
    if (x.s !== 0n && l > n) {
      const d = l - n;
      x.s /= 10n ** BigInt(d);
      x.e += d;

      if (Irrational.RM !== RoundingMethod.Truncate) {
        const s = (neg ? -1 : 1) * +ss[n];
        x.s += BigInt(Math[Irrational.RM](s / 10));
      }
    }
    return x;
  }
}


