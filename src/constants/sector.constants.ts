import { Building2, Fuel, Milk, Truck, type LucideIcon } from 'lucide-react';
import type { SectorSlug } from '@/interfaces/content.interface';

/** Literal Tailwind classes per sector tint (Tailwind needs full class names in source). */
export const SECTOR_DOT_CLASSES: Record<SectorSlug, string> = {
  energy: 'bg-sector-energy',
  logistics: 'bg-sector-logistics',
  'dairy-farms': 'bg-sector-dairy',
  'real-estate': 'bg-sector-realestate',
};

/** One icon per sector, shared by the splash, home panels and the businesses page. */
export const SECTOR_ICONS: Record<SectorSlug, LucideIcon> = {
  energy: Fuel,
  logistics: Truck,
  'dairy-farms': Milk,
  'real-estate': Building2,
};
