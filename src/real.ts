
export default class Real {
  protected d: bigint = 0n;
  protected e: number = 0;

  constructor(value: bigint | number | string) {
    // tslint:disable-next-line
    if (typeof value === 'bigint') {
      this.e = 0;
      this.d = value;
      return; 
    }
    
    if (typeof value === 'number') {
      value = '' + value;
    }

    let str = value.replace('.', '');
    const k = value.indexOf('.');
    this.e = k < 0 ? 0 : k - str.length;
    this.d = BigInt(str);
  }

  clone() {
    const x = new Real(0n);
    x.d = this.d;
    x.e = this.e;
    return x;
  }

  abs() {
    const x = this.clone();
    if (x.d < 0) x.d = x.d * -1n;
    return x;
  }

  cmp(y: Real): number {
    if (this.e !== y.e) return this.e > y.e ? 1 : -1;
    return this.d === y.d ? 0 : this.d > y.d ? 1 : -1;
  }

  add(y: Real): Real {
    const x = this.clone();
    let yd = y.d;
    let xd = x.d;
    if (y.e > x.e) {
      yd = yd * BigInt(10 ** (y.e - x.e));
    } else if (y.e < x.e) {
      xd = xd * BigInt(10 ** (x.e - y.e));
      x.e = y.e;
    }
    x.d = xd + yd;
    return x;
  }

  minus(y: Real): Real {
    y = y.clone();
    y.d = -1n * y.d;
    return this.add(y);
  }

  mul(y: Real): Real {
    const x = this.clone();
    x.d *= y.d;
    x.e += y.e;
    return x;
  }

  inv() {
    const x = this.clone();
    const N = 14; // precision
    x.d = 10n ** BigInt(N) / x.d;
    x.e = -x.e - N;
    return x;
  }

  div(y: Real): Real {
    return this.mul(y.inv());
  }

  toString(): string {
    if (this.e === 0) {
      return this.d.toString();
    }
    return this.d.toString() + 'e' + this.e;
  }

  valueOf(): number {
    return +this.toString();
  }
}
