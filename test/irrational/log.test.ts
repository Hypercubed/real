import test from 'ava';
import Irrational from '../../src/irrational';

test('log', t => {
  const log = (v: any) => new Irrational(v).log10();

  t.is(log(1).toString(), '0');
  t.is(log(10).toString(), '1');

  t.is(log(9007199254740992n).valueOf(), 15.954589770191003);
  t.is(log('9007199254740992e11').valueOf(), 26.954589770191003);
});
