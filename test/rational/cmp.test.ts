import { Rational } from '../../src/';
const cmp = (x: any, y: any) => Rational.from(x).cmp(Rational.from(y));

test('cmp', () => {
  expect(cmp(0, 0)).toBe(0);
  expect(cmp(1, 0)).toBe(1);
  expect(cmp(0, 1)).toBe(-1);

  expect(cmp(0.1, 10)).toBe(-1);
  expect(cmp(10, 1)).toBe(1);

  expect(cmp(9007199254740992n, 9007199254740994n)).toBe(-1);
  expect(cmp('9.007199254740996', '9.007199254740994')).toBe(1);
});
