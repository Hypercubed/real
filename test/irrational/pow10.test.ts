import test from 'ava';
import { Irrational } from '../../src/irrational';

test('pow10', t => {
  const pow10 = (x: any) => new Irrational(x).pow10();

  t.is(pow10(1).toString(), '1.e+1');
  t.is(pow10(2).toString(), '1.e+2');

  t.is(pow10(10).toString(), '1.0e+10');
  t.is(pow10(200).toString(), '1.00e+200');

  t.is(pow10(-1).toString(), '1.e-1');
  t.is(pow10(-2).toString(), '1.e-2');

                                   // 1.023292992280754130966275174819877827341164057237981308599
  t.is(pow10( 0.01     ).toString(), '1.e+0');
  t.is(pow10('0.0100'  ).toString(), '1.02e+0');
  t.is(pow10('0.010000').toString(), '1.0232e+0');
});