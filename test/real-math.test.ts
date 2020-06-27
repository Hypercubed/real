import { Rational } from '../src/rational';
import { Irrational } from '../src/irrational';
import * as Math from '../src/real-math';

test('abs', () => {
  expect(Math.abs(-3)).toBe(3);
  expect(Math.abs(-3n)).toBe(3n);

  expect(Math.abs(new Rational('-1.')).toString()).toBe('1');
  expect(Math.abs(new Irrational('-3.')).toString()).toBe('3.e+0');
});

test('trunc', () => {
  expect(Math.trunc(1.234).toString()).toBe('1');
  expect(Math.trunc(3n).toString()).toBe('3');

  expect(Math.trunc(new Rational('1.234')).toString()).toBe('1');
  expect(Math.trunc(new Irrational('3.456')).toString()).toBe('3.000e+0');

  expect(Math.trunc(-1.234).toString()).toBe('-1');
  expect(Math.trunc(-3n).toString()).toBe('-3');

  expect(Math.trunc(new Rational('-1.234')).toString()).toBe('-1');
  expect(Math.trunc(new Irrational('-3.456')).toString()).toBe('-3.000e+0');
});

test('ceil', () => {
  expect(Math.ceil(1.234).toString()).toBe('2');
  expect(Math.ceil(3n).toString()).toBe('3');

  expect(Math.ceil(new Rational('1.234')).toString()).toBe('2');
  expect(Math.ceil(new Irrational('3.456')).toString()).toBe('4.000e+0');

  expect(Math.ceil(-1.234).toString()).toBe('-1');
  expect(Math.ceil(-3n).toString()).toBe('-3');

  expect(Math.ceil(new Rational('-1.234')).toString()).toBe('-1');
  expect(Math.ceil(new Irrational('-3.456')).toString()).toBe('-3.000e+0');
});

test('floor', () => {
  expect(Math.floor(1.234).toString()).toBe('1');
  expect(Math.floor(3n).toString()).toBe('3');

  expect(Math.floor(new Rational('1.234')).toString()).toBe('1');
  expect(Math.floor(new Irrational('3.456')).toString()).toBe('3.000e+0');

  expect(Math.floor(-1.234).toString()).toBe('-2');
  expect(Math.floor(-3n).toString()).toBe('-3');

  expect(Math.floor(new Rational('-1.234')).toString()).toBe('-2');
  expect(Math.floor(new Irrational('-3.456')).toString()).toBe('-4.000e+0');
});

test('add', () => {
  expect(Math.add(1.234, 3.456).toString()).toBe('4.6900000000000000e+0');
  expect(Math.add(1n, 3n)).toBe(4n);

  expect(Math.add(new Rational('1.234'), new Rational('3.456')).toString()).toBe('469/100');
  expect(Math.add(new Irrational('1.234'), new Irrational('3.456')).toString()).toBe('4.690e+0');

  expect(Math.add(1.234, new Rational('3.456')).toString()).toBe('4.6900000000000000e+0');
  expect(Math.add(1n, new Irrational('3.456') ).toString()).toBe('4.456e+0');

  // expect(Math.add(new Rational('1.234'), new Irrational('3.456')).toString()).toBe('4.690e+0'); // TODO: bug
  expect(Math.add(new Irrational('1.234'), new Rational('3.456')).toString()).toBe('4.690e+0');
});

test('sub', () => {
  expect(Math.sub(1.234, 3.456).toString()).toBe('-2.2220000000000000e+0');
  expect(Math.sub(1n, 3n)).toBe(-2n);

  expect(Math.sub(new Rational('1.234'), new Rational('3.456')).toString()).toBe('-1111/500');
  expect(Math.sub(new Irrational('1.234'), new Irrational('3.456')).toString()).toBe('-2.222e+0');

  expect(Math.sub(1.234, new Rational('3.456')).toString()).toBe('-2.2220000000000000e+0');
  expect(Math.sub(1n, new Irrational( '3.456')).toString()).toBe('-2.456e+0');

  // expect(Math.sub(new Rational('1.234'), new Irrational('3.456')).toString()).toBe('-2.222e+0'); // TODO: bug
  expect(Math.sub(new Irrational('1.234'), new Rational('3.456')).toString()).toBe('-2.222e+0');
});

