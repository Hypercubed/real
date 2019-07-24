import test from 'ava';
import Real from "../src/real"

test('add', t => {
  const add = (x: any, y: any) => new Real(x).add(new Real(y)).toString();

  t.is(add(0, 0), '0');
  t.is(add(-0, 0), '0');
  t.is(add(1, 1), '2');
  t.is(add(1, -1), '0');

  t.is(add(0.1, 0.2), '3e-1');
  t.is(add(9007199254740992n, 2), '9007199254740994');
  t.is(add(10000000000000000n, '0.00000000001'), '1000000000000000000000000001e-11');
});
