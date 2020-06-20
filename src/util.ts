export function parseValue(value: bigint | number | string | null | undefined): [bigint, number] {
  if (value === null || value === undefined) {
    return [0n, 0];
  }

  // tslint:disable-next-line
  if (typeof value === 'bigint') {
    return [value, 0];
  }

  if (typeof value === 'number') {
    value = '' + value;
  }

  const [ss, se] = value.replace(/[._]/g, '').split(/[eE]/);
  const k = value.indexOf('.');

  const n = BigInt(ss);
  const e = parseInt(se || '0', 10) + (k < 0 ? 0 : k - ss.length);
  return [n, e];
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