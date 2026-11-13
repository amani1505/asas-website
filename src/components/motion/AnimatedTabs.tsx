'use client';

import { useRef, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn.util';

interface TabI<T extends string> {
  id: T;
  label: string;
}

interface AnimatedTabsProps<T extends string> {
  tabs: TabI<T>[];
  active: T;
  onChange: (id: T) => void;
  /** Prefix for element ids; panels must use `${idPrefix}-panel-${id}`. */
  idPrefix: string;
  label: string;
  className?: string;
}

const INDICATOR_SPRING = { type: 'spring', stiffness: 500, damping: 40 } as const;

export function AnimatedTabs<T extends string>({ tabs, active, onChange, idPrefix, label, className }: AnimatedTabsProps<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyOffsets: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let nextIndex: number | undefined;
    if (event.key in keyOffsets) nextIndex = (index + keyOffsets[event.key] + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    onChange(tabs[nextIndex].id);
  };

  return (
    <div role="tablist" aria-label={label} className={cn('flex gap-1 overflow-x-auto rounded-md border border-border bg-card p-1 [scrollbar-width:none]', className)}>
      {tabs.map((tab, index) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              'relative min-h-11 shrink-0 whitespace-nowrap rounded-md px-[var(--space-sm)] text-[length:var(--text-sm)] font-medium transition-colors',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {isActive && <motion.span layoutId={`${idPrefix}-indicator`} transition={INDICATOR_SPRING} className="absolute inset-0 rounded-md bg-primary" />}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
