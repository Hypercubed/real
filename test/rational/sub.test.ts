import test from 'ava';
import Rational from '../../src/rational';

test('sub', t => {
  const sub = (x: any, y: any) => new Rational(x).sub(new Rational(y)).toString();

  t.is(sub(0, 0), '0');
  t.is(sub(-0, 0), '0');
  t.is(sub(1, 1), '0');
  t.is(sub(1, -1), '2');

  t.is(sub(0.1, 0.2), '-1/10');
  t.is(sub(9007199254740992n, 2), '9007199254740990');
  t.is(sub(10000000000000000n, '0.00000000001'), '999999999999999999999999999/100000000000');
});
