import type { AboutContentI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';

export const about: AboutContentI = {
  intro: {
    title: 'The spirit of ASAS',
    highlight: 'ASAS',
    body: [
      'ASAS Group of Companies is one of the oldest and biggest business groups in Tanzania. It began in 1936 as A. S. Abri Transporters, a single truck in Iringa.',
      'In 1978 the business became ASAS Group, moving beyond transport into dairy, energy, farming and property. Today eight companies share one promise: excellence in all we do.',
    ],
    image: IMAGES.aboutTeamDairy,
  },
  timeline: [
    { year: 1936, title: 'A. S. Abri Transporters', description: 'Mr. A. S. Abri starts a trucking business in Iringa with a single truck, serving Iringa, Mbeya, Dodoma, Arusha and Dar es Salaam.' },
    { year: 1960, title: 'A. S. Abri and Sons', description: 'The family business grows and starts looking beyond transport.' },
    { year: 1978, title: 'ASAS Group is born', description: 'ASAS Group is formally established, adding dairy production and real estate to the business.' },
    { year: 1980, title: 'The dairy farm', description: "The ASAS dairy farm opens in Iringa's Southern Highlands to meet Tanzania's demand for fresh milk." },
    { year: 2004, title: 'Gold in Geneva', description: 'ASAS products win Gold Awards in Geneva, Switzerland, for their quality.' },
    { year: 2018, title: 'The Koffee Shop', description: 'Coffee and food arrive at ASAS service stations with the launch of The Koffee Shop.' },
    { year: 2024, title: 'Igumbilo station', description: 'The 2024 Independence Torch opens our new 1 billion TZS fuel station in Igumbilo, Iringa.' },
    { year: 2025, title: 'Tanga LPG terminal', description: 'With Petredec, we launch the Tanga LPG terminal to widen access to clean energy in East Africa.' },
  ],
  values: [
    { title: 'Excellence', description: 'Quality and reliability in every product, delivery and service.' },
    { title: 'Integrity', description: 'Honest, transparent relationships with customers, staff and partners.' },
    { title: 'Customers first', description: 'Every company is built around what our customers need.' },
    { title: 'Safety', description: 'Our people, machines and your goods come home safe.' },
    { title: 'Community', description: 'We grow by helping the places we work in grow too.' },
    { title: 'Innovation', description: 'Ninety years in, we keep finding better ways to work.' },
  ],
  team: [
    { name: 'Dairy', role: 'Making fresh milk, yogurt and butter in Iringa every day.', image: IMAGES.aboutTeamDairy },
    { name: 'Fleet & maintenance', role: 'Keeping hundreds of trucks safe and on the road.', image: IMAGES.aboutMechanics },
    { name: 'Drivers', role: 'Trained professionals delivering across six countries.', image: IMAGES.companiesFleetCrew },
  ],
  videoId: 'T51Eqp9eGgY',
};
