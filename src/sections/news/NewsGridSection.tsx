'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { DictionaryI } from '@/i18n/dictionary.interface';
import type { Locale } from '@/i18n/locales';
import type { NewsItemI } from '@/interfaces/content.interface';
import { Container } from '@/components/ui/Container';
import { FilterChips } from '@/components/motion/FilterChips';
import { NewsCard } from '@/components/domain/NewsCard';

const ALL = 'all';

interface NewsGridSectionProps {
  /** Newest first. */
  items: NewsItemI[];
  categories: string[];
  locale: Locale;
  labels: DictionaryI['news'];
}

export function NewsGridSection({ items, categories, locale, labels }: NewsGridSectionProps) {
  const [filter, setFilter] = useState<string>(ALL);

  const options = useMemo(
    () => [
      { id: ALL, label: labels.all, count: items.length },
      ...categories.map((category) => ({ id: category, label: category, count: items.filter((item) => item.category === category).length })),
    ],
    [items, categories, labels.all],
  );

  const visible = filter === ALL ? items : items.filter((item) => item.category === filter);

  return (
    <section className="pb-[var(--space-2xl)]">
      <Container className="flex flex-col gap-[var(--space-md)]">
        <FilterChips label={labels.filterLabel} options={options} active={filter} onChange={setFilter} />
        {visible.length === 0 ? (
          <p className="py-[var(--space-xl)] text-center text-muted-foreground">{labels.empty}</p>
        ) : (
          <motion.ul layout className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-[var(--space-sm)]">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item) => (
                <motion.li
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NewsCard item={item} locale={locale} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </Container>
    </section>
  );
}
