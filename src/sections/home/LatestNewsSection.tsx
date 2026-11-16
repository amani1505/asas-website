import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeaturedNewsCard } from '@/components/domain/FeaturedNewsCard';
import { NewsRouteStop } from '@/components/domain/NewsRouteStop';
import { Reveal } from '@/components/motion/Reveal';

interface LatestNewsSectionProps {
  /** Newest first: the first is featured, the next four sit on the route. */
  items: NewsItemI[];
  locale: Locale;
  dict: DictionaryI;
}

const ROUTE_STOPS = 4;

export function LatestNewsSection({ items, locale, dict }: LatestNewsSectionProps) {
  const [featured, ...rest] = items;
  const stops = rest.slice(0, ROUTE_STOPS);

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

        <div className="grid gap-[var(--space-xl)] lg:grid-cols-[1.25fr_1fr]">
          {featured && (
            <Reveal>
              <FeaturedNewsCard item={featured} locale={locale} readLabel={dict.home.readArticle} />
            </Reveal>
          )}
          {/* The route: a hairline with a dashed red lead-in, one stop per story. */}
          <Reveal className="relative flex flex-col">
            <span aria-hidden className="absolute bottom-[1.4rem] top-[1.6rem] left-0 w-px bg-border" />
            <span aria-hidden className="absolute left-0 top-[1.6rem] h-16 w-px -translate-x-px border-l-2 border-dashed border-primary" />
            <ol className="flex flex-1 flex-col justify-between gap-[var(--space-2xs)]">
              {stops.map((item) => (
                <NewsRouteStop key={item.slug} item={item} locale={locale} />
              ))}
            </ol>
            {/* End of the route: livery chevrons pointing on into the newsroom. */}
            <Link
              href={`/${locale}/news`}
              className="group/end relative mt-[var(--space-sm)] flex min-h-11 items-center gap-[var(--space-sm)] pl-[var(--space-lg)] text-[length:var(--text-sm)] font-semibold text-primary"
            >
              <span aria-hidden className="absolute left-0 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col -space-y-1 text-primary">
                <ChevronDown className="size-4" />
                <ChevronDown className="size-4 opacity-60" />
              </span>
              {dict.news.title}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover/end:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
