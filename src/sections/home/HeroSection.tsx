import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI } from '@/interfaces/content.interface';
import type { SiteStatsI } from '@/services/content.service';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HighlightedText } from '@/components/ui/SectionHeading';
import { localeHref } from '@/utils/format.util';
import { HeroVisual, type HeroStatI } from './HeroVisual';

interface HeroSectionProps {
  hero: HomeContentI['hero'];
  locale: Locale;
  stats?: SiteStatsI;
  labels?: DictionaryI['stats'];
}

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

function toHeroStats(stats?: SiteStatsI, labels?: DictionaryI['stats']): HeroStatI[] {
  if (!stats || !labels) return [];
  return [
    { value: stats.years, suffix: '+', label: labels.years },
    { value: stats.companies, label: labels.companies },
    { value: stats.sectors, label: labels.sectors },
  ];
}

/** Light hero: headline on the left, the driver photo in brand blobs on the right. */
export function HeroSection({ hero, locale, stats, labels }: HeroSectionProps) {
  const [photo] = hero.images;

  return (
    <section className="relative overflow-hidden">
      <div
        data-hero-decor
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_0%_0%,color-mix(in_oklab,var(--primary)_9%,transparent),transparent_70%),radial-gradient(45%_60%_at_100%_45%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]"
      />

      <Container className="relative grid items-center gap-[var(--space-xl)] py-[var(--space-xl)] lg:grid-cols-[1.05fr_1fr] lg:py-[var(--space-2xl)]">
        <div className="flex flex-col items-start gap-[var(--space-sm)]">
          <p className="animate-rise text-[length:var(--text-lg)] font-medium text-muted-foreground" style={delay(0)}>
            {hero.eyebrow}
          </p>
          <h1 className="animate-rise text-[length:var(--text-5xl)] font-extrabold leading-[1.02]" style={delay(80)}>
            <HighlightedText text={hero.title} highlight={hero.highlight} />
          </h1>
          <p className="animate-rise max-w-[48ch] text-[length:var(--text-lg)] text-muted-foreground" style={delay(160)}>
            {hero.subtitle}
          </p>
          <div className="animate-rise mt-[var(--space-xs)] flex flex-wrap gap-[var(--space-xs)]" style={delay(240)}>
            <Button href={localeHref(locale, hero.primaryCta.href)} size="lg">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
            </Button>
            <Button href={localeHref(locale, hero.secondaryCta.href)} size="lg" variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {photo && <HeroVisual image={photo} stats={toHeroStats(stats, labels)} />}
      </Container>
    </section>
  );
}
