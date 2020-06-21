import { Rational } from '../../src/rational';

test('mul', () => {
  const mul = (x: any, y: any) => new Rational(x).mul(new Rational(y)).toString();

  expect(mul(0, 0)).toBe('0');
  expect(mul(-0, 0)).toBe('0');
  expect(mul(1, 1)).toBe('1');
  expect(mul(1, -1)).toBe('-1');

  expect(mul(0.1, 0.2)).toBe('1/50');
  expect(mul(10, 0.2)).toBe('2');
  expect(mul(9007199254740992n, 2)).toBe('18014398509481984');
  expect(mul(10_000_000_000_000_000n, '0.00_000_000_000_000_01')).toBe('1');
});
