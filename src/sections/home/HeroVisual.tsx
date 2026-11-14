import type { CSSProperties } from 'react';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { Building2, History, LayoutGrid, type LucideIcon } from 'lucide-react';
import type { ImageI } from '@/interfaces/content.interface';
import { CountUp } from '@/components/motion/CountUp';
import { cn } from '@/utils/cn.util';

export interface HeroStatI {
  value: number;
  suffix?: string;
  label: string;
}

interface HeroVisualProps {
  image: ImageI;
  /** Up to three numbers, shown as floating cards around the photo. */
  stats: HeroStatI[];
}

/** One organic shape in a 0–1 box, reused for the backdrops and the photo mask. */
const BLOB =
  'M0.50,0.04 C0.62,0.00 0.74,0.06 0.80,0.14 C0.88,0.24 0.99,0.30 0.98,0.46 C0.97,0.60 0.88,0.66 0.86,0.78 C0.83,0.92 0.70,1.00 0.55,0.97 C0.42,0.95 0.36,0.86 0.24,0.84 C0.10,0.82 0.01,0.72 0.02,0.56 C0.03,0.42 0.12,0.36 0.14,0.24 C0.17,0.10 0.36,0.08 0.50,0.04 Z';
const CLIP_ID = 'hero-photo-blob';

const ICONS: LucideIcon[] = [History, Building2, LayoutGrid];
const CARD_POSITIONS = ['left-0 top-[16%]', 'right-0 top-[44%]', 'bottom-[1%] left-[22%]'];

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

function Blob({ className }: { className: string }) {
  return (
    <svg data-hero-decor aria-hidden="true" viewBox="0 0 1 1" preserveAspectRatio="none" className={cn('absolute', className)}>
      <path d={BLOB} fill="currentColor" />
    </svg>
  );
}

function DotGrid({ className }: { className: string }) {
  return (
    <div
      data-hero-decor
      aria-hidden="true"
      className={cn('absolute bg-[radial-gradient(var(--muted-foreground)_1.6px,transparent_2.2px)] bg-[length:18px_18px] opacity-45', className)}
    />
  );
}

/**
 * The hero picture: the driver photo masked into a red blob over a charcoal
 * one, with dot grids and the group numbers floating around it.
 */
export function HeroVisual({ image, stats }: HeroVisualProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,820px)]">
      <svg data-hero-decor aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d={BLOB} />
          </clipPath>
        </defs>
      </svg>

      <DotGrid className="right-[2%] top-[2%] size-[24%]" />
      <DotGrid className="left-[3%] top-[50%] h-[30%] w-[13%]" />
      <Blob className="inset-[22%_34%_0%_0%] -rotate-[24deg] text-brand-charcoal dark:text-[#4a4546]" />
      <Blob className="inset-[4%_2%_6%_10%] rotate-[8deg] text-brand-red" />

      <div className="animate-rise absolute inset-[9%_6%_10%_15%]" style={{ ...delay(120), clipPath: `url(#${CLIP_ID})` }}>
        <SkeletonImage src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover object-[70%_0%]" />
      </div>

      {stats.slice(0, 3).map((stat, index) => {
        const Icon = ICONS[index];
        return (
          <div
            key={stat.label}
            data-testid="hero-stat"
            className={cn(
              'animate-rise absolute flex items-center gap-[var(--space-xs)] rounded-md border border-border/70 bg-card/95 p-[var(--space-2xs)] pr-[var(--space-sm)] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.4)] backdrop-blur-sm',
              CARD_POSITIONS[index],
            )}
            style={delay(320 + index * 120)}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground sm:size-12">
              <Icon aria-hidden className="size-5 sm:size-6" />
            </span>
            <span className="flex flex-col">
              <CountUp to={stat.value} suffix={stat.suffix} className="font-heading text-[length:var(--text-xl)] font-bold leading-none" />
              <span className="text-[length:var(--text-sm)] text-muted-foreground">{stat.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
