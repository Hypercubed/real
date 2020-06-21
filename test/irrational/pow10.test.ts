import { Irrational } from '../../src/irrational';

test('pow10', () => {
  const pow10 = (x: any) => new Irrational(x).pow10();

  expect(pow10(1).toString()).toBe('1.e+1');
  expect(pow10(2).toString()).toBe('1.e+2');

  expect(pow10(10).toString()).toBe('1.0e+10');
  expect(pow10(200).toString()).toBe('1.00e+200');

  expect(pow10(-1).toString()).toBe('1.e-1');
  expect(pow10(-2).toString()).toBe('1.e-2');

                                   // 1.023292992280754130966275174819877827341164057237981308599
  // t.is(pow10( 0.01     ).toString(), '1.e+0');
  // t.is(pow10('0.0100'  ).toString(), '1.02e+0');
  // t.is(pow10('0.010000').toString(), '1.0232e+0');
});