import test from 'ava';
import Real from "../src/real"

test('cmp', t => {
  const cmp = (x: any, y: any) => new Real(x).cmp(new Real(y)).toString();

  t.is(cmp(0, 0), '0');
  t.is(cmp(1, 0), '1');
  t.is(cmp(0, 1), '-1');

  t.is(cmp(0.1, 10), '-1');
  t.is(cmp(10, 1), '1');

  t.is(cmp(9007199254740992n, 9007199254740994n), '-1');
  t.is(cmp(9007199254740996n, 9007199254740994n), '1');
});
