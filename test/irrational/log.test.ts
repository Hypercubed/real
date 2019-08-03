import test from 'ava';
import Irrational from '../../src/irrational';

test('log', t => {
  const log = (v: any) => new Irrational(v).log10();

  t.is(log(1).toString(), '0');
  t.is(log(10).valueOf(), 1);
  t.is(log(100).valueOf(), 1.9982775312549532); // should be 2!!

  t.is(log(2).toString(), '3.0102999566398119523…e-1');
                      // 0.3_01029995663981195213738894724493026768189881462108541310

  // t.is(log(9007199254740992n).valueOf(), 15.954589770191003);
  // t.is(log('9007199254740992e11').valueOf(), 26.954589770191003);
});
