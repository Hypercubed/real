import { Irrational } from '../../src/irrational';

const mul = (x: any, y: any) => new Irrational(x).mul(new Irrational(y));

test('basics exact', () => {
  expect(mul('2', '2').toString()).toBe('4');
  expect(mul('2', '3').toString()).toBe('6');
  expect(mul('5', '1').toString()).toBe('5');
  expect(mul('5', '2').toString()).toBe('10');
});

test('basics floats', () => {
  expect(mul('2.', '2.').toString()).toBe('4.e+0');
  expect(mul('2.', '3.').toString()).toBe('6.e+0');
  expect(mul('5.', '1.').toString()).toBe('5.e+0');
  expect(mul('5.', '2.').toString()).toBe('1.e+1');

  expect(mul('1.20', '-2').toString()).toBe('-2.40e+0');
  expect(mul('1.20',  '0').toString()).toBe( '0.00e-2');  // ??
  expect(mul('1.20',  '2').toString()).toBe( '2.40e+0');

  expect(mul('-1.20', '-2').toString()).toBe( '2.40e+0');
  expect(mul('-1.20',  '0').toString()).toBe( '0.00e-2');  // ??
  expect(mul('-1.20',  '2').toString()).toBe('-2.40e+0');

  expect(mul('2.50',  '4').toString()).toBe('1.00e+1');
});

test('mul powers of ten', () => {
  expect(mul('123.45',  '1'        ).toString()).toBe('1.2345e+2');
  expect(mul('123.45',  '10'       ).toString()).toBe('1.2345e+3');
  expect(mul('123.45',  '1000'     ).toString()).toBe('1.2345e+5');
  expect(mul('123.45',  '1.0000e+6').toString()).toBe('1.2345e+8');
  expect(mul('123.45',  '1.0000e+9').toString()).toBe('1.2345e+11');

  expect(mul('123.45',  '1.0000e-1').toString()).toBe('1.2345e+1');
  expect(mul('123.45',  '1.0000e-3').toString()).toBe('1.2345e-1');
  expect(mul('123.45',  '1.0000e-6').toString()).toBe('1.2345e-4');
  expect(mul('123.45',  '1.0000e-9').toString()).toBe('1.2345e-7');
});

test('nines', () => {
  expect(mul('9', '9').toString()).toBe('81');

  expect(mul('9', '90'    ).toString()).toBe('810');
  expect(mul('9', '900'   ).toString()).toBe('8100');
  expect(mul('9', '900000').toString()).toBe('8100000');

  expect(mul('9', '99'    ).toString()).toBe('891');
  expect(mul('9', '999'   ).toString()).toBe('8991');
  expect(mul('9', '999999').toString()).toBe('8999991');

  expect(mul('9', '999e-99999999').toString()).toBe('8.99e-99999996');
});

test('mul', () => {
  expect(mul('0.', '0.').toString()).toBe('0.e+0');
  expect(mul('-0.', '0.').toString()).toBe('0.e+0');
  expect(mul('1.', '1.').toString()).toBe('1.e+0');
  expect(mul('1.', '-1.').toString()).toBe('-1.e+0');

  expect(mul('0.0', '0.0').toString()).toBe('0.0e+0');
  expect(mul('-0.0', '0.00').toString()).toBe('0.0e+0');
  expect(mul('1.00', '1.00').toString()).toBe('1.00e+0');
  expect(mul('1.00', '-1.000').toString()).toBe('-1.00e+0');

  expect(mul('0.1', '0.2').toString()).toBe('2.e-2');
  expect(mul('10.', '0.2').toString()).toBe('2.e+0');

  expect(mul('10.', '0.20').toString()).toBe('2.0e+0');

                                                                        // 1.8014398509481984e+16
  expect(mul('9007199254740992.', 2                    ).toString()).toBe('1.80143985094820e+16');
  expect(mul('9007199254740992.', '2.'                 ).toString()).toBe('2.e+16');  
  expect(mul('9007199254740992.', '2.00000000000000000').toString()).toBe('1.801439850948198e+16');

  expect(mul('10_000_000_000_000_000.', 0.00_000_000_000_000_01).toString()).toBe('1.0000000000000000e+0');
  expect(mul('10_000_000_000_000_000.', '1.000000000000000e-16').toString()).toBe('1.000000000000000e+0');
});
