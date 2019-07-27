import test from 'ava';
import Real from '../../src/irrational';

test('trunc', t => {
  const trunc = (x: any) => new Real(x).trunc();

  t.is(trunc(1).valueOf(), 1);
  t.is(trunc(-1).valueOf(), -1);
  t.is(trunc(2).valueOf(), 2);
  t.is(trunc(-2).valueOf(), -2);

  t.is(trunc(0.1).valueOf(), 0);
  t.is(trunc(2.5).valueOf(), 2);
  t.is(trunc(10).valueOf(), 10);

  t.is(trunc(-0.1).valueOf(), 0);
  t.is(trunc(-2.5).valueOf(), -2);
  t.is(trunc(-10).valueOf(), -10);

  t.is(trunc(9007199254740992n).valueOf(), 9007199254740992);
  t.is(trunc(9007199254740994n).valueOf(), 9007199254740994);
  t.is(trunc(10_000_000_000_000_000n).valueOf(), 10_000_000_000_000_000);

  t.is(trunc('900719.9254740992').toString(), '900719');
  t.is(trunc('90071992.54740994').toString(), '90071992');
  t.is(trunc(10_000_000.00000).toString(), '1e7');

  t.is(trunc('-900719.9254740992').toString(), '-900719');
  t.is(trunc('-90071992.54740994').toString(), '-90071992');
  t.is(trunc(-10_000_000.00000).toString(), '-1e7');
});
