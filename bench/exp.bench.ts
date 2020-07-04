import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

suite('exp integer', (s: any) => {
  const value = 5;
  const bi = BigInt(value);
  const irr = new Irrational(value);
  const answer = '148.4132';

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.toFixed(4), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = Math.exp(value);
  });

  s.bench('exp', () => {
    result = irr.exp();
  });

  s.bench('ipow', () => {
    // @ts-ignore
    result = Irrational.E.ipow(bi);
  });

  s.bench('pow', () => {
    // @ts-ignore
    result = Irrational.E.pow(irr);
  });

  s.bench('expm1', () => {
    // @ts-ignore
    result = irr.expm1().inc();
  });
});

suite('exp x; x < 1', (s: any) => {
  const value = 0.1;
  const irr = new Irrational(value);
  const answer = '1.1052';

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.toFixed(4), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = Math.exp(value);
  });

  s.bench('exp', () => {
    result = irr.exp();
  });

  s.bench('pow', () => {
    // @ts-ignore
    result = Irrational.E.pow(irr);
  });

  s.bench('expm1', () => {
    // @ts-ignore
    result = irr.expm1().inc();
  });
});
