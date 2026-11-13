import type { ClientI } from '@/interfaces/content.interface';
import { IMAGES } from '@/content/images';

export const FOUNDING_YEAR = 1936;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asas.co.tz';

/** Client logos (not localized). */
export const CLIENTS: ClientI[] = [
  { name: 'Shell', logo: IMAGES.clientsShell },
  { name: 'Total Tanzania', logo: IMAGES.clientsTotalTanzania },
  { name: 'Puma Energy', logo: IMAGES.clientsPumaEnergy },
  { name: 'Oryx Energies', logo: IMAGES.clientsOryxEnergies },
  { name: 'bp', logo: IMAGES.clientsBp },
  { name: 'Dalbit Petroleum', logo: IMAGES.clientsDalbitPetroleum },
  { name: 'World Food Programme', logo: IMAGES.clientsWfp },
  { name: 'Cargo Management Logistics', logo: IMAGES.clientsCargoManagementLogistics },
];
