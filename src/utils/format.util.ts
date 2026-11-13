import type { Locale } from '@/i18n/locales';

const DATE_LOCALES: Record<Locale, string> = { en: 'en-GB', sw: 'sw-TZ' };

/** Formats a YYYY-MM-DD date identically on server and client (fixed UTC). */
export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** Adds the locale to internal paths from content (`/contact` → `/sw/contact`). External links pass through. */
export function localeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/')) return href;
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}
