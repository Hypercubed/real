import Real from './real';
import { parseValue } from './util';

export default class Irrational implements Real<Irrational> {
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
    return this.s < 0 ? -1 : 1;
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
    const N = 20; // precision
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

  toBigInt() {
    if (this.e < 0) {
      return this.s / 10n ** BigInt(-this.e);
    }
    return this.s * 10n ** BigInt(this.e);
  }

  toString(): string {
    this.normalize();
    if (this.e === 0) {
      return this.s.toString();
    }
    return this.s.toString() + 'e' + this.e;
  }

  valueOf(): number {
    return +this.toString();
  }

  private normalize() {
    this.e = this.e | 0;
    while ((this.s > 1n || this.s < -1n) && this.s % 10n === 0n) {
      this.s /= 10n;
      this.e += 1;
    }
    return this;
  }
}
