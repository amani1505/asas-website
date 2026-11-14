interface ContourOptionsI {
  /** Number of nested rings. */
  rings: number;
  /** Centre of the "hill" in viewBox units. */
  cx: number;
  cy: number;
  /** Radius of the innermost ring. */
  start?: number;
  /** Distance between rings. */
  step?: number;
  /** Horizontal stretch, so hills read as ridges rather than circles. */
  stretch?: number;
}

type Point = [number, number];

const SAMPLES = 40;
const round = (n: number) => Math.round(n * 10) / 10;

function ringPoints(cx: number, cy: number, radius: number, seed: number, stretch: number): Point[] {
  return Array.from({ length: SAMPLES }, (_, k) => {
    const angle = (2 * Math.PI * k) / SAMPLES;
    const wobble =
      1 + 0.1 * Math.sin(3 * angle + seed) + 0.06 * Math.sin(5 * angle - seed * 1.7) + 0.035 * Math.sin(7 * angle + seed * 0.6);
    const r = radius * wobble;
    return [cx + r * Math.cos(angle) * stretch, cy + r * Math.sin(angle)];
  });
}

/** Closed Catmull-Rom spline through the points, written as cubic Béziers. */
function smoothClosedPath(points: Point[]): string {
  const at = (i: number) => points[(i + points.length) % points.length];
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < points.length; i += 1) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`;
  }
  return `${d}Z`;
}

/**
 * Topographic contour rings around one hill. Pure and deterministic, so the
 * same lines render on the server and the client.
 */
export function contourPaths({ rings, cx, cy, start = 36, step = 34, stretch = 1.4 }: ContourOptionsI): string[] {
  return Array.from({ length: rings }, (_, i) =>
    smoothClosedPath(ringPoints(cx, cy, start + i * step, i * 0.32, stretch)),
  );
}
