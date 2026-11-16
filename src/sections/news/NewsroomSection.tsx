'use client';

import { useMemo, useState } from 'react';
import { m } from 'motion/react';
import { Search, SearchX } from 'lucide-react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FilterChips } from '@/components/motion/FilterChips';
import { FeaturedNewsCard } from '@/components/domain/FeaturedNewsCard';
import { NewsCard } from '@/components/domain/NewsCard';
import { YearRoute } from '@/components/domain/YearRoute';
import { filterNews, groupNewsByYear, newsYears } from '@/services/newsFilter.service';

const ALL = 'all';
const ENTER = { duration: 0.25, ease: [0.22, 1, 0.36, 1] } as const;

interface NewsroomSectionProps {
  /** Newest first. */
  items: NewsItemI[];
  categories: string[];
  locale: Locale;
  labels: DictionaryI['news'];
  readLabel: string;
}

/**
 * The newsroom: search, category chips and a route through the years; the
 * newest match leads, the rest are filed under their year.
 */
export function NewsroomSection({ items, categories, locale, labels, readLabel }: NewsroomSectionProps) {
  const [category, setCategory] = useState<string>(ALL);
  const [year, setYear] = useState<number | undefined>();
  const [query, setQuery] = useState('');

  const categoryOptions = useMemo(
    () => [
      { id: ALL, label: labels.all, count: items.length },
      ...categories.map((name) => ({ id: name, label: name, count: items.filter((item) => item.category === name).length })),
    ],
    [items, categories, labels.all],
  );
  const years = useMemo(() => newsYears(items), [items]);

  const matches = filterNews(items, { category: category === ALL ? undefined : category, year, query });
  const [lead, ...rest] = matches;
  const groups = groupNewsByYear(rest);

  const handleReset = () => {
    setCategory(ALL);
    setYear(undefined);
    setQuery('');
  };

  return (
    <section className="pb-[var(--space-2xl)]">
      <div className="sticky top-16 z-30 border-b border-border bg-background/85 py-[var(--space-xs)] backdrop-blur-xl">
        <Container className="flex flex-col gap-[var(--space-xs)]">
          <div className="flex flex-col gap-[var(--space-xs)] lg:flex-row lg:items-center">
            <label className="relative flex min-h-11 items-center lg:w-80 lg:shrink-0">
              <span className="sr-only">{labels.searchLabel}</span>
              <Search aria-hidden className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-[length:var(--text-sm)] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>
            <FilterChips label={labels.filterLabel} options={categoryOptions} active={category} onChange={setCategory} className="flex-nowrap overflow-x-auto [scrollbar-width:none]" />
          </div>
          <YearRoute years={years} active={year} onChange={setYear} label={labels.yearsLabel} allLabel={labels.allYears} />
        </Container>
      </div>

      <Container className="flex flex-col gap-[var(--space-xl)] pt-[var(--space-lg)]">
        {!lead ? (
          <div className="flex flex-col items-center gap-[var(--space-sm)] py-[var(--space-2xl)] text-center">
            <span aria-hidden className="grid size-14 place-items-center rounded-md bg-muted text-muted-foreground">
              <SearchX className="size-6" />
            </span>
            <p className="max-w-[40ch] text-muted-foreground">{labels.empty}</p>
            <Button variant="outline" onClick={handleReset}>
              {labels.reset}
            </Button>
          </div>
        ) : (
          <>
            <m.div key={lead.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={ENTER}>
              <FeaturedNewsCard item={lead} locale={locale} readLabel={readLabel} wide />
            </m.div>

            {groups.map((group) => (
              <section key={group.year} aria-labelledby={`news-year-${group.year}`} className="grid gap-[var(--space-sm)] border-t border-border pt-[var(--space-md)] lg:grid-cols-[minmax(7rem,11rem)_1fr]">
                <div className="lg:sticky lg:top-56 lg:self-start">
                  <h2
                    id={`news-year-${group.year}`}
                    className="font-heading text-[length:var(--text-5xl)] font-extrabold leading-none text-transparent tabular-nums [-webkit-text-stroke:1.5px_var(--primary)]"
                  >
                    {group.year}
                  </h2>
                </div>
                {/* No exit animation on purpose: a story leaving the grid may become the lead at once,
                    and two copies would share one view-transition name. */}
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-[var(--space-sm)]">
                  {group.items.map((item) => (
                    <m.li key={item.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={ENTER}>
                      <NewsCard item={item} locale={locale} />
                    </m.li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </Container>
    </section>
  );
}
