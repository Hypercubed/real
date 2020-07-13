import lazyAss from 'lazy-ass';
import { guard, conversion } from '@hypercubed/dynamo';

import Real from './real';
import { ParseValueInput, parseValue, zeroPadRight, gcd } from './utils/util';

export class Rational extends Real {
  static ONE = Rational.from(1n, 1n);

  protected n: bigint = 0n;
  protected d: bigint = 1n;

  @guard()
  static isRational(x: unknown): x is Rational {
    return x instanceof Rational;
  }

  @conversion()
  static fromNumber(x: bigint): Rational {
    return Rational.from(x);
  }

  static from(n: ParseValueInput | Rational, d?: ParseValueInput) {
    if (n instanceof Rational) {
      return n;
    }

    const [ns, ne] = parseValue(n);
    const [ds, de] = (d === null || typeof d === 'undefined') ? [1n, 0] : parseValue(d);

    const e = ne - de;

    const nn = ns * (e > 1 ? 10n ** BigInt(e) : 1n);
    const dd = ds * (e < 1 ? 10n ** BigInt(-e) : 1n);

    return new Rational({
      n: nn,
      d: dd
    });
  }

  constructor(n: bigint | number | string | object | Rational, d?: bigint | number | string | null) {
    super();

    if (n instanceof Rational) {
      return n;
    }

    if (typeof n === 'object') {
      Object.assign(this, n);
    } else {
      const [ns, ne] = parseValue(n);
      const [ds, de] = (d === null || typeof d === 'undefined') ? [1n, 0] : parseValue(d);

      const e = ne - de;

      this.n = ns * (e > 1 ? 10n ** BigInt(e) : 1n);
      this.d = ds * (e < 1 ? 10n ** BigInt(-e) : 1n);      
    }

    lazyAss(
      this.d !== 0n,
      `DivisionByZero`
    );

    Object.freeze(this);
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
    return (sn && !sd) || (!sn && sd);
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

  abs(): Rational {
    const n = this.n < 0 ? -1n * this.n : this.n;
    const d = this.d < 0 ? -1n * this.d : this.d;
    return Rational.from(n, d);
  }

  add(y: Rational): Rational {
    const n = this.n * y.d + y.n * this.d;
    const d = this.d * y.d;
    return Rational.from(n, d);
  }

  sub(y: Rational): Rational {
    return this.add(y.neg());
  }

  neg(): Rational {
    const n = -1n * this.n;
    const d = this.d;
    return Rational.from(n, d);
  }

  mul(y: Rational): Rational {
    const n = this.n * y.n;
    const d = this.d * y.d;
    return Rational.from(n, d);
  }

  inv() {
    return Rational.from(this.d, this.n);
  }

  div(y: Rational): Rational {
    return this.mul(y.inv());
  }

  trunc(): Rational {
    return Rational.from(this.n / this.d, 1n);
  }

  ip(): bigint {
    const t = this.n / this.d;
    if (t === 0n && this.isNegitive()) {
      return -0n;
    }
    return this.n / this.d;
  }

  floor() {
    const trunc = this.trunc();
    const rm = this.n % this.d;
    if (this.isNegitive() && rm !== 0n) {
      return trunc.sub(Rational.ONE);
    }
    return trunc;
  }

  ceil() {
    const trunc = this.trunc();
    const rm = this.n % this.d;
    if (this.isPositive() && rm !== 0n) {
      return trunc.add(Rational.ONE);
    }
    return trunc;
  }

  fp() {
    const n = this.n - this.ip() * this.d;
    const d = this.d;

    return Rational.from(n, d).abs();
  }

  toString(): string {
    const x = this.normalized();
    if (x.d === 1n) {
      return x.n.toString();
    }
    return x.n.toString() + '/' + x.d.toString();
  }

  valueOf() {
    return Number(this.n) / Number(this.d);
  }

  toArray() {
    return [this.n, this.d];
  }

  toFixed(digits: number): string {
    let ip = this.trunc().toString();
    if (digits < 1) {
      return ip.toString();
    }
    if (ip === '0' && this.isNegitive()) {
      ip = '-0';
    }
    const f = 10n**BigInt(digits);
    const fp = this.fp();
    const fp2 = zeroPadRight((fp.n*f/fp.d).toString(), digits);
    return `${ip}.${fp2}`;
  }

  toExponential(fractionDigits: number) {
    const n = this.isNegitive() ? 2 : 1;
    const f = 10n**BigInt(fractionDigits + 1);
    const s = (this.n*f/this.d).toString();
    let ip = s.slice(0, n);
    const fp = s.slice(n);
    const e = fp.length - fractionDigits - 1;
    return `${ip}.${zeroPadRight(fp, fractionDigits)}e${e >= 0 ? ('+' + e) : e}`;
  }

  private normalized() {
    let n = this.n;
    let d = this.d;
    const _gcd = gcd(n, d);

    if (_gcd !== 0n && _gcd !== 1n) {
      n /= _gcd;
      d /= _gcd;      
    }
    if (this.d < 0n) {
      n *= -1n;
      d *= -1n;
    }
    return Rational.from(n, d);
  }
}
