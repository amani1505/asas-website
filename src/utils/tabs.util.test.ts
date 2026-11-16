import { nextTabIndex } from './tabs.util';

describe('nextTabIndex', () => {
  it('moves with the arrow keys and wraps around', () => {
    expect(nextTabIndex('ArrowRight', 0, 5)).toBe(1);
    expect(nextTabIndex('ArrowDown', 4, 5)).toBe(0);
    expect(nextTabIndex('ArrowLeft', 0, 5)).toBe(4);
    expect(nextTabIndex('ArrowUp', 2, 5)).toBe(1);
  });

  it('jumps to the ends with Home and End', () => {
    expect(nextTabIndex('Home', 3, 5)).toBe(0);
    expect(nextTabIndex('End', 1, 5)).toBe(4);
  });

  it('ignores other keys', () => {
    expect(nextTabIndex('a', 1, 5)).toBeUndefined();
  });
});
