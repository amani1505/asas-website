import type { CSSProperties } from 'react';
import {
  Award,
  Baby,
  Check,
  Coins,
  Flag,
  HandHeart,
  HeartPulse,
  School,
  ShieldAlert,
  Stethoscope,
  Trophy,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import type { ImageI } from '@/interfaces/content.interface';
import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import { cn } from '@/utils/cn.util';

const stagger = (index: number) => ({ '--rise-delay': `${120 + index * 70}ms` }) as CSSProperties;

/** Values as three upright pillars. */
export function PillarsView({ points }: { points: string[] }) {
  const icons: LucideIcon[] = [Award, HandHeart, Flag];
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-[var(--space-sm)]">
      {points.map((point, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li
            key={point}
            className="animate-rise relative flex min-h-48 flex-col justify-end gap-[var(--space-xs)] overflow-hidden rounded-md border border-border bg-card p-[var(--space-sm)]"
            style={stagger(index)}
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-primary" style={{ opacity: 1 - index * 0.25 }} />
            <span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="font-heading text-[length:var(--text-xl)] font-bold">{point}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** A photo with the safety commitments ticked off one by one. */
export function ChecklistView({ points, image }: { points: string[]; image?: ImageI }) {
  return (
    <div className="flex flex-col gap-[var(--space-sm)]">
      {image && (
        <div className="relative aspect-[16/7] overflow-hidden rounded-md bg-muted">
          <SkeletonImage src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <ul className="flex flex-col gap-[var(--space-2xs)]">
        {points.map((point, index) => (
          <li key={point} className="animate-rise flex items-center gap-[var(--space-xs)] rounded-md border border-border bg-card p-[var(--space-xs)]" style={stagger(index)}>
            <span aria-hidden className="check-pop grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" style={stagger(index + 2)}>
              <Check className="size-4" />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Each standard as a round seal: the code large, what it covers beneath. */
export function BadgesView({ points }: { points: string[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,9.5rem),1fr))] gap-[var(--space-sm)]">
      {points.map((point, index) => {
        const [code, ...rest] = point.split(':');
        return (
          <li key={point} data-testid="seal" className="animate-rise group flex flex-col items-center gap-[var(--space-xs)] text-center" style={stagger(index)}>
            <span className="relative grid aspect-square w-full max-w-[9rem] place-items-center">
              <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full transition-transform duration-1000 ease-out group-hover:rotate-90">
                <circle cx="50" cy="50" r="47" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="40" fill="var(--card)" stroke="var(--border)" strokeWidth="1" />
              </svg>
              {/* "ISO 9001: quality management" puts the code in the seal; an award without a code gets an icon. */}
              {rest.length > 0 ? (
                <span className="relative px-3 font-heading text-[length:var(--text-lg)] font-bold leading-tight">{code.trim()}</span>
              ) : (
                <Award aria-hidden className="relative size-9 text-primary" />
              )}
            </span>
            <span className="text-[length:var(--text-sm)] text-muted-foreground">{rest.length > 0 ? rest.join(':').trim() : point}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** The community programmes beside a photo, each with its own icon. */
export function ImpactView({ points, image }: { points: string[]; image?: ImageI }) {
  const icons: LucideIcon[] = [HeartPulse, Baby, Stethoscope, School, ShieldAlert, Trophy, Coins];
  return (
    <div className="grid gap-[var(--space-sm)] xl:grid-cols-[0.9fr_1fr]">
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted xl:aspect-auto xl:min-h-full">
          <SkeletonImage src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 25vw, 100vw" className="object-cover" />
        </div>
      )}
      <ul className="flex flex-col gap-[var(--space-2xs)]">
        {points.map((point, index) => {
          const Icon = icons[index % icons.length];
          return (
            <li key={point} className="animate-rise flex items-start gap-[var(--space-xs)] rounded-md p-[var(--space-2xs)] transition-colors hover:bg-muted" style={stagger(index)}>
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <span className="pt-1.5 text-[length:var(--text-sm)]">{point}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** A balance scale that settles level: equal weight on both sides. */
export function BalanceView() {
  return (
    <div aria-hidden className="grid place-items-center rounded-md border border-border bg-card p-[var(--space-lg)]">
      <svg viewBox="0 0 240 170" className="w-[min(100%,22rem)] text-foreground">
        <rect x="114" y="40" width="12" height="110" rx="3" className="fill-current opacity-80" />
        <rect x="80" y="148" width="80" height="10" rx="5" className="fill-current opacity-80" />
        <g className="balance-beam" style={{ transformOrigin: '120px 40px' }}>
          <rect x="30" y="36" width="180" height="8" rx="4" fill="var(--primary)" />
          {[50, 190].map((x) => (
            <g key={x}>
              <line x1={x} y1="44" x2={x - 22} y2="96" stroke="currentColor" strokeOpacity="0.5" />
              <line x1={x} y1="44" x2={x + 22} y2="96" stroke="currentColor" strokeOpacity="0.5" />
              <path d={`M${x - 30} 96 h60 a30 14 0 0 1 -60 0 z`} fill="var(--muted)" stroke="var(--border)" />
            </g>
          ))}
        </g>
        <circle cx="120" cy="40" r="9" fill="var(--primary)" />
      </svg>
      <div className="mt-[var(--space-sm)] flex gap-[var(--space-lg)] text-primary">
        {[0, 1].map((side) => (
          <span key={side} className={cn('grid size-12 place-items-center rounded-full bg-primary/10')}>
            <UserRound className="size-6" />
          </span>
        ))}
      </div>
    </div>
  );
}
