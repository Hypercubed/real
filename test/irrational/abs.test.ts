import test from 'ava';
import Irrational from '../../src/irrational';

test('abs', t => {
  const abs = (v: any) => new Irrational(v).abs().toString();

  t.is(abs( 0),                                         '0.0000000000000000000e+0');
  t.is(abs(-0),                                         '0.0000000000000000000e+0');
  t.is(abs( 1),                                         '1.0000000000000000000e+0');
  t.is(abs(-1),                                         '1.0000000000000000000e+0');
  t.is(abs( 0.5),                                       '5.0000000000000000000e-1');
  t.is(abs(-0.5),                                       '5.0000000000000000000e-1');
  t.is(abs( 1.5),                                       '1.5000000000000000000e+0');
  t.is(abs(-1.5),                                       '1.5000000000000000000e+0');

  t.is(abs(-602214085700000000000000n),                 '6.0221408570000000000e+23');

  t.is(abs('-5.5879983320336874473209567979287894365'), '5.5879983320336874473e+0');
});
