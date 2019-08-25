import test from 'ava';
import Real from '../../src/irrational';

test('trunc', t => {
  const trunc = (x: any) => new Real(x).trunc();

  t.is(trunc(1),   1n);
  t.is(trunc(-1), -1n);
  t.is(trunc(2),   2n);
  t.is(trunc(-2), -2n);

  t.is(trunc(0.1), 0n);
  t.is(trunc(2.5), 2n);
  t.is(trunc(10),  10n);

  t.is(trunc(-0.1),  0n);
  t.is(trunc(-2.5), -2n);
  t.is(trunc(-10),  -10n);

  t.is(trunc(9007199254740992n),       9007199254740992n);
  t.is(trunc(9007199254740994n),       9007199254740994n);
  t.is(trunc(10_000_000_000_000_000n), 10_000_000_000_000_000n);

  t.is(trunc('900719.9254740992'), 900719n);
  t.is(trunc('90071992.54740994'), 90071992n);
  t.is(trunc(10_000_000.00000),    10_000_000n);

  t.is(trunc('-900719.9254740992'), -900719n);
  t.is(trunc('-90071992.54740994'), -90071992n);
  t.is(trunc(-10_000_000.00000),    -10_000_000n);
});
