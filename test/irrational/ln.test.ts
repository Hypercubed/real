import test from 'ava';
import Irrational from '../../src/irrational';

test('log', t => {
  const log = (v: any) => new Irrational(v).ln().toString();

  t.is(log(1), '0');
  t.is(log(10), '2.302585092994046');
  t.is(log('2.718281828459045235360287471352662497757247093699959574966'), '0.9999999999999716'); // should be 1

  t.is(log(9007199254740992n), '36.7368005696771');
  t.is(log('9007199254740992e11'), '62.065236592611605');
});
