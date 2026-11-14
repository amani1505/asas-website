import { cn } from '@/utils/cn.util';

interface RouteDividerProps {
  className?: string;
}

const STOPS = ['18%', '50%', '82%'];

/**
 * A section divider drawn like a route on a map: a hairline road with three
 * stops and a short red stretch heading out, ending in livery chevrons.
 */
export function RouteDivider({ className }: RouteDividerProps) {
  return (
    <div aria-hidden="true" className={cn('relative flex h-6 items-center', className)}>
      <svg className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 overflow-visible" preserveAspectRatio="none">
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="var(--border)" strokeWidth={1} />
        <line x1="0" y1="0.5" x2="18%" y2="0.5" stroke="var(--primary)" strokeWidth={2} strokeDasharray="6 6" />
      </svg>
      {STOPS.map((left, index) => (
        <span
          key={left}
          data-stop
          className={cn(
            'absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-background',
            index === 0 ? 'border-primary' : 'border-muted-foreground/50',
          )}
          style={{ left }}
        />
      ))}
      <svg viewBox="0 0 44 12" className="absolute right-0 top-1/2 h-3 w-11 -translate-y-1/2 bg-background pl-1 text-primary">
        {[0, 11, 22, 33].map((x) => (
          <polygon key={x} points={`${x},0 ${x + 4},0 ${x + 9},6 ${x + 4},12 ${x},12 ${x + 5},6`} fill="currentColor" />
        ))}
      </svg>
    </div>
  );
}
