import type { ReactNode } from 'react';
import { cn } from '@/utils/cn.util';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground',
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-primary" />
      {children}
    </p>
  );
}
