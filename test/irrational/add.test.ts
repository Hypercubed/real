import { Irrational } from '../../src/irrational';

const add = (x: any, y: any) => new Irrational(x).add(new Irrational(y));

test('add', () => {
  expect(add( '0.',  '0.').toString()).toBe('0.e+0');
  expect(add('-0.',  '0.').toString()).toBe('0.e+0');
  expect(add( '1.',  '1.').toString()).toBe('2.e+0');
  expect(add( '1.', '-1.').toString()).toBe('0.e+0');

  expect(add('1.',  '2.' ).toString()).toBe('3.e+0');
  expect(add('1.0', '2.' ).toString()).toBe('3.e+0');
  expect(add('1.',  '2.0').toString()).toBe('3.e+0');
  expect(add('1.0', '2.0').toString()).toBe('3.0e+0');

  expect(add('0.10', '0.2').toString()).toBe('3.e-1');
  expect(add('0.1', '0.20').toString()).toBe('3.e-1');
  expect(add('0.10', '0.20').toString()).toBe('3.0e-1');

  expect(add('0.1', '0.2').toString()).toBe('3.e-1');
  // expect(add('0.10', '0.2').toString()).toBe('3.e-1');
  expect(add('0.1', '0.20').toString()).toBe('3.e-1');
  expect(add('0.10', '0.20').toString()).toBe('3.0e-1');
  
  //                                                              // 9.007199254740994e+15
  expect(add('9007199254740992.', '2.'        ).toString()).toBe('9.007199254740994e+15');
  expect(add('9007199254740992.', '2.0000'    ).toString()).toBe('9.007199254740994e+15');
  expect(add('9007199254740992.', '2.00000000').toString()).toBe('9.007199254740994e+15');
  expect(add('2.', '9007199254740992.'        ).toString()).toBe('9.007199254740994e+15');
  expect(add('2.000', '9007199254740992.'     ).toString()).toBe('9.007199254740994e+15');

                                                                  // 1.1007199254740992
  expect(add('2.e+15',        '9007199254740992.').toString()).toBe('1.1e+16');
  expect(add('2.000e+15',     '9007199254740992.').toString()).toBe('1.1007e+16');
  expect(add('2.0000000e+15', '9007199254740992.').toString()).toBe('1.10071993e+16');

  expect(add('2e+16', '9007199254740992.' ).toString()).toBe('3.e+16');

  expect(add('10000000000000000.', '0.00000000001').toString()).toBe('1.0000000000000000e+16');

  expect(add('0.e-4', '1.').toString()).toBe('1.e+0');

  expect(add(Irrational.TWO, 1).toString()).toBe('3.00000000000000e+0');
  expect(add(1, Irrational.TWO).toString()).toBe('3.00000000000000e+0');
});
