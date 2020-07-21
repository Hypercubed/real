import { guard } from '@hypercubed/dynamo';
import { Rational, Irrational } from '.';

function calculator() {
  let n0 = 2n;
  let d0 = 1n;

  let n1 = 3n;
  let d1 = 1n;

  let n: bigint;
  let d = 1n;
  let x: bigint;

  let i = -1n;
  
  // continued fractions
  return function(N: number | bigint) {
    const S = 10n**BigInt(N);
    while (S > d) {
      x = ++i % 3n ? 1n : 2n*i/3n + 2n;
      n = x*n1 + n0;
      d = x*d1 + d0;

      n0 = n1;
      n1 = n;
      d0 = d1;
      d1 = d;
    }

    return [ n, d ];
  }
}

const calcE = calculator();

export class E /* extends Real */ {
  @guard()
  static isE(x: unknown): x is E {
    return x instanceof E;
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
    return this.toIrrationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toIrrationalApproximation(digits).toExponential(digits);
  }

  toRationalApproximation(digits: number) {
    const [n, d] = calcE(digits);
    return Rational.from(n, d);
  }

  toIrrationalApproximation(digits: number) {
    const [n, d] = calcE(digits);
    return Irrational.from(n).div(Irrational.from(d));
  }
}
