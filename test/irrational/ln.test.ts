import test from 'ava';
import Irrational from '../../src/irrational';

test('ln', t => {
  const ln = (v: any) => new Irrational(v).ln();

  t.is(ln(1).toString(), '0');
  t.is(ln(10).valueOf(), 2302585092994046e-15);
  t.is(ln('2.718281828459045235360287471352662497757247093699959574966').valueOf(), 9999999999999716e-16); // should be 1

  t.is(ln(9007199254740992n).valueOf(), 367368005696771e-13);
  t.is(ln('9007199254740992e11').valueOf(), 62.065236592611605);
});
