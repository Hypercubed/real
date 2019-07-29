import test from 'ava';
import Irrational from '../../src/irrational';

test('exp', t => {
  const exp = (v: any) => new Irrational(v).exp();

  t.is(exp(0).toString(), '1');
  t.is(exp(1).toString(), '2.7182818284590452352');
                        // 2.71828182845904523536028747135266249775724709369995
  t.is(exp(2).toString(), '7.3890560989306267334');
                        // 7.389056098930650227230427460575007813180315570551847324087

  t.is(exp(-1).toString(), '3.6787944117144233488e-1');
                        //  3.67879441171442321595523770161460867445811131031767834507
});
