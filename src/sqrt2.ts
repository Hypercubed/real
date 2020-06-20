import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';
import { absDiff } from './util';

// Babylonian method
// https://en.wikipedia.org/wiki/Square_root_of_2#Computation_algorithms
function calcSQRT(N: number) {
  const n = N + 1;
  const d = 10n ** BigInt(n);  // scale
  const S = d*d*2n;   // S=2n for sqrt(2)

  let x = d*99n/70n;  // initial guess for sqrt(2)
  let e = 0n;         // S/x

  while (absDiff(x, e = S/x) > 1n) {  // same as x^2 - S = 0
    x = (x + e)/2n;
  }

  return new Irrational(x, -n);
}

export class SQRT2 /* extends Real */ {
  @guard()
  static isSQRT2(x: unknown): x is SQRT2 {
    return x instanceof SQRT2;
  }

  clone(): SQRT2 {
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
    return 1n;
  }

  floor(): bigint {
    return 1n;
  }

  ceil(): bigint {
    return 2n;
  }

  toString(): string {
    return 'SQRT2';
  }

  valueOf() {
    return Math.SQRT2;
  }

  toFixed(digits: number) {
    return this.toRationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toRationalApproximation(digits).toExponential(digits);
  }

  // TODO: cache this
  private toRationalApproximation(digits: number) {
    return calcSQRT(digits);
  }
}
