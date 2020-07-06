import { Irrational } from '../../src/irrational';

const abs = (v: any) => new Irrational(v).abs();

test('abs', () => {
  expect(abs( '0.').toString()).toBe('0.e+0');
  expect(abs('-0.').toString()).toBe('0.e+0');
  expect(abs( '1.').toString()).toBe('1.e+0');
  expect(abs('-1.').toString()).toBe('1.e+0');
  expect(abs( '0.5').toString()).toBe('5.e-1');
  expect(abs('-0.5').toString()).toBe('5.e-1');
  expect(abs( '1.5').toString()).toBe('1.5e+0');

  expect(abs('-1.5').toString()).toBe('1.5e+0');

  expect(abs('-602214085700000000000000.').toString()).toBe('6.02214085700000000000000e+23');

  expect(abs('-5.5879983320336874473209567979287894365').toString()).toBe('5.5879983320336874473209567979287894365e+0');
});

test('absx00X', () => {
  expect(abs(  '1.'    ).toString()).toBe('1.e+0');
  expect(abs( '-1.'    ).toString()).toBe('1.e+0');
  expect(abs(  '1.00'  ).toString()).toBe('1.00e+0');
  expect(abs( '-1.00'  ).toString()).toBe('1.00e+0');
  expect(abs(  '0.'    ).toString()).toBe('0.e+0');
  expect(abs(  '0.00'  ).toString()).toBe('0.e-2');
  // expect(abs(  '00.0'  ).toString()).toBe('0.e-1');
  // expect(abs(  '00.00 ').toString()).toBe('0.000e+0');
  // expect(abs(  '00.'   ).toString()).toBe('0.0e+0');
});

test('absx01X', () => {
  expect(abs(  '2.'     ).toString()).toBe('2.e+0');
  expect(abs( '-2.'     ).toString()).toBe('2.e+0');
  expect(abs(  '2.00'  ).toString()).toBe('2.00e+0');
  expect(abs( '-2.00'  ).toString()).toBe('2.00e+0');
  expect(abs(  '-0.'    ).toString()).toBe('0.e+0');
  expect(abs(  '-0.00' ).toString()).toBe('0.e-2');
  // expect(abs(  '-00.0' ).toString()).toBe('0.00e+0');
  // expect(abs(  '-00.00').toString()).toBe('0.000e+0');
  // expect(abs(  '-00.'   ).toString()).toBe('0.0e+0');
});

test('absx02X', () => {
  expect(abs(  '-2000000.' ).toString()).toBe('2.000000e+6');
  expect(abs(   '2000000.' ).toString()).toBe('2.000000e+6');
});

test('absx03X', () => {
  expect(abs(  '+0.1' ).toString()).toBe('1.e-1');
  expect(abs(  '-0.1' ).toString()).toBe('1.e-1');

  expect(abs(  '+0.01' ).toString()).toBe('1.e-2');
  expect(abs(  '-0.01' ).toString()).toBe('1.e-2');

  expect(abs(  '+0.001' ).toString()).toBe('1.e-3');
  expect(abs(  '-0.001' ).toString()).toBe('1.e-3');

  expect(abs(  '+0.000000000001' ).toString()).toBe('1.e-12');
  expect(abs(  '-0.000000000001' ).toString()).toBe('1.e-12');
});

test('absx04X', () => {
  expect(abs( '2.1'    ).toString()).toBe('2.1e+0'  );
  expect(abs( '-100.'   ).toString()).toBe('1.00e+2' );
  expect(abs( '101.5'  ).toString()).toBe('1.015e+2');
  expect(abs( '-101.5' ).toString()).toBe('1.015e+2');
});

test('absx06X', () => {
  expect(abs( '-56267E-10' ).toString()).toBe('5.6267e-6');
  expect(abs( '-56267E-5'  ).toString()).toBe('5.6267e-1');
  expect(abs( '-56267E-2'  ).toString()).toBe('5.6267e+2');
  expect(abs( '-56267E-1'  ).toString()).toBe('5.6267e+3');
  expect(abs( '-56267E-0'  ).toString()).toBe('5.6267e+4');
});

test('absx12X', () => {
  expect(abs(  '9.999E+999999999' ).toString()).toBe('9.999e+999999999');
  expect(abs( '-9.999E+999999999' ).toString()).toBe('9.999e+999999999');
});
