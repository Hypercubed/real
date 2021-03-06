import test from 'ava';
import Irrational from '../../src/irrational';

test('fp', t => {
  const fp = (x: any) => new Irrational(x).fp().toString();

  t.is(fp(1),                       '0.0000000000000000000e+0');
  t.is(fp(-1),                      '0.0000000000000000000e+0');
  t.is(fp(2),                       '0.0000000000000000000e+0');
  t.is(fp(-2),                      '0.0000000000000000000e+0');

  t.is(fp(0.1),                     '1.0000000000000000000e-1');
  t.is(fp(2.5),                     '5.0000000000000000000e-1');
  t.is(fp(10),                      '0.0000000000000000000e+0');

  t.is(fp(-0.1),                    '1.0000000000000000000e-1');
  t.is(fp(-2.5),                    '5.0000000000000000000e-1');
  t.is(fp(-10),                     '0.0000000000000000000e+0');

  t.is(fp(9007199254740992n),       '0.0000000000000000000e+0');
  t.is(fp(9007199254740994n),       '0.0000000000000000000e+0');
  t.is(fp(10_000_000_000_000_000n), '0.0000000000000000000e+0');

  t.is(fp('900719.9254740992'),     '9.2547409920000000000e-1');
  t.is(fp('90071992.54740994'),     '5.4740994000000000000e-1');
  t.is(fp(10_000_000.00000),        '0.0000000000000000000e+0');

  t.is(fp('-900719.9254740992'),    '9.2547409920000000000e-1');
  t.is(fp('-90071992.54740994'),    '5.4740994000000000000e-1');
  t.is(fp(-10_000_000.00000),       '0.0000000000000000000e+0');
});
