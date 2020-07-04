import { Irrational } from '../../src/irrational';

const add = (x: any, y: any) => new Irrational(x).add(new Irrational(y));

test('quick confidence check', () => {
  expect(	add	(	1n	,	1n	).toString()).toBe(	'2'	);
  expect(	add	(	2n	,	3n	).toString()).toBe(	'5'	);
  expect(	add	(	'5.75'	,	'3.30'	).toString()).toBe(	'9.05e+0'	);
  expect(	add	(	5n	,	-3n	).toString()).toBe(	'2'	);
  expect(	add	(	-5n	,	-3n	).toString()).toBe(	'-8'	);
  expect(	add	(	-7n	,	'2.5'	).toString()).toBe(	'-4.5e+0'	);
  expect(	add	(	'0.7'	,	'0.3'	).toString()).toBe(	'1.0e+0'	);
  expect(	add	(	'1.25'	,	'1.25'	).toString()).toBe(	'2.50e+0'	);
  expect(	add	(	'1.23456789'	,	1n	).toString()).toBe(	'2.23456789e+0'	);
  expect(	add	(	'1.23456789'	,	'1.00000011'	).toString()).toBe(	'2.23456800e+0'	);

  expect(	add	(	'0.4444444444'	,	'0.5555555555'	).toString()).toBe(	'9.999999999e-1'	);
  expect(	add	(	'0.444444444'	  ,	'0.5555555555'	).toString()).toBe(	'1.00000000e+0'	);
  expect(	add	(	'0.4444444444'	,	'0.555555555'	  ).toString()).toBe(	'9.99999999e-1'	);
  expect(	add	(	'0.44444444449'	,	  0n	).toString()).toBe(	'4.4444444449e-1'	);
  expect(	add	(	'0.444444444499'	,	0n	).toString()).toBe(	'4.44444444499e-1'	);
  expect(	add	(	'0.4444444444999'	,	0n	).toString()).toBe(	'4.444444444999e-1'	);
  expect(	add	(	'0.4444444445000'	,	0n	).toString()).toBe(	'4.444444445000e-1'	);
  expect(	add	(	'0.4444444445001'	,	0n	).toString()).toBe(	'4.444444445001e-1'	);
  expect(	add	( '0.444444444501'	,	0n	).toString()).toBe(	'4.44444444501e-1'	);
  expect(	add	(	'0.44444444451' 	,	0n	).toString()).toBe(	'4.4444444451e-1'	);
  
  expect(	add	(	0n	,	1n	).toString()).toBe(	'1'	);
  expect(	add	(	1n	,	1n	).toString()).toBe(	'2'	);
  expect(	add	(	2n	,	1n	).toString()).toBe(	'3'	);
  expect(	add	(	3n	,	1n	).toString()).toBe(	'4'	);
  expect(	add	(	4n	,	1n	).toString()).toBe(	'5'	);
  expect(	add	(	5n	,	1n	).toString()).toBe(	'6'	);
  expect(	add	(	6n	,	1n	).toString()).toBe(	'7'	);
  expect(	add	(	7n	,	1n	).toString()).toBe(	'8'	);
  expect(	add	(	8n	,	1n	).toString()).toBe( '9'	);
  expect(	add	(	9n	,	1n	).toString()).toBe(	'10' );
});

test('carry', () => {
  expect(	add	(	'0.9998'	,	'0.0000'	).toString()).toBe(	'9.998e-1'	);
  expect(	add	(	'0.9998'	,	'0.0001'	).toString()).toBe(	'9.999e-1'	);
  expect(	add	(	'0.9998'	,	'0.0002'	).toString()).toBe(	'1.0000e+0'	);
  expect(	add	(	'0.9998'	,	'0.0003'	).toString()).toBe(	'1.0001e+0'	);
});

test('precision', () => {
  expect(	add	(	'10000e+9'	,	'70'            	).toString()).toBe(	'1.0000e+13'	);
  expect(	add	(	'10000e+9'	,	'70000'         	).toString()).toBe(	'1.0000e+13'	);
  expect(	add	(	'10000e+9'	,	'70000000'      	).toString()).toBe(	'1.0000e+13'	);
  expect(	add	(	'10000e+9'	,	'70000000000'   	).toString()).toBe(	'1.0070e+13'	);
  expect(	add	(	'10000e+9'	,	'70000000000000'	).toString()).toBe(	'8.0000e+13'	);
});

test('examples from decarith', () => {
  expect(	add	(	'12'	, 	 '7.00'	).toString()).toBe(	 '1.900e+1'	);
  expect(	add	(	'1.3'	,    '-1.07').toString()).toBe(	 '2.e-1'	);
  expect(	add	(	'1.30'	,  '-1.07').toString()).toBe(	 '2.3e-1'	);
  expect(	add	(	'1.3'	,	   '-1.30').toString()).toBe(	 '0.e-1'	); // ??
  expect(	add	(	'1.30'	,	 '-1.30').toString()).toBe(	 '0.0e-1'	); // ??
  expect(	add	(	'1.3'	,	   '-2.07').toString()).toBe(	'-8.e-1'	);
  expect(	add	(	'1.30'	,	 '-2.07').toString()).toBe(	'-7.7e-1'	);
  expect(	add	(	'1E+2'	,	 '1E+4'	).toString()).toBe(	 '1.e+4');
  expect(	add	(	'1.00E+2'	,	 '1.00E+4'	).toString()).toBe(	 '1.01e+4');
});

test('some funny zeros', () => {
  expect(	add	(	'1'	, 	'0'	).toString()).toBe(	'1'	);
  expect(	add	(	'1'	,	  '0.'	).toString()).toBe(	'1.e+0'	);
  expect(	add	(	'1'	,	   '.0'	).toString()).toBe(	'1.e+0'	);
  expect(	add	(	'1'	,	  '0.0'	).toString()).toBe(	'1.0e+0'	);
  expect(	add	(	'1'	,	  '0.00'	).toString()).toBe(	'1.00e+0'	);
  expect(	add	(	'0'	,	  '1'	).toString()).toBe(	'1'	);
  expect(	add	(	'0.'	,	'1'	).toString()).toBe(	'1.e+0'	);
  expect(	add	(	 '.0'	,	'1'	).toString()).toBe(	'1.e+0'	);
  expect(	add	(	'0.0'	,	'1'	).toString()).toBe(	'1.0e+0'	);
  expect(	add	(	'0.00',	'1'	).toString()).toBe(	'1.00e+0'	);  
})

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
  expect(add('0.10', '0.2').toString()).toBe('3.e-1');
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
