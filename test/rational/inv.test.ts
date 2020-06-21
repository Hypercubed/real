import { Rational } from '../../src/rational';

test('inv', () => {
  const inv = (x: any) => new Rational(x).inv().toString();

  // t.is(inv(0), '0');
  expect(inv(1)).toBe('1');
  expect(inv(-1)).toBe('-1');
  expect(inv(2)).toBe('1/2');

  expect(inv(0.1)).toBe('10');
  expect(inv(10)).toBe('1/10');

  expect(inv(9007199254740992n)).toBe('1/9007199254740992');
  expect(inv(10_000_000_000_000_000n)).toBe('1/10000000000000000');
});
