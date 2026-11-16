import type { ValueI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

interface CareersStepsSectionProps {
  title: string;
  steps: ValueI[];
}

/** How to join, as stops on a route: numbered because the order matters. */
export function CareersStepsSection({ title, steps }: CareersStepsSectionProps) {
  return (
    <section className="py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <h2 className="text-[length:var(--text-3xl)] font-bold">{title}</h2>
        <Reveal as="ol" className="relative grid gap-[var(--space-md)] md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-[var(--space-sm)] md:flex-col">
              {/* Route segment to the next stop: down on phones, across on wider screens. */}
              {index < steps.length - 1 && (
                <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-2rem)] w-0.5 border-l-2 border-dashed border-primary/40 md:left-12 md:top-6 md:h-0.5 md:w-[calc(100%-3rem+var(--space-md))] md:border-l-0 md:border-t-2" />
              )}
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-background font-heading text-[length:var(--text-lg)] font-extrabold text-primary">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1 pb-[var(--space-sm)]">
                <h3 className="text-[length:var(--text-xl)] font-bold">{step.title}</h3>
                <p className="max-w-[36ch] text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
