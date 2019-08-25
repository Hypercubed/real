import Real from './real';
import { parseValue } from './util';
import Rational from './rational';

import { guard, conversion } from '@hypercubed/dynamo';

export default class Irrational extends Real {
  static CP = 25;
  static DP = 20;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);
  static TWO = new Irrational(2);

  static E = Irrational.ONE.exp();
  static LN2 = Irrational.TWO.ln();
  static LN10 = new Irrational(10).ln();
  static LOG10E = Irrational.E.log10();

  static INVLN10 = Irrational.LN10.inv();

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

  constructor(value: bigint | number | string) {
    super();
    [this.s, this.e] = parseValue(value);
  }

  clone() {
    const x = new Irrational(0n);
    x.s = this.s;
    x.e = this.e;
    return x;
  }

  sgn() {
    return sign(this.s);
  }

  abs() {
    const x = this.clone();
    if (x.s < 0) x.s = x.s * -1n;
    return x;
  }

  isZero() {
    return this.s === 0n;
  }

  isPositive() {
    return this.s > 0;
  }

  isNegitive() {
    return this.s < 0;
  }

  cmp(y: Irrational): number {
    const d = this.sub(y);
    if (d.isZero()) return 0;
    return d.isPositive() ? 1 : -1;
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

  neg(): Irrational {
    const x = this.clone();
    x.s = -1n * x.s;
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

  trunc() {
    return new Irrational(this.toBigInt());
  }

  fp() {
    const t = -this.toBigInt();
    return this.add(new Irrational(t)).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.sub(ip).isZero()) {
      return ip.sub(Irrational.ONE);
    }
    return ip;
  }

  /**
   * TODO: pow, sqrt, modulo
   * sin, cos, tan
   * asin, acos, atan
   */

  ceil() {
    const ip = this.trunc();
    if (this.isPositive() && !this.sub(ip).isZero()) {
      return ip.add(Irrational.ONE);
    }
    return ip;
  }

  exp() {
    if (this.isZero()) {
      return new Irrational(1);
    }
    return this.expm1().add(Irrational.ONE);
  }

  /**
   * calculates e^x - 1 using Taylor series
   */
  protected expm1() {
    let n = this.clone();
    let d = 1n;
    let s = n;
    for (let i = 2n; i < 100n; i++) {
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

  pow(y: Irrational) {
    return y.mul(this.ln()).exp();
  }

  log10() {
    return this.ln().div(Irrational.LN10)
  }

  ln() {
    return this.sub(Irrational.ONE).log1p();
  }

  protected log1p() {
    // identity in terms of the inverse hyperbolic tangent
    // high precision value for small values of x
    const a = this.div(Irrational.TWO.add(this)).arctanh();
    return Irrational.TWO.mul(a);
  }

  protected arctanh() {
    let n = this.clone();
    let sum = n;
    let d = 1n;
    for (let i = 2n; i < 100n; i++) {
      d += 2n;
      n = n.mul(this).mul(this);
      const t = sum;
      sum = sum.add(n.div(new Irrational(d)));
      if (sum.digits() === t.digits()) {
        return sum;
      }
    }
    return sum;
  }

  toBigInt() {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  toString(): string {
    const x = this.clone();
    x.roundToPrecision();
    const n = x.isNegitive() ? 2 : 1;
    let ss = x.s.toString();
    x.e += ss.length - n;
    ss = ss.slice(0, n) + '.' + ss.slice(n);   
    while (ss.length < Irrational.DP + n) {
      ss += '0';
    }
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

  protected roundToPrecision() {
    if (this.s === 0n) this.e = 0;
    this.e = this.e | 0;
    // TODO: Rounding method
    const n = this.isNegitive() ? 1 : 0;
    const rounded = this.s.toString().length - n > Irrational.DP;
    while (this.s.toString().length - n > Irrational.DP) { 
      this.s /= 10n;
      this.e += 1;
    }
    return rounded;
  }
}

function sign(value: bigint) {
  if (value > 0n) return 1;
  if (value < 0n) return -1;
  return 0;
}

