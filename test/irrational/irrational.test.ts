import { Irrational } from '../../src/irrational';
import { Rational } from '../../src/rational';

test('Irrational is instantiable', () => {
  expect(new Irrational(1n) instanceof Irrational).toBe(true);
});


test('Irrationals from bigints', () => {
  expect(new Irrational(1n).toString()).toBe('1');
  expect(new Irrational(-1n).toString()).toBe('-1');
  expect(new Irrational(2n).toString()).toBe('2');
  expect(new Irrational(-2n).toString()).toBe('-2');

  expect(new Irrational(10n).toString()).toBe('10');
  expect(new Irrational(-100n).toString()).toBe('-100');
  expect(new Irrational(2000n).toString()).toBe('2000');
  expect(new Irrational(-20000n).toString()).toBe('-20000');

  expect(new Irrational(9007199254740993n).toString()).toBe('9007199254740993');
  expect(new Irrational(9007199254740993333n).toString()).toBe('9007199254740993333');
});

describe('Irrationals from numbers', () => {
  test('integers', () => {
    // numbers (integers)
    expect(new Irrational(1).toString()).toBe('1.00000000000000e+0');
    expect(new Irrational(-1).toString()).toBe('-1.00000000000000e+0');
    expect(new Irrational(2).toString()).toBe('2.00000000000000e+0');
    expect(new Irrational(-2).toString()).toBe('-2.00000000000000e+0');
  });

  test('floats', () => {
    expect(new Irrational(1.5).toString()).toBe('1.5000000000000000e+0');
    expect(new Irrational(-1.5).toString()).toBe('-1.5000000000000000e+0');
    expect(new Irrational(2.5).toString()).toBe('2.5000000000000000e+0');
    expect(new Irrational(-2.5).toString()).toBe('-2.5000000000000000e+0');
  
    expect(new Irrational(3.14159).toString()).toBe('3.1415900000000000e+0');
    expect(new Irrational(-2.71828).toString()).toBe('-2.7182800000000000e+0');
    expect(new Irrational(314.159).toString()).toBe('3.1415900000000000e+2');
    expect(new Irrational(-27182.8).toString()).toBe('-2.7182800000000000e+4');
  });
});

