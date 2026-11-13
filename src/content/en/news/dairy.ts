import type { NewsItemI } from '@/interfaces/content.interface';
import { IMAGES } from '../../images';

export const dairyNews: NewsItemI[] = [
  {
    slug: 'product-evolution',
    title: 'New from ASAS: butter buckets and more',
    date: '2025-03-12',
    category: 'Dairy & Farms',
    excerpt: 'New products to meet growing demand.',
    body: [
      'ASAS keeps growing its range with new products for homes and businesses.',
      'Our premium butter now comes in 400 g buckets, in both salted and unsalted varieties, made from high-quality milk from our own farm.',
    ],
    image: IMAGES.newsProductEvolution,
  },
  {
    slug: 'dairy-empowerment',
    title: 'Better breeds for smallholder farmers',
    date: '2023-07-07',
    category: 'Dairy & Farms',
    excerpt: 'Small-scale farmers get access to quality Holstein heifers and bulls.',
    body: [
      'ASAS Dairies took part in an event that let small-scale dairy farmers buy high-quality Holstein heifers and bulls.',
      "Better breeds mean more milk, and a stronger future for Tanzania's smallholder farmers.",
    ],
    image: IMAGES.newsDairyEmpowerment,
  },
  {
    slug: 'milk-revolution',
    title: 'Leading the way with UHT technology',
    date: '2023-01-09',
    category: 'Dairy & Farms',
    excerpt: 'ASAS Dairies is one of the few Tanzanian companies using UHT processing.',
    body: [
      'As Tanzania prepares for its first powdered milk processing plant, ASAS Dairies is proud to be at the forefront of the industry.',
      'We are one of the few companies in Tanzania using UHT technology, which keeps milk safe and fresh for longer.',
    ],
    image: IMAGES.newsMilkRevolution,
  },
  {
    slug: 'smart-harvest',
    title: 'Afri Farm invests in smart farming',
    date: '2021-04-06',
    category: 'Dairy & Farms',
    excerpt: 'New technology for the future of agriculture.',
    body: [
      'Afri Farm has made a significant investment in smart farming technologies.',
      'It is a step towards more productive, more sustainable farming for our customers and our own farms.',
    ],
    image: IMAGES.newsSmartHarvest,
  },
  {
    slug: 'premium-nutrition',
    title: 'Josera Frumi Plus: premium feed for dairy cows',
    date: '2019-09-09',
    category: 'Dairy & Farms',
    excerpt: 'A to Z Universal brings a high-performance dairy feed to Tanzania.',
    body: [
      "A to Z Universal Company Limited, part of ASAS Group, has launched Josera Frumi Plus, a premium feed for dairy cattle.",
      "Better nutrition means healthier cows and more milk, another step in transforming Tanzania's dairy sector.",
    ],
    image: IMAGES.newsPremiumNutrition,
  },
  {
    slug: 'eco-farming',
    title: 'Organic feed with local farmers',
    date: '2018-06-12',
    category: 'Dairy & Farms',
    excerpt: 'Afri Farm partners with local farmers to produce organic feed.',
    body: [
      'Afri Farm has partnered with local farmers to produce high-quality organic feed.',
      'The partnership supports sustainable agriculture and brings new income to farming communities.',
    ],
    image: IMAGES.newsEcoFarming,
  },
  {
    slug: 'lasting-freshness',
    title: 'Long-life milk is on its way',
    date: '2018-05-08',
    category: 'Dairy & Farms',
    excerpt: 'Fresh taste that lasts longer, for every home.',
    body: [
      'ASAS Dairies Limited is preparing to launch long-life milk.',
      'It solves a common problem with fresh milk, a short shelf life, so families can enjoy ASAS milk for longer.',
    ],
    image: IMAGES.newsLastingFreshness,
  },
  {
    slug: 'future-farms',
    title: 'A state-of-the-art dairy facility in Iringa',
    date: '2018-04-12',
    category: 'Dairy & Farms',
    excerpt: 'A new chapter for local milk production.',
    body: [
      'Afri Farm has unveiled a state-of-the-art dairy facility in Iringa.',
      'The investment brings modern agriculture and sustainable milk production to the region.',
    ],
    image: IMAGES.newsFutureFarms,
  },
  {
    slug: 'premium-herds',
    title: 'Premium Holstein cows arrive from South Africa',
    date: '2017-06-12',
    category: 'Dairy & Farms',
    excerpt: 'Better genetics for an even better herd.',
    body: [
      'Another lot of premium Holstein cows from South Africa has arrived safely at ASAS Dairies Farm.',
      'The new cows strengthen our herd genetics and raise milk production.',
    ],
    image: IMAGES.newsPremiumHerds,
  },
  {
    slug: 'nourishing-futures',
    title: 'Part of the national school milk programme',
    date: '2017-01-12',
    category: 'Dairy & Farms',
    excerpt: 'Milk for schools across Tanzania.',
    body: [
      "ASAS Dairies is recognised as a key stakeholder in the Tanzania Dairy Board's school milk programme.",
      'The nationwide programme brings milk to schools, supporting children’s health and the dairy industry at the same time.',
    ],
    image: IMAGES.newsNourishingFutures,
  },
  {
    slug: 'milk-losses',
    title: 'Better roads for smallholder dairy farmers',
    date: '2013-03-12',
    category: 'Dairy & Farms',
    excerpt: 'Poor transport costs farmers their milk.',
    body: [
      'Smallholder dairy farmers across Tanzania lose milk, and income, because of poor transport infrastructure.',
      'ASAS Dairies Farm supports the call for better roads, so fresh milk can reach processors in time.',
    ],
    image: IMAGES.newsMilkLosses,
  },
];
