import { Irrational } from '../../src/irrational';

// TODO: fp needs to subtract ip from precision
test.skip('fp', () => {
  const fp = (x: any) => new Irrational(x).fp().toString();
  
  expect(fp(1)).toBe('0.e+0');
  expect(fp(-1)).toBe('0.e+0');
  expect(fp(2)).toBe('0.e+0');
  expect(fp(-2)).toBe('0.e+0');

  expect(fp(0.1)).toBe('1.e-1');
  expect(fp(2.5)).toBe('5.0e-1');
  expect(fp(10)).toBe('0.0e+0');

  expect(fp(-0.1)).toBe('1.e-1');
  expect(fp(-2.5)).toBe('5.0e-1');
  expect(fp(-10)).toBe('0.0e+0');

  expect(fp(9007199254740992n)).toBe('0.000000000000000e+0');
  expect(fp(9007199254740994n)).toBe('0.000000000000000e+0');
  expect(fp(10_000_000_000_000_000n)).toBe('0.e+0');

  expect(fp('900719.9254740992')).toBe('9.254740992e-1');
  expect(fp('90071992.54740994')).toBe('5.4740994e-1');
  expect(fp(10_000_000.00000)).toBe('0.e+0');

  expect(fp('-900719.9254740992')).toBe('9.254740992e-1');
  expect(fp('-90071992.54740994')).toBe('5.4740994e-1');
  expect(fp(-10_000_000.00000)).toBe('0.e+0');
});
