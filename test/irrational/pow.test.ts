import { Irrational } from '../../src/irrational';

const pow = (x: any, y: any) => new Irrational(x).pow(new Irrational(y));

const HALF = new Irrational(0.5, 0, Infinity);

test('error', () => {
  expect(() => {
    pow('0', '-1');
  }).toThrow('Division by zero')
});

test('basics', () => {
  expect(pow('0.', '0.').toString()).toBe('1.e+0');
  expect(pow('0.', '1.').toString()).toBe('0.e+0');
  expect(pow('0.', '2.').toString()).toBe('0.e+0');
  expect(pow('1.', '0.').toString()).toBe('1.e+0');
  expect(pow('1.', '1.').toString()).toBe('1.e+0');
  expect(pow('1.', '2.').toString()).toBe('1.e+0');

  expect(pow('4.0', '2.0').toString()).toBe('1.6e+1');
});

test('basics, exact', () => {
  expect(pow('0', '0').toString()).toBe('1');
  expect(pow('0', '1').toString()).toBe('0');
  expect(pow('0', '2').toString()).toBe('0');
  expect(pow('1', '0').toString()).toBe('1');
  expect(pow('1', '1').toString()).toBe('1');
  expect(pow('1', '2').toString()).toBe('1');

  expect(pow('4', '2').toString()).toBe('16');
});

test('power of two', () => {
  expect(pow('2.' ,     '0.'   ).toString()).toBe('1.e+0');
  expect(pow('2.' ,     '1.'   ).toString()).toBe('2.e+0');
  expect(pow('2.' ,     '2.'   ).toString()).toBe('4.e+0');
  expect(pow('2.' ,     '3.'   ).toString()).toBe('8.e+0');
  expect(pow('2.0',     '4.0'  ).toString()).toBe('1.6e+1');
  expect(pow('2.0',     '5.0'  ).toString()).toBe('3.2e+1');
  expect(pow('2.00',    '7.00' ).toString()).toBe('1.28e+2');
  expect(pow('2.00',    '8.00' ).toString()).toBe('2.56e+2');
  expect(pow('2.00',    '9.00' ).toString()).toBe('5.12e+2');
  expect(pow('2.000',  '10.00' ).toString()).toBe('1.024e+3');
  expect(pow('2.000',  '11.00' ).toString()).toBe('2.048e+3');
  expect(pow('2.000',  '12.00' ).toString()).toBe('4.096e+3');
  expect(pow('2.0000', '15.000').toString()).toBe('3.2768e+4');
  expect(pow('2.0000', '16.000').toString()).toBe('6.5536e+4');
  expect(pow('2.0000', '31.000').toString()).toBe('2.1475e+9');
});

test('power of two, exact', () => {
  expect(pow('2',  '0').toString()).toBe('1');
  expect(pow('2',  '1').toString()).toBe('2');
  expect(pow('2',  '2').toString()).toBe('4');
  expect(pow('2',  '3').toString()).toBe('8');
  expect(pow('2',  '4').toString()).toBe('16');
  expect(pow('2',  '5').toString()).toBe('32');
  expect(pow('2',  '7').toString()).toBe('128');
  expect(pow('2',  '8').toString()).toBe('256');
  expect(pow('2',  '9').toString()).toBe('512');
  expect(pow('2', '10').toString()).toBe('1024');
  expect(pow('2', '11').toString()).toBe('2048');
  expect(pow('2', '12').toString()).toBe('4096');
  expect(pow('2', '15').toString()).toBe('32768');
  expect(pow('2', '16').toString()).toBe('65536');
  expect(pow('2', '31').toString()).toBe('2147483648');
});

test('power of ten', () => {
  expect(pow('10.',  '0').toString()).toBe('1.0e+0');
  expect(pow('10.',  '1').toString()).toBe('1.0e+1');
  expect(pow('10.',  '2').toString()).toBe('1.0e+2');
  expect(pow('10.',  '3').toString()).toBe('1.0e+3');
  expect(pow('10.',  '4').toString()).toBe('1.0e+4');
  expect(pow('10.',  '5').toString()).toBe('1.0e+5');
  expect(pow('10.',  '7').toString()).toBe('1.0e+7');
  expect(pow('10.',  '8').toString()).toBe('1.0e+8');
  expect(pow('10.',  '9').toString()).toBe('1.0e+9');
  expect(pow('10.', '10').toString()).toBe('1.0e+10');
  expect(pow('10.', '11').toString()).toBe('1.0e+11');
  expect(pow('10.', '12').toString()).toBe('1.0e+12');
  expect(pow('10.', '15').toString()).toBe('1.0e+15');
  expect(pow('10.', '16').toString()).toBe('1.0e+16');
  expect(pow('10.', '22').toString()).toBe('1.0e+22');
  expect(pow('10.', '77').toString()).toBe('1.0e+77');
  expect(pow('10.', '99').toString()).toBe('1.0e+99');
});

