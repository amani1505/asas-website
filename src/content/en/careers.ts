import type { CareersContentI } from '@/interfaces/content.interface';

export const careers: CareersContentI = {
  intro: {
    title: 'Grow with ASAS.',
    highlight: 'ASAS.',
    body: ['A family business since 1936, with companies in energy, logistics, dairy and real estate, and customers across six countries. There is room to build a real career here.'],
  },
  reasons: [
    { title: 'Modern workplaces', description: 'Well-equipped offices, depots and plants built for good work.' },
    { title: 'Training that never stops', description: 'Regular training to grow your skills, from driving to management.' },
    { title: 'Wellness', description: 'Fitness, break rooms and good food to keep you at your best.' },
    { title: 'Safe and secure', description: '24/7 security and a safety-first culture at every site.' },
    { title: 'A supportive culture', description: 'An inclusive team that works together and helps each other grow.' },
  ],
  steps: [
    { title: 'Send your CV', description: 'Email it to us, with the area or role you have in mind in the subject.' },
    { title: 'We read every one', description: 'Your CV is kept on file and shared with the teams it fits.' },
    { title: 'We reach out', description: 'When a role fits your skills, we call or email you to meet.' },
  ],
  roles: [],
};
