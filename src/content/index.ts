import type { Locale } from '@/i18n/locales';
import type { ContentBundleI } from '@/interfaces/content.interface';
import { bundle as en } from './en';
import { bundle as sw } from './sw';

export const CONTENT: Record<Locale, ContentBundleI> = { en, sw };
