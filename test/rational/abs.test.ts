import test from 'ava';
import Rational from '../../src/rational';

test('abs', t => {
  const abs = (n: any, d?: any) => new Rational(n, d).abs().toString();

  t.is(abs(0), '0');
  t.is(abs(-0), '0');
  t.is(abs(1), '1');
  t.is(abs(-1), '1');
  t.is(abs(0.5), '5/10');
  t.is(abs(-0.5), '5/10');
  t.is(abs(1.5), '15/10');
  t.is(abs(-1.5), '15/10');

  t.is(abs(-602214085700000000000000n), '602214085700000000000000');

  t.is(abs('-5.5879983320336874473209567979287894365'), '55879983320336874473209567979287894365/10000000000000000000000000000000000000');
});
