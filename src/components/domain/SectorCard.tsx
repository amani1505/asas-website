import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SECTOR_DOT_CLASSES } from '@/constants/sector.constants';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { cn } from '@/utils/cn.util';

interface SectorCardProps {
  sector: SectorI;
  locale: Locale;
  size: 'lg' | 'md';
  moreLabel: string;
  companiesLabel: string;
  /** Singular form, used when the sector has one company. */
  companyLabel: string;
  className?: string;
}

export function SectorCard({ sector, locale, size, moreLabel, companiesLabel, companyLabel, className }: SectorCardProps) {
  const isLarge = size === 'lg';
  return (
    <Link
      href={`/${locale}/businesses/${sector.slug}`}
      className={cn(
        'group relative isolate flex overflow-hidden rounded-md border border-border bg-charcoal text-white transition-transform duration-300 ease-out hover:-translate-y-1',
        isLarge ? 'min-h-[22rem] md:min-h-full' : 'min-h-[16rem]',
        className,
      )}
    >
      <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
        <div className="absolute inset-0 -z-10">
          <SkeletonImage
            src={sector.image.src}
            alt={sector.image.alt}
            fill
            sizes={isLarge ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </ViewTransition>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

      <span
        aria-hidden
        className="absolute right-[var(--space-sm)] top-[var(--space-sm)] inline-flex size-11 items-center justify-center rounded-md bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white"
      >
        <ArrowUpRight className="size-5" />
      </span>

      <div className="mt-auto flex flex-col gap-[var(--space-2xs)] p-[var(--space-md)]">
        <span data-sector={sector.slug} className="inline-flex w-fit items-center gap-2 rounded-md bg-white/15 px-2 py-1 text-[length:var(--text-xs)] font-medium backdrop-blur">
          <span className={cn('size-2 rounded-full', SECTOR_DOT_CLASSES[sector.slug])} />
          {`${sector.companies.length} ${sector.companies.length === 1 ? companyLabel : companiesLabel}`}
        </span>
        <h3 className={cn('font-bold', isLarge ? 'text-[length:var(--text-4xl)]' : 'text-[length:var(--text-2xl)]')}>{sector.name}</h3>
        <p className="max-w-[40ch] text-[length:var(--text-sm)] text-white/80">{sector.tagline}</p>
        <span className="sr-only">{moreLabel}</span>
      </div>
    </Link>
  );
}
