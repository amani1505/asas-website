import type { NewsItemI } from '@/interfaces/content.interface';
import { IMAGES } from '../../images';

export const groupNews: NewsItemI[] = [
  {
    slug: 'brand-buzz',
    title: 'How ASAS reaches its customers',
    date: '2025-03-13',
    category: 'Group',
    excerpt: 'Radio, TV, social media, exhibitions and slogans that stick.',
    body: [
      'ASAS promotes its products and services through both traditional and digital channels, from radio and television to social media and exhibitions.',
      'The goal is simple: reach people where they are, and stay part of their everyday conversations.',
    ],
    image: IMAGES.newsBrandBuzz,
  },
  {
    slug: 'core-integrity',
    title: 'The values behind ASAS',
    date: '2025-03-06',
    category: 'Group',
    excerpt: 'Commitment and integrity guide how we work every day.',
    body: [
      'ASAS is a values-driven organisation. Commitment means providing safe, high-quality products and services to every customer.',
      'Integrity means honest, transparent relationships with our employees, customers and partners. These values keep ASAS a trusted name.',
    ],
    image: IMAGES.newsCoreIntegrity,
  },
  {
    slug: 'safety-champions',
    title: 'Platinum sponsor of the TOHASA safety conference',
    date: '2024-12-20',
    category: 'Group',
    excerpt: 'Championing safer workplaces at the TOHASA Global Health and Safety Conference 2025.',
    body: [
      'ASAS Group is the Platinum Sponsor of the TOHASA Global Health and Safety Conference 2025, held in Tanzania on 21 February 2025.',
      'For us, safety is not just a standard, it is a responsibility. The conference brings together more than 500 participants to share ideas and act on what matters most: saving lives and improving workplaces.',
    ],
    image: IMAGES.newsSafetyChampions,
  },
  {
    slug: 'legacy-innovators',
    title: 'From one truck to one of Tanzania’s biggest groups',
    date: '2024-12-12',
    category: 'Group',
    excerpt: 'The history and growth of ASAS Group of Companies.',
    body: [
      'ASAS began in 1936 as A. S. Abri Transporters in Iringa, founded by Mr. A. S. Abri with a single truck.',
      'Through vision and hard work the business grew, and in 1978 ASAS was formed as a group of companies. Today it spans energy, logistics, dairy, farming and real estate.',
    ],
    image: IMAGES.newsLegacyInnovators,
  },
  {
    slug: 'quality-commitment',
    title: 'Certified, award-winning quality',
    date: '2024-07-23',
    category: 'Group',
    excerpt: 'ISO certifications and international awards for the quality of our products.',
    body: [
      'ASAS holds international certifications for quality, safety and environmental management, because success comes from products that meet and exceed customer expectations.',
      'Our products have won awards at home and abroad, including Gold Awards in Geneva, Switzerland, in 2004.',
    ],
    image: IMAGES.newsQualityCommitment,
  },
  {
    slug: 'luxury-landmark',
    title: 'A new luxury residential development in Dar es Salaam',
    date: '2017-01-03',
    category: 'Real Estate',
    excerpt: 'ASAS Real Estate prepares a landmark project in the heart of the city.',
    body: [
      'ASAS Real Estate is preparing to launch a landmark luxury residential development in the heart of Dar es Salaam.',
      "The project is a bold step towards redefining urban living in one of East Africa's fastest-growing cities.",
    ],
    image: IMAGES.newsLuxuryLandmark,
  },
];
