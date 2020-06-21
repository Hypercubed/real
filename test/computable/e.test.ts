import { E } from '../../src/e';

test('E is instantiable', () => {
  expect(new E() instanceof E).toBe(true);
});

test('E', () => {      // 12345678901234567890123456789012345678901234567890123456789012345678901234567890
  expect(new E().isPositive()).toBe(true);
  expect(new E().isNegitive()).toBe(false);
  expect(new E().trunc()).toBe(2n);
  expect(new E().floor()).toBe(2n);
  expect(new E().ceil()).toBe(3n);
});

test('E#toFixed', () => {
  expect(new E().toFixed(10)).toBe('2.7182818284');
  expect(new E().toFixed(50)).toBe('2.71828182845904523536028747135266249775724709369995');
  expect(new E().toFixed(80)).toBe(
    '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759'
  );
});

test('E#toExponential', () => {
  expect(new E().toExponential(10)).toBe('2.7182818284e+0');
  expect(new E().toExponential(50)).toBe('2.71828182845904523536028747135266249775724709369995e+0');
  expect(new E().toExponential(80)).toBe(
    '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759e+0'
  );
});