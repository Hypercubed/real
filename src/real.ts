export default interface Real<T> {
  clone(): T;
  sgn(): number;
  abs(): T;
  isZero(): boolean;
  isPositive(): boolean;
  isNegitive(): boolean;
  cmp(x: T): number;

  add(x: T): T;
  sub(x: T): T;
  mul(x: T): T;
  inv(): T;
  div(x: T): T;

  trunc(): T;
  fp(): T;
  floor(): T;
  ceil(): T;

  toString(): string;
  valueOf(): number;
}