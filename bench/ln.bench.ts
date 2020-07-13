import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const TEN = Irrational.from(10);

suite('ln x < 1', (s: any) => {
  const value = 0.1;
  const irr = Irrational.from(value);
  const answer = '-2.3026';

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.strictEqual(result.toFixed(4), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = Math.log(value);
  });

  s.bench('ln', () => {
    result = irr.ln();
  });

  s.bench('inv', () => {
    result = irr.inv().ln().neg();
  });

  s.bench('lnp1', () => {
    // @ts-ignore
    result = irr.dec().lnp1();
  });

  s.bench('atan', () => {
    // @ts-ignore
    result = irr.dec().div(irr.inc()).atanh().mul(Irrational.TWO);
  });
});

suite('ln x > 1', (s: any) => {
  const value = 2;
  const irr = Irrational.from(value);
  const answer = '0.6931';

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.strictEqual(result.toFixed(4), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = Math.log(value);
  });

  s.bench('ln', () => {
    result = irr.ln();
  });

  s.bench('inv', () => {
    result = irr.inv().ln().neg();
  });

  s.bench('lnp1', () => {
    // @ts-ignore
    result = irr.dec().lnp1();
  });

  s.bench('atan', () => {
    // @ts-ignore
    result = irr.dec().div(irr.inc()).atanh().mul(Irrational.TWO);
  });
});