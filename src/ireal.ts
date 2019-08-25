export default abstract class IReal<T = any> {
  abstract clone(): T;
  abstract sgn(): number;
  abstract abs(): T;
  abstract isZero(): boolean;
  abstract isPositive(): boolean;
  abstract isNegitive(): boolean;
  abstract cmp(x: T): number;

  abstract add(x: T): T;
  abstract sub(x: T): T;
  abstract mul(x: T): T;
  abstract inv(): T;
  abstract div(x: T): T;

  abstract trunc(): T;
  abstract fp(): T;
  abstract floor(): T;
  abstract ceil(): T;

  abstract toString(): string;
  abstract valueOf(): number;
}