import test from 'ava';
import { Irrational } from '../../src/irrational';

test('inv', t => {
  const inv = (x: any) => new Irrational(x).inv();

  t.is(inv(1).toString(),                            '1.e+0');
  t.is(inv(-1).toString(),                          '-1.e+0');
  t.is(inv(2).toString(),                            '5.e-1');

  t.is(inv(0.1).toString(),                          '1.e+1');
  t.is(inv(10).toString(),                           '1.0e-1');

                                                   // 1.1102230246251565404236316680908203125 × 10^-16
  t.is(inv(9007199254740992n).toString(),            '1.110223024625156e-16');

  t.is(inv(10_000_000_000_000_000n).toString(),      '1.0000000000000000e-16'); // TODO: bug, doesn't match precision
});
