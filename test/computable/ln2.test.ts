import test from 'ava';
import { LN2 } from '../../src/ln2';

test('LN2 is instantiable', t => {
  t.true(new LN2() instanceof LN2);
});

test('LN2', t => {
  t.is(new LN2().isPositive(), true);
  t.is(new LN2().isNegitive(), false);
  t.is(new LN2().trunc(), 0n);
  t.is(new LN2().floor(), 0n);
  t.is(new LN2().ceil(), 1n);
});

test('LN2#toFixed', t => {
  t.is(new LN2().toFixed(5), '0.69314');
  t.is(new LN2().toFixed(10), '0.6931471805');
  t.is(new LN2().toFixed(50), '0.69314718055994530941723212145817656807550013436025');
  t.is(new LN2().toFixed(80), '0.69314718055994530941723212145817656807550013436025525412068000949339362196969471');
});

test('LN2#toExponential', t => {
  t.is(new LN2().toExponential(5),  '6.93147e-1');
  t.is(new LN2().toExponential(10), '6.9314718055e-1');
  t.is(new LN2().toExponential(50), '6.93147180559945309417232121458176568075500134360255e-1');
  t.is(new LN2().toExponential(80), '6.93147180559945309417232121458176568075500134360255254120680009493393621969694715e-1');
});