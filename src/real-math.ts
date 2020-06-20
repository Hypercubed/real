import Rational from './rational';
import Irrational from './irrational';
import Real from './real';

import { Dynamo, guard, signature } from '@hypercubed/dynamo';

const dynamo = new Dynamo();

class Defn {
  @guard(BigInt)
  static isBigInt(x: any): boolean {
    // tslint:disable-next-line
    return typeof x === 'bigint';
  }
}

dynamo.add(Defn);
dynamo.add(Real);
dynamo.add(Rational);
dynamo.add(Irrational);

// Returns the absolute value of a number.
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

// Returns the integer part of the number x, removing any fractional digits.
class Trunc {
  name = 'trunc';

  @signature()
  bigint(a: bigint): bigint {
    return a;
  }

  @signature()
  number(a: number): number {
    return Math.trunc(a);
  }

  @signature()
  rational(a: Real): bigint {
    return a.trunc();
  }
}

export const trunc = dynamo.function(Trunc);

// Returns the smallest integer greater than or equal to a number.
class Ceil {
  name = 'ceil';

  @signature()
  bigint(a: bigint): bigint {
    return a;
  }

  @signature()
  number(a: number): number {
    return Math.ceil(a);
  }

  @signature()
  irrational(a: Real): bigint {
    return a.ceil();
  }
}

export const ceil = dynamo.function(Ceil);

// Returns the largest integer less than or equal to a number.
class Floor {
  name = 'floor';

  @signature()
  bigint(a: bigint): bigint {
    return a;
  }

  @signature()
  number(a: number): number {
    return Math.floor(a);
  }

  @signature()
  irrational(a: Real): bigint {
    return a.floor();
  }
}

export const floor = dynamo.function(Floor);

class Add {
  name = 'add';

  @signature()
  number(a: bigint, b:  bigint): bigint {
    return a + b;
  }

  rational(a: bigint | Rational, b: bigint | Rational): Rational;

  @signature()
  rational(a: Rational, b: Rational): Rational {
    return a.add(b);
  }

  irrational(a: number | bigint | Rational | Irrational, b: number | bigint | Rational | Irrational): Irrational;

  @signature()
  irrational(a: Irrational, b: Irrational): Irrational {
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
    return a.sub(b);
  }
}

export const sub = dynamo.function(Sub);

class Mul {
  name = 'mul';

  @signature()
  number(a: bigint, b:  bigint): bigint {
    return a * b;
  }

  rational(a: bigint | Rational, b: bigint | Rational): Rational;

  @signature()
  rational(a: Rational, b: Rational): Rational {
    return a.mul(b);
  }

  irrational(a: number | bigint | Rational | Irrational, b: number | bigint | Rational | Irrational): Irrational;

  @signature()
  irrational(a: Irrational, b: Irrational): Irrational {
    return a.mul(b);
  }
}

export const mul = dynamo.function(Mul);

class Div {
  name = 'div';

  rational(a: bigint | Rational, b: bigint | Rational): Rational;

  @signature()
  rational(a: Rational, b: Rational): Rational {
    return a.div(b);
  }

  irrational(a: number | bigint | Rational | Irrational, b: number | bigint | Rational | Irrational): Irrational;

  @signature()
  irrational(a: Irrational, b: Irrational): Irrational {
    return a.div(b);
  }
}

export const div = dynamo.function(Div);

class Inv {
  name = 'inv';

  rational(a: bigint | Rational): Rational;

  @signature()
  rational(a: Rational): Rational {
    return a.inv();
  }

  irrational(a: number | Irrational): Irrational;

  @signature()
  irrational(a: Irrational): Irrational {
    return a.inv();
  }
}

export const inv = dynamo.function(Inv);

// Returns the natural logarithm (loge, also ln) of a number
class Ln {
  name = 'ln';

  irrational(a: number | bigint | Real): Irrational;

  @signature()
  irrational(a: Irrational): Irrational {
    return a.ln();
  }
}

export const ln = dynamo.function(Ln);