'use client';

import type { MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ResolvedTheme, RevealOriginI } from '@/interfaces/theme.interface';
import { cn } from '@/utils/cn.util';

interface ThemeToggleProps {
  resolvedTheme: ResolvedTheme;
  labels: { toLight: string; toDark: string };
  onToggle: (origin: RevealOriginI) => void;
  className?: string;
}

export function ThemeToggle({ resolvedTheme, labels, onToggle, className }: ThemeToggleProps) {
  const label = resolvedTheme === 'dark' ? labels.toLight : labels.toDark;

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label={label}
      title={label}
      className={cn(
        'relative inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted active:scale-95',
        className,
      )}
    >
      <Sun aria-hidden className="size-[1.2rem] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon aria-hidden className="absolute size-[1.2rem] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
