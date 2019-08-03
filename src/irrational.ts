import Real from './real';
import { parseValue } from './util';

export default class Irrational implements Real<Irrational> {
  static CP = 25;
  static DP = 20;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);
  static TWO = new Irrational(2);

  protected s: bigint = 0n;  // Significand
  protected e: number = 0;   // Exponent

  constructor(value: bigint | number | string) {
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

  sub(y: Irrational): Irrational {
    y = y.clone();
    y.s = -1n * y.s;
    return this.add(y);
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
    return this.sub(this.trunc()).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.sub(ip).isZero()) {
      return ip.sub(Irrational.ONE);
    }
    return ip;
  }

  /**
   * TODO: ln, exp, pow, sqrt, modulo
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
    // Not to precision
    return new Irrational(this.e + Math.log10(Number(this.s)));
  }

  ln() {
    // Not to precision
    return this.sub(Irrational.ONE).log1p();
  }

  protected log1p() {
    // only works for abs(x) <= 1
    const a = this.div(Irrational.TWO.add(this));
    return Irrational.TWO.mul(a);
  }

  protected arctanh() {
    // only works for abs(x) <= 1
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
    const rounded = x.roundToPrecision();
    const n = x.isNegitive() ? 2 : 1;
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

