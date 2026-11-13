import type { ContentBundleI } from '@/interfaces/content.interface';
import { about } from './about';
import { careers } from './careers';
import { home } from './home';
import { news } from './news';
import { offices } from './offices';
import { products } from './products';
import { sectors } from './sectors';
import { sustainability } from './sustainability';

export const bundle: ContentBundleI = { home, about, sectors, products, news, sustainability, careers, offices };
