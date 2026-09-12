/** Deterministic string → int hash (djb2). Same seed always yields the same art. */
export function hashSeed(seed: string): number {
  let hash = 5381;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function seededPick<T>(seed: number, values: readonly T[]): T {
  return values[seed % values.length];
}
