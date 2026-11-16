'use client';

import Link from 'next/link';
import { useRef, useState, ViewTransition, type MouseEvent, type PointerEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { SECTOR_DOT_CLASSES, SECTOR_ICONS } from '@/constants/sector.constants';
import type { Locale } from '@/i18n/locales';
import type { SectorI, SectorSlug } from '@/interfaces/content.interface';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { cn } from '@/utils/cn.util';

interface SectorPanelsProps {
  sectors: SectorI[];
  locale: Locale;
  labels: { companies: string; company: string; explore: string };
}

/**
 * The sectors as photo strips side by side (stacked on phones). The open strip
 * widens to show its details; hover, keyboard focus or a first tap opens one.
 * A mouse click or a tap on the open strip goes to the sector page.
 */
export function SectorPanels({ sectors, locale, labels }: SectorPanelsProps) {
  const [activeSlug, setActiveSlug] = useState(sectors[0]?.slug);
  const lastPointer = useRef<string>('mouse');

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, slug: SectorSlug) => {
    if (lastPointer.current === 'touch' && slug !== activeSlug) {
      event.preventDefault();
      setActiveSlug(slug);
    }
  };

  return (
    <div className="flex flex-col gap-[var(--space-xs)] md:h-[clamp(26rem,38vw,40rem)] md:flex-row">
      {sectors.map((sector) => {
        const isActive = sector.slug === activeSlug;
        const Icon = SECTOR_ICONS[sector.slug];
        const count = sector.companies.length;
        return (
          <Link
            key={sector.slug}
            href={`/${locale}/businesses/${sector.slug}`}
            data-active={isActive}
            onMouseEnter={() => setActiveSlug(sector.slug)}
            onFocus={() => setActiveSlug(sector.slug)}
            onPointerDown={(event: PointerEvent<HTMLAnchorElement>) => {
              lastPointer.current = event.pointerType || 'mouse';
            }}
            onTouchStart={() => {
              lastPointer.current = 'touch';
            }}
            onClick={(event) => handleClick(event, sector.slug)}
            className={cn(
              'group relative isolate flex min-w-0 overflow-hidden rounded-md bg-brand-charcoal text-white',
              'transition-[flex-grow,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-auto md:basis-0',
              isActive ? 'h-[24rem] md:grow-[4]' : 'h-20 md:grow',
            )}
          >
            <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
              <div className="absolute inset-0 -z-10">
                {/* Background only: the link is named by the sector, so the photo stays silent. */}
                <SkeletonImage
                  src={sector.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={cn('object-cover transition-transform duration-700 ease-out', isActive ? 'scale-100' : 'scale-110')}
                />
              </div>
            </ViewTransition>
            <div
              aria-hidden
              className={cn(
                '-z-10 absolute inset-0 transition-colors duration-500',
                isActive ? 'bg-gradient-to-t from-black/85 via-black/30 to-black/0' : 'bg-black/60',
              )}
            />

            {/* Closed strip: icon and the name, upright on phones, vertical on wider screens. */}
            <div
              aria-hidden
              className={cn(
                'absolute inset-0 flex items-center gap-[var(--space-xs)] px-[var(--space-sm)] transition-opacity duration-300 md:flex-col md:justify-between md:py-[var(--space-md)]',
                isActive ? 'pointer-events-none opacity-0' : 'opacity-100 delay-150',
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white/15 backdrop-blur-sm">
                <Icon className="size-5" />
              </span>
              <span className="font-heading text-[length:var(--text-xl)] font-bold md:rotate-180 md:[writing-mode:vertical-rl]">{sector.name}</span>
            </div>

            {/* Open strip: details. */}
            <div
              className={cn(
                'mt-auto flex w-full min-w-[min(100%,22rem)] flex-col items-start gap-[var(--space-xs)] p-[var(--space-md)] transition-[opacity,transform] duration-500',
                isActive ? 'translate-y-0 opacity-100 delay-200' : 'pointer-events-none translate-y-4 opacity-0',
              )}
            >
              <h3 className="text-[length:var(--text-4xl)] font-bold">{sector.name}</h3>
              <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-2 py-1 text-[length:var(--text-xs)] font-medium backdrop-blur">
                <span className={cn('size-2 rounded-full', SECTOR_DOT_CLASSES[sector.slug])} />
                {`${count} ${count === 1 ? labels.company : labels.companies}`}
              </span>
              <p className="max-w-[44ch] text-[length:var(--text-base)] text-white/85">{sector.tagline}</p>
              <span className="mt-[var(--space-2xs)] inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-[var(--space-sm)] text-[length:var(--text-sm)] font-medium text-black transition-colors group-hover:bg-primary group-hover:text-white">
                {labels.explore}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            <span
              aria-hidden
              className={cn(
                'absolute bottom-0 left-0 h-1 transition-[width] duration-700',
                SECTOR_DOT_CLASSES[sector.slug],
                isActive ? 'w-full' : 'w-0',
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}
