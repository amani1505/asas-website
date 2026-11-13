export const LOCALES = ['en', 'sw'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'asas-locale';

export function hasLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Picks the locale for a visitor: a valid cookie wins, then the highest-weighted
 * supported language in `Accept-Language`, then English.
 */
export function negotiateLocale(acceptLanguage: string | null, cookieValue?: string): Locale {
  if (hasLocale(cookieValue)) return cookieValue;
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(',')
    .map((entry, order) => {
      const [tag, ...params] = entry.trim().split(';');
      const qParam = params.find((param) => param.trim().startsWith('q='));
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return { language: tag.trim().toLowerCase().split('-')[0], quality, order };
    })
    .filter((entry) => entry.language && Number.isFinite(entry.quality) && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.order - b.order);

  return ranked.find((entry) => hasLocale(entry.language))?.language as Locale | undefined ?? DEFAULT_LOCALE;
}

function splitQuery(path: string): [string, string] {
  const index = path.search(/[?#]/);
  return index === -1 ? [path, ''] : [path.slice(0, index), path.slice(index)];
}

/** Removes a leading locale segment: `/en/about` → `/about`, `/sw` → `/`. */
export function stripLocale(pathname: string): string {
  const [path, query] = splitQuery(pathname);
  const segments = path.split('/');
  if (hasLocale(segments[1])) {
    const rest = segments.slice(2).join('/');
    return `/${rest}${query}`;
  }
  return `${path || '/'}${query}`;
}

/** Puts `locale` as the first path segment, replacing an existing locale and keeping the query. */
export function localizePath(pathname: string, locale: Locale): string {
  const stripped = stripLocale(pathname);
  const [path, query] = splitQuery(stripped);
  return `/${locale}${path === '/' ? '' : path}${query}`;
}
