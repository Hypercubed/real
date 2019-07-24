
export default class Real {
  protected s: bigint = 0n;
  protected e: number = 0;

  constructor(value: bigint | number | string) {
    // tslint:disable-next-line
    if (typeof value === 'bigint') {
      this.e = 0;
      this.s = value;
      return; 
    }
    
    if (typeof value === 'number') {
      value = '' + value;
    }

    // todo: read exponent
    let str = value.replace(/[._]/g, '');
    const k = value.indexOf('.');
    this.e = k < 0 ? 0 : k - str.length;
    this.s = BigInt(str);
  }

  clone() {
    const x = new Real(0n);
    x.s = this.s;
    x.e = this.e;
    return x;
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
      yd = yd * BigInt(10 ** (y.e - x.e));
    } else if (y.e < x.e) {
      xd = xd * BigInt(10 ** (x.e - y.e));
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
    const N = 20; // precision
    x.s = 10n ** BigInt(N) / x.s;
    x.e = -x.e - N;
    // TODO: normalize
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
    if (this.e === 0) {
      return this.s.toString();
    }
    return this.s.toString() + 'e' + this.e;
  }

  valueOf(): number {
    return +this.toString();
  }
}
