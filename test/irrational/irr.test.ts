import test from 'ava';
import Irrational from '../../src/irrational';

test('Irrational is instantiable', t => {
  t.true(new Irrational(1n) instanceof Irrational);
});

test('Irrationals from bigints', t => {
  // Bigints
  t.is(new Irrational(1n).valueOf(), 1);
  t.is(new Irrational(-1n).valueOf(), -1);
  t.is(new Irrational(2n).valueOf(), 2);
  t.is(new Irrational(-2n).valueOf(), -2);

  t.is(new Irrational(9007199254740993n).toString(), '9.007199254740993e+15');
  t.is(new Irrational(9007199254740993333n).toString(), '9.007199254740993333e+18');
});

test('Irrationals from numbers', t => {
  // numbers (integers)
  t.is(new Irrational(1).valueOf(), 1);
  t.is(new Irrational(-1).valueOf(), -1);
  t.is(new Irrational(2).valueOf(), 2);
  t.is(new Irrational(-2).valueOf(), -2);

  // numbers (floats)
  t.is(new Irrational(1.5).toString(), '1.5');
  t.is(new Irrational(-1.5).valueOf(), -1.5);
  t.is(new Irrational(2.5).valueOf(), 2.5);
  t.is(new Irrational(-2.5).valueOf(), -2.5);

  t.is(new Irrational(3.14159).valueOf(), 3.14159);
  t.is(new Irrational(-2.71828).valueOf(), -2.71828);
  t.is(new Irrational(314.159).valueOf(), 314.159);
  t.is(new Irrational(-27182.8).valueOf(), -27182.8);
});

test('Irrationals from strings', t => {
  // strings (integers)
  t.is(new Irrational('1').valueOf(), 1);
  t.is(new Irrational('-1').valueOf(), -1);
  t.is(new Irrational('2').valueOf(), 2);
  t.is(new Irrational('-2').valueOf(), -2);

  t.is(new Irrational('9007199254740993').toString(), '9.007199254740993e+15');
  t.is(new Irrational('9007199254740993333').toString(), '9.007199254740993333e+18');

  // strings (floats)
  t.is(new Irrational('1.5').valueOf(), 1.5);
  t.is(new Irrational('-1.5').valueOf(), -1.5);
  t.is(new Irrational('2.5').valueOf(), 2.5);
  t.is(new Irrational('-2.5').valueOf(), -2.5);

  t.is(new Irrational('3.14159').valueOf(), 3.14159);
  t.is(new Irrational('-2.71828').valueOf(), -2.71828);
  t.is(new Irrational('314.159').valueOf(), 314.159);
  t.is(new Irrational('-27182.8').valueOf(), -27182.8);

  t.is(new Irrational('0.000314159').valueOf(), 0.000314159);
  t.is(new Irrational('-0.0271828').valueOf(), -0.0271828);

  t.is(new Irrational('90071992.54740993').toString(), '9.007199254740993e+7');
  t.is(new Irrational('90071992.54740993333').toString(), '9.007199254740993333e+7');

  // strings (exp)
  t.is(new Irrational('9007199254740993e-8').toString(), '9.007199254740993e+7');
  t.is(new Irrational('9007199254740993333e11').toString(), '9.007199254740993333e+29');
});

test('clone', t => {
  const x = new Irrational('1');
  const y = x.clone();

  // @ts-ignore
  y.s = 2n;

  t.is(x.valueOf(), 1);
  t.is(y.valueOf(), 2);
});


