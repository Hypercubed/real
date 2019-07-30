import Real from './real';
import { parseValue } from './util';

export default class Irrational implements Real<Irrational> {
  static CP = 25;
  static DP = 20;

  static ZERO = new Irrational(0);
  static ONE = new Irrational(1);

  protected s: bigint = 0n;
  protected e: number = 0;

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
    if (this.e !== y.e) return this.e > y.e ? 1 : -1;
    return this.s === y.s ? 0 : this.s > y.s ? 1 : -1;
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

  minus(y: Irrational): Irrational {
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
    // TODO: Better
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
    return this.minus(this.trunc()).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.minus(ip).isZero()) {
      return ip.minus(Irrational.ONE);
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
    if (this.isPositive() && !this.minus(ip).isZero()) {
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
    // Not to precision
    const x = this.clone();
    const _y = y.s * 10n ** BigInt(y.e);
    x.s = this.s ** _y;
    x.e = this.e * Number(_y);
  }

  log10() {
    // Not to precision
    return new Irrational(this.e + Math.log10(Number(this.s)));
  }

  ln() {
    // Not to precision
    return new Irrational(this.e * Math.log(10) + Math.log(Number(this.s)));
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

  private sigfigs() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().length - n;
  }

  private digits() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().slice(0, Irrational.CP + n);
  }

  private roundToPrecision() {
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

