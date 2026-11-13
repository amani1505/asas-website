import type { DictionaryI } from '@/i18n/dictionary.interface';

export interface NavItemI {
  key: keyof Pick<DictionaryI['nav'], 'about' | 'businesses' | 'sustainability' | 'news' | 'careers'>;
  /** Locale-less path. */
  path: string;
}

export const NAV_ITEMS: readonly NavItemI[] = [
  { key: 'about', path: '/about' },
  { key: 'businesses', path: '/businesses' },
  { key: 'sustainability', path: '/sustainability' },
  { key: 'news', path: '/news' },
  { key: 'careers', path: '/careers' },
];
