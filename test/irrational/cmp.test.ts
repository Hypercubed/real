import { Irrational } from '../../src/irrational';

const cmp = (x: any, y: any) => Irrational.from(x).cmp(Irrational.from(y));

test('cmp exact integers', () => {
  expect(cmp('-2', '-2')).toBe( 0);
  expect(cmp('-2', '-1')).toBe(-1);
  expect(cmp('-2',  '0')).toBe(-1);
  expect(cmp('-2',  '1')).toBe(-1);
  expect(cmp('-2',  '2')).toBe(-1);

  expect(cmp('-1', '-2')).toBe( 1);
  expect(cmp('-1', '-1')).toBe( 0);
  expect(cmp('-1',  '0')).toBe(-1);
  expect(cmp('-1',  '1')).toBe(-1);
  expect(cmp('-1',  '2')).toBe(-1);

  expect(cmp(' 0', '-2')).toBe( 1);
  expect(cmp(' 0', '-1')).toBe( 1);
  expect(cmp(' 0',  '0')).toBe( 0);
  expect(cmp(' 0',  '1')).toBe(-1);
  expect(cmp(' 0',  '2')).toBe(-1);

  expect(cmp(' 1', '-2')).toBe( 1);
  expect(cmp(' 1', '-1')).toBe( 1);
  expect(cmp(' 1',  '0')).toBe( 1);
  expect(cmp(' 1',  '1')).toBe( 0);
  expect(cmp(' 1',  '2')).toBe(-1);

  expect(cmp(' 2', '-2')).toBe( 1);
  expect(cmp(' 2', '-1')).toBe( 1);
  expect(cmp(' 2',  '0')).toBe( 1);
  expect(cmp(' 2',  '1')).toBe( 1);
  expect(cmp(' 2',  '2')).toBe( 0);
});

test('cmp exact tens', () => {
  expect(cmp('-20', '-20')).toBe( 0);
  expect(cmp('-20', '-10')).toBe(-1);
  expect(cmp('-20',  '00')).toBe(-1);
  expect(cmp('-20',  '10')).toBe(-1);
  expect(cmp('-20',  '20')).toBe(-1);

  expect(cmp('-10', '-20')).toBe( 1);
  expect(cmp('-10', '-10')).toBe( 0);
  expect(cmp('-10',  '00')).toBe(-1);
  expect(cmp('-10',  '10')).toBe(-1);
  expect(cmp('-10',  '20')).toBe(-1);

  expect(cmp(' 00', '-20')).toBe( 1);
  expect(cmp(' 00', '-10')).toBe( 1);
  expect(cmp(' 00',  '00')).toBe( 0);
  expect(cmp(' 00',  '10')).toBe(-1);
  expect(cmp(' 00',  '20')).toBe(-1);

  expect(cmp(' 10', '-20')).toBe( 1);
  expect(cmp(' 10', '-10')).toBe( 1);
  expect(cmp(' 10',  '00')).toBe( 1);
  expect(cmp(' 10',  '10')).toBe( 0);
  expect(cmp(' 10',  '20')).toBe(-1);

  expect(cmp(' 20', '-20')).toBe( 1);
  expect(cmp(' 20', '-10')).toBe( 1);
  expect(cmp(' 20',  '00')).toBe( 1);
  expect(cmp(' 20',  '10')).toBe( 1);
  expect(cmp(' 20',  '20')).toBe( 0);
});

test('cmp integers', () => {
  expect(cmp('-2.0', '-2.0')).toBe( 0);
  expect(cmp('-2.0', '-1.0')).toBe(-1);
  expect(cmp('-2.0',  '0.0')).toBe(-1);
  expect(cmp('-2.0',  '1.0')).toBe(-1);
  expect(cmp('-2.0',  '2.0')).toBe(-1);

  expect(cmp('-1.0', '-2.0')).toBe( 1);
  expect(cmp('-1.0', '-1.0')).toBe( 0);
  expect(cmp('-1.0',  '0.0')).toBe(-1);
  expect(cmp('-1.0',  '1.0')).toBe(-1);
  expect(cmp('-1.0',  '2.0')).toBe(-1);

  expect(cmp(' 0.0', '-2.0')).toBe( 1);
  expect(cmp(' 0.0', '-1.0')).toBe( 1);
  expect(cmp(' 0.0',  '0.0')).toBe( 0);
  expect(cmp(' 0.0',  '1.0')).toBe(-1);
  expect(cmp(' 0.0',  '2.0')).toBe(-1);

  expect(cmp(' 1.0', '-2.0')).toBe( 1);
  expect(cmp(' 1.0', '-1.0')).toBe( 1);
  expect(cmp(' 1.0',  '0.0')).toBe( 1);
  expect(cmp(' 1.0',  '1.0')).toBe( 0);
  expect(cmp(' 1.0',  '2.0')).toBe(-1);

  expect(cmp(' 2.0', '-2.0')).toBe( 1);
  expect(cmp(' 2.0', '-1.0')).toBe( 1);
  expect(cmp(' 2.0',  '0.0')).toBe( 1);
  expect(cmp(' 2.0',  '1.0')).toBe( 1);
  expect(cmp(' 2.0',  '2.0')).toBe( 0);
});

