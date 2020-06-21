import { Rational } from '../../src/rational';

const trunc = (x: any) => new Rational(x).trunc();

test('trunc', () => {
  expect(trunc(1).toString()).toBe('1');
  expect(trunc(-1).toString()).toBe('-1');
  expect(trunc(2).toString()).toBe('2');
  expect(trunc(-2).toString()).toBe('-2');

  expect(trunc(0.1).toString()).toBe('0');
  expect(trunc(2.5).toString()).toBe('2');
  expect(trunc(10).toString()).toBe('10');

  expect(trunc(-0.1).toString()).toBe('0');
  expect(trunc(-2.5).toString()).toBe('-2');
  expect(trunc(-10).toString()).toBe('-10');

  expect(trunc(9007199254740992n).toString()).toBe('9007199254740992');
  expect(trunc(9007199254740994n).toString()).toBe('9007199254740994');
  expect(trunc(10_000_000_000_000_000n).toString()).toBe('10000000000000000');

  expect(trunc('900719.9254740992').toString()).toBe('900719');
  expect(trunc('90071992.54740994').toString()).toBe('90071992');
  expect(trunc('10000000.00000').toString()).toBe('10000000');

  expect(trunc('-900719.9254740992').toString()).toBe('-900719');
  expect(trunc('-90071992.54740994').toString()).toBe('-90071992');
  expect(trunc('-10000000.00000').toString()).toBe('-10000000');
});
