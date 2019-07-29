import Real from './real';
import { parseValue } from './util';

export default class Irrational implements Real<Irrational> {
  static CP = 25;
  static DP = 20;

  protected s: bigint = 0n;
  protected e: number = 0;

  constructor(value: bigint | number | string) {
    // tslint:disable-next-line
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
    if (y.e > x.e) {
      yd = yd * BigInt(10 ** (y.e - x.e));
    } else if (y.e < x.e) {
      xd = xd * BigInt(10 ** (x.e - y.e));
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
    const x = this.clone();
    const N = Irrational.CP;
    x.s = 10n ** BigInt(N) / x.s;
    x.e = -x.e - N;
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
      return ip.minus(new Irrational(1n));
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
      return ip.add(new Irrational(1n));
    }
    return ip;
  }

  exp() {
    if (this.isZero()) {
      return new Irrational(1);
    }
    // Not to precision
    return this.expm1().add(new Irrational(1));
  }

  expm1() {
    // Not to precision??
    let n = this.clone();
    let d = 1;
    let s = n;
    for (let i = 2; i < 100; i++) {
      n = n.mul(this);
      d = d * i;
      const t = s;
      s = s.add(n.div(new Irrational(d)));
      if (s.sigFigs() === t.sigFigs()) {
        return s;
      }
    }
    return s;
  }

  pow(y: Irrational) {
    // Not to precision
    const x = this.clone();
    const _y = y.s * BigInt(10 ** y.e);
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

  private sigFigs() {
    const n = this.isNegitive() ? 1 : 0;
    return this.s.toString().slice(0, Irrational.CP + n);
  }

  private roundToPrecision() {
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

  private normalize() {
    this.e = this.e | 0;
    while ((this.s > 1n || this.s < -1n) && this.s % 10n === 0n) {
      this.s /= 10n;
      this.e += 1;
    }
  }
}

function sign(value: bigint) {
  if (value > 0n) return 1;
  if (value < 0n) return -1;
  return 0;
}

