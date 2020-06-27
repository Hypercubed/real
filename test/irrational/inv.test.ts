import { Irrational } from '../../src/irrational';

const inv = (x: any) => new Irrational(x).inv();

test('inv', () => {
  expect(inv('1.').toString()).toBe('1.e+0');
  expect(inv('-1.').toString()).toBe('-1.e+0');
  expect(inv('2.').toString()).toBe('5.e-1');
  expect(inv('3.').toString()).toBe('3.e-1');

  expect(inv( '1.0000').toString()).toBe( '1.0000e+0');
  expect(inv('-1.0000').toString()).toBe('-1.0000e+0');
  expect(inv( '2.0000').toString()).toBe( '5.0000e-1');
  expect(inv('-3.0000').toString()).toBe('-3.3333e-1');

  expect(inv('0.1').toString()).toBe('1.e+1');
  expect(inv('10.').toString()).toBe('1.0e-1');

                                                 // 1.1102230246251565404236316680908203125 × 10^-16
  expect(inv('9007199254740992.').toString()).toBe('1.110223024625157e-16');

  expect(inv('10_000_000_000_000_000.').toString()).toBe('1.0000000000000000e-16');
});

test('inv exact values', () => {
  expect(inv( '1').toExponential(9)).toBe(  '1.000000000e+0');
  expect(inv('-1').toExponential(9)).toBe( '-1.000000000e+0');
  expect(inv( '2').toExponential(9)).toBe(  '5.000000000e-1');
  expect(inv( '3').toExponential(9)).toBe(  '3.333333333e-1');

  expect(inv('1000').toExponential(9)).toBe('1.000000000e-3');

                                                      // 1.1102230246251565404236316680908203125 × 10^-16
  expect(inv('9007199254740992').toExponential(9)).toBe('1.110223024e-16');

  expect(inv('10_000_000_000_000_000').toExponential(9)).toBe('1.000000000e-16');
});
