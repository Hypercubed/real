import { Irrational } from '../../src/irrational';

const log = (v: any) => Irrational.from(v).log10();

test('error', () => {
  expect(() => {
    log(0);
  }).toThrow('Logarithm of zero')
});

test('error propagation', () => {
  expect(log(
    Irrational.from(4).withError(0.1)
    )).toEqual(
    Irrational.from(0.60).withError(0.01));

  expect(log(
    Irrational.from(8).withError(0.005)
    )).toEqual(
    Irrational.from(0.9031).withError(0.0003));

  expect(log(
    Irrational.from(0.1).withError(0.009)
    )).toEqual(
      Irrational.from(-1).withError(0.04));
});

test('basics', () => {
  expect(	log	(	'7.00000000000E-1000'	).toString()).toBe(	'-9.991549019599857e+2'	);
  expect(	log	(	'1.10000000000E-9'	  ).toString()).toBe(	'-8.958607314842e+0'	);
  expect(	log	(	'0.000700000000'	    ).toString()).toBe(	'-3.1549019600e+0'	);
  expect(	log	(	'0.11000000000'	      ).toString()).toBe(	'-9.5860731484e-1'	);
  expect(	log	(	'0.700000000'       	).toString()).toBe(	'-1.549019600e-1'	);

                                                  // 1.760912590556812420812890085306222824319389827285873
  expect(	log	(	'1.5'	          ).toString()).toBe(	'1.8e-1'	);
  expect(	log	(	'1.5000000000'	).toString()).toBe(	'1.7609125906e-1'	);

                                              // 8.45098040014256830712216258592636193483572396323965406503
  expect(	log	(	'7.'     	  ).toString()).toBe(	'8.5e-1'	);
  expect(	log	(	'7.0000000'	).toString()).toBe(	'8.45098040e-1'	);

  // expect(	log	(	10n	  ).toString()).toBe(	'1'	);
  expect(	log	(	'10.'	).toString()).toBe(	'1.00e+0'	);

  expect(	log	(	'10.500000000'	).toString()).toBe(	'1.02118929907e+0'	);
  expect(	log	(	'11.000000000'	).toString()).toBe(	'1.04139268516e+0'	);

                                                        // 1.845098040014256830712216258592636193483572396323965406503
  expect(	log	(	'70.0000000'	        ).toString()).toBe(	'1.8450980400e+0'	);

  expect(	log	(	'9999.0000000'	      ).toString()).toBe(	'3.999956568380e+0'	);
  expect(	log	(	'1.2100000000E6'	    ).toString()).toBe(	'6.08278537032e+0'	);
  expect(	log	(	'1.1000000000E+9'    	).toString()).toBe(	'9.04139268516e+0'	);
  expect(	log	(	'7.00000000000E+1000'	).toString()).toBe(	'1.0008450980400143e+3'	);
});

test('powers of ten', () => {
  // expect(log(1n).toString()).toBe('0');
  // expect(log(10n).toString()).toBe('1');
  // expect(log(100n).toString()).toBe('2');
  // expect(log(1000n).toString()).toBe('3');
  // expect(log(10000n).toString()).toBe('4');
  // expect(log(100000n).toString()).toBe('5');
  // expect(log(1000000000000n).toString()).toBe('12');

  expect(log('1.').toString()).toBe('0.e+0');
  expect(log('10.').toString()).toBe('1.00e+0');
  expect(log('100.').toString()).toBe('2.000e+0');
  expect(log('1000.').toString()).toBe('3.0000e+0');
  expect(log('10000.').toString()).toBe('4.00000e+0');
  expect(log('100000.').toString()).toBe('5.000000e+0');
  expect(log('1000000000000.').toString()).toBe('1.20000000000000e+1');

  expect(log('1.0e+0' ).toString()).toBe('0.0e-1');
  expect(log('1.0e+1' ).toString()).toBe('1.00e+0');
  expect(log('1.0e+2' ).toString()).toBe('2.00e+0');
  expect(log('1.0e+3' ).toString()).toBe('3.00e+0');
  expect(log('1.0e+4' ).toString()).toBe('4.00e+0');
  expect(log('1.0e+5' ).toString()).toBe('5.00e+0');
  expect(log('1.0e+12').toString()).toBe('1.200e+1');
});

test('log(2) constants', () => {
                                                // 3.0102999566398119521373889472449302676818988146210854131042746112710...
  // expect(	log	(	'2'	          ).toString()).toBe(	'3.01029995663981195213738894724493026768189881462108541310e-1'	); // TODO: value bug
  expect(	log	(	'2.'	        ).toString()).toBe(	'3.e-1'	);
  expect( log(  '2.0'         ).toString()).toBe( '3.0e-1');
  expect( log(  '2.000'       ).toString()).toBe( '3.010e-1');
  expect(	log	(	'2.000000000'	).toString()).toBe(	'3.010299957e-1'	);
});

// test('log(E) constants', () => {
//   expect(Irrational.LOG10E.toString()           ).toBe('4.34294481903251827651128918916605082294397005803666566114e-1');
//   expect(log(Irrational.E).toExponential(5)     ).toBe('4.342944819032518.e+0');  // TODO: slow

//   expect(	log	(	'2.718281828459045'	).toString()).toBe(	'4.342944819e-1'	); // TODO: slow
//   expect(	log	(	'2.718281828459046'	).toString()).toBe(	'4.342944819e-1'	);
//   expect(	log	(	'2.718281828459047'	).toString()).toBe(	'4.342944819e-1'	);
// });

test('log', () => {
  expect(log('2718.').toString()).toBe('3.4342e+0');
                                     // 3.434249452396475506672867756572026433614541038620377722067


  // expect(log('9007199254740992.').toString()).toBe('1.595458977019100e+1');  // TODO: too slow
  //                                                // 1.595458977019100334632816142039813041871406371749175268945e+1
  // expect(log('9007199254740992e11').toString()).toBe('2.695458977019100e+1');  // TODO: too slow
  //                                                  // 2.695458977019100334632816142039813041871406371749175268945e+1
});
