import test from 'ava';
import Irrational from '../../src/irrational';

test('mul', t => {
  const mul = (x: any, y: any) => new Irrational(x).mul(new Irrational(y)).toString();

  t.is(mul(0, 0),                                               '0.0000000000000000000e+0');
  t.is(mul(-0, 0),                                              '0.0000000000000000000e+0');
  t.is(mul(1, 1),                                               '1.0000000000000000000e+0');
  t.is(mul(1, -1),                                              '-1.0000000000000000000e+0');

  t.is(mul(0.1, 0.2),                                           '2.0000000000000000000e-2');
  t.is(mul(10, 0.2),                                            '2.0000000000000000000e+0');
  t.is(mul(9007199254740992n, 2),                               '1.8014398509481984000e+16');
  t.is(mul(10_000_000_000_000_000n, '0.00_000_000_000_000_01'), '1.0000000000000000000e+0');
});
