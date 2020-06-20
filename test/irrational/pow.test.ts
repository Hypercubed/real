import test from 'ava';
import { Irrational } from '../../src/irrational';

test('pow', t => {
  const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y));

  t.is(pow(1, 1).toString(),  '1.e+0');
  t.is(pow(1, -1).toString(), '1.e+0');

  t.is(pow(2, 2).toString(), '4.e+0');
  t.is(pow('4.0', '2.0').toString(), '1.6e+1');

  t.is(pow(2, 3).toString(), '8.e+0');
  t.is(pow(4, 3).toString(), '6.e+1');

  t.is(pow('4.0', '3.0').toString(), '6.4e+1');
  // t.is(pow('4.00', '3.0').toString(), '6.4e+1');
  t.is(pow('4.0', '3.00').toString(), '6.4e+1');
  t.is(pow('4.00', '3.00').toString(), '6.40e+1');

  t.is(pow(2, -2).toString(), '2.e-1');
  t.is(pow(4, -2).toString(), '6.e-2');

  t.is(pow(2, -3).toString(), '1.e-1');
  t.is(pow(4, -3).toString(), '1.e-2');

  t.is(pow(9007199254740992n, 0).toString(),  '0.e+0');
  t.is(pow(9007199254740992n, 1).toString(),  '9.007199254740992e+15');

                                            // 1.1102230246251565404236316680908203125
  t.is(pow(9007199254740992n, -1).toString(), '1.110223024625156e-16');

  // t.is(pow(4, 0.5), '2.e+0');  // TODO: precision bug
});
