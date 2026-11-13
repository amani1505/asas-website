import type { HomeContentI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';
import { sw } from './alt.util';

export const home: HomeContentI = {
  hero: {
    eyebrow: 'ASAS Group of Companies',
    title: 'Tunaiwezesha Tanzania tangu 1936.',
    highlight: 'tangu 1936',
    subtitle: 'Nishati, usafirishaji, maziwa na majengo. Familia moja ya kampuni, iliyojengwa Iringa na kuaminika Tanzania nzima.',
    images: [
      sw(IMAGES.homeDriver, 'Dereva wa ASAS akitabasamu ndani ya lori lake'),
      sw(IMAGES.homeDairyBarn, 'Ng’ombe wa maziwa wakila bandani katika shamba la ASAS'),
      sw(IMAGES.companiesAsasEnergies, 'Pampu za mafuta katika kituo cha ASAS Energies'),
      sw(IMAGES.companiesAsasDairy, 'Maboksi ya maziwa ya ASAS Milk'),
    ],
    primaryCta: { label: 'Gundua biashara zetu', href: '/businesses' },
    secondaryCta: { label: 'Wasiliana nasi', href: '/contact' },
  },
  storyTeaser: {
    eyebrow: 'Historia yetu',
    title: 'Ilianza na lori moja.',
    body: 'Mwaka 1936, A. S. Abri alinunua lori Iringa ili kutatua tatizo rahisi: kusafirisha mizigo ndani ya Tanzania. Vizazi kadhaa baadaye, lori hilo moja limekuwa familia ya kampuni zinazotoa nishati, chakula na makazi kwa nchi.',
    cta: { label: 'Soma historia yetu', href: '/about' },
    image: sw(IMAGES.aboutAbriTransporters, 'Picha za zamani za malori ya kwanza ya A. S. Abri Transporters'),
  },
  closingCta: {
    title: 'Tujenge kesho, pamoja.',
    body: 'Mafuta kwa jumla, usafirishaji, oda za maziwa au nyumba mpya. Tuambie unachohitaji na timu sahihi itakujibu.',
    cta: { label: 'Wasiliana nasi', href: '/contact' },
  },
};