test('some differing length/exponent cases', () => {
  expect(cmp('7.0', '7.0')).toBe(0);
  expect(cmp('7.0', '7')).toBe(0);
  expect(cmp('7', '7.0')).toBe(0);
  expect(cmp('7e+0', '7.0')).toBe(0);
  expect(cmp('70e-1', '7.0')).toBe(0);
  expect(cmp('0.7e+1', '7.0')).toBe(0);
  expect(cmp('7.0', '7e+0')).toBe(0);
  expect(cmp('7.0', '70e-1')).toBe(0);
  expect(cmp('7', '0.7e+1')).toBe(0);
  expect(cmp('7', '70e-1')).toBe(0);

  expect(cmp('8.0', '7.0')).toBe(1);
  expect(cmp('8.0', '7')).toBe(1);
  expect(cmp('8', '7.0')).toBe(1);
  expect(cmp('8e+0', '7.0')).toBe(1);
  expect(cmp('80e-1', '7.0')).toBe(1);
  expect(cmp('0.8e+1', '7.0')).toBe(1);
  expect(cmp('8.0', '7e+0')).toBe(1);
  expect(cmp('8.0', '70e-1')).toBe(1);
  expect(cmp('8', '0.7e+1')).toBe(1);
  expect(cmp('8', '70e-1')).toBe(1);

  expect(cmp('8.0', '9.0')).toBe(-1);
  expect(cmp('8.0', '9')).toBe(-1);
  expect(cmp('8', '9.0')).toBe(-1);
  expect(cmp('8e+0', '9.0')).toBe(-1);
  expect(cmp('80e-1', '9.0')).toBe(-1);
  expect(cmp('0.8e+1', '9.0')).toBe(-1);
  expect(cmp('8.0', '9e+0')).toBe(-1);
  expect(cmp('8.0', '90e-1')).toBe(-1);
  expect(cmp('8', '0.9e+1')).toBe(-1);
  expect(cmp('8', '90e-1')).toBe(-1);
});

test('negitive', () => {
  expect(cmp('-7.0', '-7.0')).toBe(0);
  expect(cmp('-7.0', '-7')).toBe(0);
  expect(cmp('-7', '-7.0')).toBe(0);
  expect(cmp('-7e+0', '-7.0')).toBe(0);
  expect(cmp('-70e-1', '-7.0')).toBe(0);
  expect(cmp('-0.7e+1', '-7.0')).toBe(0);
  expect(cmp('-7.0', '-7e+0')).toBe(0);
  expect(cmp('-7.0', '-70e-1')).toBe(0);
  expect(cmp('-7', '-0.7e+1')).toBe(0);
  expect(cmp('-7', '-70e-1')).toBe(0);

  expect(cmp('-8.0', '-7.0')).toBe(-1);
  expect(cmp('-8.0', '-7')).toBe(-1);
  expect(cmp('-8', '-7.0')).toBe(-1);
  expect(cmp('-8e+0', '-7.0')).toBe(-1);
  expect(cmp('-80e-1', '-7.0')).toBe(-1);
  expect(cmp('-0.8e+1', '-7.0')).toBe(-1);
  expect(cmp('-8.0', '-7e+0')).toBe(-1);
  expect(cmp('-8.0', '-70e-1')).toBe(-1);
  expect(cmp('-8', '-0.7e+1')).toBe(-1);
  expect(cmp('-8', '-70e-1')).toBe(-1);

  expect(cmp('-8.0', '-9.0')).toBe(1);
  expect(cmp('-8.0', '-9')).toBe(1);
  expect(cmp('-8', '-9.0')).toBe(1);
  expect(cmp('-8e+0', '-9.0')).toBe(1);
  expect(cmp('-80e-1', '-9.0')).toBe(1);
  expect(cmp('-0.8e+1', '-9.0')).toBe(1);
  expect(cmp('-8.0', '-9e+0')).toBe(1);
  expect(cmp('-8.0', '-90e-1')).toBe(1);
  expect(cmp('-8', '-0.9e+1')).toBe(1);
  expect(cmp('-8', '-90e-1')).toBe(1);
});

