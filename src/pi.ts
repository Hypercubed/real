import { guard } from '@hypercubed/dynamo';

import { Irrational } from './irrational';

// from http://ajennings.net/blog/a-million-digits-of-pi-in-9-lines-of-javascript.html
// series expansion of the arcsine function
// https://loresayer.com/2016/03/14/pi-infinite-sum-approximation/
// http://www.geom.uiuc.edu/~huberty/math5337/groupe/expresspi.html
function calcPi(N: number) {
  const e = N + 20;
  const S = 10n ** BigInt(e);
  let i = 1n;
  let x = 3n * S;
  let pi = x;
  while (x > 0) {
    x = x * i / (i + 1n) / 4n;
    pi += x / (i + 2n);
    i += 2n;
  }
  return new Irrational(pi, -e);
}

export class PI /* extends Real */ {
  @guard()
  static isPI(x: unknown): x is PI {
    return x instanceof PI;
  }

  clone(): PI {
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
    return this.toIrrational(digits).toFixed(digits);
  }

  toExponential(digits: number) {
    return this.toIrrational(digits).toExponential(digits);
  }

  // TODO: cache this
  private toIrrational(digits: number) {
    return calcPi(digits);
  }
}
