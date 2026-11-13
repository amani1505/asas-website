import { CountUp } from '@/components/motion/CountUp';

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatItem({ value, suffix, label }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-primary pl-[var(--space-sm)]">
      <CountUp to={value} suffix={suffix} className="font-heading text-[length:var(--text-5xl)] font-bold leading-none" />
      <span className="text-[length:var(--text-sm)] text-muted-foreground">{label}</span>
    </div>
  );
}
