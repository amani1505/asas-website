import type { NewsItemI } from '@/interfaces/content.interface';
import { IMAGES } from '../../images';

export const energyNews: NewsItemI[] = [
  {
    slug: 'tanga-lpg-terminal',
    title: 'Petredec and ASAS launch the Tanga LPG terminal',
    date: '2025-06-05',
    category: 'Energy',
    excerpt: 'The largest LPG terminal of its kind in Tanzania, built to widen access to clean energy across East Africa.',
    body: [
      'Petredec, a global leader in liquefied petroleum gas, has launched the Tanga LPG Terminal together with ASAS Group of Companies.',
      "Designed to be the largest terminal of its kind in Tanzania, it will help meet the growing demand for LPG and supports the Government of Tanzania's goal of wider access to clean, affordable cooking energy.",
    ],
    image: IMAGES.newsTangaLpgTerminal,
  },
  {
    slug: 'africa-energy-summit-2025',
    title: 'ASAS Energies at the Mission 300 Africa Energy Summit',
    date: '2024-12-20',
    category: 'Energy',
    excerpt: 'Working with partners across Africa on clean, reliable and affordable energy.',
    body: [
      'ASAS Energies is proud to support the Mission 300 Africa Energy Summit, which brings together leaders, innovators and policymakers to speed up the energy transition across the continent.',
      'Too many communities still lack clean, reliable and affordable energy. We are at the summit to share ideas, build partnerships and help bring lasting change.',
    ],
    image: IMAGES.newsAfricaEnergySummit2025,
  },
  {
    slug: 'energy-advocate',
    title: 'Backing the Clean Energy Program in Dar es Salaam',
    date: '2024-09-14',
    category: 'Energy',
    excerpt: 'Stakeholders met to promote sustainable energy solutions for Tanzania.',
    body: [
      'Bi. Christina Mndeme, Deputy Permanent Secretary in the Office of the Vice President (Environment), took part in the Clean Energy Program organised by the Tanzania Communities Rise Foundation.',
      'The event, held on 14 September 2024 in Dar es Salaam, brought together key stakeholders to discuss and promote sustainable energy. ASAS was proud to take part.',
    ],
    image: IMAGES.newsEnergyAdvocate,
  },
  {
    slug: 'igumbilo-fuel-station',
    title: 'Independence Torch opens our Igumbilo fuel station',
    date: '2024-06-25',
    category: 'Energy',
    excerpt: 'A 1 billion TZS station for Iringa, opened under the 2024 Independence Torch.',
    body: [
      'Our newest ASAS Energies fuel station in Igumbilo Ward, Iringa Municipality, was officially opened under the 2024 Independence Torch, led by national torch relay leader Mr. Godfrey Mzava.',
      'The 1 billion TZS investment brings quality fuel and service closer to the people of Iringa.',
    ],
    image: IMAGES.newsIgumbiloFuelStation,
  },
  {
    slug: 'dodoma-retail-expansion',
    title: 'ASAS Energies grows its retail network',
    date: '2019-06-04',
    category: 'Energy',
    excerpt: 'More stations to meet rising demand for reliable, quality fuel.',
    body: [
      'ASAS Energies is expanding its network of retail petrol stations in response to growing demand for reliable, accessible and high-quality fuel.',
      'The expansion brings our stations, and our service, to more drivers and businesses.',
    ],
    image: IMAGES.newsDodomaRetailExpansion,
  },
  {
    slug: 'fueling-efficiency',
    title: 'A faster, smoother wholesale fuel supply',
    date: '2017-04-02',
    category: 'Energy',
    excerpt: 'Streamlining our wholesale supply chain to set new standards for service.',
    body: [
      'ASAS Energies has streamlined its wholesale oil product supply chain, setting new benchmarks for efficiency, service and customer satisfaction across Tanzania.',
      'The milestone reflects our continued investment in strong logistics systems.',
    ],
    image: IMAGES.newsFuelingEfficiency,
  },
];
