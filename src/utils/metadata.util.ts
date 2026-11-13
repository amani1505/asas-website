import type { Metadata } from 'next';
import { SITE_URL } from '@/constants/site.constants';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/locales';
import type { ImageI } from '@/interfaces/content.interface';

export const SITE_NAME = 'ASAS Group';
export const SITE_FULL_NAME = 'ASAS Group of Companies';

const OG_LOCALES: Record<Locale, string> = { en: 'en_TZ', sw: 'sw_TZ' };

interface BuildMetadataI {
  locale: Locale;
  /** Locale-less path: '' for home, otherwise starting with '/'. */
  path: string;
  /** Omit on the home page. */
  title?: string;
  description: string;
  image?: ImageI;
}

/** `/${locale}${path}` for every locale, plus x-default (English). */
export function localeAlternates(path: string): Record<Locale | 'x-default', string> {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, `/${locale}${path}`])) as Record<Locale, string>;
  return { ...languages, 'x-default': `/${DEFAULT_LOCALE}${path}` };
}

export function buildMetadata({ locale, path, title, description, image }: BuildMetadataI): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_FULL_NAME;
  const url = `/${locale}${path}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: localeAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: SITE_FULL_NAME,
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((other) => other !== locale).map((other) => OG_LOCALES[other]),
      url,
      title: fullTitle,
      description,
      images: [image ? { url: image.src, width: image.width, height: image.height, alt: image.alt } : { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: SITE_FULL_NAME }],
    },
  };
}
