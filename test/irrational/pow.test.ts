import test from 'ava';
import Irrational from '../../src/irrational';

test('pow', t => {
  const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y)).toString();

  t.is(pow(1, 1),  '1.0000000000000000000e+0');
  t.is(pow(1, -1), '1.0000000000000000000e+0');

  // t.is(pow(2, 2), 4);
  // t.is(pow(4, 0.5), 2);

  /* t.is(pow(0.1, 0.2, '2e-2');
  t.is(pow(10, 0.2), '2.0');
  t.is(pow(9007199254740992n, 2), '1.8014398509481984e+16');
  t.is(pow(10_000_000_000_000_000n, '0.00_000_000_000_000_01'), '1.0000000000000000'); */
});
