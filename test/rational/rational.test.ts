import { Rational } from '../../src/rational';

test('Real is instantiable', () => {
  expect(new Rational(1n) instanceof Rational).toBe(true);
});

test('rationals from bigints', () => {
  // Bigints
  expect(new Rational(1n).valueOf()).toBe(1);
  expect(new Rational(-1n).valueOf()).toBe(-1);
  expect(new Rational(2n).valueOf()).toBe(2);
  expect(new Rational(-2n).valueOf()).toBe(-2);

  expect(new Rational(9007199254740993n).toString()).toBe('9007199254740993');
  expect(new Rational(9007199254740993333n).toString()).toBe('9007199254740993333');

  // Bigints (two)
  expect(new Rational(1n, 1n).valueOf()).toBe(1);
  expect(new Rational(-2n, 2n).valueOf()).toBe(-1);
  expect(new Rational(2n, 2n).valueOf()).toBe(1);
  expect(new Rational(-4n, 2n).valueOf()).toBe(-2);
  expect(new Rational(22n, 7n).valueOf()).toBe(3.142857142857143);

  expect(new Rational(9007199254740900n, 100n).toString()).toBe('90071992547409');
  expect(new Rational(9007199254740993333n, 10n).toString()).toBe('9007199254740993333/10');
});

test('rationals from numbers', () => {
  // numbers (integers)
  expect(new Rational(1).valueOf()).toBe(1);
  expect(new Rational(-1).valueOf()).toBe(-1);
  expect(new Rational(2).valueOf()).toBe(2);
  expect(new Rational(-2).valueOf()).toBe(-2);

  expect(new Rational(355,113).valueOf()).toBe(3.1415929203539825);

  // numbers (floats)
  expect(new Rational(1.5).valueOf()).toBe(1.5);
  expect(new Rational(-1.5).valueOf()).toBe(-1.5);
  expect(new Rational(2.5).valueOf()).toBe(2.5);
  expect(new Rational(-2.5).valueOf()).toBe(-2.5);

  expect(new Rational(3.14159).valueOf()).toBe(3.14159);
  expect(new Rational(-2.71828).valueOf()).toBe(-2.71828);
  expect(new Rational(314.159).valueOf()).toBe(314.159);
  expect(new Rational(-27182.8).valueOf()).toBe(-27182.8);
});

test('rationals from strings', () => {
  // strings (integers)
  expect(new Rational('1').valueOf()).toBe(1);
  expect(new Rational('-1').valueOf()).toBe(-1);
  expect(new Rational('2').valueOf()).toBe(2);
  expect(new Rational('-2').valueOf()).toBe(-2);

  // strings (floats)
  expect(new Rational('1.5').valueOf()).toBe(1.5);
  expect(new Rational('-1.5').valueOf()).toBe(-1.5);
  expect(new Rational('2.5').valueOf()).toBe(2.5);
  expect(new Rational('-2.5').valueOf()).toBe(-2.5);

  expect(new Rational('3.14159').valueOf()).toBe(3.14159);
  expect(new Rational('-2.71828').valueOf()).toBe(-2.71828);
  expect(new Rational('314.159').valueOf()).toBe(314.159);
  expect(new Rational('-27182.8').valueOf()).toBe(-27182.8);

  expect(new Rational('0.000314159').valueOf()).toBe(0.000314159);
  expect(new Rational('-0.0271828').valueOf()).toBe(-0.0271828);

  expect(new Rational('9007199254740993').toString()).toBe('9007199254740993');
  expect(new Rational('9007199254740993333').toString()).toBe('9007199254740993333');
  expect(new Rational('90071992.54740993').toString()).toBe('9007199254740993/100000000');
  expect(new Rational('90071992.54740993333').toString()).toBe('9007199254740993333/100000000000');

  // strings (two floats)
  expect(new Rational('3.14159', '2').valueOf()).toBe(1.570795);
  expect(new Rational('3.14159', '2.5').valueOf()).toBe(1.256636);
  expect(new Rational('314.159e-1', '0.25e2').valueOf()).toBe(1.256636);

  // strings (exp)
  expect(new Rational('9007199254740993e-8').toString()).toBe('9007199254740993/100000000');
  expect(new Rational('9007199254740993333e11').toString()).toBe('900719925474099333300000000000');
});

