import { PI } from  '../../src/pi';

test('Pi is instantiable', () => {
  expect(new PI() instanceof PI).toBe(true);
});

test('Pi', () => {
  expect(new PI().isPositive()).toBe(true);
  expect(new PI().isNegitive()).toBe(false);
  expect(new PI().trunc()).toBe(3n);
  expect(new PI().floor()).toBe(3n);
  expect(new PI().ceil()).toBe(4n);
});

test('Pi#toFixed', () => {
  expect(new PI().toFixed(10)).toBe('3.1415926536');
  expect(new PI().toFixed(50)).toBe('3.14159265358979323846264338327950288419716939937511');
  expect(new PI().toFixed(80)).toBe('3.14159265358979323846264338327950288419716939937510582097494459230781640628620900');
                                  // 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328...
});

test('Pi#toExponential', () => {
  expect(new PI().toExponential(10)).toBe('3.1415926536e+0');
  expect(new PI().toExponential(50)).toBe('3.14159265358979323846264338327950288419716939937511e+0');
  expect(new PI().toExponential(80)).toBe('3.14159265358979323846264338327950288419716939937510582097494459230781640628620900e+0');
                                        // 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328...
});