import { Irrational } from '../../src/irrational';

const inv = (x: any) => new Irrational(x).inv();

test('inv', () => {
  expect(inv(1).toString()).toBe('1.e+0');
  expect(inv(-1).toString()).toBe('-1.e+0');
  expect(inv(2).toString()).toBe('5.e-1');

  expect(inv(0.1).toString()).toBe('1.e+1');
  expect(inv(10).toString()).toBe('1.0e-1');

                                               // 1.1102230246251565404236316680908203125 × 10^-16
  expect(inv(9007199254740992n).toString()).toBe('1.110223024625156e-16');

  expect(inv(10000000000000000n).toString()).toBe('1.0000000000000000e-16'); // TODO: precision bug
});
