import { Irrational } from '../../src/irrational';

const log = (v: any) => new Irrational(v).log10();

test('error', () => {
  expect(() => {
    log(0);
  }).toThrow('Logarithm of zero')
});

test.skip('basics', () => {
  expect(	log	(	'7.00000000000E-1000'	).toString()).toBe(	'-9.9915490196e+2'	);
  expect(	log	(	'1.10000000000E-9'	  ).toString()).toBe(	'-8.9586073148e+0'	);
  expect(	log	(	'0.000700000000'	    ).toString()).toBe(	'-3.15490196e+0'	);
  expect(	log	(	'0.11000000000'	      ).toString()).toBe(	'-9.586073148e-1'	);
  expect(	log	(	'0.700000000'       	).toString()).toBe(	'-1.5490196e-1'	);

  expect(	log	(	'1.5000000000'	).toString()).toBe(	'1.760912591e-1'	);

  expect(	log	(	'7.0000000'	).toString()).toBe(	'8.4509804e-1'	);
  expect(	log	(	10n	  ).toString()).toBe(	'1'	);
  expect(	log	(	'10.'	).toString()).toBe(	'1.0e+0'	);

  expect(	log	(	'10.500000000'	).toString()).toBe(	'1.0211892991e+0'	);
  expect(	log	(	'11.000000000'	).toString()).toBe(	'1.0413926852e+0'	);

  expect(	log	(	'70.0000000'	        ).toString()).toBe(	'1.84509804e+0'	);
  expect(	log	(	'9999.0000000'	      ).toString()).toBe(	'3.9999565684e+0'	);
  expect(	log	(	'1.2100000000E6'	    ).toString()).toBe(	'6.0827853703e+0'	);
  expect(	log	(	'1.1000000000E+9'    	).toString()).toBe(	'9.0413926852e+0'	);
  expect(	log	(	'7.00000000000E+1000'	).toString()).toBe(	'1.00084509804e+3'	);
});

test.skip('powers of ten', () => {
  expect(log(1n).toString()).toBe('0');
  expect(log(10n).toString()).toBe('1');
  expect(log(100n).toString()).toBe('2');
  expect(log(1000n).toString()).toBe('3');
  expect(log(10000n).toString()).toBe('4');
  expect(log(100000n).toString()).toBe('5');
  expect(log(1000000000000n).toString()).toBe('12');

  expect(log('1.').toString()).toBe('0.e+0');
  expect(log('10.').toString()).toBe('1.0e+0');
  expect(log('100.').toString()).toBe('2.00e+0');
  expect(log('1000.').toString()).toBe('3.000e+0');
  expect(log('10000.').toString()).toBe('4.0000e+0');
  expect(log('100000.').toString()).toBe('5.00000e+0');
  expect(log('1000000000000.').toString()).toBe('1.200000000000e+1');

  expect(log('1.0e+0' ).toString()).toBe('0.0e+0');
  expect(log('1.0e+1' ).toString()).toBe('1.0e+0');
  expect(log('1.0e+2' ).toString()).toBe('2.0e+0');
  expect(log('1.0e+3' ).toString()).toBe('3.0e+0');
  expect(log('1.0e+4' ).toString()).toBe('4.0e+0');
  expect(log('1.0e+5' ).toString()).toBe('5.0e+0');
  expect(log('1.0e+12').toString()).toBe('1.2e+1');
});

test.skip('log(2) constants', () => {
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
  expect(log('2718.').toString()).toBe('3.4344e+0');  // TODO: precision
                                     // 3.434249452396475506672867756572026433614541038620377722067


  // expect(log('9007199254740992.').toString()).toBe('1.595458977019100e+1');  // TODO: too slow
  //                                                // 1.595458977019100334632816142039813041871406371749175268945e+1
  // expect(log('9007199254740992e11').toString()).toBe('2.695458977019100e+1');  // TODO: too slow
  //                                                  // 2.695458977019100334632816142039813041871406371749175268945e+1
});
