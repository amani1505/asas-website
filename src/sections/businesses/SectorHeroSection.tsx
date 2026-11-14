import { SkeletonImage } from '@/components/skeletons/SkeletonImage';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { SectorI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface SectorHeroSectionProps {
  sector: SectorI;
  locale: Locale;
  dict: DictionaryI;
}

export function SectorHeroSection({ sector, locale, dict }: SectorHeroSectionProps) {
  return (
    <section className="pt-[var(--space-md)]">
      <Container className="flex flex-col gap-[var(--space-md)]">
        <Link
          href={`/${locale}/businesses`}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-[length:var(--text-sm)] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {dict.nav.businesses}
        </Link>
        <div className="grid items-end gap-[var(--space-md)] lg:grid-cols-[1fr_1.2fr]">
          <div className="animate-rise flex flex-col gap-[var(--space-sm)]">
            <Eyebrow>{dict.businesses.eyebrow}</Eyebrow>
            <h1 className="text-[length:var(--text-5xl)] font-extrabold">{sector.name}</h1>
            <p className="font-heading text-[length:var(--text-xl)] font-semibold">{sector.tagline}</p>
            <p className="max-w-[52ch] text-[length:var(--text-lg)] text-muted-foreground">{sector.summary}</p>
          </div>
          <ViewTransition name={`sector-${sector.slug}`} share="morph" default="none">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
              <SkeletonImage src={sector.image.src} alt={sector.image.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </ViewTransition>
        </div>
      </Container>
    </section>
  );
}
