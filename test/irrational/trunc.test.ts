import { Irrational } from '../../src/irrational';

test.skip('trunc', () => {
  const trunc = (x: any) => new Irrational(x).trunc();

  expect(trunc(1)).toBe(1n);
  expect(trunc(-1)).toBe(-1n);
  expect(trunc(2)).toBe(2n);
  expect(trunc(-2)).toBe(-2n);

  expect(trunc(0.1)).toBe(0n);
  expect(trunc(2.5)).toBe(2n);
  expect(trunc(10)).toBe(10n);

  expect(trunc(-0.1)).toBe(0n);
  expect(trunc(-2.5)).toBe(-2n);
  expect(trunc(-10)).toBe(-10n);

  expect(trunc(9007199254740992n)).toBe(9007199254740992n);
  expect(trunc(9007199254740994n)).toBe(9007199254740994n);
  expect(trunc(10_000_000_000_000_000n)).toBe(10_000_000_000_000_000n);

  expect(trunc('900719.9254740992')).toBe(900719n);
  expect(trunc('90071992.54740994')).toBe(90071992n);
  expect(trunc(10_000_000.00000)).toBe(10_000_000n);

  expect(trunc('-900719.9254740992')).toBe(-900719n);
  expect(trunc('-90071992.54740994')).toBe(-90071992n);
  expect(trunc(-10_000_000.00000)).toBe(-10_000_000n);
});
