import type { CareersContentI, ValueI } from '@/interfaces/content.interface';
import { ContourLines } from '@/components/decor/ContourLines';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ValueCard } from '@/components/domain/ValueCard';
import { Reveal } from '@/components/motion/Reveal';

interface CareersIntroSectionProps {
  intro: CareersContentI['intro'];
  eyebrow: string;
  reasonsTitle: string;
  reasons: ValueI[];
}

export function CareersIntroSection({ intro, eyebrow, reasonsTitle, reasons }: CareersIntroSectionProps) {
  return (
    <section className="relative overflow-hidden py-[var(--space-xl)]">
      <ContourLines origin="right" rings={14} className="text-foreground/[0.08]" />
      <Container className="relative flex flex-col gap-[var(--space-2xl)]">
        <div className="animate-rise">
          <SectionHeading
            as="h1"
            eyebrow={eyebrow}
            title={intro.title}
            highlight={intro.highlight}
            description={
              <div className="flex flex-col gap-[var(--space-xs)]">
                {intro.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-[var(--space-lg)]">
          <h2 className="text-[length:var(--text-3xl)] font-bold">{reasonsTitle}</h2>
          <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[var(--space-sm)]">
            {reasons.map((reason, index) => (
              <ValueCard key={reason.title} value={reason} index={index} />
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
