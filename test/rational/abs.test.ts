import { Rational } from '../../src/rational';

const abs = (n: any, d?: any) => new Rational(n, d).abs();

test('abs', () => {
  expect(abs(0).toString()).toBe('0');
  expect(abs(-0).toString()).toBe('0');
  expect(abs(1).toString()).toBe('1');
  expect(abs(-1).toString()).toBe('1');
  expect(abs(0.5).toString()).toBe('1/2');
  expect(abs(-0.5).toString()).toBe('1/2');
  expect(abs(1.5).toString()).toBe('3/2');
  expect(abs(-1.5).toString()).toBe('3/2');

  expect(abs(-602214085700000000000000n).toString()).toBe('602214085700000000000000');

  expect(abs('-5.5879983320336874473209567979287894365').toString()).toBe(
    '11175996664067374894641913595857578873/2000000000000000000000000000000000000'
  );
});
