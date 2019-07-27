import test from 'ava';
import Rational from '../../src/rational';

test('inv', t => {
  const inv = (x: any) => new Rational(x).inv().toString();

  // t.is(inv(0), '0');
  t.is(inv(1), '1');
  t.is(inv(-1), '-1');
  t.is(inv(2), '1/2');

  t.is(inv(0.1), '10');
  t.is(inv(10), '1/10');

  t.is(inv(9007199254740992n), '1/9007199254740992');
  t.is(inv(10_000_000_000_000_000n), '1/10000000000000000');
});