test('power of ten, exact', () => {
  expect(pow('10',  '0').toString()).toBe('1');
  expect(pow('10',  '1').toString()).toBe('10');
  expect(pow('10',  '2').toString()).toBe('100');
  expect(pow('10',  '3').toString()).toBe('1000');
  expect(pow('10',  '4').toString()).toBe('10000');
  expect(pow('10',  '5').toString()).toBe('100000');
  expect(pow('10',  '7').toString()).toBe('10000000');
  expect(pow('10',  '8').toString()).toBe('100000000');
  expect(pow('10',  '9').toString()).toBe('1000000000');
  expect(pow('10', '10').toString()).toBe('10000000000');
  expect(pow('10', '11').toString()).toBe('100000000000');
  expect(pow('10', '12').toString()).toBe('1000000000000');
  expect(pow('10', '15').toString()).toBe('1000000000000000');
  expect(pow('10', '16').toString()).toBe('10000000000000000');
  expect(pow('10', '31').toString()).toBe('10000000000000000000000000000000');
});

test('fractions', () => {
  expect(pow('0.1', '0.').toString()).toBe('1.e+0');
  expect(pow('0.1', '1.').toString()).toBe('1.e-1');
  expect(pow('0.1', '2.').toString()).toBe('1.e-2');
  expect(pow('0.1', '3.').toString()).toBe('1.e-3');
  expect(pow('0.1', '4.').toString()).toBe('1.e-4');
  expect(pow('0.1', '5.').toString()).toBe('1.e-5');
  expect(pow('0.1', '6.').toString()).toBe('1.e-6');
  expect(pow('0.1', '7.').toString()).toBe('1.e-7');
  expect(pow('0.1', '8.').toString()).toBe('1.e-8');
  expect(pow('0.1', '9.').toString()).toBe('1.e-9');
});

test('negitive powers', () => {
  expect(pow('2', '-1' ).toString()).toBe('0.5');
  expect(pow('2', '-2' ).toString()).toBe('0.25');
  expect(pow('2', '-4' ).toString()).toBe('0.0625');
  expect(pow('2', '-8' ).toString()).toBe('0.00390625');
  expect(pow('2', '-16').toString()).toBe('0.0000152587890625');
  // expect(pow('2', '-32').toString()).toBe('2.3283064365386963e-10');
  // expect(pow('2', '-64').toString()).toBe('5.4210108624275222e-20');
});

test('pow', () => {
  expect(pow('1.', '-1.').toString()).toBe('1.e+0');

  expect(pow('4.0', '2.0').toString()).toBe('1.6e+1');

  expect(pow('4.',   '3.'  ).toString()).toBe('6.e+1');
  expect(pow('4.0',  '3.0' ).toString()).toBe('6.4e+1');  // 64
  expect(pow('4.00', '3.0' ).toString()).toBe('6.4e+1');
  expect(pow('4.0',  '3.00').toString()).toBe('6.4e+1');
  expect(pow('4.00', '3.00').toString()).toBe('6.40e+1');

  expect(pow('2.', '-2.').toString()).toBe('2.5e-1'); // 0.25 
  expect(pow('4.', '-2.').toString()).toBe('5.e-2');  // 0.0625  // precision

  expect(pow('2.', '-3.').toString()).toBe('1.3e-1');  // 0.125
  expect(pow('4.', '-3.').toString()).toBe('1.7e-2');   // 0.015625

  expect(pow('2.0000', '-2.0000').toString()).toBe('2.50000e-1');
  expect(pow('4.0000', '-2.0000').toString()).toBe('6.2500e-2');

  expect(pow('2.0000', '-3.0000').toString()).toBe('1.25000e-1');
  expect(pow('4.0000', '-3.0000').toString()).toBe('1.56250e-2');

  // expect(pow('9007199254740992.', 0).toString()).toBe('1.00000000000000e+0');
  expect(pow('9007199254740992.', 1).toString()).toBe('9.007199254740992e+15');

                                                     // 1.1102230246251565404236316680908203125
  expect(pow('9007199254740992.', -1).toString()).toBe('1.1102230246251565e-16');
});

test('fractional powers', () => {
  expect(pow('4', '0.5').toString()).toBe('2.e+0');
  expect(pow('4.000', '0.5000').toString()).toBe('2.000e+0');

  expect(pow('25', '0.5').toString()).toBe('5.e+0');

  expect(pow('2.000000', '2.100000').toString()).toBe('4.287094e+0');
                                                    // 4.0278222002268752353307928564529591418141629621365036
  expect(pow('2.000000', '2.010000').toString()).toBe('4.027822e+0');  // precision
  expect(pow('2.000000', '2.001000').toString()).toBe('4.002774e+0');
  expect(pow('2.000000', '2.000100').toString()).toBe('4.000277e+0');
  expect(pow('2.000000', '2.000010').toString()).toBe('4.000028e+0');
  expect(pow('2.000000', '2.000001').toString()).toBe('4.000003e+0');
});

test('fractional powers exact', () => {
  expect(pow('4', HALF).toString()).toBe('2');
});
