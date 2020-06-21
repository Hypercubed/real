import { Irrational } from '../../src/irrational';

const ceil = (x: any) => new Irrational(x).ceil();

test('ceil', () => {
  expect(ceil( 1).toString()).toBe('1.e+0');
  expect(ceil(-1).toString()).toBe('-1.e+0');
  expect(ceil( 2).toString()).toBe('2.e+0');

  expect(ceil(0.1).toString()).toBe('1.e+0');
  expect(ceil(10).toString()).toBe('1.0e+1');

  expect(ceil(9007199254740992n).toString()).toBe('9.007199254740992e+15');
  expect(ceil(9007199254740994n).toString()).toBe('9.007199254740994e+15');
  expect(ceil(10_000_000_000_000_000n).toString()).toBe('1.0000000000000000e+16');

  expect(ceil('900719.9254740992').toString()).toBe('9.007200000000000e+5');
  expect(ceil('90071992.54740994').toString()).toBe('9.007199300000000e+7');
  expect(ceil('10000000.00000').toString()).toBe('1.000000000000e+7');
 
  expect(ceil('-900719.9254740992').toString()).toBe('-9.007190000000000e+5');
  expect(ceil('-90071992.54740994').toString()).toBe('-9.007199200000000e+7');
  expect(ceil('-10000000.00000').toString()).toBe('-1.000000000000e+7');
});
