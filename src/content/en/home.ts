import type { HomeContentI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';

export const home: HomeContentI = {
  hero: {
    eyebrow: 'ASAS Group of Companies',
    title: 'Powering Tanzania since 1936.',
    highlight: 'since 1936',
    subtitle: 'Energy, logistics, dairy and real estate. One family of companies, built in Iringa and trusted across Tanzania.',
    images: [IMAGES.homeDriver, IMAGES.homeDairyBarn, IMAGES.companiesAsasEnergies, IMAGES.companiesAsasDairy],
    primaryCta: { label: 'Explore our businesses', href: '/businesses' },
    secondaryCta: { label: 'Contact us', href: '/contact' },
  },
  storyTeaser: {
    eyebrow: 'Our story',
    title: 'It started with one truck.',
    body: 'In 1936, A. S. Abri bought a truck in Iringa to solve a simple problem: moving goods across Tanzania. Generations later, that one truck has grown into a family of companies that fuel, feed and house the country.',
    cta: { label: 'Read our story', href: '/about' },
    image: IMAGES.aboutAbriTransporters,
  },
  closingCta: {
    title: "Let's build what's next, together.",
    body: 'Fuel supply, haulage, dairy orders or a new home. Tell us what you need and the right team will reply.',
    cta: { label: 'Contact us', href: '/contact' },
  },
};
