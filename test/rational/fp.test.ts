import { Rational } from '../../src/';

const fp = (x: any) => Rational.from(x).fp();

test('fp', () => {
  expect(fp(1).toString()).toBe('0');
  expect(fp(-1).toString()).toBe('0');
  expect(fp(2).toString()).toBe('0');
  expect(fp(-2).toString()).toBe('0');

  expect(fp(0.1).toString()).toBe('1/10');
  expect(fp(2.5).toString()).toBe('1/2');
  expect(fp(10).toString()).toBe('0');

  expect(fp(-0.1).toString()).toBe('1/10');
  expect(fp(-2.5).toString()).toBe('1/2');
  expect(fp(-10).toString()).toBe('0');

  expect(fp(9007199254740992n).toString()).toBe('0');
  expect(fp(9007199254740994n).toString()).toBe('0');
  expect(fp(10_000_000_000_000_000n).toString()).toBe('0');

  expect(fp('900719.9254740992').toString()).toBe('9037833/9765625');
  expect(fp('90071992.54740994').toString()).toBe('27370497/50000000');
  expect(fp(10_000_000.00000).toString()).toBe('0');

  expect(fp('-900719.9254740992').toString()).toBe('9037833/9765625');
  expect(fp('-90071992.54740994').toString()).toBe('27370497/50000000');
  expect(fp(-10_000_000.00000).toString()).toBe('0');
});