test('sign changes', () => {
  expect(cmp('-7.0', '7.0')).toBe(-1);
  expect(cmp('-7.0', '7')).toBe(-1);
  expect(cmp('-7', '7.0')).toBe(-1);
  expect(cmp('-7e+0', '7.0')).toBe(-1);
  expect(cmp('-70e-1', '7.0')).toBe(-1);
  expect(cmp('-0.7e+1', '7.0')).toBe(-1);
  expect(cmp('-7.0', '7e+0')).toBe(-1);
  expect(cmp('-7.0', '70e-1')).toBe(-1);
  expect(cmp('-7', '0.7e+1')).toBe(-1);
  expect(cmp('-7', '70e-1')).toBe(-1);

  expect(cmp('-8.0', '7.0')).toBe(-1);
  expect(cmp('-8.0', '7')).toBe(-1);
  expect(cmp('-8', '7.0')).toBe(-1);
  expect(cmp('-8e+0', '7.0')).toBe(-1);
  expect(cmp('-80e-1', '7.0')).toBe(-1);
  expect(cmp('-0.8e+1', '7.0')).toBe(-1);
  expect(cmp('-8.0', '7e+0')).toBe(-1);
  expect(cmp('-8.0', '70e-1')).toBe(-1);
  expect(cmp('-8', '0.7e+1')).toBe(-1);
  expect(cmp('-8', '70e-1')).toBe(-1);

  expect(cmp('-8.0', '9.0')).toBe(-1);
  expect(cmp('-8.0', '9')).toBe(-1);
  expect(cmp('-8', '9.0')).toBe(-1);
  expect(cmp('-8e+0', '9.0')).toBe(-1);
  expect(cmp('-80e-1', '9.0')).toBe(-1);
  expect(cmp('-0.8e+1', '9.0')).toBe(-1);
  expect(cmp('-8.0', '9e+0')).toBe(-1);
  expect(cmp('-8.0', '90e-1')).toBe(-1);
  expect(cmp('-8', '0.9e+1')).toBe(-1);
  expect(cmp('-8', '90e-1')).toBe(-1);

  expect(cmp('7.0', '-7.0')).toBe(1);
  expect(cmp('7.0', '-7')).toBe(1);
  expect(cmp('7', '-7.0')).toBe(1);
  expect(cmp('7e+0', '-7.0')).toBe(1);
  expect(cmp('70e-1', '-7.0')).toBe(1);
  expect(cmp('0.7e+1', '-7.0')).toBe(1);
  expect(cmp('7.0', '-7e+0')).toBe(1);
  expect(cmp('7.0', '-70e-1')).toBe(1);
  expect(cmp('7', '-0.7e+1')).toBe(1);
  expect(cmp('7', '-70e-1')).toBe(1);

  expect(cmp('8.0', '-7.0')).toBe(1);
  expect(cmp('8.0', '-7')).toBe(1);
  expect(cmp('8', '-7.0')).toBe(1);
  expect(cmp('8e+0', '-7.0')).toBe(1);
  expect(cmp('80e-1', '-7.0')).toBe(1);
  expect(cmp('0.8e+1', '-7.0')).toBe(1);
  expect(cmp('8.0', '-7e+0')).toBe(1);
  expect(cmp('8.0', '-70e-1')).toBe(1);
  expect(cmp('8', '-0.7e+1')).toBe(1);
  expect(cmp('8', '-70e-1')).toBe(1);

  expect(cmp('8.0', '-9.0')).toBe(1);
  expect(cmp('8.0', '-9')).toBe(1);
  expect(cmp('8', '-9.0')).toBe(1);
  expect(cmp('8e+0', '-9.0')).toBe(1);
  expect(cmp('80e-1', '-9.0')).toBe(1);
  expect(cmp('0.8e+1', '-9.0')).toBe(1);
  expect(cmp('8.0', '-9e+0')).toBe(1);
  expect(cmp('8.0', '-90e-1')).toBe(1);
  expect(cmp('8', '-0.9e+1')).toBe(1);
  expect(cmp('8', '-90e-1')).toBe(1);
});

test('large floats', () => {
  expect(cmp(' 9.99999999E+999999999', ' 9.99999999E+999999999')).toBe(0);
  expect(cmp('-9.99999999E+999999999', ' 9.99999999E+999999999')).toBe(-1);
  expect(cmp(' 9.99999999E+999999999', '-9.99999999E+999999999')).toBe(1);
  expect(cmp('-9.99999999E+999999999', '-9.99999999E+999999999')).toBe(0);
});

test('cmp', () => {
  expect(cmp('0.1', '10.')).toBe(-1);
  expect(cmp('10.', '1.')).toBe(1);

  expect(cmp('9007199254740992.', '9007199254740994.')).toBe(-1);
  expect(cmp('9007199254740996.', '9007199254740994.')).toBe(1);
});

test('tests values with different exponents', () => {
  const a = Irrational.from('10000');
  const b = Irrational.from('0.0000001');

  expect(a.cmp(a.add(b))).toBe(-1);
})
