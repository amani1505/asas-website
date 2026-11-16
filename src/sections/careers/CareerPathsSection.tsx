'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Mail } from 'lucide-react';
import { SECTOR_DOT_CLASSES, SECTOR_ICONS } from '@/constants/sector.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { SectorI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { cvMailto } from '@/utils/careers.util';
import { cn } from '@/utils/cn.util';
import { nextTabIndex } from '@/utils/tabs.util';

interface CareerPathsSectionProps {
  sectors: SectorI[];
  email: string;
  dict: DictionaryI;
}

const FADE = { duration: 0.25, ease: [0.22, 1, 0.36, 1] } as const;

/** Pick an area of the group to see who you could work for, the kind of work, and send a CV for it. */
export function CareerPathsSection({ sectors, email, dict }: CareerPathsSectionProps) {
  const [activeSlug, setActiveSlug] = useState(sectors[0]?.slug);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = sectors.find((sector) => sector.slug === activeSlug) ?? sectors[0];
  const work = [...new Set(active.companies.flatMap((company) => company.services.map((service) => service.title)))];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = nextTabIndex(event.key, index, sectors.length);
    if (next === undefined) return;
    event.preventDefault();
    refs.current[next]?.focus();
    setActiveSlug(sectors[next].slug);
  };

  return (
    <section id="paths" className="scroll-mt-20 bg-card py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <div className="flex flex-col gap-[var(--space-xs)]">
          <h2 className="text-[length:var(--text-3xl)] font-bold">{dict.careers.findPath}</h2>
          <p className="max-w-[60ch] text-[length:var(--text-lg)] text-muted-foreground">{dict.careers.pathsBody}</p>
        </div>

        <div role="radiogroup" aria-label={dict.careers.pathsLabel} className="grid grid-cols-2 gap-[var(--space-xs)] md:grid-cols-4">
          {sectors.map((sector, index) => {
            const Icon = SECTOR_ICONS[sector.slug];
            const isActive = sector.slug === active.slug;
            return (
              <button
                key={sector.slug}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveSlug(sector.slug)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  'flex min-h-14 items-center gap-[var(--space-xs)] rounded-md border p-[var(--space-xs)] text-left font-heading font-bold transition-all duration-300',
                  isActive ? 'border-primary bg-primary text-primary-foreground shadow-[0_14px_30px_-16px_var(--primary)]' : 'border-border bg-background hover:border-primary/50',
                )}
              >
                <span className={cn('grid size-9 shrink-0 place-items-center rounded-md', isActive ? 'bg-white/20' : 'bg-primary/10 text-primary')}>
                  <Icon aria-hidden className="size-5" />
                </span>
                {sector.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.slug}
            role="region"
            aria-label={active.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={FADE}
            className="grid gap-[var(--space-lg)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted lg:aspect-auto lg:min-h-full">
              <SkeletonImage src={active.image.src} alt={active.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
              <p className="absolute bottom-[var(--space-md)] left-[var(--space-md)] right-[var(--space-md)] font-heading text-[length:var(--text-2xl)] font-bold text-white">{active.tagline}</p>
            </div>

            <div className="flex flex-col gap-[var(--space-md)]">
              <div className="flex flex-col gap-[var(--space-xs)]">
                <h3 className="text-[length:var(--text-sm)] font-semibold text-muted-foreground">{dict.careers.companiesTitle}</h3>
                <ul className="flex flex-col gap-[var(--space-2xs)]">
                  {active.companies.map((company) => (
                    <li key={company.slug} className="flex items-center gap-[var(--space-xs)] rounded-md border border-border bg-background p-[var(--space-xs)]">
                      <span aria-hidden className={cn('size-2.5 shrink-0 rounded-full', SECTOR_DOT_CLASSES[active.slug])} />
                      <span className="flex flex-col">
                        <span className="font-heading font-bold">{company.name}</span>
                        <span className="text-[length:var(--text-sm)] text-muted-foreground">{company.tagline}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-[var(--space-xs)]">
                <h3 className="text-[length:var(--text-sm)] font-semibold text-muted-foreground">{dict.careers.workTitle}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {work.map((title) => (
                    <li key={title} className="rounded-md bg-muted px-2.5 py-1 text-[length:var(--text-sm)] font-medium">
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
              <Button href={cvMailto(email, active.name)} size="lg" className="w-fit">
                <Mail aria-hidden />
                {`${dict.careers.cvFor} ${active.name}`}
              </Button>
            </div>
          </m.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
