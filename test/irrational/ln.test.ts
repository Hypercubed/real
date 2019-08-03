import test from 'ava';
import Irrational from '../../src/irrational';

test('ln', t => {
  const ln = (v: any) => new Irrational(v).ln();

  t.is(ln(1).toString(), '0');
  t.is(ln(2).toString(), '6.6666666666666666666…e-1');
                       // 0.69314718056
  t.is(ln(10).toString(), '1.6363636363636363636');
                        // 2.30258509299
  // t.is(ln('2.718281828459045235360287471352662497757247093699959574966').valueOf(), 1); // should be 1

  // t.is(ln(9007199254740992n).valueOf(), 367368005696771e-13);
  // t.is(ln('9007199254740992e11').valueOf(), 62.065236592611605);
});
