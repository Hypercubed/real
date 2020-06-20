import test from 'ava';
import { Rational } from '../../src/rational';

test('Real is instantiable', t => {
  t.true(new Rational(1n) instanceof Rational);
});

test('rationals from bigints', t => {
  // Bigints
  t.is(new Rational(1n).valueOf(), 1);
  t.is(new Rational(-1n).valueOf(), -1);
  t.is(new Rational(2n).valueOf(), 2);
  t.is(new Rational(-2n).valueOf(), -2);

  t.is(new Rational(9007199254740993n).toString(), '9007199254740993');
  t.is(new Rational(9007199254740993333n).toString(), '9007199254740993333');

  // Bigints (two)
  t.is(new Rational(1n, 1n).valueOf(), 1);
  t.is(new Rational(-2n, 2n).valueOf(), -1);
  t.is(new Rational(2n, 2n).valueOf(), 1);
  t.is(new Rational(-4n, 2n).valueOf(), -2);
  t.is(new Rational(22n, 7n).valueOf(), 3.142857142857143);

  t.is(new Rational(9007199254740900n, 100n).toString(), '90071992547409');
  t.is(new Rational(9007199254740993333n, 10n).toString(), '9007199254740993333/10');
});

test('rationals from numbers', t => {
  // numbers (integers)
  t.is(new Rational(1).valueOf(), 1);
  t.is(new Rational(-1).valueOf(), -1);
  t.is(new Rational(2).valueOf(), 2);
  t.is(new Rational(-2).valueOf(), -2);

  t.is(new Rational(355,113).valueOf(), 3.1415929203539825);

  // numbers (floats)
  t.is(new Rational(1.5).valueOf(), 1.5);
  t.is(new Rational(-1.5).valueOf(), -1.5);
  t.is(new Rational(2.5).valueOf(), 2.5);
  t.is(new Rational(-2.5).valueOf(), -2.5);

  t.is(new Rational(3.14159).valueOf(), 3.14159);
  t.is(new Rational(-2.71828).valueOf(), -2.71828);
  t.is(new Rational(314.159).valueOf(), 314.159);
  t.is(new Rational(-27182.8).valueOf(), -27182.8);
});

test('rationals from strings', t => {
  // strings (integers)
  t.is(new Rational('1').valueOf(), 1);
  t.is(new Rational('-1').valueOf(), -1);
  t.is(new Rational('2').valueOf(), 2);
  t.is(new Rational('-2').valueOf(), -2);

  // strings (floats)
  t.is(new Rational('1.5').valueOf(), 1.5);
  t.is(new Rational('-1.5').valueOf(), -1.5);
  t.is(new Rational('2.5').valueOf(), 2.5);
  t.is(new Rational('-2.5').valueOf(), -2.5);

  t.is(new Rational('3.14159').valueOf(), 3.14159);
  t.is(new Rational('-2.71828').valueOf(), -2.71828);
  t.is(new Rational('314.159').valueOf(), 314.159);
  t.is(new Rational('-27182.8').valueOf(), -27182.8);

  t.is(new Rational('0.000314159').valueOf(), 0.000314159);
  t.is(new Rational('-0.0271828').valueOf(), -0.0271828);

  t.is(new Rational('9007199254740993').toString(), '9007199254740993');
  t.is(new Rational('9007199254740993333').toString(), '9007199254740993333');
  t.is(new Rational('90071992.54740993').toString(), '9007199254740993/100000000');
  t.is(new Rational('90071992.54740993333').toString(), '9007199254740993333/100000000000');

  // strings (two floats)
  t.is(new Rational('3.14159', '2').valueOf(), 1.570795);
  t.is(new Rational('3.14159', '2.5').valueOf(), 1.256636);
  t.is(new Rational('314.159e-1', '0.25e2').valueOf(), 1.256636);

  // strings (exp)
  t.is(new Rational('9007199254740993e-8').toString(), '9007199254740993/100000000');
  t.is(new Rational('9007199254740993333e11').toString(), '900719925474099333300000000000');
});

