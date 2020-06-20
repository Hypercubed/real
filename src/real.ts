import { guard } from '@hypercubed/dynamo';

export default abstract class Real {
  @guard(Real)
  static isReal(x: any): x is Real {
    return x instanceof Real;
  }

  abstract sgn(): number;
  abstract abs(): Real;
  abstract isZero(): boolean;
  abstract isPositive(): boolean;
  abstract isNegitive(): boolean;
  abstract cmp(y: any): number;
  abstract neg(): Real;

  abstract add(y: Real): Real;
  abstract sub(y: Real): Real;

  abstract mul(y: Real): Real;
  abstract inv(): Real;
  abstract div(y: Real): Real;

  abstract fp(): Real;

  abstract trunc(): bigint;
  abstract floor(): bigint;
  abstract ceil(): bigint;

  abstract toString(): string;
  abstract valueOf(): number;
}