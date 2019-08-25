import test from 'ava';
import Irrational from '../../src/irrational';

test('ceil', t => {
  const ceil = (x: any) => new Irrational(x).ceil();

  t.is(ceil( 1),                     1n);
  t.is(ceil(-1),                    -1n);
  t.is(ceil( 2),                     2n);

  t.is(ceil(0.1),                    1n);
  t.is(ceil(10),                     10n);

  t.is(ceil(9007199254740992n),       9007199254740992n);
  t.is(ceil(9007199254740994n),       9007199254740994n);
  t.is(ceil(10_000_000_000_000_000n), 10_000_000_000_000_000n);

  t.is(ceil('900719.9254740992'),    900720n);
  t.is(ceil('90071992.54740994'),    90071993n);
  t.is(ceil(10_000_000.00000),       10_000_000n);
 
  t.is(ceil('-900719.9254740992'),  -900719n);
  t.is(ceil('-90071992.54740994'),  -90071992n);
  t.is(ceil(-10_000_000.00000),     -10_000_000n);
});
