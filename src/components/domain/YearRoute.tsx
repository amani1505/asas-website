'use client';

import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/utils/cn.util';
import { nextTabIndex } from '@/utils/tabs.util';

interface YearRouteProps {
  years: { year: number; count: number }[];
  /** undefined means all years. */
  active?: number;
  onChange: (year?: number) => void;
  label: string;
  allLabel: string;
}

/**
 * The years as stops on a route, oldest to newest. Each stop's dot grows with
 * the number of stories that year. A radio group: one year, or all of them.
 */
export function YearRoute({ years, active, onChange, label, allLabel }: YearRouteProps) {
  const options: (number | undefined)[] = [undefined, ...years.map((entry) => entry.year)];
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const most = Math.max(1, ...years.map((entry) => entry.count));

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = nextTabIndex(event.key, index, options.length);
    if (next === undefined) return;
    event.preventDefault();
    refs.current[next]?.focus();
    onChange(options[next]);
  };

  return (
    <div role="radiogroup" aria-label={label} className="flex items-center gap-[var(--space-sm)] overflow-x-auto pb-1 [scrollbar-width:none]">
      <button
        ref={(element) => {
          refs.current[0] = element;
        }}
        type="button"
        role="radio"
        aria-checked={active === undefined}
        tabIndex={active === undefined ? 0 : -1}
        onClick={() => onChange(undefined)}
        onKeyDown={(event) => handleKeyDown(event, 0)}
        className={cn(
          'min-h-11 shrink-0 rounded-md border px-[var(--space-xs)] text-[length:var(--text-sm)] font-medium transition-colors',
          active === undefined ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:text-foreground',
        )}
      >
        {allLabel}
      </button>
      <ol className="relative flex min-w-max flex-1 items-start justify-between gap-[var(--space-xs)]">
        <span aria-hidden className="absolute inset-x-3 top-[1.15rem] h-px bg-border" />
        {years.map((entry, index) => {
          const isActive = entry.year === active;
          const dot = 8 + Math.round((entry.count / most) * 10);
          return (
            <li key={entry.year} className="relative">
              <button
                ref={(element) => {
                  refs.current[index + 1] = element;
                }}
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(entry.year)}
                onKeyDown={(event) => handleKeyDown(event, index + 1)}
                aria-label={`${entry.year} (${entry.count})`}
                className="group flex min-h-11 min-w-11 flex-col items-center gap-1 px-1"
              >
                <span className="grid h-6 place-items-center">
                  <span
                    className={cn(
                      'rounded-full border-2 transition-all duration-300',
                      isActive ? 'border-primary bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_20%,transparent)]' : 'border-primary/70 bg-card group-hover:bg-primary/30',
                    )}
                    style={{ width: dot, height: dot }}
                  />
                </span>
                <span className={cn('text-[length:var(--text-xs)] font-semibold tabular-nums', isActive ? 'text-primary' : 'text-muted-foreground')}>{entry.year}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
