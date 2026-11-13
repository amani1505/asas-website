import type { ProductI } from '@/interfaces/content.interface';
import { products as englishProducts } from '../en/products';

const NAMES: Record<string, string> = {
  'fresh-milk': 'Maziwa Freshi ya Ng’ombe',
  'full-cream-milk': 'ASAS Milk Krimu Kamili',
  'mango-yogurt': 'Mtindi wa Embe',
  'strawberry-yogurt': 'Mtindi wa Stroberi',
  'vanilla-yogurt': 'Mtindi wa Vanilla',
  'passion-yogurt': 'Mtindi wa Pesheni',
  'pineapple-yogurt': 'Mtindi wa Nanasi',
  'mix-fruit-yogurt': 'Mtindi wa Matunda Mchanganyiko',
  'plain-yogurt': 'Mtindi Bila Ladha',
  mtindi: 'ASAS Mtindi',
  butter: 'Siagi ya ASAS',
  'milk-powder': 'Maziwa ya Unga Krimu Kamili',
};

const SWAHILI_SIZE = (size: string) => size.replace(/ L$/, ' lita');

export const products: ProductI[] = englishProducts.map((product) => {
  const name = NAMES[product.slug] ?? product.name;
  return { ...product, name, sizes: product.sizes.map(SWAHILI_SIZE), image: { ...product.image, alt: name } };
});
