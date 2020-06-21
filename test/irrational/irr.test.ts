import test from 'ava';
import { Irrational } from '../../src/irrational';

test('Irrational is instantiable', t => {
  t.true(new Irrational(1n) instanceof Irrational);
});

test('Irrationals from bigints', t => {
  // Bigints
  t.is(new Irrational(1n).toString(), '1.e+0');
  t.is(new Irrational(-1n).toString(), '-1.e+0');
  t.is(new Irrational(2n).toString(), '2.e+0');
  t.is(new Irrational(-2n).toString(), '-2.e+0');

  t.is(new Irrational(10n).toString(), '1.0e+1');
  t.is(new Irrational(-100n).toString(), '-1.00e+2');
  t.is(new Irrational(2000n).toString(), '2.000e+3');
  t.is(new Irrational(-20000n).toString(), '-2.0000e+4');

  t.is(new Irrational(9007199254740993n).toString(), '9.007199254740993e+15');
  t.is(new Irrational(9007199254740993333n).toString(), '9.007199254740993333e+18');
});

test('Irrationals from numbers', t => {
  // numbers (integers)
  t.is(new Irrational(1).toString(), '1.e+0');
  t.is(new Irrational(-1).toString(), '-1.e+0');
  t.is(new Irrational(2).toString(), '2.e+0');
  t.is(new Irrational(-2).toString(), '-2.e+0');

  // numbers (floats)
  t.is(new Irrational(1.5).toString(), '1.5e+0');
  t.is(new Irrational(-1.5).toString(), '-1.5e+0');
  t.is(new Irrational(2.5).toString(), '2.5e+0');
  t.is(new Irrational(-2.5).toString(), '-2.5e+0');

  t.is(new Irrational(3.14159).toString(), '3.14159e+0');
  t.is(new Irrational(-2.71828).toString(), '-2.71828e+0');
  t.is(new Irrational(314.159).toString(), '3.14159e+2');
  t.is(new Irrational(-27182.8).toString(), '-2.71828e+4');
});

test.only('Irrationals from strings', t => {
  // strings (integers)
  t.is(new Irrational('1').toString(), '1.e+0');
  t.is(new Irrational('-1').toString(), '-1.e+0');
  t.is(new Irrational('2').toString(), '2.e+0');
  t.is(new Irrational('-2').toString(), '-2.e+0');

  t.is(new Irrational('9007199254740993').toString(),    '9.007199254740993e+15');
  t.is(new Irrational('9007199254740993333').toString(), '9.007199254740993333e+18');
  t.is(new Irrational('9_007_199_254_740_993_333').toString(), '9.007199254740993333e+18');

  // strings (floats)
  t.is(new Irrational('0.0').toString(), '0.0e+0');
  t.is(new Irrational('0.0000').toString(), '0.0000e+0');

  t.is(new Irrational('-0.0').toString(), '0.0e+0');
  t.is(new Irrational('-0.0000').toString(), '0.0000e+0');

  t.is(new Irrational('0.1').toString(), '1.e-1');
  t.is(new Irrational('-0.20').toString(), '-2.0e-1');
  t.is(new Irrational('10.0').toString(), '1.00e+1');
  t.is(new Irrational('-20.00').toString(), '-2.000e+1');

  t.is(new Irrational('1.0').toString(), '1.0e+0');
  t.is(new Irrational('-1.00').toString(), '-1.00e+0');
  t.is(new Irrational('2.000').toString(), '2.000e+0');
  t.is(new Irrational('-2.0000').toString(), '-2.0000e+0');

  t.is(new Irrational('1.5').toString(), '1.5e+0');
  t.is(new Irrational('-1.5').toString(), '-1.5e+0');
  t.is(new Irrational('2.5').toString(), '2.5e+0');
  t.is(new Irrational('-2.5').toString(), '-2.5e+0');

  t.is(new Irrational('3.14159').toString(), '3.14159e+0');
  t.is(new Irrational('-2.71828').toString(), '-2.71828e+0');
  t.is(new Irrational('314.159').toString(), '3.14159e+2');
  t.is(new Irrational('-27182.8').toString(), '-2.71828e+4');

  t.is(new Irrational('0.000314159').toString(), '3.14159e-4');
  t.is(new Irrational('-0.0271828').toString(), '-2.71828e-2');

  t.is(new Irrational('90071992.54740993').toString(),    '9.007199254740993e+7');
  t.is(new Irrational('90071992.54740993333').toString(), '9.007199254740993333e+7');

  // strings (exp)
  t.is(new Irrational('9007199254740993e-8').toString(),    '9.007199254740993e+7');
  t.is(new Irrational('9007199254740993333e11').toString(), '9.007199254740993333e+29');

  t.is(new Irrational('0.00_000_000_000_000_01').toString(), '1.e-16');
});

test('Irrationals from pairs', t => {
  t.is(new Irrational(1, 0).toString(), '1.e+0');
  t.is(new Irrational(1, 1).toString(), '1.e+1');
  t.is(new Irrational(1, -3).toString(), '1.e-3');
});

// test('constants', t => {
//   t.is(Irrational.ZERO.toString(), '0.e+0');
//   t.is(Irrational.ONE.toString(), '1.e+0');
//   t.is(Irrational.TWO.toString(), '2.e+0');

//   t.is(Irrational.E.toString(), '2.71828182845904523536028747135e+0');
//                               // 2.718281828459045235360287471352662497757247093699959574966...

//   t.is(Irrational.LN2.toString(), '6.9314718055994530941723212145e-1');
//                               // 0.6_93147180559945309417232121458176568075500134360255254120...
//   t.is(Irrational.LN10.toString(), '2.30258509299404568401799145468e+0');
//                                  // 2.302585092994045684017991454684364207601101488628772976033...
//   t.is(Irrational.LOG10E.toString(), '4.3429448190325182765112891891e-1');
//                                  // 0.4_34294481903251827651128918916605082294397005803666566114...

// });

test('toFixed', t=> {
  t.is(new Irrational(77.1234).toFixed(2), '77.12');
  t.is(new Irrational(77.1234e3).toFixed(2), '77123.40');
  t.is(new Irrational(-77.1234e-3).toFixed(2), '-0.07');
  t.is(new Irrational(-77.1234e-10).toFixed(10), '-0.0000000077');
});

test('toExponential', t=> {
  t.is(new Irrational(77.1234).toExponential(2), '7.71e+1');
  t.is(new Irrational(77.1234e3).toExponential(2), '7.71e+4');
  t.is(new Irrational(-77.1234e-3).toExponential(2), '-7.71e-2');
});

