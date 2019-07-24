import test from 'ava';
import Real from "../src/real"

test('ceil', t => {
  const ceil = (x: any) => new Real(x).ceil();

  t.is(ceil(1).valueOf(), 1);
  t.is(ceil(-1).valueOf(), -1);
  t.is(ceil(2).valueOf(), 2);

  t.is(ceil(0.1).valueOf(), 1);
  t.is(ceil(10).valueOf(), 10);

  t.is(ceil(9007199254740992n).valueOf(), 9007199254740992);
  t.is(ceil(9007199254740994n).valueOf(), 9007199254740994);
  t.is(ceil(10_000_000_000_000_000n).valueOf(), 10_000_000_000_000_000);

  t.is(ceil('900719.9254740992').toString(), '900720');
  t.is(ceil('90071992.54740994').toString(), '90071993');
  t.is(ceil(10_000_000.00000).toString(), '10000000');

  t.is(ceil('-900719.9254740992').toString(), '-900719');
  t.is(ceil('-90071992.54740994').toString(), '-90071992');
  t.is(ceil(-10_000_000.00000).toString(), '-10000000');
});
