import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { SustainabilityTabI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { CountUp } from '@/components/motion/CountUp';

interface SustainabilityImpactSectionProps {
  tabs: SustainabilityTabI[];
  years: number;
  labels: DictionaryI['sustainability']['impact'];
}

const pointsOf = (tabs: SustainabilityTabI[], id: SustainabilityTabI['id']) => tabs.find((tab) => tab.id === id)?.points ?? [];

/** Headline numbers, all counted from the content so they never go stale. */
export function SustainabilityImpactSection({ tabs, years, labels }: SustainabilityImpactSectionProps) {
  const items = [
    { value: years, suffix: '+', label: labels.years },
    { value: pointsOf(tabs, 'compliance').filter((point) => point.startsWith('ISO')).length, label: labels.standards },
    { value: pointsOf(tabs, 'community').length, label: labels.programmes },
    { value: pointsOf(tabs, 'hse').length, label: labels.commitments },
  ];
  return (
    <section className="border-y border-border bg-card">
      <Container>
        <ul className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {items.map((item) => (
            <li key={item.label} className="flex flex-col gap-1 py-[var(--space-md)] md:px-[var(--space-md)] md:first:pl-0">
              <CountUp to={item.value} suffix={item.suffix} className="font-heading text-[length:var(--text-4xl)] font-bold leading-none text-primary" />
              <span className="text-[length:var(--text-sm)] text-muted-foreground">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
