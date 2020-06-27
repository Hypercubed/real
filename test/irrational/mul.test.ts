import { Irrational } from '../../src/irrational';

const mul = (x: any, y: any) => new Irrational(x).mul(new Irrational(y));

test('mul', () => {
  expect(mul('0.', '0.').toString()).toBe('0.e+0');
  expect(mul('-0.', '0.').toString()).toBe('0.e+0');
  expect(mul('1.', '1.').toString()).toBe('1.e+0');
  expect(mul('1.', '-1.').toString()).toBe('-1.e+0');

  expect(mul('0.0', '0.0').toString()).toBe('0.0e+0');
  expect(mul('-0.0', '0.00').toString()).toBe('0.0e+0');
  expect(mul('1.00', '1.00').toString()).toBe('1.00e+0');
  expect(mul('1.00', '-1.000').toString()).toBe('-1.00e+0');

  expect(mul('0.1', '0.2').toString()).toBe('2.e-2');
  expect(mul('10.', '0.2').toString()).toBe('2.e+0');

  expect(mul('10.', '0.20').toString()).toBe('2.0e+0');

  expect(mul('9007199254740992.', 2).toString()).toBe('1.80143985094820e+16');
  expect(mul('9007199254740992.', '2.').toString()).toBe('2.e+16');  
  expect(mul('9007199254740992.', '2.00000000000000000').toString()).toBe('1.801439850948198e+16');
                                                                        // 1.8014399e+16

  expect(mul('10_000_000_000_000_000.', 0.00_000_000_000_000_01).toString()).toBe('1.0000000000000000e+0');
  expect(mul('10_000_000_000_000_000.', '1.000000000000000e-16').toString()).toBe('1.000000000000000e+0');
});
