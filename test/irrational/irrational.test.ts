import { Irrational } from '../../src/irrational';
import { Rational } from '../../src/rational';

test('Irrational is instantiable', () => {
  expect(Irrational.from(1n) instanceof Irrational).toBe(true);
});

test('Irrationals from bigints', () => {
  expect(Irrational.from(1n).toString()).toBe('1');
  expect(Irrational.from(-1n).toString()).toBe('-1');
  expect(Irrational.from(2n).toString()).toBe('2');
  expect(Irrational.from(-2n).toString()).toBe('-2');

  expect(Irrational.from(10n).toString()).toBe('10');
  expect(Irrational.from(-100n).toString()).toBe('-100');
  expect(Irrational.from(2000n).toString()).toBe('2000');
  expect(Irrational.from(-20000n).toString()).toBe('-20000');

  expect(Irrational.from(9007199254740993n).toString()).toBe('9007199254740993');
  expect(Irrational.from(9007199254740993333n).toString()).toBe('9007199254740993333');
});

describe('Irrationals from numbers', () => {
  test('integers', () => {
    // numbers (integers)
    expect(Irrational.from(1).toString()).toBe('1.00000000000000e+0');
    expect(Irrational.from(-1).toString()).toBe('-1.00000000000000e+0');
    expect(Irrational.from(2).toString()).toBe('2.00000000000000e+0');
    expect(Irrational.from(-2).toString()).toBe('-2.00000000000000e+0');
  });

  test('floats', () => {
    expect(Irrational.from(1.5).toString()).toBe('1.5000000000000000e+0');
    expect(Irrational.from(-1.5).toString()).toBe('-1.5000000000000000e+0');
    expect(Irrational.from(2.5).toString()).toBe('2.5000000000000000e+0');
    expect(Irrational.from(-2.5).toString()).toBe('-2.5000000000000000e+0');
  
    expect(Irrational.from(3.14159).toString()).toBe('3.1415900000000000e+0');
    expect(Irrational.from(-2.71828).toString()).toBe('-2.7182800000000000e+0');
    expect(Irrational.from(314.159).toString()).toBe('3.1415900000000000e+2');
    expect(Irrational.from(-27182.8).toString()).toBe('-2.7182800000000000e+4');
  });
});

