import Real from './real';
import { parseValue } from './util';

type InputValue = bigint | number | string | Irrational;

/**
 * TODO: sqrt, modulo
 * sin, cos, tan
 * asin, acos, atan
 */

export default class Irrational implements Real<Irrational> {
  static CP = 25;
  static DP = 20;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);
  static TWO = new Irrational(2);

  static E = Irrational.ONE.exp().roundToPrecision(Irrational.CP);
  static LN2 = Irrational.TWO.ln().roundToPrecision(Irrational.CP);
  static LN10 = new Irrational(10).ln().roundToPrecision(Irrational.CP);

  static LOG10E = Irrational.LN10.inv().roundToPrecision(Irrational.CP);

  protected s: bigint = 0n;  // Significand
  protected e: number = 0;   // Exponent

  constructor(value: InputValue) {
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

  isPositive() {
    return this.s > 0;
  }

  isNegitive() {
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
    const u = new Irrational(this.toBigInt());
    return this.sub(u).isZero();
  }

  trunc() {
    return new Irrational(this.toBigInt());
  }

  /**
   * maps tp the frational part of x
   */
  fp() {
    return this.sub(this.trunc()).abs();
  }

  /**
   * maps x to the greatest integer greater than or equal to x
   */
  floor() {
    const ip = this.trunc()
    if (this.isNegitive() && !this.sub(ip).isZero()) {
      return ip.sub(Irrational.ONE);
    }
    return ip;
  }

  /**
   * maps x to the least integer greater than or equal to x
   */
  ceil() {
    const ip = this.trunc();
    if (this.isPositive() && !this.sub(ip).isZero()) {
      return ip.add(Irrational.ONE);
    }
    return ip;
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
    const u = y.toBigInt();
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
    let a = new Irrational(this.s - 1n).log1p().mul(Irrational.LOG10E);
    if (this.e !== 0) {
      a = a.add(new Irrational(this.e));
    }
    return a.roundToPrecision(Irrational.CP);
  }

  /**
   * calculates natural logarithm of x
   * 
   * ln(s*10^e) = ln(s) + e*ln(10);
   *            = log1p(s - 1) + e*ln10
   */
  ln(): Irrational {
    const a = new Irrational(this.s - 1n).log1p();
    if (this.e !== 0) {
      const b = Irrational.LN10.mul(new Irrational(this.e));
      return a.add(b);
    }
    return a.roundToPrecision(Irrational.CP);
  }

  /**
   * calculates natural log of x + 1
   * 
   * identity in terms of the inverse hyperbolic tangent
   * high precision value for small values of x
   * log1p(x) = 2 * arctan(x/(2 + x))
   */
  protected log1p() {
    const a = this.div(this.add(Irrational.TWO)).arctanh();
    a.s *= 2n;
    return a;
  }

  /**
   * calculates inverse hyperbolic tangent of x
   */
  protected arctanh() {
    let n = this.simplify();
    let sum = n;
    let d = 1;
    for (let i = 2; i < 100; i++) {
      d += 2;
      n = n.mul(this).mul(this);
      const t = sum;
      sum = sum.add(n.div(new Irrational(d)));
      if (sum.digits() === t.digits()) {
        return sum;
      }
    }
    return sum.roundToPrecision(Irrational.CP);
  }

  toBigInt() {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  toString(): string {
    this.normalize();
    const x = this.roundToPrecision(Irrational.DP);
    const n = this.isNegitive() ? 2 : 1;
    const rounded = x.s !== this.s;
    let ss = x.s.toString();
    if (ss.length > n) {
      x.e += ss.length - n;
      ss = ss.slice(0, n) + '.' + ss.slice(n);      
    }
    if (x.e === 0) return ss;
    if (rounded) ss += '…';
    const se = x.e > 0 ? '+' + x.e : x.e;
    return ss + 'e' + se;
  }

  valueOf(): number {
    return Number(this.toString().replace('…', ''));
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

    // TODO: Rounding method
    n += x.isNegitive() ? 1 : 0;
    while (x.s.toString().length > n) { 
      x.s /= 10n;
      x.e += 1;
    }
    return x;
  }
}

function sign(value: bigint) {
  if (value > 0n) return 1;
  if (value < 0n) return -1;
  return 0;
}

