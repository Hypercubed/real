import { PI } from  '../../src/pi';

test('Pi is instantiable', () => {
  expect(new PI() instanceof PI).toBe(true);
});

test('Pi', () => {      // 12345678901234567890123456789012345678901234567890123456789012345678901234567890
  expect(new PI().isPositive()).toBe(true);
  expect(new PI().isNegitive()).toBe(false);
  expect(new PI().trunc()).toBe(3n);
  expect(new PI().floor()).toBe(3n);
  expect(new PI().ceil()).toBe(4n);
});

test('Pi#toFixed', () => {      // 12345678901234567890123456789012345678901234567890123456789012345678901234567890
  expect(new PI().toFixed(10)).toBe('3.1415926535');
  expect(new PI().toFixed(50)).toBe('3.14159265358979323846264338327950288419716939937510');
  expect(new PI().toFixed(80)).toBe(
    '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899'
  );
});

test('Pi#toExponential', () => {      // 12345678901234567890123456789012345678901234567890123456789012345678901234567890
  expect(new PI().toExponential(10)).toBe('3.1415926535e+0');
  expect(new PI().toExponential(50)).toBe('3.14159265358979323846264338327950288419716939937510e+0');
  expect(new PI().toExponential(80)).toBe(
    '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899e+0'
  );
});