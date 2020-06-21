import { Rational } from '../../src/rational';

test('sub', () => {
  const sub = (x: any, y: any) => new Rational(x).sub(new Rational(y)).toString();

  expect(sub(0, 0)).toBe('0');
  expect(sub(-0, 0)).toBe('0');
  expect(sub(1, 1)).toBe('0');
  expect(sub(1, -1)).toBe('2');

  expect(sub(0.1, 0.2)).toBe('-1/10');
  expect(sub(9007199254740992n, 2)).toBe('9007199254740990');
  expect(sub(10000000000000000n, '0.00000000001')).toBe('999999999999999999999999999/100000000000');
});
