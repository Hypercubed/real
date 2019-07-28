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