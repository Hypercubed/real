import assert from 'assert';
// @ts-ignore
import suite from 'chuhai';

import { Irrational } from '../src/irrational';

suite('sqr', (s: any) => {
  const value = 5;
  const irr = Irrational.from(value);
  const answer = 25;

  let result: number | Irrational = 0;

  s.cycle(() => {
    assert.equal(result.valueOf(), answer);
    result = 0;
  });

  s.burn('number', () => {
    result = value ** 2;
  });

  s.bench('sqr', () => {
    result = (irr as any).sqr();
  });

  s.bench('mul', () => {
    result = irr.mul(irr);
  });

  s.bench('pow', () => {
    result = irr.pow(Irrational.TWO);
  });

  s.bench('ipow', () => {
    result = (irr as any).ipow(2n);
  });
});