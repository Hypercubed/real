import test from 'ava';
import Real from "../src/real"

test('abs', t => {
  const abs = (v: any) => new Real(v).abs().toString();

  t.is(abs(0), '0');
  t.is(abs(-0), '0');
  t.is(abs(1), '1');
  t.is(abs(-1), '1');
  t.is(abs(0.5), '5e-1');
  t.is(abs(-0.5), '5e-1');
  t.is(abs(1.5), '15e-1');
  t.is(abs(-1.5), '15e-1');

  t.is(abs(-602214085700000000000000n), '602214085700000000000000');

  t.is(abs('-5.5879983320336874473209567979287894365'), '55879983320336874473209567979287894365e-37');
});
