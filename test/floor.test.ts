import test from 'ava';
import Real from "../src/real"

test('floor', t => {
  const floor = (x: any) => new Real(x).floor();

  t.is(floor(1).valueOf(), 1);
  t.is(floor(-1).valueOf(), -1);
  t.is(floor(2).valueOf(), 2);
  t.is(floor(-2).valueOf(), -2);

  t.is(floor(0.1).valueOf(), 0);
  t.is(floor(2.5).valueOf(), 2);
  t.is(floor(10).valueOf(), 10);

  t.is(floor(-0.1).valueOf(), -1);
  t.is(floor(-2.5).valueOf(), -3);
  t.is(floor(-10).valueOf(), -10);

  t.is(floor(9007199254740992n).valueOf(), 9007199254740992);
  t.is(floor(9007199254740994n).valueOf(), 9007199254740994);
  t.is(floor(10_000_000_000_000_000n).valueOf(), 10_000_000_000_000_000);

  t.is(floor('900719.9254740992').toString(), '900719');
  t.is(floor('90071992.54740994').toString(), '90071992');
  t.is(floor(10_000_000.00000).toString(), '10000000');

  t.is(floor('-900719.9254740992').toString(), '-900720');
  t.is(floor('-90071992.54740994').toString(), '-90071993');
  t.is(floor(-10_000_000.00000).toString(), '-10000000');
});