test('mul', () => {
  expect(Math.mul(1.234, 3.456).toString()).toBe('4.2647040000000000e+0');
  expect(Math.mul(2n, 3n)).toBe(6n);

  expect(Math.mul(new Rational('1.234'), new Rational('3.456')).toString()).toBe('66636/15625');
  expect(Math.mul(new Irrational('1.234'), new Irrational('3.456')).toString()).toBe('4.265e+0');  // 4.264704

  expect(Math.mul(1.234, new Rational('3.456')).toString()).toBe('4.2647040000000000e+0');  // 4.264704
  expect(Math.mul(2n, new Irrational('3.456')).toString()).toBe('6.912e+0');

  expect(Math.mul(new Rational('1.234'), new Irrational('3.456')).toString()).toBe('4.265e+0'); // 4.264704
  expect(Math.mul(new Irrational('1.234'), new Rational('3.456')).toString()).toBe('4.265e+0'); // 4.264704
});

test('div', () => {
  expect(Math.div(1n, 3n).toString()).toBe('1/3');
  expect(Math.div(new Rational(1.234), new Rational(3.456)).toString()).toBe('617/1728');

  expect(Math.div(1n, 3).toString()).toBe('3.33333333333333e-1');

  expect(Math.div(1.234, 3.456).toString()).toBe(                                    '3.5706018518518519e-1');
  // expect(Math.div(1.234, new Rational('3.456')).toString()).toBe(                    '0.0000000000000000e-3');  // TODO: bug?  (3.571e-1)       
  expect(Math.div(new Irrational('1.234'), new Irrational('3.456')).toString()).toBe('3.571e-1');
  expect(Math.div(new Rational('1.234'), new Irrational('3.456')).toString()).toBe(  '3.571e-1'); 
  expect(Math.div(new Irrational('1.234'), new Rational('3.456')).toString()).toBe(  '0.000e-3');  // TODO: bug?  (3.571e-1)
                                                                                 // 0.3_57060185185185185195185185185185185185185185185185185185...

  expect(Math.div(2n, new Irrational('3.456')).toString()).toBe('5.787e-1');
                                                            // 0.5_78703703703703703703703703703703703703703703703703703703...
});

test('inv', () => {
  expect(Math.inv(3n).toString()).toBe('1/3');
  expect(Math.inv(new Rational('3.456')).toString()).toBe('125/432');

  expect(Math.inv(3.456).toString()).toBe(                  '2.8935185185185185e-1');
  expect(Math.inv(new Irrational('3.456')).toString()).toBe('2.894e-1');
                                                        // 0.2_89351851851851851851851851851851851851851851851851851851...
});

test('ln', () => {
  // expect(Math.ln(2                      ).toString()).toBe('6.93180436959264e-1');
  // expect(Math.ln(2n                     ).toString()).toBe('6.93180436959263687413175060633e-1');
  expect(Math.ln(new Irrational('2.0000'  )).toString()).toBe('6.9318e-1');
  // expect(Math.ln(new Rational('2.')  ).toString()).toBe('7.e-1'); // TODO: bug 
                                                       //   6.93147180559945309417232121458176568075500134360255254120...

  expect(Math.ln(1.234).toString()).toBe(                   '2.1358745679195203e-1'); // TODO: precision bug
  // expect(Math.ln(new Rational('1.234')).toString()).toBe('2.136e-1');  // TODO: bug 
  expect(Math.ln(new Irrational('1.234')).toString()).toBe( '2.136e-1');  // TODO: precision bug
                                                          // 2.102609254831960713608294360152747699866305851127995

  expect(Math.ln(3.456).toString()).toBe(                  '1.2428839137796235e+0'); // TODO: precision bug
  // expect(Math.ln(new Rational(3.456)).toString()).toBe( '1.243e+0');  // TODO: bug 
  expect(Math.ln(new Irrational('3.456')).toString()).toBe('1.243e+0');
                                                         // 1.240111850941809188052386196921720467667668148103716205948...
});
