import test from 'ava';
import { Rational } from '../../src/rational';

test('abs', t => {
  const sgn = (n: any, d?: any) => new Rational(n, d).sgn();

  t.is(sgn(0), 1);
  // t.is(sgn(-0), -1);
  t.is(sgn(1), 1);
  t.is(sgn(-1), -1);
  t.is(sgn(0.5), 1);
  t.is(sgn(-0.5), -1);
  t.is(sgn(1.5), 1);
  t.is(sgn(-1.5), -1);

  t.is(sgn(-6022140857n, 1000n), -1);
  t.is(sgn(-6022140857n, -1000n), 1);

  t.is(sgn('-5.5879983320336874473209567979287894365'), -1);
});
