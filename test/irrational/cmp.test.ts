import test from 'ava';
import Irrational from '../../src/irrational';

test('cmp', t => {
  const cmp = (x: any, y: any) => new Irrational(x).cmp(new Irrational(y)).toString();

  t.is(cmp(0, 0), '0');
  t.is(cmp(1, 0), '1');
  t.is(cmp(0, 1), '-1');

  t.is(cmp(0.1, 10), '-1');
  t.is(cmp(10, 1), '1');

  t.is(cmp(9007199254740992n, 9007199254740994n), '-1');
  t.is(cmp(9007199254740996n, 9007199254740994n), '1');

  // tests values with diffreent exponents
  const a = new Irrational(10000);
  const b = new Irrational(0.0000001);

  t.is(a.cmp(a.add(b)), -1);
});
