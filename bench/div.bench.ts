import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const FIVE = new Irrational(5);

suite('div', (s: any) => {
  const value = 25;
  const irr = new Irrational(value);
  const answer = 0.2;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = 5/value;
  });

  s.bench('div', () => {
    result = FIVE.div(irr);
  });

  s.bench('inv', () => {
    result = irr.inv().mul(FIVE);
  });
});