import type { ContentBundleI } from '@/interfaces/content.interface';

const placeholderImage = { src: '/images/brand/asas-logo-red.png', alt: 'ASAS Group', width: 1000, height: 200 };

// Minimal bundle; Task 5/6 replace it with the full site content.
export const bundle: ContentBundleI = {
  home: {
    hero: {
      eyebrow: 'ASAS Group of Companies',
      title: 'Powering Tanzania since 1936.',
      highlight: 'since 1936',
      subtitle: 'Energy, logistics, dairy and real estate.',
      image: placeholderImage,
      primaryCta: { label: 'Explore our businesses', href: '/businesses' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    storyTeaser: { eyebrow: 'Our story', title: 'Since 1936', body: 'A. S. Abri Transporters began in 1936.', cta: { label: 'Read our story', href: '/about' }, image: placeholderImage },
    closingCta: { title: "Let's work together", body: 'Tell us what you need.', cta: { label: 'Contact us', href: '/contact' } },
  },
  about: { intro: { title: 'The spirit of ASAS', highlight: 'ASAS', body: [], image: placeholderImage }, timeline: [], values: [], team: [], videoId: 'T51Eqp9eGgY' },
  sectors: [],
  products: [],
  news: [],
  sustainability: { intro: { title: 'Sustainability', highlight: 'Sustainability', body: '' }, tabs: [] },
  careers: { intro: { title: 'Careers', highlight: 'Careers', body: [] }, reasons: [], roles: [] },
  offices: [],
};
