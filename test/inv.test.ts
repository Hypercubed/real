import test from 'ava';
import Real from "../src/real"

test('inv', t => {
  const inv = (x: any) => new Real(x).inv().valueOf();

  // t.is(inv(0), '0');
  t.is(inv(1), 1);
  t.is(inv(-1), -1);
  t.is(inv(2), 0.5);

  t.is(inv(0.1), 10);
  t.is(inv(10), 0.1);

  t.is(inv(9007199254740992n), 1.1102e-16);
  t.is(inv(10_000_000_000_000_000n), 1e-16);
});
