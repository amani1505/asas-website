import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { SiteStatsI } from '@/services/content.service';
import { Container } from '@/components/ui/Container';
import { StatItem } from '@/components/domain/StatItem';
import { cn } from '@/utils/cn.util';

interface StatsGridProps {
  stats: SiteStatsI;
  labels: DictionaryI['stats'];
  tone?: 'default' | 'inverse';
  className?: string;
}

/** The four group numbers, laid out 2×2 on phones and in one row from tablets up. */
export function StatsGrid({ stats, labels, tone = 'default', className }: StatsGridProps) {
  const items = [
    { value: stats.years, suffix: '+', label: labels.years },
    { value: stats.companies, label: labels.companies },
    { value: stats.sectors, label: labels.sectors },
    { value: stats.offices, label: labels.offices },
  ];
  return (
    <div className={cn('grid grid-cols-2 gap-[var(--space-md)] md:grid-cols-4', className)}>
      {items.map((item) => (
        <StatItem key={item.label} value={item.value} suffix={item.suffix} label={item.label} tone={tone} />
      ))}
    </div>
  );
}

export function StatsSection({ stats, labels }: Omit<StatsGridProps, 'tone' | 'className'>) {
  return (
    <section className="border-y border-border bg-card">
      <Container className="py-[var(--space-lg)]">
        <StatsGrid stats={stats} labels={labels} />
      </Container>
    </section>
  );
}
