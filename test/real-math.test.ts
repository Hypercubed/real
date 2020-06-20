import test from 'ava';

import { Rational } from '../src/rational';
import { Irrational } from '../src/irrational';
import * as Math from '../src/real-math';

test('abs', t => {
  t.is(Math.abs(-3),  3);
  t.is(Math.abs(-3n), 3n);

  t.is(Math.abs(new Rational(-1)).toString(),   '1');
  t.is(Math.abs(new Irrational(-3)).toString(), '3.0000000000000000000e+0');
});

test('trunc', t => {
  t.is(Math.trunc(1.234), 1);
  t.is(Math.trunc(3n),    3n);

  t.is(Math.trunc(new Rational(1.234)),   1n);
  t.is(Math.trunc(new Irrational(3.456)), 3n);

  t.is(Math.trunc(-1.234), -1);
  t.is(Math.trunc(-3n),    -3n);

  t.is(Math.trunc(new Rational(-1.234)),   -1n);
  t.is(Math.trunc(new Irrational(-3.456)), -3n);
});

test('ceil', t => {
  t.is(Math.ceil(1.234), 2);
  t.is(Math.ceil(3n),    3n);

  t.is(Math.ceil(new Rational(1.234)),   2n);
  t.is(Math.ceil(new Irrational(3.456)), 4n);

  t.is(Math.ceil(-1.234), -1);
  t.is(Math.ceil(-3n),    -3n);

  t.is(Math.ceil(new Rational(-1.234)), -1n);
  t.is(Math.ceil(new Irrational(-3.456)), -3n);
});

test('floor', t => {
  t.is(Math.floor(1.234), 1);
  t.is(Math.floor(3n), 3n);

  t.is(Math.floor(new Rational(1.234)), 1n);
  t.is(Math.floor(new Irrational(3.456)), 3n);

  t.is(Math.floor(-1.234), -2);
  t.is(Math.floor(-3n), -3n);

  t.is(Math.floor(new Rational(-1.234)), -2n);
  t.is(Math.floor(new Irrational(-3.456)), -4n);
});

test('add', t => {
  t.is(Math.add(1.234, 3.456).toString(), '4.6900000000000000000e+0');
  t.is(Math.add(1n, 3n), 4n);

  t.is(Math.add(new Rational(1.234), new Rational(3.456)).toString(), '469/100');
  t.is(Math.add(new Irrational(1.234), new Irrational(3.456)).toString(), '4.6900000000000000000e+0');

  t.is(Math.add(1.234, new Rational(3.456)).toString(), '4.6900000000000000000e+0');
  t.is(Math.add(1n, new Irrational(3.456)).toString(), '4.4560000000000000000e+0');

  t.is(Math.add(new Rational(1.234), new Irrational(3.456)).toString(), '4.6900000000000000000e+0');
  t.is(Math.add(new Irrational(1.234), new Rational(3.456)).toString(), '4.6900000000000000000e+0');
});

test('sub', t => {
  t.is(Math.sub(1.234, 3.456).toString(), '-2.2220000000000000000e+0');
  t.is(Math.sub(1n, 3n), -2n);

  t.is(Math.sub(new Rational(1.234), new Rational(3.456)).toString(), '-1111/500');
  t.is(Math.sub(new Irrational(1.234), new Irrational(3.456)).toString(), '-2.2220000000000000000e+0');

  t.is(Math.sub(1.234, new Rational(3.456)).toString(), '-2.2220000000000000000e+0');
  t.is(Math.sub(1n, new Irrational(3.456)).toString(), '-2.4560000000000000000e+0');

  t.is(Math.sub(new Rational(1.234), new Irrational(3.456)).toString(), '-2.2220000000000000000e+0');
  t.is(Math.sub(new Irrational(1.234), new Rational(3.456)).toString(), '-2.2220000000000000000e+0');
});

test('mul', t => {
  t.is(Math.mul(1.234, 3.456).toString(), '4.2647040000000000000e+0');
  t.is(Math.mul(2n, 3n), 6n);

  t.is(Math.mul(new Rational(1.234), new Rational(3.456)).toString(), '66636/15625');
  t.is(Math.mul(new Irrational(1.234), new Irrational(3.456)).toString(), '4.2647040000000000000e+0');

  t.is(Math.mul(1.234, new Rational(3.456)).toString(), '4.2647040000000000000e+0');
  t.is(Math.mul(2n, new Irrational(3.456)).toString(),  '6.9120000000000000000e+0');

  t.is(Math.mul(new Rational(1.234), new Irrational(3.456)).toString(), '4.2647040000000000000e+0');
  t.is(Math.mul(new Irrational(1.234), new Rational(3.456)).toString(), '4.2647040000000000000e+0');
});

test('div', t => {
  t.is(Math.div(1n, 3n).toString(),                                       '1/3');
  t.is(Math.div(new Rational(1.234), new Rational(3.456)).toString(),     '617/1728');

  t.is(Math.div(1n, 3).toString(),                                        '3.3333333333333333333e-1');

  t.is(Math.div(1.234, 3.456).toString(),                                 '3.5706018518518518519e-1');
  t.is(Math.div(1.234, new Rational(3.456)).toString(),                   '3.5706018518518518519e-1');         
  t.is(Math.div(new Irrational(1.234), new Irrational(3.456)).toString(), '3.5706018518518518519e-1');
  t.is(Math.div(new Rational(1.234), new Irrational(3.456)).toString(),   '3.5706018518518518519e-1');
  t.is(Math.div(new Irrational(1.234), new Rational(3.456)).toString(),   '3.5706018518518518519e-1');
                                                                      // 0.3_57060185185185185195185185185185185185185185185185185185...

  t.is(Math.div(2n, new Irrational(3.456)).toString(),  '5.7870370370370370370e-1');
                                                    // 0.5_78703703703703703703703703703703703703703703703703703703...
}); 

test('inv', t => {
  t.is(Math.inv(3n).toString(), '1/3');
  t.is(Math.inv(new Rational(3.456)).toString(),   '125/432');

  t.is(Math.inv(3.456).toString(),                 '2.8935185185185185185e-1');
                                               // 0.2_89351851851851851851851851851851851851851851851851851851...
  t.is(Math.inv(new Irrational(3.456)).toString(), '2.8935185185185185185e-1');
                                                // 1.240111850941809188052386196921720467667668148103716205948...
});

test('ln', t => {
  t.is(Math.ln(2n).toString(),    '6.9314718055994530965e-1');
                              // 0.6_93147180559945309417232121458176568075500134360255254120...

  // t.is(Math.ln(3.456).toString(), '1.240111850941809188052386e+0');
                                // 1.240111850941809188052386196921720467667668148103716205948...

  // t.is(Math.ln(new Rational(1.234)).toString(), '2.1026092548319607136e-1');
                                            // 0.2_102609254831960713608294360152747699866305851127995
  // t.is(Math.ln(new Irrational(3.456)).toString(), '1.2401118509418091880e+0');
                                                // 1.240111850941809188052386196921720467667668148103716205948...
});
