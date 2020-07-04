import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

const FIVE = new Irrational(5);
const N_FIVE = new Irrational(-5);

suite('sub', (s: any) => {
  const value = 25;
  const irr = new Irrational(value);
  const answer = 20;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = 25 - 5;
  });

  s.bench('sub', () => {
    result = irr.sub(FIVE);
  });

  s.bench('add', () => {
    result = irr.add(N_FIVE)
  });

  s.bench('add neg', () => {
    result = irr.add(FIVE.neg())
  });
});