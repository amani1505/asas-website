import type { AboutContentI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';
import { sw } from './alt.util';

export const about: AboutContentI = {
  intro: {
    title: 'Roho ya ASAS',
    highlight: 'ASAS',
    body: [
      'ASAS Group of Companies ni mojawapo ya makundi ya biashara ya zamani na makubwa zaidi Tanzania. Ilianza mwaka 1936 kama A. S. Abri Transporters, ikiwa na lori moja mjini Iringa.',
      'Mwaka 1978 biashara ikawa ASAS Group, ikapanuka kutoka usafirishaji hadi maziwa, nishati, kilimo na majengo. Leo kila kampuni ya ASAS inashiriki ahadi moja: ubora katika kila tufanyalo.',
    ],
    image: sw(IMAGES.aboutTeamDairy, 'Timu ya ASAS Dairy ikiwa na bidhaa zote'),
  },
  timeline: [
    { year: 1936, title: 'A. S. Abri Transporters', description: 'Bw. A. S. Abri anaanzisha biashara ya malori Iringa akiwa na lori moja, akihudumia Iringa, Mbeya, Dodoma, Arusha na Dar es Salaam.' },
    { year: 1960, title: 'A. S. Abri and Sons', description: 'Biashara ya familia inakua na kuanza kutazama zaidi ya usafirishaji.' },
    { year: 1978, title: 'ASAS Group yazaliwa', description: 'ASAS Group inaanzishwa rasmi, ikiongeza uzalishaji wa maziwa na majengo kwenye biashara.' },
    { year: 1980, title: 'Shamba la maziwa', description: 'Shamba la maziwa la ASAS linafunguliwa Nyanda za Juu Kusini, Iringa, kukidhi mahitaji ya maziwa freshi Tanzania.' },
    { year: 2004, title: 'Dhahabu Geneva', description: 'Bidhaa za ASAS zinashinda Tuzo za Dhahabu Geneva, Uswisi, kwa ubora wake.' },
    { year: 2018, title: 'The Koffee Shop', description: 'Kahawa na chakula vinafika kwenye vituo vya ASAS kwa kuzinduliwa kwa The Koffee Shop.' },
    { year: 2024, title: 'Kituo cha Igumbilo', description: 'Mwenge wa Uhuru 2024 unazindua kituo chetu kipya cha mafuta cha TZS bilioni 1 Igumbilo, Iringa.' },
    { year: 2025, title: 'Kituo cha LPG Tanga', description: 'Pamoja na Petredec, tunazindua kituo cha LPG Tanga ili kupanua upatikanaji wa nishati safi Afrika Mashariki.' },
  ],
  values: [
    { title: 'Ubora', description: 'Ubora na uaminifu katika kila bidhaa, safari na huduma.' },
    { title: 'Uadilifu', description: 'Mahusiano ya kweli na wazi na wateja, wafanyakazi na washirika.' },
    { title: 'Mteja kwanza', description: 'Kila kampuni imejengwa kuzunguka mahitaji ya wateja wetu.' },
    { title: 'Usalama', description: 'Watu wetu, mashine zetu na mizigo yako hufika salama.' },
    { title: 'Jamii', description: 'Tunakua kwa kusaidia maeneo tunayofanyia kazi kukua pia.' },
    { title: 'Ubunifu', description: 'Tangu 1936, tumeendelea kutafuta njia bora zaidi za kufanya kazi.' },
  ],
  team: [
    { name: 'Maziwa', role: 'Tunatengeneza maziwa freshi, mtindi na siagi Iringa kila siku.', image: sw(IMAGES.aboutTeamDairy, 'Timu ya ASAS Dairy ikiwa na bidhaa zote') },
    { name: 'Magari na matengenezo', role: 'Tunahakikisha mamia ya malori yako salama barabarani.', image: sw(IMAGES.aboutMechanics, 'Mafundi wa ASAS wakitengeneza injini ya lori') },
    { name: 'Madereva', role: 'Wataalamu waliofunzwa wanaosafirisha katika nchi sita.', image: sw(IMAGES.companiesFleetCrew, 'Dereva wa ASAS akiwa mbele ya msafara wa malori') },
  ],
  videoId: 'T51Eqp9eGgY',
};
