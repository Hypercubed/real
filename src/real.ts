import { guard } from '@hypercubed/dynamo';

export default abstract class Real {
  @guard(Real)
  static isReal(x: any): x is Real {
    return x instanceof Real;
  }

  abstract clone(): Real;
  abstract sgn(): number;
  abstract abs(): Real;
  abstract isZero(): boolean;
  abstract isPositive(): boolean;
  abstract isNegitive(): boolean;
  abstract cmp(x: Real): number;

  abstract add(x: Real): Real;
  abstract sub(x: Real): Real;
  abstract mul(x: Real): Real;
  abstract inv(): Real;
  abstract div(x: Real): Real;

  abstract trunc(): Real;
  abstract fp(): Real;
  abstract floor(): Real;
  abstract ceil(): Real;

  abstract toString(): string;
  abstract valueOf(): number;
}