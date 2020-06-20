import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';

function calcE(N: number) {
  const n = N + 20;
  const S = 10n ** BigInt(n);
  let k = 0n;      // index
  let x = S;      // each term
  let e = x;      // sum of terms
  while (x > 0) {
    k++;
    x = x / k;           // 1/k!
    e += x;
  }
  return new Irrational(e, -n);
}

export class E /* extends Real */ {
  @guard()
  static isE(x: unknown): x is E {
    return x instanceof E;
  }

  clone(): E {
    return this;
  }

  abs() {
    return this;
  }

  sgn() {
    return 1;
  }

  isPositive() {
    return true;
  }

  isNegitive() {
    return false;
  }

  isZero() {
    return false;
  }

  trunc(): bigint {
    return 2n;
  }

  floor(): bigint {
    return 2n;
  }

  ceil(): bigint {
    return 3n;
  }

  toString(): string {
    return 'E';
  }

  valueOf() {
    return Math.E;
  }

  toFixed(digits: number) {
    return this.toRationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toRationalApproximation(digits).toExponential(digits);
  }

  // TODO: cache this
  private toRationalApproximation(digits: number) {
    return calcE(digits);
  }
}
