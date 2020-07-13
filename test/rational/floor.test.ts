import { Rational } from '../../src/';

const floor = (x: any) => Rational.from(x).floor();

test('floor', () => {
  expect(floor(1).toString()).toBe('1');
  expect(floor(-1).toString()).toBe('-1');
  expect(floor(2).toString()).toBe('2');
  expect(floor(-2).toString()).toBe('-2');

  expect(floor(0.1).toString()).toBe('0');
  expect(floor(2.5).toString()).toBe('2');
  expect(floor(10).toString()).toBe('10');

  expect(floor(-0.1).toString()).toBe('-1');
  expect(floor(-2.5).toString()).toBe('-3');
  expect(floor(-10).toString()).toBe('-10');

  expect(floor(9007199254740992n).toString()).toBe('9007199254740992');
  expect(floor(9007199254740994n).toString()).toBe('9007199254740994');
  expect(floor(10_000_000_000_000_000n).toString()).toBe('10000000000000000');
 
  expect(floor('900719.9254740992').toString()).toBe('900719');
  expect(floor('90071992.54740994').toString()).toBe('90071992');
  expect(floor(10_000_000.00000).toString()).toBe('10000000');

  expect(floor('-900719.9254740992').toString()).toBe('-900720');
  expect(floor('-90071992.54740994').toString()).toBe('-90071993');
  expect(floor(-10_000_000.00000).toString()).toBe('-10000000');
});
