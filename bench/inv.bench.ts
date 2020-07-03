import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const N_ONE = Irrational.ONE.neg();

suite('div/inv', (s: any) => {
  const value = 25;
  const irr = new Irrational(value);
  const answer = 0.04;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('JS', () => {
    result = 1/value;
  });

  s.bench('inv', () => {
    result = irr.inv();
  });

  s.bench('div', () => {
    result = Irrational.ONE.div(irr);
  });

  s.bench('pow', () => {
    result = irr.pow(N_ONE);
  });
});