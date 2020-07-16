import { Irrational } from '../../src/irrational';

const inv = (x: any) => Irrational.from(x).inv();

test('error', () => {
  expect(() => {
    inv(0);
  }).toThrow('Division by zero')
});

test('inv', () => {
  expect(inv('1.').toString()).toBe('1.e+0');
  expect(inv('-1.').toString()).toBe('-1.e+0');

  expect(inv('2.').toString()).toBe('5.e-1');
  expect(inv('3.').toString()).toBe('3.e-1');

  expect(inv( '1.0000').toString()).toBe( '1.0000e+0');
  expect(inv('-1.0000').toString()).toBe('-1.0000e+0');
  expect(inv( '2.0000').toString()).toBe( '5.0000e-1');
  expect(inv('-3.0000').toString()).toBe('-3.3333e-1');
  expect(inv(' 4.0000').toString()).toBe( '2.50000e-1');
  expect(inv('-5.0000').toString()).toBe('-2.00000e-1');
  expect(inv(' 6.0000').toString()).toBe( '1.66667e-1');
  expect(inv('-7.0000').toString()).toBe('-1.42857e-1');
  expect(inv(' 8.0000').toString()).toBe( '1.25000e-1');
  expect(inv('-9.0000').toString()).toBe('-1.11111e-1');
  expect(inv('10.000' ).toString()).toBe( '1.0000e-1');

  expect(inv('0.1').toString()).toBe('1.e+1');
  expect(inv('10.').toString()).toBe('1.0e-1');

                                                 // 1.1102230246251565404236316680908203125 × 10^-16
  expect(inv('9007199254740992.').toString()).toBe('1.1102230246251565e-16');

  expect(inv('10_000_000_000_000_000.').toString()).toBe('1.0000000000000000e-16');
});

test('inv exact values, exact results', () => {
  expect(inv( '1').toString()).toBe(  '1');
  expect(inv('-1').toString()).toBe( '-1');

  expect(inv( '2').toString()).toBe(  '0.5');
  expect(inv('-2').toString()).toBe( '-0.5');

  expect(inv( '64').toString()).toBe(  '0.015625');
  expect(inv('-64').toString()).toBe( '-0.015625');

  expect(inv('1000').toString()).toBe('0.001');
});

test('powers of ten', () => {
  expect(inv('1.e3' ).toString()).toBe('1.e-3');
  expect(inv('1.e9' ).toString()).toBe('1.e-9');
  expect(inv('1.e12').toString()).toBe('1.e-12');

  expect(inv('-1.e3' ).toString()).toBe('-1.e-3');
  expect(inv('-1.e9' ).toString()).toBe('-1.e-9');
  expect(inv('-1.e12').toString()).toBe('-1.e-12');

  expect(inv('1.e-3' ).toString()).toBe('1.e+3');
  expect(inv('1.e-9' ).toString()).toBe('1.e+9');
  expect(inv('1.e-12').toString()).toBe('1.e+12');

  expect(inv('-1.e-3' ).toString()).toBe('-1.e+3');
  expect(inv('-1.e-9' ).toString()).toBe('-1.e+9');
  expect(inv('-1.e-12').toString()).toBe('-1.e+12');
});

test('inv exact values, inexact results', () => {
  expect(inv( '3').toString()).toBe(  '3.3333333333333333333333333333333333e-1');  // ??

                                                      // 1.1102230246251565404236316680908203125 × 10^-16
  expect(inv('9007199254740992').toExponential(9)).toBe('1.110223025e-16');

  expect(inv('10_000_000_000_000_000').toExponential(9)).toBe('1.000000000e-16');
});
