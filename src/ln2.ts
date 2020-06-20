import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';

function calcLN2(N: number) {
  const e = N + 5;
  const S = 10n ** BigInt(e);
  let k = 1n;      // index
  let x = S;       // each term
  let ln = 0n;      // sum of terms
  while (x > 0) {
    x = S / k / 2n**k;           // 1/k
    ln += x;
    k++;
  }
  return new Irrational(ln, -e);
}

export class LN2 /* extends Real */ {
  @guard()
  static isLN2(x: unknown): x is LN2 {
    return x instanceof LN2;
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
    return 0n;
  }

  floor(): bigint {
    return 0n;
  }

  ceil(): bigint {
    return 1n;
  }

  toString(): string {
    return 'LN2';
  }

  valueOf() {
    return Math.LN2;
  }

  toFixed(digits: number) {
    return this.toRationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toRationalApproximation(digits).toExponential(digits);
  }

  // TODO: cache this
  private toRationalApproximation(digits: number) {
    return calcLN2(digits);
  }
}
