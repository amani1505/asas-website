const KEY_OFFSETS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/** Roving-tab keyboard support: the index a key moves to, or undefined for other keys. */
export function nextTabIndex(key: string, index: number, count: number): number | undefined {
  if (key in KEY_OFFSETS) return (index + KEY_OFFSETS[key] + count) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return undefined;
}