describe('Irrationals from strings', () => {
  test('integers', () => {
    // strings (integers)
    expect(Irrational.from('1').toString()).toBe('1');
    expect(Irrational.from('-1').toString()).toBe('-1');
    expect(Irrational.from('2').toString()).toBe('2');
    expect(Irrational.from('-2').toString()).toBe('-2');
  
    expect(Irrational.from('9007199254740993').toString()).toBe('9007199254740993');
    expect(Irrational.from('9007199254740993333').toString()).toBe('9007199254740993333');
    expect(Irrational.from('9_007_199_254_740_993_333').toString()).toBe('9007199254740993333');
  });

  test('floats', () => {
    expect(Irrational.from('1.').toString()).toBe('1.e+0');
    expect(Irrational.from('-1.').toString()).toBe('-1.e+0');
    expect(Irrational.from('2.').toString()).toBe('2.e+0');
    expect(Irrational.from('-2.').toString()).toBe('-2.e+0');
  
    expect(Irrational.from('0.1').toString()).toBe('1.e-1');
    expect(Irrational.from('-0.20').toString()).toBe('-2.0e-1');
    expect(Irrational.from('10.0').toString()).toBe('1.00e+1');
    expect(Irrational.from('-20.00').toString()).toBe('-2.000e+1');
  
    expect(Irrational.from('1.0').toString()).toBe('1.0e+0');
    expect(Irrational.from('-1.00').toString()).toBe('-1.00e+0');
    expect(Irrational.from('2.000').toString()).toBe('2.000e+0');
    expect(Irrational.from('-2.0000').toString()).toBe('-2.0000e+0');
  
    expect(Irrational.from('1.5').toString()).toBe('1.5e+0');
    expect(Irrational.from('-1.5').toString()).toBe('-1.5e+0');
    expect(Irrational.from('2.5').toString()).toBe('2.5e+0');
    expect(Irrational.from('-2.5').toString()).toBe('-2.5e+0');
  
    expect(Irrational.from('3.14159').toString()).toBe('3.14159e+0');
    expect(Irrational.from('-2.71828').toString()).toBe('-2.71828e+0');
    expect(Irrational.from('314.159').toString()).toBe('3.14159e+2');
    expect(Irrational.from('-27182.8').toString()).toBe('-2.71828e+4');
  
    expect(Irrational.from('0.000314159').toString()).toBe('3.14159e-4');
    expect(Irrational.from('-0.0271828').toString()).toBe('-2.71828e-2');
  
    expect(Irrational.from('90071992.54740993').toString()).toBe('9.007199254740993e+7');
    expect(Irrational.from('90071992.54740993333').toString()).toBe('9.007199254740993333e+7');
  
    expect(Irrational.from('-10_000_000.00000').toString()).toBe('-1.000000000000e+7');
  });

  test('zeros', () => {
    expect(Irrational.from('0.').toString()).toBe('0.e+0');
    expect(Irrational.from('0.0').toString()).toBe('0.e-1');
    expect(Irrational.from('0.0000').toString()).toBe('0.e-4');
  
    expect(Irrational.from('-0.0').toString()).toBe('0.e-1');
    expect(Irrational.from('-0.0000').toString()).toBe('0.e-4');
  });

  test('exp', () => {
    // strings (exp)
    expect(Irrational.from('9007199254740993e-8').toString()).toBe('9.007199254740993e+7');
    expect(Irrational.from('9007199254740993E-8').toString()).toBe('9.007199254740993e+7');

    expect(Irrational.from('9007199254740993333e11' ).toString()).toBe('9.007199254740993333e+29');
    expect(Irrational.from('9007199254740993333E11' ).toString()).toBe('9.007199254740993333e+29');
    expect(Irrational.from('9007199254740993333E+11').toString()).toBe('9.007199254740993333e+29');
  });

  test('seperators', () => {
    expect(Irrational.from('10_00.').toString()).toBe('1.000e+3');
    expect(Irrational.from('1_0.0_0').toString()).toBe('1.000e+1');

    expect(Irrational.from('0.00_000_000_000_000_01').toString()).toBe('1.e-16');
    expect(Irrational.from('0.00_000_0____00_000_000_01').toString()).toBe('1.e-16');
  });

  test('spaces', () => {
    expect(Irrational.from(   '1.234'    ).toString()).toBe('1.234e+0');
    expect(Irrational.from('   1.234'    ).toString()).toBe('1.234e+0');
    expect(Irrational.from(    '1.234   ').toString()).toBe('1.234e+0');
    expect(Irrational.from('   1.234    ').toString()).toBe('1.234e+0');
  });

  test('zeros', () => {
    expect(Irrational.from('0'        ).toString()).toBe('0');
    expect(Irrational.from('0.'       ).toString()).toBe('0.e+0');
    expect(Irrational.from('0.0'      ).toString()).toBe('0.e-1');
    expect(Irrational.from('0.0000'   ).toString()).toBe('0.e-4');
    expect(Irrational.from('0.0000e-3').toString()).toBe('0.e-7');
    expect(Irrational.from('0.0000e-1').toString()).toBe('0.e-5');
    expect(Irrational.from('0.0000e+1').toString()).toBe('0.e-3');
    expect(Irrational.from('0.0000e+3').toString()).toBe('0.e-1');
  });

  test('special', () => {
    expect(Irrational.from('+1.').toString()).toBe('1.e+0');
    expect(Irrational.from('+100.00').toString()).toBe('1.0000e+2');
    expect(Irrational.from('+0.10').toString()).toBe('1.0e-1');

    expect(Irrational.from(' 1 . 2 3 4 ').toString()).toBe('1.234e+0');
  });

  test('preceding zeros are not significant', () => {
    expect(Irrational.from('0000').toString()).toBe('0');   
    // expect(Irrational.from('0000.').toString()).toBe('0.e+0');  // TODO: bug
    // expect(Irrational.from('00.00').toString()).toBe('0.e-2');  // TODO: bug

    expect(Irrational.from('0100.').toString()).toBe('1.00e+2');
    expect(Irrational.from('01.00').toString()).toBe('1.00e+0');

    expect(Irrational.from('-0000').toString()).toBe('0');   
    // expect(Irrational.from('-0000.').toString()).toBe('0.e+0');    // TODO: bug
    // expect(Irrational.from('-00.00').toString()).toBe('0.e-2');    // TODO: bug

    expect(Irrational.from('-0100.').toString()).toBe('-1.00e+2');
    expect(Irrational.from('-01.00').toString()).toBe('-1.00e+0');
  })
});

