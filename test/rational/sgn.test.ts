import { Rational } from '../../src/rational';

test('abs', () => {
  const sgn = (n: any, d?: any) => new Rational(n, d).sgn();

  expect(sgn(0)).toBe(1);
  // t.is(sgn(-0), -1);
  expect(sgn(1)).toBe(1);
  expect(sgn(-1)).toBe(-1);
  expect(sgn(0.5)).toBe(1);
  expect(sgn(-0.5)).toBe(-1);
  expect(sgn(1.5)).toBe(1);
  expect(sgn(-1.5)).toBe(-1);

  expect(sgn(-6022140857n, 1000n)).toBe(-1);
  expect(sgn(-6022140857n, -1000n)).toBe(1);

  expect(sgn('-5.5879983320336874473209567979287894365')).toBe(-1);
});
