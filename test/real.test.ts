import test from 'ava';
import Real from "../src/real"

test('Real is instantiable', t => {
  t.true(new Real(1n) instanceof Real);
});

test('reals from bigints', t => {
  // Bigints
  t.is(new Real(1n).valueOf(), 1);
  t.is(new Real(-1n).valueOf(), -1);
  t.is(new Real(2n).valueOf(), 2);
  t.is(new Real(-2n).valueOf(), -2);

  t.is(new Real(9007199254740993n).toString(), '9007199254740993');
  t.is(new Real(9007199254740993333n).toString(), '9007199254740993333');
});

test('reals from numbers', t => {
  // numbers (integers)
  t.is(new Real(1).valueOf(), 1);
  t.is(new Real(-1).valueOf(), -1);
  t.is(new Real(2).valueOf(), 2);
  t.is(new Real(-2).valueOf(), -2);

  // numbers (floats)
  t.is(new Real(1.5).valueOf(), 1.5);
  t.is(new Real(-1.5).valueOf(), -1.5);
  t.is(new Real(2.5).valueOf(), 2.5);
  t.is(new Real(-2.5).valueOf(), -2.5);

  t.is(new Real(3.14159).valueOf(), 3.14159);
  t.is(new Real(-2.71828).valueOf(), -2.71828);
  t.is(new Real(314.159).valueOf(), 314.159);
  t.is(new Real(-27182.8).valueOf(), -27182.8);
});

test('reals from strings', t => {
  // strings (floats)
  t.is(new Real('1.5').valueOf(), 1.5);
  t.is(new Real('-1.5').valueOf(), -1.5);
  t.is(new Real('2.5').valueOf(), 2.5);
  t.is(new Real('-2.5').valueOf(), -2.5);

  t.is(new Real('3.14159').valueOf(), 3.14159);
  t.is(new Real('-2.71828').valueOf(), -2.71828);
  t.is(new Real('314.159').valueOf(), 314.159);
  t.is(new Real('-27182.8').valueOf(), -27182.8);

  t.is(new Real('0.000314159').valueOf(), 0.000314159);
  t.is(new Real('-0.0271828').valueOf(), -0.0271828);

  t.is(new Real('9007199254740993').toString(), '9007199254740993');
  t.is(new Real('9007199254740993333').toString(), '9007199254740993333');
  t.is(new Real('90071992.54740993').toString(), '9007199254740993e-8');
  t.is(new Real('90071992.54740993333').toString(), '9007199254740993333e-11');
});

test('clone', t => {
  const x = new Real('1');
  const y = x.clone();

  // @ts-ignore
  y.s = 2n;

  t.is(x.valueOf(), 1);
  t.is(y.valueOf(), 2);
});

test('normalize', t => {
  t.is(new Real(1e11).div(new Real(1)).toString(), '1e11');
});

