import { Rational } from '../../src/rational';

const sub = (x: any, y: any) => new Rational(x).sub(new Rational(y));

test('sub', () => {
  expect(sub(0, 0).toString()).toBe('0');
  expect(sub(-0, 0).toString()).toBe('0');
  expect(sub(1, 1).toString()).toBe('0');
  expect(sub(1, -1).toString()).toBe('2');

  expect(sub(0.1, 0.2).toString()).toBe('-1/10');
  expect(sub(9007199254740992n, 2).toString()).toBe('9007199254740990');
  expect(sub(10000000000000000n, '0.00000000001').toString()).toBe('999999999999999999999999999/100000000000');
});
