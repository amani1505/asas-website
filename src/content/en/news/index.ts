import type { NewsItemI } from '@/interfaces/content.interface';
import { dairyNews } from './dairy';
import { energyNews } from './energy';
import { groupNews } from './group';
import { logisticsNews } from './logistics';

export const news: NewsItemI[] = [...groupNews, ...energyNews, ...logisticsNews, ...dairyNews];
