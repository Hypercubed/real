import test from 'ava';
import Irrational from '../../src/irrational';

test('pow10', t => {
  const pow10 = (x: any) => new Irrational(x).pow10();

  t.is(pow10(1).valueOf(), 10);
  t.is(pow10(2).valueOf(), 100); 

  t.is(pow10(-1).valueOf(), 0.1);
  t.is(pow10(-2).valueOf(), 0.01);

  // t.is(pow10(0.01).valueOf(), 1.023292992280754);
                           // 1.023292992280754130966275174819877827341164057237981308599
});