
export default class Real {
  protected s: bigint = 0n;
  protected e: bigint = 0n;

  constructor(value: bigint | number | string) {
    // tslint:disable-next-line
    if (typeof value === 'bigint') {
      this.e = 0n;
      this.s = value;
      return; 
    }
    
    if (typeof value === 'number') {
      value = '' + value;
    }

    // todo: read exponent
    let str = value.replace(/[._]/g, '');
    const k = value.indexOf('.');
    this.e = BigInt(k < 0 ? 0 : k - str.length);
    this.s = BigInt(str);
  }

  clone() {
    const x = new Real(0n);
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

  cmp(y: Real): number {
    if (this.e !== y.e) return this.e > y.e ? 1 : -1;
    return this.s === y.s ? 0 : this.s > y.s ? 1 : -1;
  }

  add(y: Real): Real {
    const x = this.clone();
    let yd = y.s;
    let xd = x.s;
    if (y.e > x.e) {
      yd = yd * 10n ** (y.e - x.e);
    } else if (y.e < x.e) {
      xd = xd * 10n ** (x.e - y.e);
      x.e = y.e;
    }
    x.s = xd + yd;
    return x;
  }

  minus(y: Real): Real {
    y = y.clone();
    y.s = -1n * y.s;
    return this.add(y);
  }

  mul(y: Real): Real {
    const x = this.clone();
    x.s *= y.s;
    x.e += y.e;
    return x;
  }

  inv() {
    const x = this.clone();
    const N = 20n; // precision
    x.s = 10n ** BigInt(N) / x.s;
    x.e = -x.e - N;
    return x;
  }

  div(y: Real): Real {
    return this.mul(y.inv());
  }

  trunc() {
    return new Real(this.toBigInt());
  }

  fp() {
    return this.minus(this.trunc()).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.minus(ip).isZero()) {
      return ip.minus(new Real(1n));
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
      return ip.add(new Real(1n));
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
    if (this.e === 0n) {
      return this.s.toString();
    }
    return this.s.toString() + 'e' + this.e;
  }

  valueOf(): number {
    return +this.toString();
  }

  private normalize() {
    while ((this.s > 1n || this.s < -1n) && this.s % 10n === 0n) {
      this.s /= 10n;
      this.e += 1n;
    }
    return this;
  }
}