test('normalize', () => {
  expect(new Rational(1e11, 1e11).toString()).toBe('1');
  expect(new Rational(1e10, 1e11).toString()).toBe('1/10');
  expect(new Rational(1e10, -1e11).toString()).toBe('-1/10');
  expect(new Rational(1e11, 1e10).toString()).toBe('10');
  expect(new Rational(-1e11, -1e10).toString()).toBe('10');
});

test('toFixed', () => {
  expect(new Rational(1, 3).toFixed(10)).toBe('0.3333333333');
  expect(new Rational(-1, 3).toFixed(20)).toBe('-0.33333333333333333333');
  expect(new Rational(1, 3).toFixed(40)).toBe('0.3333333333333333333333333333333333333333');
  expect(new Rational(1, 3).toFixed(80)).toBe(
    '0.33333333333333333333333333333333333333333333333333333333333333333333333333333333'
  );

  expect(new Rational(-1, 5).toFixed(10)).toBe('-0.2000000000');
  expect(new Rational(1, 5).toFixed(20)).toBe('0.20000000000000000000');
  expect(new Rational(-1, 5).toFixed(40)).toBe('-0.2000000000000000000000000000000000000000');
  expect(new Rational(1, 5).toFixed(80)).toBe(
    '0.20000000000000000000000000000000000000000000000000000000000000000000000000000000'
  );

  expect(new Rational(1, 9).toFixed(10)).toBe('0.1111111111');
  expect(new Rational(-1, 9).toFixed(20)).toBe('-0.11111111111111111111');
  expect(new Rational(1, 9).toFixed(40)).toBe('0.1111111111111111111111111111111111111111');
  expect(new Rational(-1, 9).toFixed(80)).toBe(
    '-0.11111111111111111111111111111111111111111111111111111111111111111111111111111111'
  );

  expect(new Rational(5, 1).toFixed(10)).toBe('5.0000000000');
  expect(new Rational(-5, 1).toFixed(20)).toBe('-5.00000000000000000000');
  expect(new Rational(5, 1).toFixed(40)).toBe('5.0000000000000000000000000000000000000000');
  expect(new Rational(-5, 1).toFixed(80)).toBe(
    '-5.00000000000000000000000000000000000000000000000000000000000000000000000000000000'
  );

  expect(new Rational(22, 7).toFixed(10)).toBe('3.1428571428');
  expect(new Rational(-22, 7).toFixed(80)).toBe(
    '-3.14285714285714285714285714285714285714285714285714285714285714285714285714285714'
  );

  expect(new Rational(2n**100n, 1).toFixed(0)).toBe('1267650600228229401496703205376');
  expect(new Rational(-(2n**100n), 1).toFixed(0)).toBe('-1267650600228229401496703205376');
});

test('toExponential', () => {
  expect(new Rational(77.1234).toExponential(2)).toBe('7.71e+1');
  expect(new Rational(-77.1234).toExponential(4)).toBe('-7.7123e+1');
  expect(new Rational(77.1234).toExponential(8)).toBe('7.71234000e+1');
  expect(new Rational(-77.1234).toExponential(80)).toBe(
    '-7.71234000000000000000000000000000000000000000000000000000000000000000000000000000e+1'
  );

  expect(new Rational(1, 5).toExponential(2)).toBe('2.00e-1');
  expect(new Rational(-1, 5).toExponential(4)).toBe('-2.0000e-1');
  expect(new Rational(1, 5).toExponential(8)).toBe('2.00000000e-1');
  expect(new Rational(-1, 5).toExponential(80)).toBe(
    '-2.00000000000000000000000000000000000000000000000000000000000000000000000000000000e-1'
  );

  expect(new Rational(-1, 3).toExponential(2)).toBe('-3.33e-1');
  expect(new Rational(1, 3).toExponential(4)).toBe('3.3333e-1');
  expect(new Rational(-1, 3).toExponential(8)).toBe('-3.33333333e-1');
  expect(new Rational(1, 3).toExponential(80)).toBe(
    '3.33333333333333333333333333333333333333333333333333333333333333333333333333333333e-1'
  );

  expect(new Rational(83371900, 2653810).toExponential(20)).toBe('3.14159265358107777120e+1');
  expect(new Rational(-83371900, 2653810).toExponential(20)).toBe('-3.14159265358107777120e+1');
});
