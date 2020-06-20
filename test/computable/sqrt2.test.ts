import test from 'ava';
import SQRT2 from '../../src/sqrt2';

test('SQRT2 is instantiable', t => {
  t.true(new SQRT2() instanceof SQRT2);
});

test('SQRT2', t => {
  t.is(new SQRT2().isPositive(), true);
  t.is(new SQRT2().isNegitive(), false);
  t.is(new SQRT2().trunc(), 1n);
  t.is(new SQRT2().floor(), 1n);
  t.is(new SQRT2().ceil(), 2n);
});

test('SQRT2#toFixed', t => {
  t.is(new SQRT2().toFixed(5),  '1.41421');
  t.is(new SQRT2().toFixed(10), '1.4142135623');
  t.is(new SQRT2().toFixed(20), '1.41421356237309504880');
  t.is(new SQRT2().toFixed(80), '1.41421356237309504880168872420969807856967187537694807317667973799073247846210703');
});

test('SQRT2#toExponential', t => {
  t.is(new SQRT2().toExponential(5),  '1.41421e+0');
  t.is(new SQRT2().toExponential(10), '1.4142135623e+0');
  t.is(new SQRT2().toExponential(20), '1.41421356237309504880e+0');
  t.is(new SQRT2().toExponential(80), '1.41421356237309504880168872420969807856967187537694807317667973799073247846210703e+0');
});
