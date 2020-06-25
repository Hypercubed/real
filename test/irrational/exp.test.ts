import { Irrational } from '../../src/irrational';

const exp = (v: any) => new Irrational(v).exp();

test('exp', () => {
  expect(exp(0).toString()).toBe('1.e+0');

                                    // 2.71828182845904523536028747135266249775724709369995
  expect(exp( 1    ).toString()).toBe('3.e+0');
  expect(exp('1.0' ).toString()).toBe('2.7e+0');
  expect(exp('1.00').toString()).toBe('2.72e+0');

                                      // 7.389056098930650227230427460575007813180315570551847324087
  expect(exp( 2      ).toString()).toBe('7.e+0');
  expect(exp('2.0'   ).toString()).toBe('7.4e+0');
  expect(exp('2.0000').toString()).toBe('7.3891e+0');

                                      //  3.67879441171442321595523770161460867445811131031767834507
  expect(exp( -1      ).toString()).toBe('4.e-1');
  expect(exp('-1.0'   ).toString()).toBe('3.7e-1');
  expect(exp('-1.0000').toString()).toBe('3.6788e-1');
});
