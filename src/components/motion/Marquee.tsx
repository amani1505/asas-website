import type { ReactNode } from 'react';
import { cn } from '@/utils/cn.util';

interface MarqueeProps {
  items: ReactNode[];
  label: string;
  speedSeconds?: number;
  className?: string;
}

/**
 * Endless horizontal scroll of `items`. The track is duplicated for a seamless
 * loop; the copy is hidden from assistive tech. Pauses on hover and focus, and
 * stays still under reduced motion (CSS in view-transitions.css).
 */
export function Marquee({ items, label, speedSeconds = 40, className }: MarqueeProps) {
  return (
    <section aria-label={label} className={cn('marquee group relative overflow-hidden', className)}>
      <div className="marquee-track flex w-max" style={{ animationDuration: `${speedSeconds}s` }}>
        <ul className="flex shrink-0 items-center gap-[var(--space-xl)] pr-[var(--space-xl)]">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-[var(--space-xl)] pr-[var(--space-xl)]">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
