import { Irrational } from '../../src/irrational';
const pow10 = (x: any) => Irrational.from(x).pow10();

test('pow10', () => {
  expect(pow10('1.').toString()).toBe('1.e+1');
  expect(pow10('2.').toString()).toBe('1.e+2');

  expect(pow10('10.').toString()).toBe('1.e+10');
  expect(pow10('200.').toString()).toBe('1.e+200');
});

test('negitive', () => {
  expect(pow10(-1).toString()).toBe('1.00000000000000e-1');
  expect(pow10(-2).toString()).toBe('1.00000000000000e-2');

  expect(pow10('-1.').toString()).toBe('1.e-1');
  expect(pow10('-2.').toString()).toBe('1.e-2'); 
  expect(pow10('-200.').toString()).toBe('1.e-200'); // ??
});

test('exact', () => {
  expect(pow10(1n).toString()).toBe('10');
  expect(pow10(2n).toString()).toBe('100');

  expect(pow10(10n).toString()).toBe('10000000000');
  // expect(pow10(100n).toString()).toBe('1.e+200');  // TODO: cut off long exact values

  expect(pow10(-1n).toString()).toBe('0.1');
  expect(pow10(-2n).toString()).toBe('0.01');
});

test('fractions', () => {
                                          // 1.023292992280754130966275174819877827341164057237981308599
  expect(pow10('0.01'    ).toString()).toBe('1.02e+0');
  expect(pow10('0.0100'  ).toString()).toBe('1.0233e+0');
  expect(pow10('0.010000').toString()).toBe('1.023293e+0');  
});

test('zeros', () => {
  expect(pow10(0n).toString()).toBe('1');
  expect(pow10('0').toString()).toBe('1');
  expect(pow10('0.').toString()).toBe('1.e+0');
  expect(pow10('0.00').toString()).toBe('1.00e+0');

  expect(pow10('0.00e5').toString()).toBe('0.e+3'); // ??
});