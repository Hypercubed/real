import { Rational } from '../../src/rational';

const mul = (x: any, y: any) => Rational.from(x).mul(Rational.from(y));

test('mul', () => {
  expect(mul(0, 0).toString()).toBe('0');
  expect(mul(-0, 0).toString()).toBe('0');
  expect(mul(1, 1).toString()).toBe('1');
  expect(mul(1, -1).toString()).toBe('-1');

  expect(mul(0.1, 0.2).toString()).toBe('1/50');
  expect(mul(10, 0.2).toString()).toBe('2');
  expect(mul(9007199254740992n, 2).toString()).toBe('18014398509481984');
  expect(mul(10_000_000_000_000_000n, '0.00_000_000_000_000_01').toString()).toBe('1');
});
