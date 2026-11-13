import type { OfficeI } from '@/interfaces/content.interface';

const mapUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const offices: OfficeI[] = [
  { id: 'iringa', name: 'Iringa', isHeadquarters: true, address: 'Iringa Mjini, Ruaha, on Mbeya Road', mapUrl: mapUrl('ASAS Group, Mbeya Road, Ruaha, Iringa, Tanzania') },
  { id: 'dar', name: 'Dar es Salaam', isHeadquarters: false, address: "Temeke, Chang'ombe, on Nelson Mandela Road", mapUrl: mapUrl("ASAS, Nelson Mandela Road, Chang'ombe, Temeke, Dar es Salaam, Tanzania") },
];