describe('Irrationals from strings', () => {
  test('integers', () => {
    // strings (integers)
    expect(new Irrational('1').toString()).toBe('1');
    expect(new Irrational('-1').toString()).toBe('-1');
    expect(new Irrational('2').toString()).toBe('2');
    expect(new Irrational('-2').toString()).toBe('-2');
  
    expect(new Irrational('9007199254740993').toString()).toBe('9007199254740993');
    expect(new Irrational('9007199254740993333').toString()).toBe('9007199254740993333');
    expect(new Irrational('9_007_199_254_740_993_333').toString()).toBe('9007199254740993333');
  });

  test('floats', () => {
    expect(new Irrational('1.').toString()).toBe('1.e+0');
    expect(new Irrational('-1.').toString()).toBe('-1.e+0');
    expect(new Irrational('2.').toString()).toBe('2.e+0');
    expect(new Irrational('-2.').toString()).toBe('-2.e+0');

    expect(new Irrational('0.0').toString()).toBe('0.0e+0');
    expect(new Irrational('0.0000').toString()).toBe('0.0000e+0');
  
    expect(new Irrational('-0.0').toString()).toBe('0.0e+0');
    expect(new Irrational('-0.0000').toString()).toBe('0.0000e+0');
  
    expect(new Irrational('0.1').toString()).toBe('1.e-1');
    expect(new Irrational('-0.20').toString()).toBe('-2.0e-1');
    expect(new Irrational('10.0').toString()).toBe('1.00e+1');
    expect(new Irrational('-20.00').toString()).toBe('-2.000e+1');
  
    expect(new Irrational('1.0').toString()).toBe('1.0e+0');
    expect(new Irrational('-1.00').toString()).toBe('-1.00e+0');
    expect(new Irrational('2.000').toString()).toBe('2.000e+0');
    expect(new Irrational('-2.0000').toString()).toBe('-2.0000e+0');
  
    expect(new Irrational('1.5').toString()).toBe('1.5e+0');
    expect(new Irrational('-1.5').toString()).toBe('-1.5e+0');
    expect(new Irrational('2.5').toString()).toBe('2.5e+0');
    expect(new Irrational('-2.5').toString()).toBe('-2.5e+0');
  
    expect(new Irrational('3.14159').toString()).toBe('3.14159e+0');
    expect(new Irrational('-2.71828').toString()).toBe('-2.71828e+0');
    expect(new Irrational('314.159').toString()).toBe('3.14159e+2');
    expect(new Irrational('-27182.8').toString()).toBe('-2.71828e+4');
  
    expect(new Irrational('0.000314159').toString()).toBe('3.14159e-4');
    expect(new Irrational('-0.0271828').toString()).toBe('-2.71828e-2');
  
    expect(new Irrational('90071992.54740993').toString()).toBe('9.007199254740993e+7');
    expect(new Irrational('90071992.54740993333').toString()).toBe('9.007199254740993333e+7');
  
    expect(new Irrational('-10_000_000.00000').toString()).toBe('-1.000000000000e+7');
  });

  test('exp', () => {
    // strings (exp)
    expect(new Irrational('9007199254740993e-8').toString()).toBe('9.007199254740993e+7');
    expect(new Irrational('9007199254740993E-8').toString()).toBe('9.007199254740993e+7');

    expect(new Irrational('9007199254740993333e11' ).toString()).toBe('9.007199254740993333e+29');
    expect(new Irrational('9007199254740993333E11' ).toString()).toBe('9.007199254740993333e+29');
    expect(new Irrational('9007199254740993333E+11').toString()).toBe('9.007199254740993333e+29');
  });

  test('seperators', () => {
    expect(new Irrational('10_00.').toString()).toBe('1.000e+3');
    expect(new Irrational('1_0.0_0').toString()).toBe('1.000e+1');

    expect(new Irrational('0.00_000_000_000_000_01').toString()).toBe('1.e-16');
    expect(new Irrational('0.00_000_0____00_000_000_01').toString()).toBe('1.e-16');
  });

  test('spaces', () => {
    expect(new Irrational(   '1.234'    ).toString()).toBe('1.234e+0');
    expect(new Irrational('   1.234'    ).toString()).toBe('1.234e+0');
    expect(new Irrational(    '1.234   ').toString()).toBe('1.234e+0');
    expect(new Irrational('   1.234    ').toString()).toBe('1.234e+0');
  });

  test('zeros', () => {
    expect(new Irrational('0'        ).toString()).toBe('0.e+0');
    expect(new Irrational('0.0000'   ).toString()).toBe('0.0000e+0');
    expect(new Irrational('0.0000e-3').toString()).toBe('0.0000e-3');
    expect(new Irrational('0.0000e-1').toString()).toBe('0.0000e-1');
    expect(new Irrational('0.0000e+1').toString()).toBe('0.0000e+1');
    expect(new Irrational('0.0000e+3').toString()).toBe('0.0000e+3');
  });

  test('special', () => {
    expect(new Irrational('+1.').toString()).toBe('1.e+0');
    expect(new Irrational('+100.00').toString()).toBe('1.0000e+2');
    expect(new Irrational('+0.10').toString()).toBe('1.0e-1');

    expect(new Irrational(' 1 . 2 3 4 ').toString()).toBe('1.234e+0');
  });

  test('preceding zeros are not significant', () => {
    // expect(new Irrational('0000').toString()).toBe('0e+0');   // TODO: bugs
    // expect(new Irrational('0000.').toString()).toBe('0.e+0');
    // expect(new Irrational('00.00').toString()).toBe('0.00e+0');

    expect(new Irrational('0100.').toString()).toBe('1.00e+2');
    expect(new Irrational('01.00').toString()).toBe('1.00e+0');

    // expect(new Irrational('-0000').toString()).toBe('0e+0');   // TODO: bugs
    // expect(new Irrational('-0000.').toString()).toBe('0.e+0');
    // expect(new Irrational('-00.00').toString()).toBe('0.00e+0');

    expect(new Irrational('-0100.').toString()).toBe('-1.00e+2');
    expect(new Irrational('-01.00').toString()).toBe('-1.00e+0');
  })
});

