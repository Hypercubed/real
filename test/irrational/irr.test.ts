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

  t.is(new Irrational(9007199254740993n).toString(), '9.0071992547409930000e+15');
  t.is(new Irrational(9007199254740993333n).toString(), '9.0071992547409933330e+18');
});

test('Irrationals from numbers', t => {
  // numbers (integers)
  t.is(new Irrational(1).valueOf(), 1);
  t.is(new Irrational(-1).valueOf(), -1);
  t.is(new Irrational(2).valueOf(), 2);
  t.is(new Irrational(-2).valueOf(), -2);

  // numbers (floats)
  t.is(new Irrational(1.5).toString(), '1.5000000000000000000e+0');
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

  t.is(new Irrational('9007199254740993').toString(),    '9.0071992547409930000e+15');
  t.is(new Irrational('9007199254740993333').toString(), '9.0071992547409933330e+18');

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

  t.is(new Irrational('90071992.54740993').toString(),    '9.0071992547409930000e+7');
  t.is(new Irrational('90071992.54740993333').toString(), '9.0071992547409933330e+7');

  // strings (exp)
  t.is(new Irrational('9007199254740993e-8').toString(),    '9.0071992547409930000e+7');
  t.is(new Irrational('9007199254740993333e11').toString(), '9.0071992547409933330e+29');
});

test('Irrationals from pairs', t => {
  t.is(new Irrational(1, 0).valueOf(), 1);
  t.is(new Irrational(1, 1).valueOf(), 10);
  t.is(new Irrational(1, -3).valueOf(), 0.001);
});

test('clone', t => {
  const x = new Irrational('1');
  const y = x.clone();

  // @ts-ignore
  y.s = 2n;

  t.is(x.valueOf(), 1);
  t.is(y.valueOf(), 2);
});

test('constants', t => {
  t.is(Irrational.ZERO.toString(), '0.0000000000000000000e+0');
  t.is(Irrational.ONE.toString(), '1.0000000000000000000e+0');
  t.is(Irrational.TWO.toString(), '2.0000000000000000000e+0');

  t.is(Irrational.E.toString(), '2.7182818284590452354e+0');
                              // 2.718281828459045235360287471352662497757247093699959574966...

  t.is(Irrational.LN2.toString(), '6.9314718055994530942e-1');
                              // 0.6_93147180559945309417232121458176568075500134360255254120...
  t.is(Irrational.LN10.toString(), '2.3025850929940456840e+0');
                                 // 2.302585092994045684017991454684364207601101488628772976033...
  t.is(Irrational.LOG10E.toString(), '4.3429448190325182765e-1');
                                 // 0.4_34294481903251827651128918916605082294397005803666566114...

});

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

