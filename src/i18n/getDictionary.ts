import { locale as rootLocale } from 'next/root-params';
import { notFound } from 'next/navigation';
import type { DictionaryI } from './dictionary.interface';
import { hasLocale, type Locale } from './locales';
import { getDictionaryFor } from './getDictionaryFor';

/** Server-only: the current request's locale, read from the `[locale]` root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Server-only: UI strings for the current request's locale. */
export async function getDictionary(): Promise<DictionaryI> {
  return getDictionaryFor(await getLocale());
}
