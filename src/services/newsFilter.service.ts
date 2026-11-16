import type { NewsItemI } from '@/interfaces/content.interface';

export interface NewsFilterI {
  category?: string;
  year?: number;
  query?: string;
}

export interface NewsYearGroupI {
  year: number;
  items: NewsItemI[];
}

const yearOf = (item: NewsItemI) => Number(item.date.slice(0, 4));

/** Stories matching every filter given. The search looks in titles and summaries, ignoring case. */
export function filterNews(items: NewsItemI[], { category, year, query }: NewsFilterI): NewsItemI[] {
  const needle = query?.trim().toLowerCase() ?? '';
  return items.filter(
    (item) =>
      (!category || item.category === category) &&
      (year === undefined || yearOf(item) === year) &&
      (!needle || `${item.title} ${item.excerpt}`.toLowerCase().includes(needle)),
  );
}

/** Stories grouped by year, newest year first; order within a year is kept. */
export function groupNewsByYear(items: NewsItemI[]): NewsYearGroupI[] {
  const groups = new Map<number, NewsItemI[]>();
  for (const item of items) {
    const year = yearOf(item);
    groups.set(year, [...(groups.get(year) ?? []), item]);
  }
  return [...groups.entries()].sort(([a], [b]) => b - a).map(([year, grouped]) => ({ year, items: grouped }));
}

/** The years that have stories, oldest first, with how many each has. */
export function newsYears(items: NewsItemI[]): { year: number; count: number }[] {
  return groupNewsByYear(items)
    .map(({ year, items: grouped }) => ({ year, count: grouped.length }))
    .sort((a, b) => a.year - b.year);
}
