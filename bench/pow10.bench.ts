import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const TEN = new Irrational(10);

suite('pow10', (s: any) => {
  const value = 5;
  const irr = new Irrational(value);
  const answer = 1e+5;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = 10**5;
  });

  s.bench('pow10', () => {
    result = irr.pow10();
  });

  s.bench('ten.pow', () => {
    result = TEN.pow(irr);
  });

  s.bench('ten.ipow', () => {
    result = (TEN as any).ipow(5n);
  });
});