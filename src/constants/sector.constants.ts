import type { SectorSlug } from '@/interfaces/content.interface';

/** Literal Tailwind classes per sector tint (Tailwind needs full class names in source). */
export const SECTOR_DOT_CLASSES: Record<SectorSlug, string> = {
  energy: 'bg-sector-energy',
  logistics: 'bg-sector-logistics',
  'dairy-farms': 'bg-sector-dairy',
  'real-estate': 'bg-sector-realestate',
};
