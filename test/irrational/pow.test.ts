import { Irrational } from '../../src/irrational';

const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y));

test('pow', () => {
  expect(pow('1.', '1.').toString()).toBe('1.e+0');
  expect(pow('1.', '-1.').toString()).toBe('1.e+0');

  expect(pow('2.', '2.').toString()).toBe('4.e+0');
  expect(pow('4.0', '2.0').toString()).toBe('1.6e+1');

  expect(pow('2.', '3.').toString()).toBe('8.e+0');
  expect(pow('4.', '3.').toString()).toBe('6.e+1');

  expect(pow('4.0',  '3.0' ).toString()).toBe('6.4e+1');  // 64
  expect(pow('4.00', '3.0' ).toString()).toBe('6.4e+1');
  expect(pow('4.0',  '3.00').toString()).toBe('6.4e+1');
  expect(pow('4.00', '3.00').toString()).toBe('6.40e+1');

  expect(pow('2.', '-2.').toString()).toBe('3.e-1');  // 0.25
  expect(pow('4.', '-2.').toString()).toBe('6.e-2');

  expect(pow('2.', '-3.').toString()).toBe('1.e-1');
  expect(pow('4.', '-3.').toString()).toBe('2.e-2');

  expect(pow('2.0000', '-2.0000').toString()).toBe('2.5000e-1');
  expect(pow('4.0000', '-2.0000').toString()).toBe('6.2500e-2');

  expect(pow('2.0000', '-3.0000').toString()).toBe('1.2500e-1');
  expect(pow('4.0000', '-3.0000').toString()).toBe('1.5625e-2');

  expect(pow('9007199254740992.', 0).toString()).toBe('0.00000000000000e+0');
  expect(pow('9007199254740992.', 1).toString()).toBe('9.007199254740992e+15');

                                                     // 1.1102230246251565404236316680908203125
  expect(pow('9007199254740992.', -1).toString()).toBe('1.110223024625157e-16');

  expect(pow('4.', '0.5').toString()).toBe(      '2.e+0');
  expect(pow('4.000', '0.5000').toString()).toBe('2.000e+0');
});
