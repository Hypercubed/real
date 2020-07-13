import { Rational } from '../../src/';

const ceil = (x: any) => Rational.from(x).ceil();

test('ceil', () => {
  expect(ceil( 1).toString()).toBe('1');
  expect(ceil(-1).toString()).toBe('-1');
  expect(ceil( 2).toString()).toBe('2');

  expect(ceil(0.1).toString()).toBe('1');
  expect(ceil(10).toString()).toBe('10');

  expect(ceil(9007199254740992n).toString()).toBe('9007199254740992');
  expect(ceil(9007199254740994n).toString()).toBe('9007199254740994');
  expect(ceil(10_000_000_000_000_000n).toString()).toBe('10000000000000000');

  expect(ceil('900719.9254740992').toString()).toBe('900720');
  expect(ceil('90071992.54740994').toString()).toBe('90071993');
  expect(ceil(10_000_000.00000).toString()).toBe('10000000');
 
  expect(ceil('-900719.9254740992').toString()).toBe('-900719');
  expect(ceil('-90071992.54740994').toString()).toBe('-90071992');
  expect(ceil(-10_000_000.00000).toString()).toBe('-10000000');
});
