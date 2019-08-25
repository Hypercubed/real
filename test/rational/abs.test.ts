import test from 'ava';
import Rational from '../../src/rational';

test('abs', t => {
  const abs = (n: any, d?: any) => new Rational(n, d).abs().toString();

  t.is(abs(0),    '0');
  t.is(abs(-0),   '0');
  t.is(abs(1),    '1');
  t.is(abs(-1),   '1');
  t.is(abs(0.5),  '1/2');
  t.is(abs(-0.5), '1/2');
  t.is(abs(1.5),  '3/2');
  t.is(abs(-1.5), '3/2');

  t.is(abs(-602214085700000000000000n), '602214085700000000000000');

  t.is(abs('-5.5879983320336874473209567979287894365'), '11175996664067374894641913595857578873/2000000000000000000000000000000000000');
});
