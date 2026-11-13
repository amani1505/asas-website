import type { SustainabilityContentI } from '@/interfaces/content.interface';

export const sustainability: SustainabilityContentI = {
  intro: {
    title: 'Good business, for people and planet.',
    highlight: 'people and planet.',
    body: 'How we keep our people safe, follow the rules and give back to the communities we work in.',
  },
  tabs: [
    {
      id: 'approach',
      title: 'Our approach',
      paragraphs: [
        'Since 1936, our commitment has served both people and planet.',
        'Our values demand excellence, quality and reliability. We put customers, communities, safety and sustainability first, and we stay innovative, honest and professional while we grow.',
      ],
      points: ['Excellence', 'Responsibility', 'National progress'],
    },
    {
      id: 'hse',
      title: 'Health, safety & environment',
      paragraphs: [
        'The safety of our people, our machines and your shipments comes first. Drivers are trained in defensive driving, and our in-house maintenance team inspects vehicles before and after every trip.',
        'We respect the environment and communities we work in, and make sure no activity of ours harms them.',
      ],
      points: ['Zero incident hours as our goal', 'Regular HSEQ training for every team', 'Risk audits and external safety audits', 'Environmental checks before every new site'],
    },
    {
      id: 'compliance',
      title: 'Compliance',
      paragraphs: ['We follow the law and our Code of Professional Ethics in everything we do, and we hold ourselves to international standards.'],
      points: [
        'ISO 9001: quality management',
        'ISO 14001: environmental management',
        'ISO 45001: occupational health & safety',
        'OSHA: Occupational Safety and Health Authority',
        'Superbrands East Africa, Volume Eight',
      ],
    },
    {
      id: 'community',
      title: 'Community',
      paragraphs: ['We invest where we work: in health, education, sport and local enterprise.'],
      points: [
        'Built the safe blood centre at Iringa Regional Referral Hospital',
        'Renovated the neonatal ward, now caring for more than 43 babies',
        'Helped expand the ICU and built a CT-scan room',
        'Classrooms, desks and school milk in Iringa',
        'Fire, road and personal safety lessons for students',
        'The yearly SAMAKIBA football festival',
        "Capital and support for youth, drivers and women's SACCOS",
      ],
    },
    {
      id: 'equality',
      title: 'Equal opportunities',
      paragraphs: [
        'Everyone deserves equal rights, opportunities and access to resources, whatever their gender.',
        'We promote fairness in hiring, growth and decision-making across every ASAS company.',
      ],
    },
  ],
};
