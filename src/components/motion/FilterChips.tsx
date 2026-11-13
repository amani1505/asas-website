'use client';

import { useId } from 'react';
import { m } from 'motion/react';
import { cn } from '@/utils/cn.util';

interface FilterOptionI<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface FilterChipsProps<T extends string> {
  options: FilterOptionI<T>[];
  active: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
}

const CHIP_SPRING = { type: 'spring', stiffness: 500, damping: 40 } as const;

export function FilterChips<T extends string>({ options, active, onChange, label, className }: FilterChipsProps<T>) {
  const layoutId = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isActive = option.id === active;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative inline-flex min-h-11 items-center gap-2 rounded-md border px-[var(--space-sm)] text-[length:var(--text-sm)] font-medium transition-colors',
              isActive ? 'border-transparent text-background' : 'border-border text-foreground hover:border-foreground/40',
            )}
          >
            {isActive && <m.span layoutId={layoutId} transition={CHIP_SPRING} className="absolute inset-0 rounded-md bg-foreground" />}
            <span className="relative">{option.label}</span>
            {option.count !== undefined && (
              <span className={cn('relative text-[length:var(--text-xs)] tabular-nums', isActive ? 'text-background/70' : 'text-muted-foreground')}>
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
