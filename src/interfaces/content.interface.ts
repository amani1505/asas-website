export type SectorSlug = 'energy' | 'logistics' | 'dairy-farms' | 'real-estate';
export type ProductCategory = 'milk' | 'yogurt' | 'mtindi' | 'butter' | 'powder';

export interface ImageI {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** `href` is a locale-less internal path such as `/contact`; the UI adds the locale. */
export interface CtaI {
  label: string;
  href: string;
}

export interface ServiceI {
  title: string;
  description: string;
}

export interface CompanyI {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  services: ServiceI[];
  image?: ImageI;
  highlights?: string[];
}

export interface SectorI {
  slug: SectorSlug;
  name: string;
  tagline: string;
  summary: string;
  image: ImageI;
  companies: CompanyI[];
}

export interface ProductI {
  slug: string;
  name: string;
  category: ProductCategory;
  sizes: string[];
  image: ImageI;
}

export interface NewsItemI {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  category: string;
  excerpt: string;
  body: string[];
  image?: ImageI;
}

export interface TimelineEventI {
  year: number;
  title: string;
  description: string;
}

export interface ValueI {
  title: string;
  description: string;
}

export interface TeamMemberI {
  name: string;
  role: string;
  image?: ImageI;
}

export interface OfficeI {
  id: 'iringa' | 'dar';
  name: string;
  isHeadquarters: boolean;
  address: string;
  mapUrl: string;
}

export interface SustainabilityTabI {
  id: 'approach' | 'hse' | 'compliance' | 'community' | 'equality';
  title: string;
  paragraphs: string[];
  points?: string[];
  image?: ImageI;
}

export interface ClientI {
  name: string;
  logo: ImageI;
}

export interface HomeContentI {
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string; images: ImageI[]; primaryCta: CtaI; secondaryCta: CtaI };
  storyTeaser: { eyebrow: string; title: string; body: string; cta: CtaI; image: ImageI };
  closingCta: { title: string; body: string; cta: CtaI };
}

export interface AboutContentI {
  intro: { title: string; highlight: string; body: string[]; image: ImageI };
  timeline: TimelineEventI[];
  values: ValueI[];
  team: TeamMemberI[];
  videoId: string;
}

export interface OpenRoleI {
  title: string;
  location: string;
  type: string;
  summary: string;
}

export interface CareersContentI {
  intro: { title: string; highlight: string; body: string[] };
  reasons: ValueI[];
  roles: OpenRoleI[];
}

export interface SustainabilityContentI {
  intro: { title: string; highlight: string; body: string };
  tabs: SustainabilityTabI[];
}

export interface ContentBundleI {
  home: HomeContentI;
  about: AboutContentI;
  sectors: SectorI[];
  products: ProductI[];
  news: NewsItemI[];
  sustainability: SustainabilityContentI;
  careers: CareersContentI;
  offices: OfficeI[];
}