test('Irrationals from pairs', () => {
  expect(Irrational.from(1, 0).toString()).toBe('1.00000000000000e+0');
  expect(Irrational.from(1, 1).toString()).toBe('1.00000000000000e+1');
  expect(Irrational.from(1, -3).toString()).toBe('1.00000000000000e-3');

  expect(Irrational.from('1', 0).toString()).toBe('1');
  expect(Irrational.from('1', 1).toString()).toBe('10');
  expect(Irrational.from('1', -3).toString()).toBe('0.001');

  expect(Irrational.from('1.', 0).toString()).toBe('1.e+0');
  expect(Irrational.from('1.', 1).toString()).toBe('1.e+1');
  expect(Irrational.from('1.', -3).toString()).toBe('1.e-3');
});

test('Irrationals with precision', () => {
  expect(Irrational.from(1n, 0).withPrecision(10).toString()).toBe('1.000000000e+0');
  expect(Irrational.from(1n, 1).withPrecision(5).toString()).toBe('1.0000e+1');
  expect(Irrational.from(1n, -3).withPrecision(20).toString()).toBe('1.0000000000000000000e-3');
});

test('Exact Irrationals', () => {
  expect(Irrational.from(1, 0).withPrecision(Infinity).toString()).toBe('1');
  expect(Irrational.from(10, 1).withPrecision(Infinity).toString()).toBe('100');
  expect(Irrational.from(10, -3).withPrecision(Infinity).toString()).toBe('0.01');
  expect(Irrational.from(3.14159, 0).withPrecision(Infinity).toString()).toBe('3.14159');
});

test('Irrationals from rationals', () => {
  expect(Irrational.fromRational(Rational.from('1')).toExponential(9)).toBe('1.000000000e+0');
  expect(Irrational.fromRational(Rational.from('1000')).toExponential(9)).toBe('1.000000000e+3');
  expect(Irrational.fromRational(Rational.from('1', '3')).toExponential(9)).toBe('3.333333333e-1');  // TODO
});

test('constants', () => {
  expect(Irrational.ZERO.toString()).toBe('0');
  expect(Irrational.ONE.toString()).toBe('1');
  expect(Irrational.TWO.toString()).toBe('2');

  expect(Irrational.E.toExponential(9)).toBe('2.718281828e+0');
                                           // 2.718281828459045235360287471352662497757247093699959574966...

  expect(Irrational.LN2.toExponential(9)).toBe('6.931471806e-1');
                                             // 6.93147180559945309417232121458176568075500134360255254120...
  expect(Irrational.LN10.toExponential(9)).toBe('2.302585093e+0');
                                              // 2.302585092994045684017991454684364207601101488628772976033...
  expect(Irrational.LOG10E.toExponential(9)).toBe('4.342944819e-1');
                                                // 4.34294481903251827651128918916605082294397005803666566114...
});

test('toFixed', () => {
  expect(Irrational.from(1).toFixed()).toBe('1');
  expect(Irrational.from(1).toFixed(2)).toBe('1.00');
  expect(Irrational.from('1.00').toFixed()).toBe('1');

  expect(Irrational.from(2).toFixed()).toBe('2');
  expect(Irrational.from(2).toFixed(2)).toBe('2.00');
  expect(Irrational.from('2.00').toFixed()).toBe('2');
  expect(Irrational.from('2.00').toFixed(2)).toBe('2.00');

  expect(Irrational.from(77.1234).toFixed(2)).toBe('77.12');
  expect(Irrational.from(77.1234e3).toFixed(2)).toBe('77123.40');
  expect(Irrational.from(-77.1234e-3).toFixed(2)).toBe('-0.08');
  expect(Irrational.from(-77.1234e-10).toFixed(10)).toBe('-0.0000000077');
});

test('toExponential', () => {
  expect(Irrational.from(77.1234).toExponential(2)).toBe('7.71e+1');
  expect(Irrational.from(77.1234e3).toExponential(2)).toBe('7.71e+4');
  expect(Irrational.from(-77.1234e-3).toExponential(2)).toBe('-7.71e-2');
});

