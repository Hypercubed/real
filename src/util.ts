
// TODO: implement prefix #e - exact, #i - inexact??
export function parseValue(value: bigint | number | string | null | undefined): [bigint, number, number] {
  if (value === null || value === undefined) {
    return [0n, 0, Infinity];
  }

  if (typeof value === 'number') {
    value = value.toString();
    const [s, e, p] = parseValue(value);
    const isInteger = value.indexOf('.') < 0 && value.search(/[eE]/) < 0;
    // Integers are accurate up to 15 digits.
    // The maximum number of decimals is 17
    return [s, e, isInteger ? 15 : 17];
  }

  // tslint:disable-next-line
  if (typeof value === 'bigint') {
    value = value.toString();
  }

  value = value.replace(/[_\s]/g, '');  // replace "whitespace"

  const [coefficient, exponent = '0'] = value.split(/[eE]/);
  let [ip = '0', fp = ''] = coefficient.split('.');
  const significand = ip + fp;
  const k = ip.length;

  const s = BigInt(significand);
  const sign = significand.startsWith('-') ? 1 : 0;
  const e = parseInt(exponent, 10);

  // Integers (without a period or exponent notation) have infinite precision
  const isInteger = coefficient.indexOf('.') < 0 && value.search(/[eE]/) < 0;

  // zero
  if (s === 0n) {
    const p = isInteger ? Infinity : significand.length - sign;
    return [s, e, p];
  }

  const p = isInteger ? Infinity : s.toString().length - sign;

  return [s, e + (k < 0 ? 0 : k - significand.length), p];
}

export function absDiff(a: bigint, b: bigint): bigint {
  return a > b ? a - b : b - a;
}

export function zeroPadRight(s: string, digits: number) {
  const n = Math.max(0, digits - s.length);
  return (s + '0'.repeat(n)).slice(0, digits);
}

export function zeroPadLeft(s: string, digits: number) {
  const n = Math.max(0, -digits - s.length);
  return ('0'.repeat(n) + s).slice(digits);
}

export function gcd(a: bigint, b: bigint): bigint {
  return b ? gcd(b, a % b) : (a > 0n ? a : -a);
}