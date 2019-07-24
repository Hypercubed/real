import test from 'ava';
import Real from "../src/real"

test('mul', t => {
  const mul = (x: any, y: any) => new Real(x).mul(new Real(y)).toString();

  t.is(mul(0, 0), '0');
  t.is(mul(-0, 0), '0');
  t.is(mul(1, 1), '1');
  t.is(mul(1, -1), '-1');

  t.is(mul(0.1, 0.2), '2e-2');
  t.is(mul(10, 0.2), '20e-1');
  t.is(mul(9007199254740992n, 2), '18014398509481984');
  t.is(mul(10_000_000_000_000_000n, '0.00_000_000_000_000_01'), '10000000000000000e-16');
});
