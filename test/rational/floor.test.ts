import test from 'ava';
import { Rational } from '../../src/';

test('floor', t => {
  const floor = (x: any) => new Rational(x).floor();

  t.is(floor(1),                       1n);
  t.is(floor(-1),                     -1n);
  t.is(floor(2),                       2n);
  t.is(floor(-2),                     -2n);

  t.is(floor(0.1),                     0n);
  t.is(floor(2.5),                     2n);
  t.is(floor(10),                      10n);

  t.is(floor(-0.1),                   -1n);
  t.is(floor(-2.5),                   -3n);
  t.is(floor(-10),                    -10n);

  t.is(floor(9007199254740992n),       9007199254740992n);
  t.is(floor(9007199254740994n),       9007199254740994n);
  t.is(floor(10_000_000_000_000_000n), 10000000000000000n);
 
  t.is(floor('900719.9254740992'),     900719n);
  t.is(floor('90071992.54740994'),     90071992n);
  t.is(floor(10_000_000.00000),        10000000n);

  t.is(floor('-900719.9254740992'),   -900720n);
  t.is(floor('-90071992.54740994'),   -90071993n);
  t.is(floor(-10_000_000.00000),      -10000000n);
});
