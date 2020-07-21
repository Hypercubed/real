import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';

function calculator() {
  const NN = 2;
  const PP = 10n**BigInt(NN);

  let n = 15-NN;
  let pi = BigInt(Math.PI*10**15);

  return function calcPi(N: number): [bigint, number] {
    if (N > n) {
      n = N;
      const S = 10n ** BigInt(n + NN);
      let i = 1n;
      let x = 3n * S;
      pi = x;
      while (x > 0) {
        x = x * i / (i + 1n) / 4n;
        pi += x / (i + 2n);
        i += 2n;
      }      
    }
    return [pi/PP, -n];
  }
}

const calcPi = calculator();

export class PI /* extends Real */ {
  @guard()
  static isPI(x: unknown): x is PI {
    return x instanceof PI;
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
    return 3n;
  }

  floor(): bigint {
    return 3n;
  }

  ceil(): bigint {
    return 4n;
  }

  toString(): string {
    return 'PI';
  }

  valueOf() {
    return Math.PI;
  }

  toFixed(digits: number) {
    return this.toIrrationalApproximation(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toIrrationalApproximation(digits).toExponential(digits);
  }

  toIrrationalApproximation(digits: number) {
    const [n, e] = calcPi(digits + 1);
    return Irrational.from(n, e).withPrecision(digits + 1);
  }
}
