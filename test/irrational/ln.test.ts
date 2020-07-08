import { Irrational } from '../../src/irrational';

const ln = (v: any) => new Irrational(v).ln();

test('error', () => {
  expect(() => {
    ln(0);
  }).toThrow('Logarithm of zero')
});

test('ones', () => {
  expect(	ln	(	1n	          ).toString()).toBe(	'0'	);
  expect(	ln	(	1	            ).toString()).toBe(	'0.e-14'	);
  expect(	ln	(	'1.'	        ).toString()).toBe(	'0.e+0'	);
  expect(	ln	(	'1.0000'	    ).toString()).toBe(	'0.e-4'	);
});

test('basics', () => {
                                                // 4.054651081081643819780131154643491365719904234624941
  expect(	ln	(	'1.500000000'	).toString()).toBe(	'4.054651080e-1'	);  // TODO: precision

  //                                            // 6.93147180559945309417232121458176568075500134360255254120e-1
  expect( ln  (  2n           ).toString()).toBe( '0.69314718055994530');
  expect(	ln	(	'2.'	        ).toString()).toBe(	'7.e-1'	);
  expect( ln  ( '2.0'         ).toString()).toBe( '6.9e-1');
  expect(	ln	(	'2.000000000'	).toString()).toBe(	'6.931471806e-1'	);

  expect(	ln	(	'10.50000000'	).toString()).toBe(	'2.351375257e+0'	);

                                                // 9.210240366975849377736632318723169866007570556780520828619
  expect(	ln	(	'9999.'	      ).toString()).toBe(	'9.194e+0'	);  // TODO: precision
  expect(	ln	(	'9999.000000'	).toString()).toBe(	'9.210240282e+0'	);  // TODO: slow
});

test('fractions', () => {
                                                    // -7.264430222920869430966613075294277100767321224933230
  expect(	ln	(	'0.000700000'	    ).toString()).toBe(	'-7.26443e+0'	);
  
                                                // -3.56674943938732378912638711241184477964016759046911
  expect(	ln	(	'0.700000000'	).toString()).toBe(	'-3.56674940e-1'	);
});

test('ln near E', () => {  // TODO: slow
  // expect( ln  ( '2.718'             ).toString()).toBe( '9.999e-1'              ); // TODO: precision
  // expect(	ln	(	'2.718281828459045'	).toString()).toBe(	'9.999999999999999e-1'	);
  // expect(	ln	(	'2.718281828459046'	).toString()).toBe(	'1.000000000000000e+0'	);
  // expect(	ln	(	'2.718281828459047'	).toString()).toBe(	'1.000000000000001e+0'	);

  // expect(ln(Irrational.E).toString()).toBe('1.00000e+0');  // slow

  expect(ln('2718.').toString()).toBe('7.906e+0');  // TODO: precision
  //                                // 7.907651594711089021003958894787704267628217642585544032872...
});

test('ln powers of ten', () => {
  //                                            // 2.3025850929940456840179914546843642076011014886287729
  expect( ln  (  10n          ).toString()).toBe( '2.30258509299404568');  // TODO: precision
  expect( ln  ( '10.'         ).toString()).toBe( '2.3e+0');
  expect( ln  ( '10.0'        ).toString()).toBe( '2.30e+0');
  expect(	ln	(	'10.0000'	    ).toString()).toBe(	'2.30259e+0'	);
  expect(	ln	(	'10.00000000'	).toString()).toBe(	'2.302585093e+0'	);

  expect(ln('1000.').toString()).toBe('6.908e+0'); // TODO: precision
                                    // 6.907755278982137052053974364053092622803304465886318928099...

  expect(	ln	(	'1.00000000E6'	).toString()).toBe(	'1.38155106e+1'	);
                                                  // 1.381551055796427410410794872810618524560660893177263785619

                                                     // 2.0723265836946411156161923092159277868409913397658956
  expect(	ln	(	'1.00000000e+9'	  ).toString()).toBe(	 '2.07232658e+1'	);
  expect(	ln	(	'1.000000000e-9'	).toString()).toBe(	'-2.072326584e+1'	);
});

test.skip('ln', () => {  // TODO: slow
  // expect(ln('9007199254740992.').toString()).toBe('3.673680056967710e+1');  // TODO: too slow
                                               //  3.673680056967710139911330243728335810800150712109352846839e+1

  // expect(ln('9007199254740992e11').toString()).toBe('6.206523659261160e+1');  // TODO: too slow
                                                  // 6.2065236592611603923311208e+1
});
