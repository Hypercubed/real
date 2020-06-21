import { Irrational } from '../../src/irrational';

const log = (v: any) => new Irrational(v).log10();

test.skip('log', () => {
  expect(log(1).toString()).toBe('0.e+0');
  expect(log(10).toString()).toBe('1.0e+0');
  expect(log(100).toString()).toBe('2.00e+0');

  expect(log(100000).toString()).toBe('5.0000000000000000000e+0');

  expect(log(2).toString()).toBe('3.0102999566398119532e-1');
             // 0.3_01029995663981195213738894724493026768189881462108541310

  expect(log(2718).toString()).toBe('3.4342494523964755067e+0');
                  // 3.434249452396475506672867756572026433614541038620377722067

  expect(log(Irrational.E).toString()).toBe('4.3429448190325182769e-1');
                      // 0.4_34294481903251827651128918916605082294397005803666566114...

  // t.is(log(9007199254740992n), 15.954589770191003);
  // t.is(log('9007199254740992e11'), 26.954589770191003);
});
