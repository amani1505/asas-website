import { ArrowRight } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NewsCard } from '@/components/domain/NewsCard';
import { Reveal } from '@/components/motion/Reveal';

interface LatestNewsSectionProps {
  /** Newest first; the section shows the first three. */
  items: NewsItemI[];
  locale: Locale;
  dict: DictionaryI;
}

export function LatestNewsSection({ items, locale, dict }: LatestNewsSectionProps) {
  return (
    <section className="bg-card py-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-lg)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-[var(--space-sm)]">
          <SectionHeading eyebrow={dict.home.newsEyebrow} title={dict.home.newsTitle} />
          <Button href={`/${locale}/news`} variant="outline">
            {dict.actions.viewAllNews}
            <ArrowRight aria-hidden className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </Reveal>
        <Reveal stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[var(--space-sm)]">
          {items.slice(0, 3).map((item) => (
            <NewsCard key={item.slug} item={item} locale={locale} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
