import { Rational } from '../../src/rational';

const add = (x: any, y: any) => new Rational(x).add(new Rational(y));

test('add', () => {
  expect(add(0, 0).toString()).toBe('0');
  expect(add(-0, 0).toString()).toBe('0');
  expect(add(1, 1).toString()).toBe('2');
  expect(add(1, -1).toString()).toBe('0');

  expect(add(0.1, 0.2).toString()).toBe('3/10');
  expect(add(9007199254740992n, 2).toString()).toBe('9007199254740994');
  expect(add(10000000000000000n, '0.00000000001').toString()).toBe('1000000000000000000000000001/100000000000');
});
