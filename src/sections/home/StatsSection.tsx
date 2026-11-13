import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { SiteStatsI } from '@/services/content.service';
import { Container } from '@/components/ui/Container';
import { StatItem } from '@/components/domain/StatItem';

interface StatsSectionProps {
  stats: SiteStatsI;
  labels: DictionaryI['stats'];
}

export function StatsSection({ stats, labels }: StatsSectionProps) {
  const items = [
    { value: stats.years, suffix: '+', label: labels.years },
    { value: stats.companies, label: labels.companies },
    { value: stats.sectors, label: labels.sectors },
    { value: stats.offices, label: labels.offices },
  ];
  return (
    <section className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 gap-[var(--space-md)] py-[var(--space-lg)] md:grid-cols-4">
        {items.map((item) => (
          <StatItem key={item.label} value={item.value} suffix={item.suffix} label={item.label} />
        ))}
      </Container>
    </section>
  );
}
