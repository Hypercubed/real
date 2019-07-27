import Real from './real';

function parseValue(value: bigint | number | string | null | undefined): [bigint, number] {
  if (value === null || value === undefined) {
    return [0n, 0];
  }

  // tslint:disable-next-line
  if (typeof value === 'bigint') {
    return [value, 0];
  }

  if (typeof value === 'number') {
    value = '' + value;
  }

  const s = value.replace(/[._]/g, '');
  const n = BigInt(value.replace(/[._]/g, ''));
  const k = value.indexOf('.');

  if (k === -1) {
    return [n, 0];
  }

  return [n, k < 0 ? 0 : k - s.length];
}

export default class Rational implements Real<Rational> {
  protected n: bigint = 0n;
  protected d: bigint = 1n;

  constructor(n: bigint | number | string, d?: bigint | number | string) {
    const [ns, ne] = parseValue(n);
    const [ds, de] = (d === null || typeof d === 'undefined') ? [1n, 0] : parseValue(d);

    const e = ne - de;

    this.n = ns * (e > 1 ? 10n ** BigInt(e) : 1n);
    this.d = ds * (e < 1 ? 10n ** BigInt(-e) : 1n);

    this.normalize();
  }

  clone() {
    const x = new Rational(this.n, this.d);
    return x;
  }

  sgn() {
    const sn = this.n < 0 ? -1 : 1;
    const sd = this.d < 0 ? -1 : 1;
    return sn * sd;
  }

  isPositive() {
    const sn = this.n > 0;
    const sd = this.d > 0;
    return (sn && sd) || (!sn && !sd);
  }

  isNegitive() {
    const sn = this.n < 0;
    const sd = this.d < 0;
    return (sn && sd) || (!sn && !sd);
  }

  isZero() {
    const sn = this.n === 0n;
    const sd = this.d === 0n;
    return sn && sd;
  }

  cmp(y: Rational): number {
    // TBD
    throw new Error('TBD');
  }

  abs() {
    const n = this.n < 0 ? -1n * this.n : this.n;
    const d = this.d < 0 ? -1n * this.d : this.d;
    return new Rational(n, d);
  }

  add(y: Rational): Rational {
    const n = this.n * y.d + y.n * this.d;
    const d = this.d * y.d;
    return new Rational(n, d);
  }

  minus(y: Rational): Rational {
    y = y.clone();
    y.n = -1n * y.n;
    return this.add(y);
  }

  mul(y: Rational): Rational {
    const n = this.n * y.n;
    const d = this.d * y.d;
    return new Rational(n, d);
  }

  inv() {
    return new Rational(this.d, this.n);
  }

  div(y: Rational): Rational {
    const n = this.n * y.d;
    const d = y.n * this.d;
    return new Rational(n, d);
  }

  trunc() {
    return new Rational(this.toBigInt());
  }

  fp() {
    return this.minus(this.trunc()).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.minus(ip).isZero()) {
      return ip.minus(new Rational(1n));
    }
    return ip;
  }

  ceil() {
    const ip = this.trunc();
    if (this.isPositive() && !this.minus(ip).isZero()) {
      return ip.add(new Rational(1n));
    }
    return ip;
  }

  toString(): string {
    // this.normalize();
    if (this.d === 1n) {
      return this.n.toString();
    }
    return this.n.toString() + '/' + this.d.toString();
  }

  valueOf() {        
    return Number(this.n) / Number(this.d);
  }

  toBigInt() {
    return this.n / this.d;
  }

  private normalize() {
    const _gcd = gcd(this.n, this.d);
    if (_gcd !== 0n && _gcd !== 1n) {
      this.n /= _gcd;
      this.d /= _gcd;      
    }
    if (this.d < 0n) {
      this.n *= -1n;
      this.d *= -1n;
    }
    return this;
  }
}

function gcd(a: bigint, b: bigint): bigint {
  if (a === 0n) return b;
  if (b === 0n) return a;
  if (a === b) return a;

  // remove power 10 divisors
  let sa = 0n;
  while (!(a % 10n)) {
    sa++;
    a /= 10n;
  }
  let sb = 0n;
  while (!(b % 10n)) {
    sb++
    b /= 10n
  };

  const p = sa < sb ? sa : sb;
  return 10n ** p;
};