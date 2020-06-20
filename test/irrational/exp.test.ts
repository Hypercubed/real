import test from 'ava';
import { Irrational } from '../../src/irrational';

test('exp', t => {
  const exp = (v: any) => new Irrational(v).exp();

  t.is(exp(0).toString(), '1.e+0');

                             // 2.71828182845904523536028747135266249775724709369995
  t.is(exp( 1    ).toString(), '2.e+0');
  t.is(exp('1.0' ).toString(), '2.7e+0');
  t.is(exp('1.00').toString(), '2.70e+0');  // TODO: precision issue

                               // 7.389056098930650227230427460575007813180315570551847324087
  t.is(exp( 2      ).toString(), '6.e+0'); // TODO: precision issue
  t.is(exp('2.0'   ).toString(), '7.3e+0');
  t.is(exp('2.0000').toString(), '7.3345e+0'); // TODO: precision issue

                        //  3.67879441171442321595523770161460867445811131031767834507
  t.is(exp( -1      ).toString(), '3.e-1');
  t.is(exp('-1.0'   ).toString(), '3.7e-1'); // TODO: precision issue
  t.is(exp('-1.0000').toString(), '3.7447e-1'); // TODO: precision issue
});
