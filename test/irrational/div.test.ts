import { Irrational } from '../../src/irrational';

const div = (x: any, y: any) => new Irrational(x).div(new Irrational(y));

test('precision tests', () => {
  expect(div('1.',   '1.'  ).toString()).toBe('1.e+0');
  expect(div('1.0', '1.'  ).toString()).toBe('1.e+0');  // ??
  expect(div('1.',   '1.0').toString()).toBe('1.e+0');  // ??
  expect(div('1.0', '1.0').toString()).toBe('1.0e+0');

  expect(div('3.',   '2.'   ).toString()).toBe('2.e+0');
  expect(div('3.0',  '2.0' ).toString()).toBe('1.5e+0');
  expect(div('3.00', '2.00').toString()).toBe('1.50e+0');
  expect(div('3000e-3', '2000e-3').toString()).toBe('1.500e+0');
});

test('exact values', () => {
  expect(div('1',   '1'  ).toString()).toBe('1');
  expect(div('1.0', '1'  ).toString()).toBe('1.0e+0');
  expect(div('1',   '1.0').toString()).toBe('1.0e+0');

  expect(div('3',   '2'   ).toString()).toBe('1.5');
  expect(div('9',   '3'   ).toString()).toBe('3');
});

test('sanity checks', () => {
  expect(div('1.000000000', '1.000000000').toString()).toBe('1.000000000e+0');
  expect(div('2.000000000', '1.000000000').toString()).toBe('2.000000000e+0');
  expect(div('1.000000000', '2.000000000').toString()).toBe('5.000000000e-1');
  expect(div('2.000000000', '2.000000000').toString()).toBe('1.000000000e+0');
  expect(div('0.000000000', '1.000000000').toString()).toBe('0.e-9');
  expect(div('0.000000000', '2.000000000').toString()).toBe('0.e-9');
  expect(div('1.000000000', '3.000000000').toString()).toBe('3.333333333e-1');
  expect(div('2.000000000', '3.000000000').toString()).toBe('6.666666667e-1');
  expect(div('3.000000000', '3.000000000').toString()).toBe('1.0000000000e+0');

  expect(div( '2.400000000',  '1.000000000').toString()).toBe( '2.400000000e+0');
  expect(div( '2.400000000', '-1.000000000').toString()).toBe('-2.400000000e+0');
  expect(div('-2.400000000',  '1.000000000').toString()).toBe('-2.400000000e+0');
  expect(div('-2.400000000', '-1.000000000').toString()).toBe( '2.400000000e+0');

  expect(div('1.000000000', '4.000000000').toString()).toBe( '2.500000000e-1');
  expect(div('1.000000000', '8.000000000').toString()).toBe( '1.250000000e-1');
  expect(div('1.000000000', '16.00000000').toString()).toBe( '6.25000000e-2');
  expect(div('1.000000000', '32.00000000').toString()).toBe( '3.125000000e-2');
  expect(div('1.000000000', '64.00000000').toString()).toBe( '1.562500000e-2');

  expect(div('99999999999',   '1.00000000').toString()).toBe( '1.000000000e+11');  // TODO: rounding error?
  expect(div('99999999999.4', '1.00000000').toString()).toBe( '1.00000000e+11');  // TODO: rounding error?
});

test('imprecise results', () => {
  expect(div( '391.000000',  '597.000000').toString()).toBe( '6.54941374e-1');
  expect(div( '391.000000', '-597.000000').toString()).toBe('-6.54941373e-1');  // TODO: verify rounding
  expect(div('-391.000000',  '597.000000').toString()).toBe('-6.54941373e-1');  // TODO: verify rounding
  expect(div('-391.000000', '-597.000000').toString()).toBe( '6.54941374e-1');
});

test('Divide into zero', () => {
  expect(div( '0.000000',  '7.000000'    ).toString()).toBe( '0.e-6');
  expect(div( '0.000000',  '7.000000e-5' ).toString()).toBe( '0.e-6');
  expect(div( '0.000000',  '7.000000e+5' ).toString()).toBe( '0.e-6');
  expect(div( '0.000000',  '700.0000e+99').toString()).toBe( '0.e-6');

  expect(div( '0.000000e-3',  '7.000000'    ).toString()).toBe( '0.e-9');
  expect(div( '0.000000e-1',  '7.000000e-5' ).toString()).toBe( '0.e-7');
  expect(div( '0.000000e+1',  '7.000000e+5' ).toString()).toBe( '0.e-5');
  expect(div( '0.000000e+3',  '700.0000e+99').toString()).toBe( '0.e-3');
  expect(div( '0.000000e+6',  '700.0000e+99').toString()).toBe( '0.e+0');
  expect(div( '0.000000e+9',  '700.0000e+99').toString()).toBe( '0.e+3');
});

test('big', () => {
  expect(div( '343E6000',         '234E-1000'       ).toString()).toBe( '1.47e+7000');
  expect(div( '343.000E6000',     '234.000E-1000'   ).toString()).toBe( '1.46581e+7000');
  expect(div( '343.000000E6000',  '234.000000E-1000').toString()).toBe( '1.46581197e+7000');
                                                                      // 1.465811965811965811965811965811965811966E+7000
});

test('ECMAScript bad examples', () => {
  expect(div(5, 9).toString()).toBe('5.55555555555556e-1');
  expect(div('5.000000', '9.000000').toString()).toBe('5.555556e-1');
  expect(div('5.000000', '11.00000').toString()).toBe('4.545455e-1');
});

test('inv', () => {
  expect(div(1n, '-3.0000').toString()).toBe('-3.3333e-1');
});