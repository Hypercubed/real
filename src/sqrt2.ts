import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';
import { absDiff } from './utils/util';

function calculator(SS: bigint) {
  let p = 15;                                     // precision of initial guess
  let s = 10n**BigInt(p);                         // scale
  let S = SS*s**2n;                               // x^2=SS
  let x = BigInt(Math.floor(Math.SQRT2*Number(s)));   // initial guess for x=sqrt(2)

  // Newton method
  return function(N: number): [bigint, number] {
    const d = N - p;
    if (d > 0) {
      s = 10n**BigInt(d);
      p = N;
      x *= s;
      S *= s**2n;

      let e = 0n;         // S/x
      while (absDiff(x, e) > 1n) {  // x - S/x, same as x^2 - S = 0
        e = S/x
        x = (x + e)/2n;
      }
    }
    // console.log({ p, s, S, x });
    return [x, -p];
  }
}

const calcSQRT = calculator(2n);

export class SQRT2 /* extends Real */ {
  @guard()
  static isSQRT2(x: unknown): x is SQRT2 {
    return x instanceof SQRT2;
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
    return this.toIrrationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toIrrationalApproximation(digits).toExponential(digits);
  }

  toIrrationalApproximation(digits: number) {
    const [n, e] = calcSQRT(digits + 1);
    return Irrational.from(n, e);
  }
}
