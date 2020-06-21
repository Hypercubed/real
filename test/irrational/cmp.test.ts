import { Irrational } from '../../src/irrational';

test('cmp', () => {
  const cmp = (x: any, y: any) => new Irrational(x).cmp(new Irrational(y));

  expect(cmp(0, 0)).toBe(0);
  expect(cmp(1, 0)).toBe(1);
  expect(cmp(0, 1)).toBe(-1);

  expect(cmp(0.1, 10)).toBe(-1);
  expect(cmp(10, 1)).toBe(1);

  expect(cmp(9007199254740992n, 9007199254740994n)).toBe(-1);
  expect(cmp(9007199254740996n, 9007199254740994n)).toBe(1);

  // tests values with diffreent exponents
  const a = new Irrational(10000);
  const b = new Irrational(0.0000001);

  expect(a.cmp(a.add(b))).toBe(-1);
});
