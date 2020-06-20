import test from 'ava';
import { E } from '../../src/e';

test('E is instantiable', t => {
  t.true(new E() instanceof E);
});

test('E', t => {      // 12345678901234567890123456789012345678901234567890123456789012345678901234567890
  t.is(new E().isPositive(), true);
  t.is(new E().isNegitive(), false);
  t.is(new E().trunc(), 2n);
  t.is(new E().floor(), 2n);
  t.is(new E().ceil(), 3n);
});

test('E#toFixed', t => {
  t.is(new E().toFixed(10), '2.7182818284');
  t.is(new E().toFixed(50), '2.71828182845904523536028747135266249775724709369995');
  t.is(new E().toFixed(80), '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759');
});

test('E#toExponential', t => {
  t.is(new E().toExponential(10), '2.7182818284e+0');
  t.is(new E().toExponential(50), '2.71828182845904523536028747135266249775724709369995e+0');
  t.is(new E().toExponential(80), '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759e+0');
});