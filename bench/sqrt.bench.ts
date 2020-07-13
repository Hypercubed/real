import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const N_HALF = Irrational.from(0.5);

suite('sqrt', (s: any) => {
  const value = 25;
  const irr = Irrational.from(value);
  const answer = 5;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('Math.sqrt', () => {
    result = Math.sqrt(value);
  });

  s.bench('sqrt', () => {
    result = irr.sqrt();
  });

  s.bench('isqrt', () => {
    result = irr.isqrt().mul(irr);
  });

  s.bench('pow', () => {
    result = irr.pow(N_HALF);
  });
});