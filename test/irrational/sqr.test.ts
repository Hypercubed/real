import { Irrational } from '../../src/irrational';

const sqr = (v: any) => Irrational.from(v).sqr();

test('error propagation', () => {
  expect(sqr(
    Irrational.from(4).withError(0.1)
    )).toEqual(
    Irrational.from(16).withError(0.6));

  expect(sqr(
    Irrational.from(8).withError(0.005)
    )).toEqual(
    Irrational.from(64).withError(0.06));
});

describe('exact', () => {
  test('basics', () => {
    expect(	sqr(	'0'	    ).toString()).toBe(	'0'	 );
    expect(	sqr(	'1'	    ).toString()).toBe(	'1'	 );
    expect(	sqr(	'2'	    ).toString()).toBe(	'4'	 );
    expect(	sqr(	'4'	    ).toString()).toBe(	'16' );

    expect(	sqr(	'-1'	    ).toString()).toBe(	'1'	 );
    expect(	sqr(	'-2'	    ).toString()).toBe(	'4'	 );
    expect(	sqr(	'-4'	    ).toString()).toBe(	'16' );
  });
});

describe('inexact', () => {
  test('basics', () => {
    expect(	sqr(	'1.'	    ).toString()).toBe(	'1.e+0'	 );
    expect(	sqr(	'2.'	    ).toString()).toBe(	'4.e+0'	 );
    expect(	sqr(	'4.'	    ).toString()).toBe(	'1.6e+1' );

    expect(	sqr(	'-1.'	    ).toString()).toBe(	'1.e+0'	 );
    expect(	sqr(	'-2.'	    ).toString()).toBe(	'4.e+0'	 );
    expect(	sqr(	'-4.'	    ).toString()).toBe(	'1.6e+1' );
  });

  test('zeros', () => {
    expect(	sqr(	'0.'	    ).toString()).toBe(	'0.e+0'	 );
    expect(	sqr(	'0.0000'	).toString()).toBe(	'0.e-8'	 );
  });

  test('fractions', () => {
    expect(	sqr(	'0.1'	    ).toString()).toBe(	'1.e-2'	 );
    expect(	sqr(	'0.333'	  ).toString()).toBe(	'1.109e-1'	 );

    expect( sqr( '1.41421356237' ).toString()).toBe(	'1.99999999999e+0'	 );
  });
});
