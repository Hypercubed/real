import { Irrational } from '../../src/irrational';

test.skip('ln', () => {
  const ln = (v: any) => new Irrational(v).ln().toString();

  expect(ln(1)).toBe('0.e+0');
  expect(ln(2)).toBe('6.9314718055994530965e-1');
  expect(ln(2n)).toBe('6.9314718055994530965e-1');
                   // 0.6_93147180559945309417232121458176568075500134360255254120
  expect(ln(10)).toBe('2.3025850929940456865e+0');
                     // 2.3025850929940456840179914546843642076011014886287729
  expect(ln(1000)).toBe('6.9077552789821370521e+0');
                     // 6.907755278982137052053974364053092622803304465886318928099...

  expect(ln(2718)).toBe('7.9076515947110890210e+0');
                    // 7.907651594711089021003958894787704267628217642585544032872...

  expect(ln(2.718)).toBe('9.9989631572895196895e-1');
                   // 0.9_99896315728951968949984530734611644824913176699225104772... 

  expect(ln(Irrational.E)).toBe('1.0000000000000000000e+0'); // should be 1

  // t.is(ln(9007199254740992n).valueOf(), 367368005696771e-13);
                                   //  36.73680056967710139911330243728335810800150712109352846839
  // t.is(ln('9007199254740992e11').valueOf(), 62.065236592611605);
                                   //  62.06523659261160392331120843881136439161362349601003120476
});
