export function parseValue(value: bigint | number | string | null | undefined): [bigint, number, number] {
  if (value === null || value === undefined) {
    return [0n, 0, 1];
  }

  // tslint:disable-next-line
  if (typeof value === 'number' || typeof value === 'bigint') {
    value = value.toString();
  }

  
  const [ss, se] = value.replace(/[._]/g, '').split(/[eE]/);
  const k = value.indexOf('.');

  const n = BigInt(ss);
  const s = ss.startsWith('-') ? 1 : 0;

  if (n === 0n) {
    return [n, 0, ss.length - s];
  }

  const p = n.toString().length - s;
  const e = parseInt(se || '0', 10) + (k < 0 ? 0 : k - ss.length);

  return [n, e, p];
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