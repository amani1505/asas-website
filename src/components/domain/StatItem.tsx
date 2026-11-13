import { CountUp } from '@/components/motion/CountUp';
import { cn } from '@/utils/cn.util';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
  /** `inverse` is for light text on the brand-red surface. */
  tone?: 'default' | 'inverse';
}

export function StatItem({ value, suffix, label, tone = 'default' }: StatItemProps) {
  const isInverse = tone === 'inverse';
  return (
    <div className={cn('flex flex-col gap-1 border-l-2 pl-[var(--space-sm)]', isInverse ? 'border-primary-foreground/40' : 'border-primary')}>
      <CountUp to={value} suffix={suffix} className="font-heading text-[length:var(--text-5xl)] font-bold leading-none" />
      <span className={cn('text-[length:var(--text-sm)]', isInverse ? 'text-primary-foreground/90' : 'text-muted-foreground')}>
        {label}
      </span>
    </div>
  );
}
