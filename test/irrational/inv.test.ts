import test from 'ava';
import Irrational from '../../src/irrational';

test('inv', t => {
  const inv = (x: any) => new Irrational(x).inv();

  // t.is(inv(0), '0');
  t.is(inv(1).valueOf(), 1);
  t.is(inv(-1).valueOf(), -1);
  t.is(inv(2).valueOf(), 0.5);

  t.is(inv(0.1).valueOf(), 10);
  t.is(inv(10).valueOf(), 0.1);

  t.is(inv(9007199254740992n).toString(), '1.1102230246251565404…e-16');
                                        // 1.1102230246251565404236316680908203125 × 10^-16
  t.is(inv(10_000_000_000_000_000n).toString(), '1.0000000000000000000…e-16');
});
