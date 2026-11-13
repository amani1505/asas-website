import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/locales';
import type { HomeContentI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { HighlightedText } from '@/components/ui/SectionHeading';
import { localeHref } from '@/utils/format.util';

interface HeroSectionProps {
  hero: HomeContentI['hero'];
  locale: Locale;
  /** Shown along the bottom of the hero, e.g. the group stats. */
  footer?: ReactNode;
}

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

/** Each photo sits like a print in a white frame, slightly turned. */
const PRINT = 'rounded-md bg-primary-foreground p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.55)]';

/**
 * The home hero is painted in ASAS red with the white chevrons from the
 * tanker livery running along its foot.
 */
export function HeroSection({ hero, locale, footer }: HeroSectionProps) {
  const [tall, topRight, bottomRight] = hero.images;

  return (
    <section className="relative overflow-hidden bg-brand-red text-primary-foreground">
      <Container className="relative flex flex-col gap-[var(--space-xl)] pt-[var(--space-xl)] pb-[calc(var(--space-xl)+var(--chevron-height))] lg:pt-[var(--space-2xl)]">
        <div className="grid items-center gap-[var(--space-xl)] lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col items-start gap-[var(--space-md)]">
            <h1 className="animate-rise text-[length:var(--text-5xl)] font-extrabold leading-[0.98]" style={delay(0)}>
              <HighlightedText
                text={hero.title}
                highlight={hero.highlight}
                className="mt-[0.08em] inline-block rounded-md bg-primary-foreground px-[0.18em] pb-[0.06em] text-brand-red"
              />
            </h1>
            <p className="animate-rise max-w-[46ch] text-[length:var(--text-lg)] text-primary-foreground/85" style={delay(120)}>
              {hero.subtitle}
            </p>
            <div className="animate-rise flex flex-wrap gap-[var(--space-xs)]" style={delay(220)}>
              <Button href={localeHref(locale, hero.primaryCta.href)} size="lg" variant="inverse">
                {hero.primaryCta.label}
                <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button href={localeHref(locale, hero.secondaryCta.href)} size="lg" variant="inverseOutline">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-[var(--space-sm)] px-[var(--space-2xs)]">
            {tall && (
              <div className={`animate-rise row-span-2 -rotate-2 ${PRINT}`} style={delay(160)}>
                <ImageFrame image={tall} ratio="3 / 4" sizes="(min-width: 1024px) 24vw, 50vw" priority />
              </div>
            )}
            {topRight && (
              <div className={`animate-rise rotate-[1.5deg] ${PRINT}`} style={delay(260)}>
                <ImageFrame image={topRight} ratio="4 / 3" sizes="(min-width: 1024px) 24vw, 50vw" priority />
              </div>
            )}
            {bottomRight && (
              <div className={`animate-rise -rotate-1 ${PRINT}`} style={delay(360)}>
                <ImageFrame image={bottomRight} ratio="4 / 3" sizes="(min-width: 1024px) 24vw, 50vw" />
              </div>
            )}
          </div>
        </div>

        {footer && (
          <div className="animate-rise border-t border-primary-foreground/25 pt-[var(--space-lg)]" style={delay(420)}>
            {footer}
          </div>
        )}
      </Container>

      <div data-chevrons aria-hidden="true" className="chevron-band absolute inset-x-0" />
    </section>
  );
}
