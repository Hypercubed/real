import test from 'ava';
import Irrational from '../../src/irrational';

test('log', t => {
  const log = (v: any) => new Irrational(v).log10().toString();

  t.is(log(1),   '0.0000000000000000000e+0');
  t.is(log(10),  '9.9999999999999999999e-1'); // should be 1!!
  t.is(log(100), '1.9982775312549531320e+0'); // should be 2!!

  t.is(log(2),   '3.0102999566398119523e-1');
             // 0.3_01029995663981195213738894724493026768189881462108541310

  // t.is(log(9007199254740992n), 15.954589770191003);
  // t.is(log('9007199254740992e11'), 26.954589770191003);
});
