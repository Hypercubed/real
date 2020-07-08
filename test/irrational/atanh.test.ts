import { Irrational } from '../../src/irrational';

const atanh = (x: any) => new Irrational(x).atanh();

test('atanh', () => {
  // expect(atanh('0.00000000000').toString()).toBe('0.e-11');

                                                  // 5.49306
  expect(atanh('0.5000'          ).toString()).toBe('5.49306e-1');

                                                         // 1.00335347731075580635726552060038945263362869145959135874
  // expect(atanh('0.1000'          ).toString()).toBe('1.0033534773e-1');
  // expect(atanh('0.10000000000'          ).toString()).toBe('1.0033534773e-1');
  // expect(atanh('0.100000000000000000000').toString()).toBe('1.00335347731075580636e-1');

  //                                                        // 2.00026673068495807170371839546463904807620556223859
  // expect(atanh('0.02000000000'          ).toString()).toBe('2.000266731e-2');
  // expect(atanh('0.020000000000000000000').toString()).toBe('2.0002667306849580717e-2');
});
