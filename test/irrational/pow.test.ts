import test from 'ava';
import Irrational from '../../src/irrational';

test('pow', t => {
  const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y)).toString();

  t.is(pow(1, 1),  '1.0000000000000000000e+0');
  t.is(pow(1, -1), '1.0000000000000000000e+0'); 

  t.is(pow(2, 2), '4.0000000000000000000e+0');
  t.is(pow(4, 2), '1.6000000000000000000e+1');

  t.is(pow(2, 3), '8.0000000000000000000e+0');
  t.is(pow(4, 3), '6.4000000000000000000e+1');

  t.is(pow(2, -2), '2.5000000000000000000e-1');
  t.is(pow(4, -2), '6.2500000000000000000e-2');

  t.is(pow(2, -3), '1.2500000000000000000e-1');
  t.is(pow(4, -3), '1.5625000000000000000e-2');

  t.is(pow(9007199254740992n, 0),  '0.0000000000000000000e+0');
  t.is(pow(9007199254740992n, 1),  '9.0071992547409920000e+15');
  t.is(pow(9007199254740992n, -1), '1.1102230246251565404e-16');
                                 // 1.1102230246251565404236316680908203125

  t.is(pow(4, 0.5), '1.9999999999999999999e+0');  // should be 2!!
});
