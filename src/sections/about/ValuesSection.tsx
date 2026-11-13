import type { ValueI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ValueCard } from '@/components/domain/ValueCard';
import { Reveal } from '@/components/motion/Reveal';

interface ValuesSectionProps {
  eyebrow: string;
  heading: string;
  values: ValueI[];
}

export function ValuesSection({ eyebrow, heading, values }: ValuesSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <SectionHeading eyebrow={eyebrow} title={heading} />
        <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[var(--space-sm)]">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
