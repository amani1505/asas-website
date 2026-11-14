import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SECTOR_DOT_CLASSES } from '@/constants/sector.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/utils/cn.util';

interface BusinessesGridSectionProps {
  sectors: SectorI[];
  locale: Locale;
  dict: DictionaryI;
}

export function BusinessesGridSection({ sectors, locale, dict }: BusinessesGridSectionProps) {
  return (
    <section className="pb-[var(--space-2xl)]">
      <Container>
        <Reveal stagger className="flex flex-col gap-[var(--space-sm)]">
          {sectors.map((sector, index) => (
            <Link
              key={sector.slug}
              href={`/${locale}/businesses/${sector.slug}`}
              className="group grid overflow-hidden rounded-md border border-border bg-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-foreground/30 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-64">
                  <SkeletonImage
                    src={sector.image.src}
                    alt={sector.image.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </ViewTransition>
              <div className="flex flex-col gap-[var(--space-xs)] p-[var(--space-md)]">
                <div className="flex items-start justify-between gap-[var(--space-sm)]">
                  <p className="inline-flex items-center gap-2 font-heading text-[length:var(--text-sm)] font-bold text-muted-foreground">
                    <span className={cn('size-2 rounded-full', SECTOR_DOT_CLASSES[sector.slug])} />
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-md border border-border transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <h2 className="text-[length:var(--text-4xl)] font-extrabold">{sector.name}</h2>
                <p className="max-w-[52ch] text-[length:var(--text-lg)] text-muted-foreground">{sector.summary}</p>
                <div className="mt-auto pt-[var(--space-xs)]">
                  <p className="mb-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{dict.businesses.companiesInSector}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {sector.companies.map((company) => (
                      <li key={company.slug} className="rounded-md bg-muted px-2 py-1 text-[length:var(--text-sm)] font-medium">
                        {company.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
