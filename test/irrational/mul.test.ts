import test from 'ava';
import { Irrational } from '../../src/irrational';

test('mul', t => {
  const mul = (x: any, y: any) => new Irrational(x).mul(new Irrational(y));

  t.is(mul(0, 0).toString(),                                               '0.e+0');
  t.is(mul(-0, 0).toString(),                                              '0.e+0');
  t.is(mul(1, 1).toString(),                                               '1.e+0');
  t.is(mul(1, -1).toString(),                                              '-1.e+0');

  t.is(mul('0.0', '0.0').toString(),                                        '0.0e+0');
  t.is(mul('-0.0', '0.00').toString(),                                         '0.0e+0');
  t.is(mul('1.00', '1.00').toString(),                                      '1.00e+0');
  t.is(mul('1.00', '-1.000').toString(),                                    '-1.00e+0');

  t.is(mul(0.1, 0.2).toString(),                                           '2.e-2');
  t.is(mul(10, 0.2).toString(),                                            '2.e+0');

  t.is(mul('10', '0.20').toString(),                                       '2.0e+0');

  t.is(mul(9007199254740992n, 2).toString(),                               '1.e+16');
  t.is(mul(9007199254740992n, '2.00000000000000000').toString(),           '1.801439850948198e+16');

  t.is(mul(10_000_000_000_000_000n, 0.00_000_000_000_000_01).toString(), '1.e+0');
  t.is(mul(10_000_000_000_000_000n, '1.000000000000000e-16').toString(), '1.000000000000000e+0');
});