test('isqrt', () => {
  // @ts-ignore
  expect(Irrational.from('4.0').isqrt().toString()).toBe('5.0e-1');
  // @ts-ignore
  expect(Irrational.from('25.0').isqrt().toString()).toBe('2.00e-1');
  // @ts-ignore
  expect(Irrational.from('100.0').isqrt().toString()).toBe('1.000e-1');
  // @ts-ignore
  expect(Irrational.from('64.0').isqrt().toString()).toBe('1.25e-1');
});

// S. M. Rump. Algorithms for verified inclusions – theory and practice.
// From Yap, Chee, and Thomas E. “The Exact Computation Paradigm.” Computing in Euclidean Geometry, August 6, 1994. https://doi.org/10.1142/9789812831699_0011.
test('Rump', () => {
  const a = Irrational.from(77617n, 0);
  const b = Irrational.from(33096n, 0);

  const aa = a.ipow(2n);
  const b2 = b.ipow(2n);
  const b4 = b2.ipow(2n);
  const b6 = b4.mul(b2);
  const b8 = b4.ipow(2n);

  const f1 = Irrational.from(33375n, -2).mul(b6);
  const f2b1 = Irrational.from(11n, 0).mul(aa).mul(b2);
  const f2b3 = Irrational.from(121n, 0).mul(b4);
  const f2b = f2b1.sub(b6).sub(f2b3).sub(Irrational.TWO);
  const f2 = aa.mul(f2b);
  const f3 = Irrational.from(55n, -1).mul(b8);
  const f4 = a.div(b.mul(Irrational.TWO));

  const f = f1.add(f2).add(f3).add(f4);

                           // −0.827396059946821368141165095479816291999
  expect(f.toFixed(15)).toBe('-0.827396059946821'); // exact?
});

test('withPrecision', () => {
  const x = Irrational.from(1.234);
  expect(x).toEqual({ s: 12340000000000000n, e: -16, p: 17, u: 1n });

  // @ts-ignore
  expect(x.withPrecision(4)).toEqual({ s: 1234n, e: -3, p: 4, u: 1n });

  // @ts-ignore
  expect(x.withPrecision(20)).toEqual({ s: 12340000000000000000n, e: -19, p: 20, u: 1n });

  // @ts-ignore
  expect(x.withPrecision(Infinity)).toEqual({ s: 1234n, e: -3, p: 4, u: 0n });
});

describe('withError', () => {
  test('bigint', () => {
    const x = Irrational.from(1234n, -3);
    expect(x).toEqual({ s: 1234n, e: -3, p: 4, u: 0n });

    expect(x.withError(1n, -3)).toEqual({ s: 1234n, e: -3, p: 4, u: 1n });

    expect(x.withError(2n, -14)).toEqual({ s: 123400000000000n, e: -14, p: 15, u: 2n });  // todo: ulp = 2

    expect(x.withError(0n)).toEqual({ s: 1234n, e: -3, p: 4, u: 0n });
  });

  test('floats', () => {
    const x = Irrational.from(1.234);
    expect(x).toEqual({ s: 12340000000000000n, e: -16, p: 17, u: 1n });

    expect(x.withError(0.001)).toEqual({ s: 1234n, e: -3, p: 4, u: 1n });

    expect(x.withError(2e-14)).toEqual({ s: 123400000000000n, e: -14, p: 15, u: 2n });  // todo: ulp = 2

    expect(x.withError(0)).toEqual({ s: 1234n, e: -3, p: 4, u: 0n });
  });

  test('strings', () => {
    const x = Irrational.from('1.234');
    expect(x).toEqual({ s: 1234n, e: -3, p: 4, u: 1n });

    expect(x.withError('0.001')).toEqual({ s: 1234n, e: -3, p: 4, u: 1n });

    expect(x.withError('2e-14')).toEqual({ s: 123400000000000n, e: -14, p: 15, u: 2n });  // todo: ulp = 2

    expect(x.withError('0')).toEqual({ s: 1234n, e: -3, p: 4, u: 0n });
  });
});

test('isInteger', () => {
  expect(Irrational.from('1.234').isInteger()).toEqual(false);
  expect(Irrational.from(1234n).isInteger()).toEqual(true);
  expect(Irrational.from(1234n, -6).isInteger()).toEqual(false);
  expect(Irrational.from(1234n, -6).isInteger()).toEqual(false);
});
