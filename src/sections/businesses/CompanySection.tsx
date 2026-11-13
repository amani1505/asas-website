import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import type { CompanyI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/utils/cn.util';

interface CompanySectionProps {
  company: CompanyI;
  index: number;
  servicesLabel: string;
  /** Extra content below the services, e.g. the dairy product catalogue. */
  children?: ReactNode;
}

export function CompanySection({ company, index, servicesLabel, children }: CompanySectionProps) {
  const isImageRight = index % 2 === 1;
  return (
    <section id={company.slug} aria-labelledby={`${company.slug}-title`} className="scroll-mt-32 py-[var(--space-xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <div className="grid items-center gap-[var(--space-lg)] md:grid-cols-2">
          {company.image && (
            <Reveal className={cn(isImageRight && 'md:order-2')}>
              <ImageFrame image={company.image} ratio="4 / 3" sizes="(min-width: 768px) 50vw, 100vw" />
            </Reveal>
          )}
          <Reveal delay={0.08} className="flex flex-col gap-[var(--space-sm)]">
            <p className="font-heading text-[length:var(--text-sm)] font-bold text-primary">{String(index + 1).padStart(2, '0')}</p>
            <h2 id={`${company.slug}-title`} className="text-[length:var(--text-3xl)] font-bold">
              {company.name}
            </h2>
            <p className="font-heading text-[length:var(--text-xl)] font-semibold">{company.tagline}</p>
            <p className="max-w-[60ch] text-muted-foreground">{company.summary}</p>
            {company.highlights && (
              <ul className="flex flex-wrap gap-2">
                {company.highlights.map((highlight) => (
                  <li key={highlight} className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-[length:var(--text-sm)]">
                    <Sparkles aria-hidden className="size-3.5 text-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>

        <div className="flex flex-col gap-[var(--space-sm)]">
          <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{servicesLabel}</p>
          <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[var(--space-xs)]">
            {company.services.map((service) => (
              <div key={service.title} className="h-full rounded-md border border-border bg-card p-[var(--space-sm)] transition-colors duration-300 hover:border-primary/50">
                <h3 className="font-heading text-[length:var(--text-lg)] font-bold">{service.title}</h3>
                <p className="mt-1 text-[length:var(--text-sm)] text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {children}
      </Container>
    </section>
  );
}
