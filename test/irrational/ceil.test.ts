import { Irrational } from '../../src/irrational';

const ceil = (x: any) => new Irrational(x).ceil();

test('ceil', () => {
  expect(ceil( '1.').toString()).toBe('1.e+0');
  expect(ceil('-1.').toString()).toBe('-1.e+0');
  expect(ceil( '2.').toString()).toBe('2.e+0');

  expect(ceil('10.').toString()).toBe('1.0e+1');

  expect(ceil('9007199254740992.').toString()).toBe('9.007199254740992e+15');
  expect(ceil('9007199254740994.').toString()).toBe('9.007199254740994e+15');
  expect(ceil('10_000_000_000_000_000.').toString()).toBe('1.0000000000000000e+16');
});

test('exact results when e < 0', () => {
  expect(ceil('0.1').toString()).toBe('1');

  expect(ceil('900719.9254740992').toString()).toBe('900720');
  expect(ceil('90071992.54740994').toString()).toBe('90071993');
  expect(ceil('10000000.00000').toString()).toBe('10000000');
 
  expect(ceil('-900719.9254740992').toString()).toBe('-900719');
  expect(ceil('-90071992.54740994').toString()).toBe('-90071992');
  expect(ceil('-10000000.00000').toString()).toBe('-10000000');
});