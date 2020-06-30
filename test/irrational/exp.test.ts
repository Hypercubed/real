import { Irrational } from '../../src/irrational';

const exp = (v: any) => new Irrational(v).exp();

test('exp', () => {
                                      // 7.389056098930650227230427460575007813180315570551847324087
  expect(exp('2.'    ).toString()).toBe('7.e+0');
  expect(exp('2.0'   ).toString()).toBe('7.4e+0');
  expect(exp('2.0000').toString()).toBe('7.3891e+0');

                                      //  3.67879441171442321595523770161460867445811131031767834507
  expect(exp('-1.'   ).toString()).toBe('4.e-1');
  expect(exp('-1.0'   ).toString()).toBe('3.7e-1');
  expect(exp('-1.0000').toString()).toBe('3.6788e-1');

                                        // 23.1406775083
  expect(exp('3.141592').toString()).toBe('2.314068e+1');
});

test('exp(0)', () => {
  expect(exp('0.'         ).toString()).toBe('1.e+0');
  expect(exp('0.00000000' ).toString()).toBe('1.00000000e+0');
});

test('exp(1)', () => {
                                           // 2.71828182845904523536028747135266249775724709369995
  expect(exp('1.'         ).toString()).toBe('3.e+0');
  expect(exp('1.0'        ).toString()).toBe('2.7e+0');
  expect(exp('1.00'       ).toString()).toBe('2.72e+0');
  expect(exp('1.00000000' ).toString()).toBe('2.71828183e+0');
});

test('basics', () => {
  expect(exp('-10.0000000').toString()).toBe('4.53999298e-5');
                                           // 4.5399929762484851535591515560550610237918088866564969

  expect(exp('-1.00000000' ).toString()).toBe('3.67879441e-1');
  expect(exp(' 0.00000000' ).toString()).toBe('1.00000000e+0');
  expect(exp(' 0.693147181').toString()).toBe('2.00000000e+0');
  expect(exp(' 10.0000000' ).toString()).toBe('2.20264658e+4');
});

test('tiny', () => {
  expect(exp(' 0.10000000').toString()).toBe('1.1051709e+0');
                                           // 1.10517092

  expect(exp(' 0.0000010000000').toString()).toBe('1.0000010e+0');
                                                // 1.0000010000005
});

test('zeros', () => {
  expect(exp(' 0.00000000'     ).toString()).toBe('1.00000000e+0');
  expect(exp(' 0.00000000e+100').toString()).toBe('1.00000000e+0');
  expect(exp('-0.00000000e+100').toString()).toBe('1.00000000e+0');
});

test.skip('slow', () => {
  expect(exp(' 5.4241E+2                ').toString()).toBe('3.6785e+235');
                                                          // 3.6784929593911466559750883907965508435360418174 × 10^235

  expect(exp(' 5.42410311287441459172E+2').toString()).toBe('3.67963820629414238376e+235');
                                                          // 3.6796382062941423837597439253790366776529140019 × 10^235
                                                          
                                                          // 2.718504591525756409575277038480783953355544138 × 10^-236
  expect(exp('-5.4241E+2                ').toString()).toBe('2.717658486884572e-236');
  expect(exp('-5.42410311287441459172E+2').toString()).toBe('2.717658486884572e-236');
});

test('expx21X', () => {
  expect(exp(' -1.00000E-40 ').toString()).toBe('1.00000e+0');
});