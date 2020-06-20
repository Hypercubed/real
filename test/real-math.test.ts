import test from 'ava';

import { Rational } from '../src/rational';
import { Irrational } from '../src/irrational';
import * as Math from '../src/real-math';

test('abs', t => {
  t.is(Math.abs(-3),  3);
  t.is(Math.abs(-3n), 3n);

  t.is(Math.abs(new Rational(-1)).toString(),   '1');
  t.is(Math.abs(new Irrational(-3)).toString(), '3.e+0');
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
  t.is(Math.add(1.234, 3.456).toString(), '4.690e+0');
  t.is(Math.add(1n, 3n), 4n);

  t.is(Math.add(new Rational(1.234), new Rational(3.456)).toString(), '469/100');
  t.is(Math.add(new Irrational(1.234), new Irrational(3.456)).toString(), '4.690e+0');

  t.is(Math.add(1.234, new Rational(3.456)).toString(), '4.690e+0');
  t.is(Math.add(1n, new Irrational(3.456)).toString(), '4.e+0');

  t.is(Math.add(new Rational(1.234), new Irrational(3.456)).toString(), '4.69e+0');  // precision
  t.is(Math.add(new Irrational(1.234), new Rational(3.456)).toString(), '4.690e+0');
});

test('sub', t => {
  t.is(Math.sub(1.234, 3.456).toString(), '-2.222e+0');
  t.is(Math.sub(1n, 3n), -2n);

  t.is(Math.sub(new Rational(1.234), new Rational(3.456)).toString(), '-1111/500');
  t.is(Math.sub(new Irrational(1.234), new Irrational(3.456)).toString(), '-2.222e+0');

  t.is(Math.sub(1.234, new Rational(3.456)).toString(), '-2.222e+0');
  t.is(Math.sub(1n, new Irrational(3.456)).toString(), '-2.e+0');

  t.is(Math.sub(new Rational(1.234), new Irrational(3.456)).toString(), '-2.22e+0');  // precision
  t.is(Math.sub(new Irrational(1.234), new Rational(3.456)).toString(), '-2.222e+0');
});

test('mul', t => {
  t.is(Math.mul(1.234, 3.456).toString(), '4.264e+0');
  t.is(Math.mul(2n, 3n), 6n);

  t.is(Math.mul(new Rational(1.234), new Rational(3.456)).toString(), '66636/15625');
  t.is(Math.mul(new Irrational(1.234), new Irrational(3.456)).toString(), '4.264e+0');

  t.is(Math.mul(1.234, new Rational(3.456)).toString(), '4.26e+0');  // TODO: precision
  t.is(Math.mul(2n, new Irrational(3.456)).toString(),  '6.e+0');

  t.is(Math.mul(new Rational(1.234), new Irrational(3.456)).toString(), '4.26e+0');  // TODO: precision
  t.is(Math.mul(new Irrational(1.234), new Rational(3.456)).toString(), '4.26e+0');  // TODO: precision
});

test('div', t => {
  t.is(Math.div(1n, 3n).toString(),                                       '1/3');
  t.is(Math.div(new Rational(1.234), new Rational(3.456)).toString(),     '617/1728');

  t.is(Math.div(1n, 3).toString(),                                        '3.e-1');

  t.is(Math.div(1.234, 3.456).toString(),                                 '3.570e-1');
  // t.is(Math.div(1.234, new Rational(3.456)).toString(),                   '3.570e-1');         
  t.is(Math.div(new Irrational(1.234), new Irrational(3.456)).toString(), '3.570e-1');
  // t.is(Math.div(new Rational(1.234), new Irrational(3.456)).toString(),   '3.570e-1');
  // t.is(Math.div(new Irrational(1.234), new Rational(3.456)).toString(),   '3.570e-1');
                                                                      // 0.3_57060185185185185195185185185185185185185185185185185185...

  t.is(Math.div(2n, new Irrational(3.456)).toString(),  '5.e-1');
                                                    // 0.5_78703703703703703703703703703703703703703703703703703703...
}); 

test('inv', t => {
  t.is(Math.inv(3n).toString(), '1/3');
  t.is(Math.inv(new Rational(3.456)).toString(),   '125/432');

  t.is(Math.inv(3.456).toString(),                 '2.893e-1');
                                               // 0.2_89351851851851851851851851851851851851851851851851851851...
  t.is(Math.inv(new Irrational(3.456)).toString(), '2.893e-1');
                                                // 1.240111850941809188052386196921720467667668148103716205948...
});

test('ln', t => {
  t.is(Math.ln(2n).toString(),    '6.e-1');
                                    // 0.6_93147180559945309417232121458176568075500134360255254120...

  t.is(Math.ln(3.456).toString(), '1.242e+0');  // precision
                                // 1.240111850941809188052386196921720467667668148103716205948...

  t.is(Math.ln(new Rational(1.234)).toString(), '2.13e-1'); // precision
                                            // 0.2_102609254831960713608294360152747699866305851127995

  t.is(Math.ln(new Irrational(3.456)).toString(), '1.242e+0'); // precision
                                                // 1.240111850941809188052386196921720467667668148103716205948...
});
