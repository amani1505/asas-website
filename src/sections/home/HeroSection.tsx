import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { HighlightedText } from '@/components/ui/SectionHeading';
import { localeHref } from '@/utils/format.util';

interface HeroSectionProps {
  hero: HomeContentI['hero'];
  locale: Locale;
  /** Small sticker on the photo collage, e.g. "90 years". */
  badge?: { value: string; label: string };
}

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

export function HeroSection({ hero, locale, badge }: HeroSectionProps) {
  const [tall, topRight, bottomRight] = hero.images;

  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-[var(--space-xl)] py-[var(--space-xl)] lg:grid-cols-[1.15fr_1fr] lg:py-[var(--space-2xl)]">
        <div className="flex flex-col items-start gap-[var(--space-sm)]">
          <div className="animate-rise" style={delay(0)}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="animate-rise text-[length:var(--text-5xl)] font-extrabold" style={delay(80)}>
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

        <div className="relative grid grid-cols-2 gap-[var(--space-xs)]">
          {tall && (
            <div className="animate-rise row-span-2" style={delay(200)}>
              <ImageFrame image={tall} ratio="3 / 4.2" sizes="(min-width: 1024px) 22vw, 50vw" priority className="h-full" />
            </div>
          )}
          {topRight && (
            <div className="animate-rise" style={delay(300)}>
              <ImageFrame image={topRight} ratio="4 / 3" sizes="(min-width: 1024px) 22vw, 50vw" priority />
            </div>
          )}
          {bottomRight && (
            <div className="animate-rise" style={delay(400)}>
              <ImageFrame image={bottomRight} ratio="4 / 3" sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
          )}
          {badge && (
            <div
              className="animate-rise absolute -bottom-[var(--space-sm)] left-[var(--space-sm)] flex items-baseline gap-2 rounded-md border border-border bg-card px-[var(--space-sm)] py-[var(--space-xs)] shadow-sm"
              style={delay(520)}
            >
              <span className="font-heading text-[length:var(--text-2xl)] font-bold text-primary">{badge.value}</span>
              <span className="text-[length:var(--text-sm)] text-muted-foreground">{badge.label}</span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
