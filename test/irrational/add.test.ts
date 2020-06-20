import test from 'ava';
import { Irrational } from '../../src/irrational';

test('add', t => {
  const add = (x: any, y: any) => new Irrational(x).add(new Irrational(y)).toString();

  t.is(add( 0,  0),                              '0.e+0');
  t.is(add(-0,  0),                              '0.e+0');
  t.is(add( 1,  1),                              '2.e+0');
  t.is(add( 1, -1),                              '0.e+0');

  t.is(add(0.1, 0.2),                            '3.e-1');
  t.is(add(9007199254740992n, 2),                '9.007199254740994e+15');
  // t.is(add(10000000000000000n, '0.00000000001'), '10000000000000001e+16');  // TODO: Error, cannot add numbers outside precision
});
