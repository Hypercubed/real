import { LN2 } from '../../src/ln2';

test('LN2 is instantiable', () => {
  expect(new LN2() instanceof LN2).toBe(true);
});

test('LN2', () => {
  expect(new LN2().isPositive()).toBe(true);
  expect(new LN2().isNegitive()).toBe(false);
  expect(new LN2().trunc()).toBe(0n);
  expect(new LN2().floor()).toBe(0n);
  expect(new LN2().ceil()).toBe(1n);
});

test('LN2#toFixed', () => {
  expect(new LN2().toFixed(5)).toBe('0.69314');
  expect(new LN2().toFixed(10)).toBe('0.6931471805');
  expect(new LN2().toFixed(50)).toBe('0.69314718055994530941723212145817656807550013436025');
  expect(new LN2().toFixed(80)).toBe(
    '0.69314718055994530941723212145817656807550013436025525412068000949339362196969471'
  );
});

test('LN2#toExponential', () => {
  expect(new LN2().toExponential(5)).toBe('6.93147e-1');
  expect(new LN2().toExponential(10)).toBe('6.9314718055e-1');
  expect(new LN2().toExponential(50)).toBe('6.93147180559945309417232121458176568075500134360255e-1');
  expect(new LN2().toExponential(80)).toBe(
    '6.93147180559945309417232121458176568075500134360255254120680009493393621969694715e-1'
  );
});