import { Rational } from '../../src/rational';

const inv = (x: any) => new Rational(x).inv();

test('inv', () => {
  expect(inv(1).toString()).toBe('1'); 
  expect(inv(-1).toString()).toBe('-1');
  expect(inv(2).toString()).toBe('1/2');

  expect(inv(0.1).toString()).toBe('10');
  expect(inv(10).toString()).toBe('1/10');

  expect(inv(9007199254740992n).toString()).toBe('1/9007199254740992');
  expect(inv(10_000_000_000_000_000n).toString()).toBe('1/10000000000000000');
});

test('division by zero', () => {
  expect(() => inv(0).toString()).toThrow('DivisionByZero');
});
