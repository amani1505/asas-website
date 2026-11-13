import type { NewsItemI } from '@/interfaces/content.interface';
import { news as englishNews } from '../../en/news';
import { dairyNews } from './dairy';
import { groupEnergyLogisticsNews } from './groupEnergyLogistics';
import type { NewsTranslationI } from './types';

const TRANSLATIONS: Record<string, NewsTranslationI> = { ...groupEnergyLogisticsNews, ...dairyNews };

const CATEGORIES: Record<string, string> = {
  Group: 'Kundi',
  Energy: 'Nishati',
  Logistics: 'Usafirishaji',
  'Dairy & Farms': 'Maziwa na Mashamba',
  'Real Estate': 'Majengo',
};

/** Swahili news keeps each English story's slug, date and image, with translated text. */
export const news: NewsItemI[] = englishNews.map((item) => {
  const translation = TRANSLATIONS[item.slug];
  if (!translation) throw new Error(`Missing Swahili translation for news "${item.slug}"`);
  return {
    ...item,
    ...translation,
    category: CATEGORIES[item.category] ?? item.category,
    image: item.image ? { ...item.image, alt: translation.title } : undefined,
  };
});
