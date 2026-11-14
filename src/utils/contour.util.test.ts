import { contourPaths } from './contour.util';

describe('contourPaths', () => {
  it('returns one closed path per ring', () => {
    const paths = contourPaths({ rings: 6, cx: 400, cy: 300 });
    expect(paths).toHaveLength(6);
    for (const d of paths) {
      expect(d.startsWith('M')).toBe(true);
      expect(d.endsWith('Z')).toBe(true);
    }
  });

  it('is deterministic so server and client render the same lines', () => {
    expect(contourPaths({ rings: 4, cx: 0, cy: 0 })).toEqual(contourPaths({ rings: 4, cx: 0, cy: 0 }));
  });

  it('grows each ring outward', () => {
    const [inner, outer] = contourPaths({ rings: 2, cx: 0, cy: 0, start: 40, step: 30 });
    const firstX = (d: string) => Number(d.slice(1).split(' ')[0]);
    expect(Math.abs(firstX(outer))).toBeGreaterThan(Math.abs(firstX(inner)));
  });
});
