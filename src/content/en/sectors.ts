import type { SectorI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';

export const sectors: SectorI[] = [
  {
    slug: 'energy',
    name: 'Energy',
    tagline: 'Fuel that keeps Tanzania moving.',
    summary: 'Importing and selling petroleum products, from wholesale supply to the pump.',
    image: IMAGES.companiesAsasEnergies,
    companies: [
      {
        slug: 'asas-energies',
        name: 'ASAS Energies',
        tagline: 'Your energy partner.',
        summary:
          'ASAS Energies Limited imports and sells petroleum products to wholesale and retail markets. We run service stations in Iringa and Dar es Salaam, and we are growing into Dodoma, Arusha, Mbeya, Tunduma and Mwanza.',
        image: IMAGES.companiesAsasEnergies,
        services: [
          { title: 'Wholesale supply', description: 'Fuel for commercial and industrial customers, delivered on time.' },
          { title: 'Transit services', description: 'Handling, clearing and transport for transit customers.' },
          { title: 'Retail stations', description: 'Quality fuel, lubricants and friendly service at our stations.' },
          { title: 'Market supply', description: 'Importing petroleum products for retail and wholesale markets.' },
        ],
        highlights: ['The Koffee Shop at our stations, serving coffee and food since 2018', 'A new 1 billion TZS station in Igumbilo, Iringa'],
      },
    ],
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    tagline: 'Moving goods across six countries.',
    summary: 'Trucking, fuel haulage and customs clearing across East and Central Africa.',
    image: IMAGES.companiesFleetCrew,
    companies: [
      {
        slug: 'transfuel-logistics',
        name: 'Transfuel Logistics',
        tagline: 'Fuel, delivered safely.',
        summary:
          'Transfuel Logistics Limited carries fuel from Tanzania to DR Congo, Zambia, Malawi, Rwanda and Burundi. Every truck is GPS-tracked, and every delivery is confirmed.',
        image: IMAGES.companiesTransfuelLogistics,
        services: [
          { title: 'Live tracking', description: 'Follow your shipment in real time, from depot to destination.' },
          { title: 'Cargo insurance', description: 'Cover against loss, damage or theft for peace of mind.' },
          { title: 'Delivery confirmation', description: 'Proof that your cargo arrived safely.' },
          { title: 'Professional drivers', description: 'Trained crews and a modern Scania fleet.' },
        ],
      },
      {
        slug: 'asas-transporters',
        name: 'ASAS Transporters',
        tagline: 'Where it all started.',
        summary:
          "ASAS Transporters Co. Ltd is the group's original business. We haul petroleum, LPG and export cargo across Tanzania, DR Congo, Zambia, Malawi, Rwanda and Burundi.",
        image: IMAGES.companiesAsasTransporters,
        services: [
          { title: 'GPS tracking', description: 'Real-time tracking for timely deliveries.' },
          { title: 'Smart routing', description: 'Efficient routes for faster, safer trips.' },
          { title: 'Cargo for every need', description: 'Trucks built for fuel, LPG and dry cargo.' },
          { title: 'Expert crews', description: 'Experienced managers, maintenance staff and drivers.' },
        ],
        highlights: ['Recognised as a Superbrand in East Africa'],
      },
      {
        slug: 'universal-clearing-forwarding',
        name: 'Universal Clearing & Forwarding',
        tagline: 'Customs, made simple.',
        summary:
          'We clear imports and exports, arrange transport and handle the paperwork from origin to final destination. Licensed, a TAFFA member and accredited by the Tanzania Revenue Authority.',
        image: IMAGES.companiesUniversalClearingForwarding,
        services: [
          { title: 'Customs clearance', description: 'Fast, compliant clearance for imports and exports.' },
          { title: 'Freight forwarding', description: 'Air, sea and road freight, coordinated end to end.' },
          { title: 'Documentation', description: 'Every document accurate, on time and on record.' },
          { title: 'Clearance advice', description: 'Guidance on the steps and rules for clearing your goods.' },
        ],
      },
    ],
  },
  {
    slug: 'dairy-farms',
    name: 'Dairy & Farms',
    tagline: 'From our farm to your table.',
    summary: 'Fresh milk from our own herd, made into everyday favourites in Iringa, plus everything farmers need.',
    image: IMAGES.homeDairyBarn,
    companies: [
      {
        slug: 'asas-dairy',
        name: 'ASAS Dairy',
        tagline: 'Taste the tradition.',
        summary:
          'ASAS Dairies makes fresh milk, yogurt, mtindi, butter and milk powder in Iringa, using milk from our own farm. Our products are loved across Tanzania.',
        image: IMAGES.companiesAsasDairy,
        services: [
          { title: 'Fresh milk', description: 'Fresh and full cream milk, packed daily.' },
          { title: 'Yogurt', description: 'Seven flavours, from mango to vanilla.' },
          { title: 'Mtindi & butter', description: 'Traditional cultured milk and creamy butter.' },
          { title: 'Milk powder', description: 'Full cream powder from 250 g to 25 kg.' },
        ],
        highlights: ['Gold Award for quality, Geneva 2004'],
      },
      {
        slug: 'asas-dairies-farm',
        name: 'ASAS Dairies Farm',
        tagline: 'Sustainable dairy farming.',
        summary:
          "Our farm started in the early 1980s in Iringa's Southern Highlands. Friesian, Ayrshire, Jersey and Danish Red cows supply premium raw milk to ASAS Dairies and businesses across Tanzania.",
        image: IMAGES.companiesAsasDairiesFarm,
        services: [
          { title: 'Premium raw milk', description: 'A trusted supplier to businesses across Tanzania.' },
          { title: 'Better herds', description: 'Breeding programmes that raise milk yields year after year.' },
          { title: 'Farmer training', description: 'Hands-on support for local farmers.' },
          { title: 'Animal welfare', description: 'Regular vet checks, vaccinations and a zero-cruelty policy.' },
        ],
      },
      {
        slug: 'afri-farm',
        name: 'Afri Farm',
        tagline: 'Everything your farm needs.',
        summary: 'A one-stop shop for farmers and livestock keepers, with the products and advice to grow.',
        image: IMAGES.companiesAfriFarm,
        services: [
          { title: 'Cattle medicines', description: 'Vaccines, antibiotics, supplements and parasite control.' },
          { title: 'Tools & machinery', description: 'Planting, harvesting and irrigation equipment.' },
          { title: 'Cattle feed', description: 'Quality feed and nutrition for healthier herds.' },
          { title: 'Veterinary care', description: 'Products for disease prevention and reproductive health.' },
        ],
      },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    tagline: 'Spaces for modern living.',
    summary: 'Homes, offices and shops in Dar es Salaam and Iringa.',
    image: IMAGES.companiesAsasRealEstate,
    companies: [
      {
        slug: 'asas-real-estate',
        name: 'ASAS Real Estate',
        tagline: 'Find your new place.',
        summary:
          'ASAS Real Estate develops and manages residential, commercial and industrial property in Dar es Salaam and Iringa, for families, businesses and investors.',
        image: IMAGES.companiesAsasRealEstate,
        services: [
          { title: 'Sales', description: 'Homes, apartments and commercial spaces to buy.' },
          { title: 'Rentals & leasing', description: 'Houses, apartments and offices, hassle-free.' },
          { title: 'Property management', description: 'Upkeep, security and returns for your property.' },
          { title: 'Investment advice', description: 'Market insight for local and foreign investors.' },
        ],
      },
    ],
  },
];
