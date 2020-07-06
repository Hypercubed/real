import { Irrational } from '../../src/irrational';

const sqrt = (v: any) => new Irrational(v).sqrt();

test('error', () => {
  expect(() => {
    sqrt(-1);
  }).toThrow('Square root of negitive number')
});

test('zeros', () => {
  expect(	sqrt(	'0'	      ).toString()).toBe(	'0'	);
  expect(	sqrt(	'0.0000'	).toString()).toBe(	'0.e-4'	);
});

test('integers', () => {
  expect(	sqrt(	'25.'	    ).toString()).toBe(	'5.0e+0'	);
  expect(	sqrt(	'16.'	    ).toString()).toBe(	'4.0e+0'	);
  expect(	sqrt(	'9.'	    ).toString()).toBe(	'3.e+0'	);
  expect(	sqrt(	'4.'	    ).toString()).toBe(	'2.e+0'	);
  expect(	sqrt(	'1.'	    ).toString()).toBe(	'1.e+0'	);

  expect(	sqrt(	'25.0000'	).toString()).toBe(	'5.00000e+0'	);
  expect(	sqrt(	'16.0000'	).toString()).toBe(	'4.00000e+0'	);
  expect(	sqrt(	'9.0000'	).toString()).toBe(	'3.0000e+0'	);
  expect(	sqrt(	'4.0000'	).toString()).toBe(	'2.0000e+0'	);
  expect(	sqrt(	'1.0000'	).toString()).toBe(	'1.0000e+0'	);
});

test('basics', () => {
                                              // 1.414213562373095048801688724209698078569671875376948073176
  // expect(	sqrt(	'2.'	      ).toString()).toBe(	'1.e+0'	);
  expect(	sqrt(	'2.0000000'	).toString()).toBe(	'1.4142136e+0'	);

                                              // 1.732050807568877293527446341505872366942805253810380628055
  // expect(	sqrt(	'3.'	      ).toString()).toBe(	'2.e+0'	);
  // expect(	sqrt(	'3.0000000'	).toString()).toBe(	'1.7320508e+0'	);
});

test('fractions', () => {
                                              // 3.16227766
  expect(	sqrt(	'.1'	      ).toString()).toBe(	'3.e-1'	);
  expect(	sqrt(	'.10000000'	).toString()).toBe(	'3.1622777e-1'	);
  
                                              // 4.472135954999579392818347337462552470881236719223051
  expect(	sqrt(	'.2'	      ).toString()).toBe(	'4.e-1'	);
  expect(	sqrt(	'.20'	      ).toString()).toBe(	'4.5e-1'	);
  expect(	sqrt(	'.200'	    ).toString()).toBe(	'4.47e-1'	);
  expect(	sqrt(	'.20000000'	).toString()).toBe(	'4.4721360e-1'	);
});

test('powers of ten', () => {
  expect(	sqrt(	'100.'	    ).toString()).toBe(	'1.00e+1'	);
  expect(	sqrt(	'10000.'	  ).toString()).toBe(	'1.0000e+2'	);

  expect(	sqrt(	'.01'	          ).toString()).toBe(	'1.e-1'	);
  expect(	sqrt(	'.000001'	      ).toString()).toBe(	'1.e-3'	);
  expect(	sqrt(	'.000000000001' ).toString()).toBe(	'1.e-6'	);
});

test('famous squares', () => {
  expect(	sqrt(	'1024.'	    ).toString()).toBe(	'3.200e+1'	);
  expect(	sqrt(	'4096.'	    ).toString()).toBe(	'6.400e+1'	);

  expect(	sqrt(	'10.24'	    ).toString()).toBe(	'3.200e+0'	);
  expect(	sqrt(	'40.96'	    ).toString()).toBe(	'6.400e+0'	);
});

test('precision tests', () => {
  expect(	sqrt(	'0.01180'	    ).toString()).toBe(	'1.086e-1'	);
  expect(	sqrt(	'0.1190'	    ).toString()).toBe(	'3.450e-1'	);
  expect(	sqrt(	'0.01210'	    ).toString()).toBe(	'1.100e-1'	);
  expect(	sqrt(	'0.9347'	    ).toString()).toBe(	'9.668e-1'	);

  // expect(	sqrt(	'9.9997E+99'	).toString()).toBe(	'9.9998e+49'	); // TODO: too slow
});

test('exact values, exact results', () => {
  expect(	sqrt(	'100'	    ).toString()).toBe(	'10'	);
  expect(	sqrt(	'25'	    ).toString()).toBe(	'5'	);
  expect(	sqrt(	'16'	    ).toString()).toBe(	'4'	);
  expect(	sqrt(	'9'	      ).toString()).toBe(	'3'	);
  expect(	sqrt(	'4'	      ).toString()).toBe(	'2'	);
  expect(	sqrt(	'1'	      ).toString()).toBe(	'1'	);
});

test('exact values, inexact results', () => {
                                            // 1.732050807568877293527446341505872366942805253810380628055
  expect(	sqrt(	'3'	      ).toString()).toBe(	'1.7320508075688773e+0'	);
                                            // 3.162277660168379331998893544432718533719555139325216826857
  expect(	sqrt(	'10'	    ).toString()).toBe(	'3.1622776601683793e+0'	);
});