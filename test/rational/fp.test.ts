import { Rational } from '../../src/';

test('fp', () => {
  const fp = (x: any) => new Rational(x).fp().toString();

  expect(fp(1)).toBe('0');
  expect(fp(-1)).toBe('0');
  expect(fp(2)).toBe('0');
  expect(fp(-2)).toBe('0');

  expect(fp(0.1)).toBe('1/10');
  expect(fp(2.5)).toBe('1/2');
  expect(fp(10)).toBe('0');

  expect(fp(-0.1)).toBe('1/10');
  expect(fp(-2.5)).toBe('1/2');
  expect(fp(-10)).toBe('0');

  expect(fp(9007199254740992n)).toBe('0');
  expect(fp(9007199254740994n)).toBe('0');
  expect(fp(10_000_000_000_000_000n)).toBe('0');

  expect(fp('900719.9254740992')).toBe('9037833/9765625');
  expect(fp('90071992.54740994')).toBe('27370497/50000000');
  expect(fp(10_000_000.00000)).toBe('0');

  expect(fp('-900719.9254740992')).toBe('9037833/9765625');
  expect(fp('-90071992.54740994')).toBe('27370497/50000000');
  expect(fp(-10_000_000.00000)).toBe('0');
});
