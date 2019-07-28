import test from 'ava';
import { Rational } from '../../src/';

test('cmp', t => {
  const cmp = (x: any, y: any) => new Rational(x).cmp(new Rational(y)).toString();

  t.is(cmp(0, 0), '0');
  t.is(cmp(1, 0), '1');
  t.is(cmp(0, 1), '-1');

  t.is(cmp(0.1, 10), '-1');
  t.is(cmp(10, 1), '1');

  t.is(cmp(9007199254740992n, 9007199254740994n), '-1');
  t.is(cmp('9.007199254740996', '9.007199254740994'), '1');
});
