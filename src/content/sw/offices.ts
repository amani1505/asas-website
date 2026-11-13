import type { OfficeI } from '@/interfaces/content.interface';
import { offices as englishOffices } from '../en/offices';

const ADDRESSES: Record<OfficeI['id'], string> = {
  iringa: 'Iringa Mjini, Ruaha, Barabara ya Mbeya',
  dar: "Temeke, Chang'ombe, Barabara ya Nelson Mandela",
};

export const offices: OfficeI[] = englishOffices.map((office) => ({ ...office, address: ADDRESSES[office.id] }));
