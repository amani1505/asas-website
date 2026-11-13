import type { ProductI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';

const YOGURT_SIZES = ['150 g', '300 g', '4 L', '20 L'];

export const products: ProductI[] = [
  { slug: 'fresh-milk', name: 'Cow Fresh Milk', category: 'milk', sizes: ['250 ml', '500 ml'], image: IMAGES.productsFreshMilk },
  { slug: 'full-cream-milk', name: 'ASAS Milk Full Cream', category: 'milk', sizes: ['200 ml', '500 ml', '1 L'], image: IMAGES.productsFullCreamMilk },
  { slug: 'mango-yogurt', name: 'Mango Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsMangoYogurt },
  { slug: 'strawberry-yogurt', name: 'Strawberry Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsStrawberryYogurt },
  { slug: 'vanilla-yogurt', name: 'Vanilla Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsVanillaYogurt },
  { slug: 'passion-yogurt', name: 'Passion Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsPassionYogurt },
  { slug: 'pineapple-yogurt', name: 'Pineapple Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsPineappleYogurt },
  { slug: 'mix-fruit-yogurt', name: 'Mix Fruit Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsMixFruitYogurt },
  { slug: 'plain-yogurt', name: 'Plain Yogurt', category: 'yogurt', sizes: YOGURT_SIZES, image: IMAGES.productsPlainYogurt },
  { slug: 'mtindi', name: 'ASAS Mtindi', category: 'mtindi', sizes: ['250 ml', '500 ml', '1 L'], image: IMAGES.productsMtindi },
  { slug: 'butter', name: 'ASAS Butter', category: 'butter', sizes: ['150 g', '300 g', '400 g'], image: IMAGES.productsButter },
  { slug: 'milk-powder', name: 'Full Cream Milk Powder', category: 'powder', sizes: ['250 g', '400 g', '2.5 kg', '25 kg'], image: IMAGES.productsMilkPowder },
];
