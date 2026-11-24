'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { SECTOR_ICONS } from '@/constants/sector.constants';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { useSyncedCarousels } from '@/hooks/useSyncedCarousels';
import { cn } from '@/utils/cn.util';

interface HeroShowcaseProps {
  /** The headline column, rendered on the server. */
  children: ReactNode;
  sectors: SectorI[];
  locale: Locale;
  labels: DictionaryI['home'];
}

/** Organic mask for the main photo, in a 0–1 box. */
const BLOB =
  'M0.50,0.04 C0.62,0.00 0.74,0.06 0.80,0.14 C0.88,0.24 0.99,0.30 0.98,0.46 C0.97,0.60 0.88,0.66 0.86,0.78 C0.83,0.92 0.70,1.00 0.55,0.97 C0.42,0.95 0.36,0.86 0.24,0.84 C0.10,0.82 0.01,0.72 0.02,0.56 C0.03,0.42 0.12,0.36 0.14,0.24 C0.17,0.10 0.36,0.08 0.50,0.04 Z';
const CLIP_ID = 'hero-slide-blob';
/** The angled thumbnail frame, in pixels (each thumbnail is 161 × 92). */
const FRAME =
  'M0.68 80.61L0.5 39.69C0.48 34.94 3.81 30.83 8.46 29.86L148.43 0.71C154.64 -0.58 160.47 4.16 160.47 10.5V80.74C160.47 86.27 155.98 90.75 150.45 90.74L10.67 90.57C5.17 90.56 0.71 86.11 0.68 80.61Z';

function Blob({ className }: { className: string }) {
  return (
    <svg data-hero-decor aria-hidden="true" viewBox="0 0 1 1" preserveAspectRatio="none" className={cn('absolute', className)}>
      <path d={BLOB} fill="currentColor" />
    </svg>
  );
}

/**
 * The home hero's slideshow: one slide per sector in three synced carousels
 * (the big photo, a strip of thumbnails, and a caption), auto-playing with a
 * pause button. Adapted from shadcn-studio's hero section 41, without its navbar.
 */
export function HeroShowcase({ children, sectors, locale, labels }: HeroShowcaseProps) {
  const { mainRef, thumbsRef, captionsRef, current, goTo, isPlaying, togglePlaying, canPlay } = useSyncedCarousels();

  return (
    <section className="relative overflow-hidden">
      <div
        data-hero-decor
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_0%_0%,color-mix(in_oklab,var(--primary)_9%,transparent),transparent_70%),radial-gradient(45%_60%_at_100%_45%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]"
      />
      <svg data-hero-decor aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d={BLOB} />
          </clipPath>
        </defs>
      </svg>

      <Container className="relative flex flex-col gap-[var(--space-xl)] py-[var(--space-xl)] lg:py-[var(--space-2xl)]">
        <div className="grid items-center gap-[var(--space-xl)] lg:grid-cols-5">
          <div className="lg:col-span-3">{children}</div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={labels.heroSlidesLabel}
            className="relative mx-auto aspect-square w-full max-w-[min(100%,36rem)] lg:col-span-2"
          >
            <div
              data-hero-decor
              aria-hidden="true"
              className="absolute right-[2%] top-[2%] size-[24%] bg-[radial-gradient(var(--muted-foreground)_1.6px,transparent_2.2px)] bg-[length:18px_18px] opacity-45"
            />
            <Blob className="inset-[22%_34%_0%_0%] -rotate-[24deg] text-brand-charcoal dark:text-[#4a4546]" />
            <Blob className="inset-[4%_2%_6%_10%] rotate-[8deg] text-brand-red" />
            <div className="absolute inset-[9%_6%_10%_15%]" style={{ clipPath: `url(#${CLIP_ID})` }}>
              <div ref={mainRef} className="size-full overflow-hidden">
                <div className="flex h-full">
                  {sectors.map((sector, index) => (
                    <div
                      key={sector.slug}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} / ${sectors.length}`}
                      className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                    >
                      <SkeletonImage
                        src={sector.image.src}
                        alt={sector.image.alt}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 34vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-[var(--space-lg)] lg:grid-cols-5">
          {/* Thumbnails: fade at both edges, the current one outlined in red. */}
          {/* min-w-0: a grid item won't shrink below its content otherwise, and the strip would overflow. */}
          <div className="relative min-w-0 max-lg:order-2 lg:col-span-3">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent sm:w-16" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent sm:w-16" />
            <div ref={thumbsRef} className="overflow-hidden">
              <div className="-ml-4 flex py-1">
                {sectors.map((sector, index) => {
                  const isCurrent = index === current;
                  return (
                    <div key={sector.slug} className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/4">
                      <button
                        type="button"
                        aria-label={`${labels.showSlide} ${sector.name}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        onClick={() => goTo(index)}
                        className="group relative mx-auto block h-[92px] w-[161px] max-w-full transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <span className="absolute inset-0 overflow-hidden" style={{ clipPath: `path('${FRAME}')` }}>
                          <SkeletonImage
                            src={sector.image.src}
                            alt=""
                            fill
                            sizes="161px"
                            className={cn('object-cover transition-[filter] duration-300', !isCurrent && 'grayscale-[60%] group-hover:grayscale-0')}
                          />
                        </span>
                        <svg aria-hidden viewBox="0 0 161 92" className="absolute inset-0 size-full overflow-visible" fill="none">
                          <path
                            d={FRAME}
                            stroke="currentColor"
                            strokeWidth={isCurrent ? 3 : 1}
                            className={cn('transition-colors duration-300', isCurrent ? 'text-primary' : 'text-border')}
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Caption for the current slide, and the pause control. */}
          <div className="flex min-w-0 items-center gap-[var(--space-sm)] lg:col-span-2">
            <div ref={captionsRef} className="min-w-0 flex-1 overflow-hidden" aria-live={isPlaying ? 'off' : 'polite'}>
              <div className="flex">
                {sectors.map((sector, index) => {
                  const Icon = SECTOR_ICONS[sector.slug];
                  const isCurrent = index === current;
                  return (
                    <div
                      key={sector.slug}
                      data-caption
                      data-active={isCurrent}
                      aria-hidden={!isCurrent}
                      className="flex min-h-14 min-w-0 shrink-0 grow-0 basis-full items-center gap-[var(--space-sm)]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span aria-hidden className="hidden h-6 w-0.5 shrink-0 rounded-md bg-primary sm:block" />
                      <p className="flex min-w-0 flex-col">
                        <Link href={`/${locale}/businesses/${sector.slug}`} tabIndex={isCurrent ? 0 : -1} className="w-fit font-heading font-bold hover:text-primary">
                          {sector.name}
                        </Link>
                        <span className="text-[length:var(--text-sm)] text-muted-foreground">{sector.tagline}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {canPlay && (
              <button
                type="button"
                onClick={togglePlaying}
                aria-label={isPlaying ? labels.pauseSlides : labels.playSlides}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {isPlaying ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
