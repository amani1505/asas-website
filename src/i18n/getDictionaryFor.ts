import type { DictionaryI } from './dictionary.interface';
import type { Locale } from './locales';
import { en } from './dictionaries/en';
import { sw } from './dictionaries/sw';

const DICTIONARIES: Record<Locale, DictionaryI> = { en, sw };

/** Pure lookup of UI strings for a locale. Safe in server and client code. */
export function getDictionaryFor(locale: Locale): DictionaryI {
  return DICTIONARIES[locale];
}
