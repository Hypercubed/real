export function bDiv(dividend: bigint, divisor: bigint, n: number): [bigint, bigint, number] {
  const sgnDividend = dividend < 0n ? -1n : 1n;
  const sgnDivisor = divisor < 0n ? -1n : 1n;

  dividend *= sgnDividend;
  divisor *= sgnDivisor;

  let adj = 0;
  let result = 0n;

  while (dividend < divisor) {
    dividend *= 10n;
    adj++;
  }

  const S = 10n**BigInt(n);

  for (;;) {
    result += dividend / divisor;
    dividend %= divisor;

    if (dividend === 0n || result > S) {
      break;
    }

    result *= 10n;
    dividend *= 10n;
    adj++;
  }

  return [result * sgnDividend * sgnDivisor, dividend, adj];
}

export function bSqr(s: bigint, e: number): [bigint, number] {
  return [s**2n, e*2];
}

export function bSgn(s: bigint): bigint {
  return s < 0n ? -1n : 1n;
}

export function bAbs(s: bigint): bigint {
  return s < 0n ? -s : s;
}

// TODO: return error
export function bSqrt(value: bigint): bigint {
  if (value < 0n) {
    throw new Error('square root of negative numbers is not supported');
  }

  if (value < 2n) {
    return value;
  }

  function newtonIteration(n: bigint, x0: bigint): bigint {
      const x1 = ((n / x0) + x0) >> 1n;
      if (x0 === x1 || x0 === (x1 - 1n)) {
          return x0;
      }
      return newtonIteration(n, x1);
  }

  return newtonIteration(value, 1n);
}

export function bGcd(x: bigint, y: bigint) {
  x = bAbs(x);
  y = bAbs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}