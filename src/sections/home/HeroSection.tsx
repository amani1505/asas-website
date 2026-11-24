import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI, SectorI } from '@/interfaces/content.interface';
import type { SiteStatsI } from '@/services/content.service';
import { Button } from '@/components/ui/Button';
import { HighlightedText } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/motion/CountUp';
import { localeHref } from '@/utils/format.util';
import { HeroShowcase } from './HeroShowcase';

interface HeroSectionProps {
  hero: HomeContentI['hero'];
  locale: Locale;
  sectors: SectorI[];
  stats: SiteStatsI;
  dict: DictionaryI;
}

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

/** The landing hero: headline, calls to action and group numbers beside a slideshow of the sectors. */
export function HeroSection({ hero, locale, sectors, stats, dict }: HeroSectionProps) {
  const numbers = [
    { value: stats.years, suffix: '+', label: dict.stats.years },
    { value: stats.companies, label: dict.stats.companies },
    { value: stats.sectors, label: dict.stats.sectors },
  ];

  return (
    <HeroShowcase sectors={sectors} locale={locale} labels={dict.home}>
      <div className="flex flex-col items-start gap-[var(--space-sm)]">
        <p className="animate-rise text-[length:var(--text-lg)] font-medium text-muted-foreground" style={delay(0)}>
          {hero.eyebrow}
        </p>
        <h1 className="animate-rise text-[length:clamp(2.986rem,1.6rem+3.4vw,6.5rem)] font-extrabold leading-[1.02]" style={delay(80)}>
          <HighlightedText text={hero.title} highlight={hero.highlight} />
        </h1>
        <p className="animate-rise max-w-[48ch] text-[length:var(--text-lg)] text-muted-foreground" style={delay(160)}>
          {hero.subtitle}
        </p>
        <div className="animate-rise mt-[var(--space-xs)] flex flex-wrap gap-[var(--space-xs)]" style={delay(240)}>
          <Button href={localeHref(locale, hero.primaryCta.href)} size="lg" className="btn-shine rounded-full">
            {hero.primaryCta.label}
            <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
          <Button href={localeHref(locale, hero.secondaryCta.href)} size="lg" variant="ghost" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 dark:bg-white/10 dark:text-foreground dark:hover:bg-white/15">
            {hero.secondaryCta.label}
          </Button>
        </div>
        <dl className="animate-rise mt-[var(--space-sm)] flex flex-wrap gap-x-[var(--space-lg)] gap-y-[var(--space-xs)]" style={delay(320)}>
          {numbers.map((item) => (
            <div key={item.label} data-testid="hero-stat" className="flex flex-col border-l-2 border-primary pl-[var(--space-xs)]">
              <dt className="order-2 text-[length:var(--text-sm)] text-muted-foreground">{item.label}</dt>
              <dd className="order-1">
                <CountUp to={item.value} suffix={item.suffix} className="font-heading text-[length:var(--text-3xl)] font-bold leading-none" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </HeroShowcase>
  );
}
