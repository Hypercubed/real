import { Irrational } from '../../src/irrational';

const add = (x: any, y: any) => new Irrational(x).add(new Irrational(y));

test('add', () => {
  expect(add( 0,  0).toString()).toBe('0.e+0');
  expect(add(-0,  0).toString()).toBe('0.e+0');
  expect(add( 1,  1).toString()).toBe('2.e+0');
  expect(add( 1, -1).toString()).toBe('0.e+0');

  expect(add(0.1, 0.2).toString()).toBe('3.e-1');
  expect(add(9007199254740992n, 2).toString()).toBe('9.007199254740994e+15');
  expect(add(10000000000000000n, '0.00000000001').toString()).toBe('1.0000000000000000e+16');
});
