import { Irrational } from '../../src/irrational';

const fp = (x: any) => new Irrational(x).fp();

test('fp', () => {
  expect(fp('1.').toString()).toBe('0.e+0');
  expect(fp('-1.').toString()).toBe('0.e+0');
  expect(fp('2.').toString()).toBe('0.e+0');
  expect(fp('-2.').toString()).toBe('0.e+0');

  expect(fp('0.1').toString()).toBe('1.e-1');
  expect(fp('2.5').toString()).toBe('5.0e-1');
  expect(fp('10.').toString()).toBe('0.0e+0');

  expect(fp('-0.1').toString()).toBe('1.e-1');
  expect(fp('-2.5').toString()).toBe('5.0e-1');
  expect(fp('-10.').toString()).toBe('0.0e+0');

  expect(fp('9007199254740992.').toString()).toBe('0.000000000000000e+0');
  expect(fp('9007199254740994.').toString()).toBe('0.000000000000000e+0');
  expect(fp('10_000_000_000_000_000.').toString()).toBe('0.0000000000000000e+0');

  expect(fp('900719.9254740992').toString()).toBe('9.254740992000000e-1');
  expect(fp('90071992.54740994').toString()).toBe('5.474099400000000e-1');
  expect(fp('10_000_000.00000').toString()).toBe('0.000000000000e-5');

  expect(fp('-900719.9254740992').toString()).toBe('9.254740992000000e-1');
  expect(fp('-90071992.54740994').toString()).toBe('5.474099400000000e-1');
  expect(fp('-10_000_000.00000').toString()).toBe('0.000000000000e-5');
});
