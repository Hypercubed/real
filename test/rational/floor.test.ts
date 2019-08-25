import test from 'ava';
import { Rational } from '../../src/';

test('floor', t => {
  const floor = (x: any) => new Rational(x).floor().toString();

  t.is(floor(1),                       '1');
  t.is(floor(-1),                     '-1');
  t.is(floor(2),                       '2');
  t.is(floor(-2),                     '-2');

  t.is(floor(0.1),                     '0');
  t.is(floor(2.5),                     '2');
  t.is(floor(10),                      '10');

  t.is(floor(-0.1),                   '-1');
  t.is(floor(-2.5),                   '-3');
  t.is(floor(-10),                    '-10');

  t.is(floor(9007199254740992n),       '9007199254740992');
  t.is(floor(9007199254740994n),       '9007199254740994');
  t.is(floor(10_000_000_000_000_000n), '10000000000000000');
 
  t.is(floor('900719.9254740992'),     '900719');
  t.is(floor('90071992.54740994'),     '90071992');
  t.is(floor(10_000_000.00000),        '10000000');

  t.is(floor('-900719.9254740992'),   '-900720');
  t.is(floor('-90071992.54740994'),   '-90071993');
  t.is(floor(-10_000_000.00000),      '-10000000');
});
