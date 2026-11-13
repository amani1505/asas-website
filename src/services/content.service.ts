import { CONTENT } from '@/content';
import { FOUNDING_YEAR } from '@/constants/site.constants';
import type { Locale } from '@/i18n/locales';
import type { ContentBundleI, NewsItemI, ProductI, SectorI } from '@/interfaces/content.interface';
import { yearsSince } from '@/utils/years.util';

export interface SiteStatsI {
  years: number;
  companies: number;
  sectors: number;
  offices: number;
}

export function getContent(locale: Locale): ContentBundleI {
  return CONTENT[locale];
}

export function getSectors(locale: Locale): SectorI[] {
  return CONTENT[locale].sectors;
}

export function getSector(locale: Locale, slug: string): SectorI | undefined {
  return CONTENT[locale].sectors.find((sector) => sector.slug === slug);
}

export function getProducts(locale: Locale): ProductI[] {
  return CONTENT[locale].products;
}

/** Newest first; same-day items are ordered by title. */
export function getNews(locale: Locale): NewsItemI[] {
  return [...CONTENT[locale].news].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getNewsItem(locale: Locale, slug: string): NewsItemI | undefined {
  return CONTENT[locale].news.find((item) => item.slug === slug);
}

export function getAdjacentNews(locale: Locale, slug: string): { newer?: NewsItemI; older?: NewsItemI } {
  const news = getNews(locale);
  const index = news.findIndex((item) => item.slug === slug);
  if (index < 0) return { newer: undefined, older: undefined };
  return { newer: news[index - 1], older: news[index + 1] };
}

export function getNewsCategories(locale: Locale): string[] {
  return [...new Set(getNews(locale).map((item) => item.category))];
}

export function getStats(locale: Locale, now: Date): SiteStatsI {
  const { sectors, offices } = CONTENT[locale];
  return {
    years: yearsSince(FOUNDING_YEAR, now),
    companies: sectors.reduce((total, sector) => total + sector.companies.length, 0),
    sectors: sectors.length,
    offices: offices.length,
  };
}
