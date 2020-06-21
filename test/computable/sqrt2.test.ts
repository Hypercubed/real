import { SQRT2 } from '../../src/sqrt2';

test('SQRT2 is instantiable', () => {
  expect(new SQRT2() instanceof SQRT2).toBe(true);
});

test('SQRT2', () => {
  expect(new SQRT2().isPositive()).toBe(true);
  expect(new SQRT2().isNegitive()).toBe(false);
  expect(new SQRT2().trunc()).toBe(1n);
  expect(new SQRT2().floor()).toBe(1n);
  expect(new SQRT2().ceil()).toBe(2n);
});

test('SQRT2#toFixed', () => {
  expect(new SQRT2().toFixed(5)).toBe('1.41421');
  expect(new SQRT2().toFixed(10)).toBe('1.4142135623');
  expect(new SQRT2().toFixed(20)).toBe('1.41421356237309504880');
  expect(new SQRT2().toFixed(80)).toBe(
    '1.41421356237309504880168872420969807856967187537694807317667973799073247846210703'
  );
});

test('SQRT2#toExponential', () => {
  expect(new SQRT2().toExponential(5)).toBe('1.41421e+0');
  expect(new SQRT2().toExponential(10)).toBe('1.4142135623e+0');
  expect(new SQRT2().toExponential(20)).toBe('1.41421356237309504880e+0');
  expect(new SQRT2().toExponential(80)).toBe(
    '1.41421356237309504880168872420969807856967187537694807317667973799073247846210703e+0'
  );
});
