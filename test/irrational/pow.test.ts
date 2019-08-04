import test from 'ava';
import Irrational from '../../src/irrational';

test('pow', t => {
  const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y));

  t.is(pow(1, 1).valueOf(), 1);
  t.is(pow(1, -1).valueOf(), 1); 

  t.is(pow(2, 2).valueOf(), 4);
  t.is(pow(4, 2).valueOf(), 16);

  t.is(pow(2, 3).valueOf(), 2**3);
  t.is(pow(4, 3).valueOf(), 4**3);

  t.is(pow(2, -2).valueOf(), 1/4);
  t.is(pow(4, -2).valueOf(), 1/16);

  t.is(pow(2, -3).valueOf(), 1/2**3);
  t.is(pow(4, -3).valueOf(), 1/4**3);

  t.is(pow(9007199254740992n, 0).toString(), '0');
  t.is(pow(9007199254740992n, 1).toString(), '9.007199254740992e+15');
  t.is(pow(9007199254740992n, -1).toString(), '1.1102230246251565404…e-16');
                                            // 1.1102230246251565404236316680908203125

  t.is(pow(4, 0.5).toString(), '1.9999999999999999999');  // should be 2!

  /* t.is(pow(0.1, 0.2).toString(), '2e-2');
  t.is(pow(10, 0.2).toString(), '2.0');
  t.is(pow(9007199254740992n, 2).toString(), '1.8014398509481984e+16');
  t.is(pow(10_000_000_000_000_000n, '0.00_000_000_000_000_01').toString(), '1.0000000000000000'); */
});