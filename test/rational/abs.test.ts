import { Rational } from '../../src/rational';

test('abs', () => {
  const abs = (n: any, d?: any) => new Rational(n, d).abs().toString();

  expect(abs(0)).toBe('0');
  expect(abs(-0)).toBe('0');
  expect(abs(1)).toBe('1');
  expect(abs(-1)).toBe('1');
  expect(abs(0.5)).toBe('1/2');
  expect(abs(-0.5)).toBe('1/2');
  expect(abs(1.5)).toBe('3/2');
  expect(abs(-1.5)).toBe('3/2');

  expect(abs(-602214085700000000000000n)).toBe('602214085700000000000000');

  expect(abs('-5.5879983320336874473209567979287894365')).toBe(
    '11175996664067374894641913595857578873/2000000000000000000000000000000000000'
  );
});
