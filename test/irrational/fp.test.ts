import test from 'ava';
import { Irrational } from '../../src/irrational';

// TODO: fp needs to subtract ip from precision
test.skip('fp', t => {
  const fp = (x: any) => new Irrational(x).fp().toString();
  
  t.is(fp(1),                       '0.e+0');
  t.is(fp(-1),                      '0.e+0');
  t.is(fp(2),                       '0.e+0');
  t.is(fp(-2),                      '0.e+0');

  t.is(fp(0.1),                     '1.e-1');
  t.is(fp(2.5),                     '5.0e-1');
  t.is(fp(10),                      '0.0e+0');

  t.is(fp(-0.1),                    '1.e-1');
  t.is(fp(-2.5),                    '5.0e-1');
  t.is(fp(-10),                     '0.0e+0');

  t.is(fp(9007199254740992n),       '0.000000000000000e+0');
  t.is(fp(9007199254740994n),       '0.000000000000000e+0');
  t.is(fp(10_000_000_000_000_000n), '0.e+0');

  t.is(fp('900719.9254740992'),     '9.254740992e-1');
  t.is(fp('90071992.54740994'),     '5.4740994e-1');
  t.is(fp(10_000_000.00000),        '0.e+0');

  t.is(fp('-900719.9254740992'),    '9.254740992e-1');
  t.is(fp('-90071992.54740994'),    '5.4740994e-1');
  t.is(fp(-10_000_000.00000),       '0.e+0');
});
