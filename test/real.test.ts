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

test('cmp', t => {
  t.is(new Real('1').cmp(new Real('1')), 0);
  t.is(new Real('1').cmp(new Real('-1')), 1);
  t.is(new Real('1').cmp(new Real('10')), -1);

  t.is(new Real('15').cmp(new Real('1.5')), 1);
  t.is(new Real('1.5').cmp(new Real('15')), -1);
});

test('add', t => {
  t.is(new Real('1').add(new Real('1')).valueOf(), 2);
  t.is(new Real('1').add(new Real('-1')).valueOf(), 0);
  t.is(new Real('1').add(new Real('10')).valueOf(), 11);

  t.is(new Real('1').add(new Real('1.5')).valueOf(), 2.5);
  t.is(new Real('1000').add(new Real('0.0001')).valueOf(), 1000.0001);
  t.is(new Real('0.2').add(new Real('0.1')).valueOf(), 0.3);
});

test('minus', t => {
  t.is(new Real('1').minus(new Real('1')).valueOf(), 0);
  t.is(new Real('1').minus(new Real('-1')).valueOf(), 2);
  t.is(new Real('1').minus(new Real('10')).valueOf(), -9);

  t.is(new Real('1').minus(new Real('1.5')).valueOf(), -0.5);
  t.is(new Real('1000').minus(new Real('0.0001')).valueOf(), 999.9999);
  t.is(new Real('0.2').minus(new Real('0.1')).valueOf(), 0.1);
});

test('mul', t => {
  t.is(new Real('1').mul(new Real('1')).valueOf(), 1);
  t.is(new Real('1').mul(new Real('-1')).valueOf(), -1);
  t.is(new Real('1').mul(new Real('10')).valueOf(), 10);

  t.is(new Real('2.5').mul(new Real('2')).valueOf(), 5);
  t.is(new Real('3').mul(new Real('2.5')).valueOf(), 7.5);
  t.is(new Real('1000').mul(new Real('0.001')).valueOf(), 1);
  t.is(new Real('100').mul(new Real('0.333')).valueOf(), 33.3);
});

test('inv', t => {
  t.is(new Real('1').inv().valueOf(), 1);
  t.is(new Real('10').inv().valueOf(), 0.1);
  t.is(new Real('0.1').inv().valueOf(), 10);
  t.is(new Real('2').inv().valueOf(), 0.5);
  t.is(new Real('3').inv().valueOf(), 0.33333333333333);
});

test('div', t => {
  t.is(new Real('1').div(new Real('1')).valueOf(), 1);
  t.is(new Real('1').div(new Real('-1')).valueOf(), -1);
  t.is(new Real('10').div(new Real('5')).valueOf(), 2);
  t.is(new Real('1.0').div(new Real('0.5')).valueOf(), 2);
  t.is(new Real('10').div(new Real('3')).valueOf(), 3.3333333333333);
  t.is(new Real('1').div(new Real('2')).valueOf(), 0.5);
});


