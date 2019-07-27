import test from 'ava';
import Irrational from '../../src/irrational';

test('trunc', t => {
  const fp = (x: any) => new Irrational(x).fp();

  t.is(fp(1).valueOf(), 0);
  t.is(fp(-1).valueOf(), 0);
  t.is(fp(2).valueOf(), 0);
  t.is(fp(-2).valueOf(), 0);

  t.is(fp(0.1).valueOf(), 0.1);
  t.is(fp(2.5).valueOf(), 0.5);
  t.is(fp(10).valueOf(), 0);

  t.is(fp(-0.1).valueOf(), 0.1);
  t.is(fp(-2.5).valueOf(), 0.5);
  t.is(fp(-10).valueOf(), 0);

  t.is(fp(9007199254740992n).valueOf(), 0);
  t.is(fp(9007199254740994n).valueOf(), 0);
  t.is(fp(10_000_000_000_000_000n).valueOf(), 0);

  t.is(fp('900719.9254740992').toString(), '9254740992e-10');
  t.is(fp('90071992.54740994').toString(), '54740994e-8');
  t.is(fp(10_000_000.00000).toString(), '0');

  t.is(fp('-900719.9254740992').toString(), '9254740992e-10');
  t.is(fp('-90071992.54740994').toString(), '54740994e-8');
  t.is(fp(-10_000_000.00000).toString(), '0');
});
