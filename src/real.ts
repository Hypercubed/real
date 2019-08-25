import Rational from './rational';
import Irrational from './irrational';
import Real from './ireal';

import { Dynamo, guard, signature } from '@hypercubed/dynamo';

const dynamo = new Dynamo();

class Defn {
  @guard(BigInt)
  static isBigInt(x: any): boolean {
    // tslint:disable-next-line:valid-typeof
    return typeof x === 'bigint';
  }

  @guard(Real)
  static isReal(x: any): x is Real {
    return x instanceof Rational || x instanceof Irrational;
  }
}

dynamo.add(Defn);
dynamo.add(Rational);
dynamo.add(Irrational);

class Abs {
  name = 'abs';

  @signature()
  number(a: number): number {
    return Math.abs(a);
  }

  @signature()
  bigint(a: bigint): bigint {
    return a < 0n ? -a : a;
  }

  @signature()
  real(a: Real): Real {
    return a.abs();
  }
}

export const abs = dynamo.function(Abs);

class Ceil {
  name = 'ceil';

  @signature()
  number(a: number): number {
    return Math.ceil(a);
  }

  @signature()
  rational(a: Real): Real {
    return a.ceil();
  }
}

export const ceil = dynamo.function(Ceil);

class Add {
  name = 'add';

  @signature()
  number(a: bigint, b:  bigint): bigint {
    return a + b;
  }

  rational(a: number | bigint | Rational, b: number | bigint | Rational): Rational;

  @signature(Rational, Rational)
  rational(a: any, b: any): Rational {
    return a.add(b);
  }

  irrational(a: number | bigint | Rational | Irrational, b: number | bigint | Rational | Irrational): Irrational;

  @signature(Irrational, Irrational)
  irrational(a: any, b: any): Irrational {
    return a.add(b);
  }
}

export const add = dynamo.function(Add);

class Sub {
  name = 'sub';

  @signature()
  number(a: bigint, b:  bigint): bigint {
    return a - b;
  }

  rational(a: number | bigint | Rational, b: number | bigint | Rational): Rational;

  @signature(Rational, Rational)
  rational(a: any, b: any): Rational {
    return a.sub(b);
  }

  irrational(a: number | bigint | Rational | Irrational, b: number | bigint | Rational | Irrational): Irrational;

  @signature(Irrational, Irrational)
  irrational(a: any, b: any): Irrational {
    return a.add(b);
  }
}

export const sub = dynamo.function(Sub);

class Ln {
  name = 'ln';

  @signature()
  number(a: number): number {
    return Math.sin(a);
  }

  irrational(a: Real): Irrational;

  @signature()
  irrational(a: Irrational): Irrational {
    return a.ln();
  }
}

export const ln = dynamo.function(Ln);