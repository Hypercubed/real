import test from 'ava';
import Irrational from '../../src/irrational';

test('abs', t => {
  const abs = (v: any) => new Irrational(v).abs().toString();

  t.is(abs(0), '0');
  t.is(abs(-0), '0');
  t.is(abs(1), '1');
  t.is(abs(-1), '1');
  t.is(abs(0.5), '5e-1');
  t.is(abs(-0.5), '5e-1');
  t.is(abs(1.5), '1.5');
  t.is(abs(-1.5), '1.5');

  t.is(abs(-602214085700000000000000n), '6.022140857e+23');

  t.is(abs('-5.5879983320336874473209567979287894365'), '5.5879983320336874473');
});
