import { Irrational } from '../../src/irrational';

const ln = (v: any) => new Irrational(v).ln();

test('ln', () => {
  expect(ln('1.').toString()).toBe('0.e+0');

  expect(ln('2.').toString()).toBe( '7.e-1');
  expect(ln('2.0').toString()).toBe('6.9e-1');
                                  // 6.93147180559945309417232121458176568075500134360255254120e-1

  expect(ln('10.').toString()).toBe('2.3e+0');
                               // 2.3025850929940456840179914546843642076011014886287729
  expect(ln('1000.').toString()).toBe('6.908e+0');
                                 // 6.907755278982137052053974364053092622803304465886318928099...

  expect(ln('2718.').toString()).toBe('7.908e+0');
                                    // 7.907651594711089021003958894787704267628217642585544032872...

  expect(ln('2.718').toString()).toBe('9.999e-1');
                                    // 9.99896315728951968949984530734611644824913176699225104772e-1

  // expect(ln(Irrational.E).toString()).toBe('1.e+0');  // TODO: bug!!  (1.0)

  // expect(ln('9007199254740992.').toString()).toBe('3.673680056967710e+1');  // TODO: precision bug!!
  //                                              //  3.673680056967710139911330243728335810800150712109352846839e+1
  // expect(ln('9007199254740992e11').toString()).toBe('6.206523659261160e+1');  // TODO: precision bug!!
  //                                                 // 6.2065236592611603923311208e+1
});
