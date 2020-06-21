import { Irrational } from '../../src/irrational';

const abs = (v: any) => new Irrational(v).abs();

test('abs', () => {
  expect(abs( 0).toString()).toBe('0.e+0');
  expect(abs(-0).toString()).toBe('0.e+0');
  expect(abs( 1).toString()).toBe('1.e+0');
  expect(abs(-1).toString()).toBe('1.e+0');
  expect(abs( 0.5).toString()).toBe('5.e-1');
  expect(abs(-0.5).toString()).toBe('5.e-1');
  expect(abs( 1.5).toString()).toBe('1.5e+0');

  expect(abs(-1.5).toString()).toBe('1.5e+0');

  expect(abs(-602214085700000000000000n).toString()).toBe('6.02214085700000000000000e+23');

  expect(abs('-5.5879983320336874473209567979287894365').toString()).toBe('5.5879983320336874473209567979287894365e+0');
});
