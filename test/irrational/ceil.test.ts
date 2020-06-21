import { Irrational } from '../../src/irrational';

test('ceil', () => {
  const ceil = (x: any) => new Irrational(x).ceil();

  expect(ceil( 1)).toBe(1n);
  expect(ceil(-1)).toBe(-1n);
  expect(ceil( 2)).toBe(2n);

  expect(ceil(0.1)).toBe(1n);
  expect(ceil(10)).toBe(10n);

  expect(ceil(9007199254740992n)).toBe(9007199254740992n);
  expect(ceil(9007199254740994n)).toBe(9007199254740994n);
  expect(ceil(10_000_000_000_000_000n)).toBe(10_000_000_000_000_000n);

  expect(ceil('900719.9254740992')).toBe(900720n);
  expect(ceil('90071992.54740994')).toBe(90071993n);
  expect(ceil(10_000_000.00000)).toBe(10_000_000n);
 
  expect(ceil('-900719.9254740992')).toBe(-900719n);
  expect(ceil('-90071992.54740994')).toBe(-90071992n);
  expect(ceil(-10_000_000.00000)).toBe(-10_000_000n);
});
