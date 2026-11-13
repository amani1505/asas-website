import type { NewsItemI } from '@/interfaces/content.interface';
import { IMAGES } from '../../images';

export const logisticsNews: NewsItemI[] = [
  {
    slug: 'safer-logistics',
    title: 'New flatbeds join the Transfuel fleet',
    date: '2023-01-15',
    category: 'Logistics',
    excerpt: 'More capacity, more safety and smarter operations.',
    body: [
      'Transfuel Logistics Limited has welcomed brand-new flatbeds to its fleet.',
      'The expansion adds capacity and reaffirms our commitment to safety, efficiency and innovation in transport.',
    ],
    image: IMAGES.newsSaferLogistics,
  },
  {
    slug: 'roadway-revolution',
    title: 'Better roads, better deliveries',
    date: '2021-05-12',
    category: 'Logistics',
    excerpt: "Government investment in roads is boosting ASAS Transporters' operations.",
    body: [
      "The Tanzanian government's sustained investment in building, repairing and expanding roads has had a direct, positive impact on ASAS Transporters Co. Ltd.",
      'Better roads mean faster trips, safer journeys and more reliable deliveries for our customers.',
    ],
    image: IMAGES.newsRoadwayRevolution,
  },
  {
    slug: 'fleet-future',
    title: 'Transfuel partners with Scania Tanzania',
    date: '2021-04-13',
    category: 'Logistics',
    excerpt: 'High-performance Scania trucks for a stronger, safer fleet.',
    body: [
      'Transfuel Logistics Limited has partnered with Scania Tanzania to expand and upgrade its fleet.',
      "Choosing Scania's high-performance vehicles supports what drives every decision we make: efficiency, safety and reliability.",
    ],
    image: IMAGES.newsFleetFuture,
  },
  {
    slug: 'regional-expansion',
    title: 'ASAS Transporters expands across East and Central Africa',
    date: '2020-06-10',
    category: 'Logistics',
    excerpt: 'More cross-border haulage to support regional trade.',
    body: [
      'ASAS Transporters Co. Ltd. has significantly expanded its trucking and haulage operations across East and Central Africa.',
      'The growth supports regional integration and efficient cross-border trade for our customers.',
    ],
    image: IMAGES.newsRegionalExpansion,
  },
  {
    slug: 'port-innovation',
    title: 'A digital clearing platform at the Port of Dar es Salaam',
    date: '2018-05-12',
    category: 'Logistics',
    excerpt: 'Universal Clearing & Forwarding modernises customs clearance.',
    body: [
      'Universal Clearing & Forwarding has launched a new digital platform at the Port of Dar es Salaam.',
      'It makes customs clearance faster and more transparent, part of our commitment to modern, efficient logistics.',
    ],
    image: IMAGES.newsPortInnovation,
  },
  {
    slug: 'live-logistics',
    title: '24/7 real-time cargo tracking',
    date: '2016-04-12',
    category: 'Logistics',
    excerpt: 'Clients can now see exactly where their cargo is, at any time.',
    body: [
      'Universal Clearing & Forwarding has launched a 24/7 real-time cargo tracking system.',
      'Clients get full visibility and control over their shipments, for smarter, faster and more reliable logistics.',
    ],
    image: IMAGES.newsLiveLogistics,
  },
  {
    slug: 'excellence-recognized',
    title: 'Universal Clearing & Forwarding earns TRA accreditation',
    date: '2014-02-06',
    category: 'Logistics',
    excerpt: 'A milestone in compliance and excellence.',
    body: [
      'Universal Clearing & Forwarding has received accreditation from the Tanzania Revenue Authority (TRA).',
      'The accreditation reflects our dedication to compliance and to leading in customs clearance.',
    ],
    image: IMAGES.newsExcellenceRecognized,
  },
];
