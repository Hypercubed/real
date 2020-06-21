import { Irrational } from '../../src/irrational';

test('floor', () => {
  const floor = (x: any) => new Irrational(x).floor();

  expect(floor(1)).toBe(1n);
  expect(floor(-1)).toBe(-1n);
  expect(floor(2)).toBe(2n);
  expect(floor(-2)).toBe(-2n);

  expect(floor(0.1)).toBe(0n);
  expect(floor(2.5)).toBe(2n);
  expect(floor(10)).toBe(10n);

  expect(floor(-0.1)).toBe(-1n);
  expect(floor(-2.5)).toBe(-3n);
  expect(floor(-10)).toBe(-10n);

  expect(floor(9007199254740992n)).toBe(9007199254740992n);
  expect(floor(9007199254740994n)).toBe(9007199254740994n);
  expect(floor(10_000_000_000_000_000n)).toBe(10_000_000_000_000_000n);
 
  expect(floor('900719.9254740992')).toBe(900719n);
  expect(floor('90071992.54740994')).toBe(90071992n);
  expect(floor(10_000_000.00000)).toBe(10_000_000n);

  expect(floor('-900719.9254740992')).toBe(-900720n);
  expect(floor('-90071992.54740994')).toBe(-90071993n);
  expect(floor(-10_000_000.00000)).toBe(-10_000_000n);
});
