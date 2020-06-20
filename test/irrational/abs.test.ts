import test from 'ava';
import { Irrational } from '../../src/irrational';

test('abs', t => {
  const abs = (v: any) => new Irrational(v).abs();

  t.is(abs( 0).toString(),                                         '0.e+0');
  t.is(abs(-0).toString(),                                         '0.e+0');
  t.is(abs( 1).toString(),                                         '1.e+0');
  t.is(abs(-1).toString(),                                         '1.e+0');
  t.is(abs( 0.5).toString(),                                       '5.e-1');
  t.is(abs(-0.5).toString(),                                       '5.e-1');
  t.is(abs( 1.5).toString(),                                       '1.5e+0');

  t.is(abs(-1.5).toString(),                                       '1.5e+0');

  t.is(abs(-602214085700000000000000n).toString(),                 '6.02214085700000000000000e+23');

  t.is(abs('-5.5879983320336874473209567979287894365').toString(), '5.5879983320336874473209567979287894365e+0');
});
