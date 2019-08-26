# Real

`Real` provides an object with properties and methods for mathematical constants and functions (similar to `Math`) that works with `Number` and `BigInt` as well as two addional classes (`Rational` and `Irrational`).

### Usage

```ts
import * as RealMath from '@hypercubed/real';
```

`RealMath` provides several math functions that work with `Number` and `BigInt`.  These two types, however, are not sufficient in many cases.  `@hypercuged/real` provides two addition classes that represent broader numeric types:

- `Rational` - any number that can be expressed as the quotient or fraction of two integers (`p/q`)
- `Irrational` - an approximation of a number expressed in scientific notation (`m x 10 ^ n`)

When using the `RealMath` functions values are convert, as necessary, for the given function.  Implict conversionsd are as follows:

- `BigInt` -> `Rational`
- `Number` -> `Irrational`
- `Rational` -> `Irrational`

For example, when using the `div` method, dividing two `BigInt` values would result in loss of precision... therefore, before the division operation `BigInt` values are converted to `Rational` values.  Similarly, `Number` values are converted to `Irrational` values.  If the division operation includes any `Irrational` values, `Rational` values are converted to `Irrational` values.

See this examples:

```ts
import * as RealMath from '@hypercubed/real';

RealMath.div(1n, 3n),toString(); // 1/3`
RealMath.div(1n, 3),toString();  // 3.3333333333333333333e-1

RealMath.div(1n, new Rational(3n)),toString();       // 1/3`
RealMath.div(1n, new Irrational(3n)),toString();     // 3.3333333333333333333e-1
```

### Methods

- `abs` - Returns the absolute value of a number.
- `trunc` - Returns the integer part of the number x, removing any fractional digits.
- `ceil` - Returns the smallest integer greater than or equal to a number.
- `floor` - Returns the largest integer less than or equal to a number.
- `add` - adds two values
- `sub` - subtracts two values
- `mul` - multiplies two values
- `div` - divies two values
- `inv` - inverts a value
- `ln` - Returns the natural logarithm (log<sub>e</sub>) of a number

## License

This project is licensed under the MIT License