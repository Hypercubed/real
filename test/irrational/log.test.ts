import { Irrational } from '../../src/irrational';

const log = (v: any) => new Irrational(v).log10();

test('log', () => {
  expect(log('1.').toString()).toBe('0.e-57');    // TODO: precision bug??
  expect(log('10.').toString()).toBe('1.0e+0');   // bug!!
  expect(log('100.').toString()).toBe('2.00e+0');
 
  expect(log('100000.').toString()).toBe('5.00000e+0');

  expect(log('2.').toString()).toBe('3.e-1');
                                  // 3.01029995663981195213738894724493026768189881462108541310

  expect(log('2718.').toString()).toBe('3.434e+0');
                                     // 3.434249452396475506672867756572026433614541038620377722067

  // expect(log(Irrational.E).toString()).toBe('4.342944819032518.e+0');  // TODO: precision bug
                                          // 4.34294481903251827651128918916605082294397005803666566114...

  // expect(log('9007199254740992.').toString()).toBe('1.595458977019100e+1');  // TODO: precision bug
  //                                                // 1.595458977019100334632816142039813041871406371749175268945e+1
  // expect(log('9007199254740992e11').toString()).toBe('2.695458977019100e+1');  // TODO: precision bug
  //                                                  // 2.695458977019100334632816142039813041871406371749175268945e+1
});
