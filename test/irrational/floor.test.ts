import { Irrational } from '../../src/irrational';

const floor = (x: any) => new Irrational(x).floor();

test('floor', () => {
  expect(floor('1.').toString()).toBe('1.e+0');
  expect(floor('-1.').toString()).toBe('-1.e+0');
  expect(floor('2.').toString()).toBe('2.e+0');
  expect(floor('-2.').toString()).toBe('-2.e+0');

  
  expect(floor('10.').toString()).toBe('1.0e+1');
  expect(floor('-10.').toString()).toBe('-1.0e+1');

  expect(floor('9007199254740992.').toString()).toBe('9.007199254740992e+15');
  expect(floor('9007199254740994.').toString()).toBe('9.007199254740994e+15');
  expect(floor('10_000_000_000_000_000.').toString()).toBe('1.0000000000000000e+16');

  expect(floor('1000000e+10').toString()).toBe('1.000000e+16');
});

test('exact results when e < 0', () => {
  expect(floor('0.1').toString()).toBe('0');
  expect(floor('-0.1').toString()).toBe('-1');

  expect(floor('2.5').toString()).toBe('2');
  expect(floor('-2.5').toString()).toBe('-3');

  expect(floor('900719.9254740992').toString()).toBe('900719');
  expect(floor('90071992.54740994').toString()).toBe('90071992');
  expect(floor('10000000.00000').toString()).toBe('10000000');
 
  expect(floor('-900719.9254740992').toString()).toBe('-900720');
  expect(floor('-90071992.54740994').toString()).toBe('-90071993');
  expect(floor('-10000000.00000').toString()).toBe('-10000000');
});
