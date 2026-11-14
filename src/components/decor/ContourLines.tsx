import type { CSSProperties } from 'react';
import { contourPaths } from '@/utils/contour.util';
import { cn } from '@/utils/cn.util';

type ContourOrigin = 'right' | 'left' | 'center';

interface ContourLinesProps {
  /** Where the hill sits; the rings spread out from there. */
  origin?: ContourOrigin;
  rings?: number;
  /** Draw each ring in, one after another (used by the splash screen). */
  drawIn?: boolean;
  /** Set the colour with a text-* class; lines use currentColor. */
  className?: string;
}

const VIEW = { width: 1200, height: 700 };
const CENTRES: Record<ContourOrigin, [number, number]> = {
  right: [980, 260],
  left: [220, 440],
  center: [600, 350],
};

/**
 * Thin topographic contour lines, after the Southern Highlands around
 * Iringa. Purely decorative texture for a section background.
 */
export function ContourLines({ origin = 'right', rings = 16, drawIn = false, className }: ContourLinesProps) {
  const [cx, cy] = CENTRES[origin];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1}>
        {contourPaths({ rings, cx, cy }).map((d, index) =>
          drawIn ? (
            <path
              key={d}
              d={d}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              className="contour-draw"
              style={{ '--ring-delay': `${index * 0.07}s` } as CSSProperties}
            />
          ) : (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ),
        )}
      </g>
    </svg>
  );
}
