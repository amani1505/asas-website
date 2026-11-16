'use client';

import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SECTOR_DOT_CLASSES, SECTOR_ICONS } from '@/constants/sector.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn.util';

interface SectorChaptersSectionProps {
  sectors: SectorI[];
  locale: Locale;
  dict: DictionaryI;
}

/**
 * The businesses as a scroll story. On wide screens a photo stays pinned and
 * cross-fades to whichever sector chapter crosses the middle of the screen,
 * with a route of sector stops beneath it. Phones get each photo inline.
 */
export function SectorChaptersSection({ sectors, locale, dict }: SectorChaptersSectionProps) {
  const [activeSlug, setActiveSlug] = useActiveSection(sectors.map((sector) => sector.slug));
  const activeIndex = Math.max(0, sectors.findIndex((sector) => sector.slug === activeSlug));
  const progress = sectors.length > 1 ? activeIndex / (sectors.length - 1) : 1;

  return (
    <section className="pb-[var(--space-2xl)]">
      <Container className="grid gap-[var(--space-xl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Pinned photo and route (wide screens). */}
        <div className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-[var(--space-md)]">
            <div className="relative h-[clamp(22rem,calc(100dvh-15rem),44rem)] w-full overflow-hidden rounded-md bg-muted">
              {sectors.map((sector, index) => (
                <div
                  key={sector.slug}
                  data-photo={sector.slug}
                  data-active={index === activeIndex}
                  className={cn(
                    'absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    index === activeIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                  )}
                >
                  <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
                    <div className="absolute inset-0">
                      <SkeletonImage src={sector.image.src} alt={sector.image.alt} fill priority={index === 0} sizes="45vw" className="object-cover" />
                    </div>
                  </ViewTransition>
                </div>
              ))}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <p aria-hidden className="absolute bottom-[var(--space-md)] left-[var(--space-md)] font-heading text-[length:var(--text-4xl)] font-extrabold text-white">
                {sectors[activeIndex]?.name}
              </p>
              <p aria-hidden className="absolute right-[var(--space-md)] top-[var(--space-md)] rounded-md bg-black/40 px-2 py-1 font-heading text-[length:var(--text-sm)] font-bold text-white tabular-nums backdrop-blur">
                {activeIndex + 1} / {sectors.length}
              </p>
            </div>

            <nav aria-label={dict.businesses.routeLabel} className="relative px-[var(--space-sm)]">
              <span aria-hidden className="absolute inset-x-[var(--space-sm)] top-5 h-0.5 rounded-md bg-border" />
              <span
                aria-hidden
                className="absolute left-[var(--space-sm)] top-5 h-0.5 origin-left rounded-md bg-primary transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ right: 'var(--space-sm)', transform: `scaleX(${progress})` }}
              />
              <ol className="relative flex justify-between">
                {sectors.map((sector, index) => {
                  const Icon = SECTOR_ICONS[sector.slug];
                  const isCurrent = index === activeIndex;
                  const isPassed = index <= activeIndex;
                  return (
                    <li key={sector.slug} className="flex flex-col items-center">
                      <a
                        href={`#${sector.slug}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        onClick={() => setActiveSlug(sector.slug)}
                        className="group flex min-w-11 flex-col items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            'grid size-10 place-items-center rounded-md border transition-all duration-300',
                            isCurrent ? 'scale-110 border-primary bg-primary text-primary-foreground' : isPassed ? 'border-primary bg-card text-primary' : 'border-border bg-card text-muted-foreground group-hover:text-foreground',
                          )}
                        >
                          <Icon aria-hidden className="size-5" />
                        </span>
                        <span className={cn('text-[length:var(--text-xs)] font-medium', isCurrent ? 'text-foreground' : 'text-muted-foreground')}>{sector.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* Chapters. */}
        <div className="flex flex-col">
          {sectors.map((sector, index) => {
            const Icon = SECTOR_ICONS[sector.slug];
            return (
              <article
                key={sector.slug}
                id={sector.slug}
                aria-labelledby={`${sector.slug}-title`}
                className="flex scroll-mt-28 flex-col gap-[var(--space-md)] border-b border-border py-[var(--space-xl)] last:border-b-0 lg:min-h-[78dvh] lg:justify-center"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted lg:hidden">
                  <SkeletonImage src={sector.image.src} alt={sector.image.alt} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  <span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="inline-flex items-center gap-2 font-heading text-[length:var(--text-sm)] font-bold text-muted-foreground tabular-nums">
                    <span className={cn('size-2 rounded-full', SECTOR_DOT_CLASSES[sector.slug])} />
                    {String(index + 1).padStart(2, '0')} / {String(sectors.length).padStart(2, '0')}
                  </span>
                </div>
                <h2 id={`${sector.slug}-title`} className="text-[length:var(--text-5xl)] font-extrabold leading-none">
                  {sector.name}
                </h2>
                <p className="font-heading text-[length:var(--text-xl)] font-semibold">{sector.tagline}</p>
                <p className="max-w-[52ch] text-[length:var(--text-lg)] text-muted-foreground">{sector.summary}</p>

                <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-[var(--space-xs)]">
                  {sector.companies.map((company) => (
                    <li key={company.slug}>
                      <Link
                        href={`/${locale}/businesses/${sector.slug}#${company.slug}`}
                        data-testid="company-card"
                        className="group/company flex h-full items-start justify-between gap-[var(--space-xs)] rounded-md border border-border bg-card p-[var(--space-sm)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/60"
                      >
                        <span className="flex flex-col gap-1">
                          <span className="font-heading text-[length:var(--text-lg)] font-bold leading-snug">{company.name}</span>
                          <span className="text-[length:var(--text-sm)] text-muted-foreground">{company.tagline}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="size-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover/company:rotate-45 group-hover/company:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/businesses/${sector.slug}`}
                  className="group/explore inline-flex min-h-11 w-fit items-center gap-2 rounded-md bg-foreground px-[var(--space-sm)] text-[length:var(--text-sm)] font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {`${dict.businesses.exploreSector} ${sector.name}`}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover/explore:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
