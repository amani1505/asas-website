'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn.util';
import { nextTabIndex } from '@/utils/tabs.util';

export interface WheelItemI<T extends string> {
  id: T;
  title: string;
  icon: LucideIcon;
}

interface CommitmentWheelProps<T extends string> {
  items: WheelItemI<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  /** Prefix for element ids; panels must use `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  label: string;
}

const RADIUS = 40; // % of the wheel, from the centre to each topic.

/**
 * Position on the ring as rounded percentages. Rounding matters: Math.sin and
 * Math.cos may differ in the last digits between Node and the browser, which
 * would make the server HTML and the hydrated style disagree.
 */
function ringPosition(index: number, step: number): { left: string; top: string } {
  const angle = (index * step * Math.PI) / 180;
  const round = (value: number) => Math.round(value * 100) / 100;
  return { left: `${round(50 + RADIUS * Math.sin(angle))}%`, top: `${round(50 - RADIUS * Math.cos(angle))}%` };
}

/** Shortest signed step count from one index to another on a ring of `count`. */
function shortestSteps(from: number, to: number, count: number): number {
  let steps = to - from;
  if (steps > count / 2) steps -= count;
  if (steps < -count / 2) steps += count;
  return steps;
}

/**
 * The topics as a dial. Choosing one turns the ring (the short way round) so
 * it sits under the pointer at the top; the centre echoes the chosen topic.
 * The buttons form a tablist with arrow-key support.
 */
export function CommitmentWheel<T extends string>({ items, activeId, onSelect, idPrefix, label }: CommitmentWheelProps<T>) {
  const step = 360 / items.length;
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const [turn, setTurn] = useState({ index: activeIndex, rotation: -activeIndex * step });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Derived state: when the active topic changes, turn by the shortest path.
  if (turn.index !== activeIndex) {
    setTurn({ index: activeIndex, rotation: turn.rotation - shortestSteps(turn.index, activeIndex, items.length) * step });
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = nextTabIndex(event.key, index, items.length);
    if (nextIndex === undefined) return;
    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    onSelect(items[nextIndex].id);
  };

  const active = items[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div className="relative mx-auto aspect-square w-[min(100%,26rem)]">
      {/* Track: a dashed route ring with a soft red glow behind the centre. */}
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="0.6" strokeDasharray="1.6 1.6" />
        <circle cx="50" cy="50" r="24" fill="color-mix(in oklab, var(--primary) 7%, transparent)" />
      </svg>
      {/* Pointer at the top marking the chosen topic. */}
      <span aria-hidden className="absolute left-1/2 top-[3%] size-0 -translate-x-1/2 border-x-[7px] border-t-[9px] border-x-transparent border-t-primary" />

      <div
        data-wheel-ring
        role="tablist"
        aria-label={label}
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: `rotate(${turn.rotation}deg)` }}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${item.id}`}
              aria-label={item.title}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={ringPosition(index, step)}
            >
              {/* Counter-rotate so icons stay upright while the ring turns. */}
              <span
                className="flex flex-col items-center gap-1.5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: `rotate(${-turn.rotation}deg)` }}
              >
                <span
                  className={cn(
                    'grid size-12 place-items-center rounded-md border shadow-sm transition-all duration-300 sm:size-14',
                    isActive
                      ? 'scale-110 border-primary bg-primary text-primary-foreground shadow-[0_12px_28px_-10px_var(--primary)]'
                      : 'border-border bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary',
                  )}
                >
                  <Icon aria-hidden className="size-5 sm:size-6" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Centre: the chosen topic. Decorative; the tab and panel carry the name. */}
      <div aria-hidden className="pointer-events-none absolute inset-[30%] flex flex-col items-center justify-center gap-[var(--space-2xs)] text-center">
        <span key={active.id} className="animate-rise grid size-12 place-items-center rounded-md bg-card text-primary shadow-md sm:size-14">
          <ActiveIcon className="size-6 sm:size-7" />
        </span>
        <span key={`${active.id}-title`} className="animate-rise text-balance font-heading text-[length:var(--text-base)] font-bold leading-tight">
          {active.title}
        </span>
      </div>
    </div>
  );
}
