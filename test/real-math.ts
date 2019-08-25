import test from 'ava';

import Rational from '../src/rational';
import Irrational from '../src/irrational';
import * as Math from '../src/real';

test('abs', t => {
  t.is(Math.abs(-3), 3);
  t.is(Math.abs(-3n), 3n);

  t.is(Math.abs(new Rational(-1)).toString(), '1');
  t.is(Math.abs(new Irrational(-3)).toString(), '3');
});

test('ceil', t => {
  t.is(Math.ceil(1.234), 2);
  // t.is(Math.abs(3.456), 4n);

  t.is(Math.ceil(new Rational(1.234)).toString(), '2');
  t.is(Math.ceil(new Irrational(3.456)).toString(), '4');
});

test('add', t => {
  t.is(Math.add(1.234, 3.456).toString(), '469/100');
  t.is(Math.add(1n, 3n), 4n);

  t.is(Math.add(new Rational(1.234), new Rational(3.456)).toString(), '469/100');
  t.is(Math.add(new Irrational(1.234), new Irrational(3.456)).toString(), '4.690');

  t.is(Math.add(1.234, new Rational(3.456)).toString(), '469/100');
  t.is(Math.add(1n, new Irrational(3.456)).toString(), '4.456');

  t.is(Math.add(new Rational(1.234), new Irrational(3.456)).toString(), '4.6900000000000000000');
  t.is(Math.add(new Irrational(1.234), new Rational(3.456)).toString(), '4.6900000000000000000');
});

test('sub', t => {
  t.is(Math.sub(new Rational(1.234), new Rational(3.456)).toString(), '-1111/500');
  t.is(Math.sub(new Rational(1.234), new Irrational(3.456)).toString(), '-2.2220000000000000000');
});

test('ln', t => {
  t.is(Math.ln(new Rational(1.234)).toString(), '2.1026092548319607136…e-1');
                                            // 0.2_102609254831960713608294360152747699866305851127995
  t.is(Math.ln(new Irrational(3.456)).toString(), '1.2401118509418091880');
                                                // 1.240111850941809188052386196921720467667668148103716205948...
});