test('clone', t => {
  const x = new Rational('1');
  const y = x.clone();

  // @ts-ignore
  y.n = 2n;

  t.is(x.valueOf(), 1);
  t.is(y.valueOf(), 2);
});

test('normalize', t => {
  t.is(new Rational(1e11, 1e11).toString(), '1');
  t.is(new Rational(1e10, 1e11).toString(), '1/10');
  t.is(new Rational(1e10, -1e11).toString(), '-1/10');
  t.is(new Rational(1e11, 1e10).toString(), '10');
  t.is(new Rational(-1e11, -1e10).toString(), '10');
});

test('toFixed', t => {
  t.is(new Rational(1, 3).toFixed(10), '0.3333333333');
  t.is(new Rational(-1, 3).toFixed(20), '-0.33333333333333333333');
  t.is(new Rational(1, 3).toFixed(40), '0.3333333333333333333333333333333333333333');
  t.is(new Rational(1, 3).toFixed(80), '0.33333333333333333333333333333333333333333333333333333333333333333333333333333333');

  t.is(new Rational(-1, 5).toFixed(10), '-0.2000000000');
  t.is(new Rational(1, 5).toFixed(20), '0.20000000000000000000');
  t.is(new Rational(-1, 5).toFixed(40), '-0.2000000000000000000000000000000000000000');
  t.is(new Rational(1, 5).toFixed(80), '0.20000000000000000000000000000000000000000000000000000000000000000000000000000000');

  t.is(new Rational(1, 9).toFixed(10), '0.1111111111');
  t.is(new Rational(-1, 9).toFixed(20), '-0.11111111111111111111');
  t.is(new Rational(1, 9).toFixed(40), '0.1111111111111111111111111111111111111111');
  t.is(new Rational(-1, 9).toFixed(80), '-0.11111111111111111111111111111111111111111111111111111111111111111111111111111111');

  t.is(new Rational(5, 1).toFixed(10), '5.0000000000');
  t.is(new Rational(-5, 1).toFixed(20), '-5.00000000000000000000');
  t.is(new Rational(5, 1).toFixed(40), '5.0000000000000000000000000000000000000000');
  t.is(new Rational(-5, 1).toFixed(80), '-5.00000000000000000000000000000000000000000000000000000000000000000000000000000000');

  t.is(new Rational(22, 7).toFixed(10), '3.1428571428');
  t.is(new Rational(-22, 7).toFixed(80), '-3.14285714285714285714285714285714285714285714285714285714285714285714285714285714');

  t.is(new Rational(2n**100n, 1).toFixed(0), '1267650600228229401496703205376');
  t.is(new Rational(-(2n**100n), 1).toFixed(0), '-1267650600228229401496703205376');
});

test('toExponential', t => {
  t.is(new Rational(77.1234).toExponential(2), '7.71e+1');
  t.is(new Rational(-77.1234).toExponential(4), '-7.7123e+1');
  t.is(new Rational(77.1234).toExponential(8), '7.71234000e+1');
  t.is(new Rational(-77.1234).toExponential(80), '-7.71234000000000000000000000000000000000000000000000000000000000000000000000000000e+1');

  t.is(new Rational(1, 5).toExponential(2), '2.00e-1');
  t.is(new Rational(-1, 5).toExponential(4), '-2.0000e-1');
  t.is(new Rational(1, 5).toExponential(8), '2.00000000e-1');
  t.is(new Rational(-1, 5).toExponential(80), '-2.00000000000000000000000000000000000000000000000000000000000000000000000000000000e-1');

  t.is(new Rational(-1, 3).toExponential(2), '-3.33e-1');
  t.is(new Rational(1, 3).toExponential(4), '3.3333e-1');
  t.is(new Rational(-1, 3).toExponential(8), '-3.33333333e-1');
  t.is(new Rational(1, 3).toExponential(80), '3.33333333333333333333333333333333333333333333333333333333333333333333333333333333e-1');

  t.is(new Rational(83371900, 2653810).toExponential(20), '3.14159265358107777120e+1');
  t.is(new Rational(-83371900, 2653810).toExponential(20), '-3.14159265358107777120e+1');
});
