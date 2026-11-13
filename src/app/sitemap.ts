import type { MetadataRoute } from 'next';
import { CONTENT } from '@/content';
import { SITE_URL } from '@/constants/site.constants';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales';
import { localeAlternates } from '@/utils/metadata.util';

const STATIC_PATHS = ['', '/about', '/businesses', '/sustainability', '/careers', '/news', '/contact'];

function absolute(relative: string): string {
  return new URL(relative, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const content = CONTENT[DEFAULT_LOCALE];
  const entries: { path: string; lastModified?: string; priority: number }[] = [
    ...STATIC_PATHS.map((path) => ({ path, priority: path === '' ? 1 : 0.8 })),
    ...content.sectors.map((sector) => ({ path: `/businesses/${sector.slug}`, priority: 0.7 })),
    ...content.news.map((item) => ({ path: `/news/${item.slug}`, lastModified: item.date, priority: 0.5 })),
  ];

  return entries.flatMap(({ path, lastModified, priority }) => {
    const languages = Object.fromEntries(Object.entries(localeAlternates(path)).map(([language, href]) => [language, absolute(href)]));
    return LOCALES.map((locale) => ({
      url: absolute(`/${locale}${path}`),
      ...(lastModified ? { lastModified } : {}),
      priority,
      alternates: { languages },
    }));
  });
}
