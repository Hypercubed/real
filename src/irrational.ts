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

export default class Irrational extends Real {
  static CP = 25;
  static DP = 20;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);
  static TWO = new Irrational(2);

  static LN10 = new Irrational('2.302585092994045684017991454684364207601101488628772976033');

  static E = Irrational.ONE.exp().roundToPrecision(Irrational.CP);
  static LN2 = Irrational.TWO.ln().roundToPrecision(Irrational.CP);

  static LOG10E = Irrational.LN10.inv().roundToPrecision(Irrational.CP);

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
    if (y.cmp(Irrational.ONE) === 0) {
      return this.clone();
    }
    if (y.cmp(Irrational.TWO) === 0) {  // convert this to Exponentiation by squaring
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
   * log(s*10^e) = log(s) + e
   *             = ln(s)/ln(10) + e
   *             = log1p(s - 1)*log10(e) + e
   */
  log10() {
    let a = Irrational.log1p(this.s - 1n).mul(Irrational.LOG10E);
    if (this.e !== 0) {
      a = a.add(new Irrational(this.e));
    }
    return a;
  }

  /**
   * calculates natural logarithm of x
   * 
   * ln(s*10^e) = ln(s) + e*ln(10);
   *            = log1p(s - 1) + e*ln10
   */
  ln(): Irrational {
    return this.sub(Irrational.ONE).log1p();
  }

  protected log1p() {
    // identity in terms of the inverse hyperbolic tangent
    // high precision value for small values of x
    const a = this.div(Irrational.TWO.add(this)).arctanh();
    return Irrational.TWO.mul(a);
  }

  /**
   * calculates inverse hyperbolic tangent of x
   */
  protected arctanh() {
    let n = this.clone();
    let sum = n;
    let d = 1;
    for (let i = 2; i < 100; i++) {
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
    n += x.isNegitive() ? 1 : 0;
    if (x.s !== 0n && x.s.toString().length > n) {
      const d = x.s.toString().length - n;
      x.s /= 10n ** BigInt(d);
      x.e += d;
    }
    return x;
  }

  /**
 * calculates natural log of x + 1
 * 
 * identity in terms of the inverse hyperbolic tangent
 * high precision value for small values of x
 * log1p(x) = 2 * arctan(x/(2 + x))
 */
  static log1p(x: bigint) {
    // log1p(x) = 2 * arctan(x/(2 + x))
    const xi = new Irrational(x);
    const xpo = new Irrational(x + 2n);
    const a = xi.div(xpo).arctanh();
    a.s *= 2n;
    return a;

    /* const xx = new Irrational(x);
    let sum = xx;
    let d = xx;
    for (let k = 2; k < 100; k++) {
      const s = new Irrational((-1) ** k);
      d = d.mul(xx);
      const n = s.mul(d).div(new Irrational(k));
      const t = sum;
      sum = sum.add(n);
      if (sum.digits() === t.digits()) {
        return sum;
      }
    }
    return sum; */
  }
}


