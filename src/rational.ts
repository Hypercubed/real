import Real from './real';
import { parseValue } from './util';

import { guard, conversion } from '@hypercubed/dynamo';

export default class Rational extends Real {
  protected n: bigint = 0n;
  protected d: bigint = 1n;

  @guard()
  static isRational(x: unknown): x is Rational {
    return x instanceof Rational;
  }

  @conversion()
  static fromNumber(x: bigint): Rational {
    return new Rational(x);
  }

  constructor(n: bigint | number | string, d?: bigint | number | string | null) {
    super();
    const [ns, ne] = parseValue(n);
    const [ds, de] = (d === null || typeof d === 'undefined') ? [1n, 0] : parseValue(d);

    const e = ne - de;

    this.n = ns * (e > 1 ? 10n ** BigInt(e) : 1n);
    this.d = ds * (e < 1 ? 10n ** BigInt(-e) : 1n);

    if (this.d === 0n) {
      throw new Error('DivisionByZero');
    }

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
    const left = this.n * y.d;
    const right = y.n * this.d;
    return left === right ? 0 : left > right ? 1 : -1;
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

  sub(y: Rational): Rational {
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
    return this.sub(this.trunc()).abs();
  }

  floor() {
    const ip = this.trunc();
    if (this.isNegitive() && !this.sub(ip).isZero()) {
      return ip.sub(new Rational(1n));
    }
    return ip;
  }

  ceil() {
    const ip = this.trunc();
    if (this.isPositive() && !this.sub(ip).isZero()) {
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

  toArray() {
    return [this.n, this.d];
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

/* function gcd(a: bigint, b: bigint): bigint {
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
}; */

function gcd(a: bigint, b: bigint): bigint {
  return b ? gcd(b, a % b) : (a > 0n ? a : -a);
}