test('Irrationals from pairs', () => {
  expect(new Irrational(1, 0).toString()).toBe('1.00000000000000e+0');
  expect(new Irrational(1, 1).toString()).toBe('1.00000000000000e+1');
  expect(new Irrational(1, -3).toString()).toBe('1.00000000000000e-3');

  expect(new Irrational('1', 0).toString()).toBe('1');
  expect(new Irrational('1', 1).toString()).toBe('10');
  expect(new Irrational('1', -3).toString()).toBe('0.001');

  expect(new Irrational('1.', 0).toString()).toBe('1.e+0');
  expect(new Irrational('1.', 1).toString()).toBe('1.e+1');
  expect(new Irrational('1.', -3).toString()).toBe('1.e-3');
});

test('Irrationals with precision', () => {
  expect(new Irrational(1, 0, 10).toString()).toBe('1.000000000e+0');
  expect(new Irrational(1, 1, 5).toString()).toBe('1.0000e+1');
  expect(new Irrational(1, -3, 20).toString()).toBe('1.0000000000000000000e-3');
});

test('Irrationals with infinite precision', () => {
  expect(new Irrational(1, 0, Infinity).toString()).toBe('1');
  expect(new Irrational(10, 1, Infinity).toString()).toBe('100');
  expect(new Irrational(10, -3, Infinity).toString()).toBe('0.01');
  expect(new Irrational(3.14159, 0, Infinity).toString()).toBe('3.14159');
});

test('Irrationals from rationals', () => {
  expect(Irrational.fromRational(new Rational('1')).toExponential(9)).toBe('1.000000000e+0');
  expect(Irrational.fromRational(new Rational('1000')).toExponential(9)).toBe('1.000000000e+3');
  expect(Irrational.fromRational(new Rational('1', '3')).toExponential(9)).toBe('3.333333333e-1');
});

test('constants', () => {
  expect(Irrational.ZERO.toString()).toBe('0');
  expect(Irrational.ONE.toString()).toBe('1');
  expect(Irrational.TWO.toString()).toBe('2');

  expect(Irrational.E.toExponential(9)).toBe('2.718281828e+0');
                                           // 2.718281828459045235360287471352662497757247093699959574966...

  expect(Irrational.LN2.toExponential(9)).toBe('6.931471805e-1');
                                             // 6.93147180559945309417232121458176568075500134360255254120...
  expect(Irrational.LN10.toExponential(9)).toBe('2.302585092e+0');
                                              // 2.302585092994045684017991454684364207601101488628772976033...
  expect(Irrational.LOG10E.toExponential(9)).toBe('4.342944819e-1');
                                                // 4.34294481903251827651128918916605082294397005803666566114...
});

test('toFixed', () => {
  expect(new Irrational(77.1234).toFixed(2)).toBe('77.12');
  expect(new Irrational(77.1234e3).toFixed(2)).toBe('77123.40');
  expect(new Irrational(-77.1234e-3).toFixed(2)).toBe('-0.07');
  expect(new Irrational(-77.1234e-10).toFixed(10)).toBe('-0.0000000077');
});

test('toExponential', () => {
  expect(new Irrational(77.1234).toExponential(2)).toBe('7.71e+1');
  expect(new Irrational(77.1234e3).toExponential(2)).toBe('7.71e+4');
  expect(new Irrational(-77.1234e-3).toExponential(2)).toBe('-7.71e-2');
});
