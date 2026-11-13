import type { SectorI } from '@/interfaces/content.interface';
import { IMAGES } from '../images';
import { sw } from './alt.util';

export const sectors: SectorI[] = [
  {
    slug: 'energy',
    name: 'Nishati',
    tagline: 'Mafuta yanayoiweka Tanzania ikisonga.',
    summary: 'Tunaagiza na kuuza bidhaa za petroli, kuanzia jumla hadi kwenye pampu.',
    image: sw(IMAGES.companiesAsasEnergies, 'Pampu za mafuta katika kituo cha ASAS Energies'),
    companies: [
      {
        slug: 'asas-energies',
        name: 'ASAS Energies',
        tagline: 'Mshirika wako wa nishati.',
        summary:
          'ASAS Energies Limited inaagiza na kuuza bidhaa za petroli kwa masoko ya jumla na rejareja. Tuna vituo vya mafuta Iringa na Dar es Salaam, na tunapanuka hadi Dodoma, Arusha, Mbeya, Tunduma na Mwanza.',
        image: sw(IMAGES.companiesAsasEnergies, 'Pampu za mafuta katika kituo cha ASAS Energies'),
        services: [
          { title: 'Mafuta kwa jumla', description: 'Mafuta kwa wateja wa biashara na viwanda, yanayofika kwa wakati.' },
          { title: 'Huduma za transit', description: 'Upakuaji, uondoaji forodhani na usafirishaji kwa wateja wa transit.' },
          { title: 'Vituo vya rejareja', description: 'Mafuta bora, vilainishi na huduma ya kirafiki vituoni kwetu.' },
          { title: 'Usambazaji sokoni', description: 'Tunaagiza bidhaa za petroli kwa masoko ya rejareja na jumla.' },
        ],
        highlights: ['The Koffee Shop vituoni kwetu, inayouza kahawa na chakula tangu 2018', 'Kituo kipya cha TZS bilioni 1 Igumbilo, Iringa'],
      },
    ],
  },
  {
    slug: 'logistics',
    name: 'Usafirishaji',
    tagline: 'Tunasafirisha mizigo katika nchi sita.',
    summary: 'Malori, usafirishaji wa mafuta na uondoaji wa mizigo forodhani Afrika Mashariki na Kati.',
    image: sw(IMAGES.companiesFleetCrew, 'Dereva wa ASAS akiwa mbele ya msafara wa malori'),
    companies: [
      {
        slug: 'transfuel-logistics',
        name: 'Transfuel Logistics',
        tagline: 'Mafuta, yanafika salama.',
        summary:
          'Transfuel Logistics Limited inasafirisha mafuta kutoka Tanzania hadi DR Congo, Zambia, Malawi, Rwanda na Burundi. Kila lori linafuatiliwa kwa GPS, na kila mzigo unathibitishwa ulipofika.',
        image: sw(IMAGES.companiesTransfuelLogistics, 'Lori la mafuta la Transfuel Logistics aina ya Scania'),
        services: [
          { title: 'Ufuatiliaji wa moja kwa moja', description: 'Fuatilia mzigo wako muda wote, kutoka ghalani hadi unakokwenda.' },
          { title: 'Bima ya mizigo', description: 'Kinga dhidi ya upotevu, uharibifu au wizi kwa amani ya moyo.' },
          { title: 'Uthibitisho wa kufika', description: 'Ushahidi kwamba mzigo wako umefika salama.' },
          { title: 'Madereva wataalamu', description: 'Madereva waliofunzwa na malori ya kisasa ya Scania.' },
        ],
      },
      {
        slug: 'asas-transporters',
        name: 'ASAS Transporters',
        tagline: 'Hapa ndipo yote yalipoanzia.',
        summary:
          'ASAS Transporters Co. Ltd ndiyo biashara ya asili ya kundi. Tunasafirisha petroli, LPG na mizigo ya kuuza nje ndani ya Tanzania, DR Congo, Zambia, Malawi, Rwanda na Burundi.',
        image: sw(IMAGES.companiesAsasTransporters, 'Mfanyakazi wa ASAS Transporters kando ya lori la mafuta'),
        services: [
          { title: 'Ufuatiliaji wa GPS', description: 'Ufuatiliaji wa papo hapo ili mzigo ufike kwa wakati.' },
          { title: 'Njia bora', description: 'Njia zilizopangwa vizuri kwa safari za haraka na salama.' },
          { title: 'Malori kwa kila mzigo', description: 'Malori kwa mafuta, LPG na mizigo kavu.' },
          { title: 'Timu za wataalamu', description: 'Mameneja, mafundi na madereva wenye uzoefu.' },
        ],
        highlights: ['Imetambuliwa kama Superbrand Afrika Mashariki'],
      },
      {
        slug: 'universal-clearing-forwarding',
        name: 'Universal Clearing & Forwarding',
        tagline: 'Forodha, kwa urahisi.',
        summary:
          'Tunaondoa mizigo ya kuingiza na kuuza nje forodhani, tunapanga usafiri na kushughulikia nyaraka zote, kuanzia ilipotoka hadi inakofika. Tuna leseni, ni wanachama wa TAFFA na tumeidhinishwa na Mamlaka ya Mapato Tanzania.',
        image: sw(IMAGES.companiesUniversalClearingForwarding, 'Forklift ikinyanyua kontena la ASAS'),
        services: [
          { title: 'Uondoaji forodhani', description: 'Uondoaji wa haraka na halali wa mizigo ya kuingiza na kuuza nje.' },
          { title: 'Usafirishaji wa mizigo', description: 'Anga, bahari na barabara, vikiratibiwa mwanzo hadi mwisho.' },
          { title: 'Nyaraka', description: 'Kila nyaraka sahihi, kwa wakati na imehifadhiwa.' },
          { title: 'Ushauri wa forodha', description: 'Mwongozo wa hatua na sheria za kuondoa mizigo yako.' },
        ],
      },
    ],
  },
  {
    slug: 'dairy-farms',
    name: 'Maziwa na Mashamba',
    tagline: 'Kutoka shambani kwetu hadi mezani kwako.',
    summary: 'Maziwa freshi kutoka kwa ng’ombe wetu, yanayotengenezwa Iringa kuwa bidhaa unazozipenda, pamoja na kila kitu mkulima anachohitaji.',
    image: sw(IMAGES.homeDairyBarn, 'Ng’ombe wa maziwa wakila bandani katika shamba la ASAS'),
    companies: [
      {
        slug: 'asas-dairy',
        name: 'ASAS Dairy',
        tagline: 'Onja utamaduni.',
        summary:
          'ASAS Dairies inatengeneza maziwa freshi, mtindi wa matunda, mtindi, siagi na maziwa ya unga Iringa, kwa kutumia maziwa kutoka shamba letu. Bidhaa zetu zinapendwa Tanzania nzima.',
        image: sw(IMAGES.companiesAsasDairy, 'Maboksi ya maziwa ya ASAS Milk'),
        services: [
          { title: 'Maziwa freshi', description: 'Maziwa freshi na yenye krimu kamili, yanayofungwa kila siku.' },
          { title: 'Mtindi wa matunda', description: 'Ladha saba, kuanzia embe hadi vanilla.' },
          { title: 'Mtindi na siagi', description: 'Maziwa ya mtindi ya asili na siagi laini.' },
          { title: 'Maziwa ya unga', description: 'Maziwa ya unga yenye krimu kamili, kuanzia gramu 250 hadi kilo 25.' },
        ],
        highlights: ['Tuzo ya Dhahabu ya ubora, Geneva 2004'],
      },
      {
        slug: 'asas-dairies-farm',
        name: 'ASAS Dairies Farm',
        tagline: 'Ufugaji endelevu wa ng’ombe wa maziwa.',
        summary:
          'Shamba letu lilianza mwanzoni mwa miaka ya 1980 katika Nyanda za Juu Kusini, Iringa. Ng’ombe aina ya Friesian, Ayrshire, Jersey na Danish Red wanatoa maziwa bora kwa ASAS Dairies na biashara nyingine Tanzania.',
        image: sw(IMAGES.companiesAsasDairiesFarm, 'Lori la ASAS likipakiwa malisho shambani'),
        services: [
          { title: 'Maziwa ghafi bora', description: 'Msambazaji anayeaminika kwa biashara kote Tanzania.' },
          { title: 'Mifugo bora', description: 'Programu za uzalishaji zinazoongeza maziwa kila mwaka.' },
          { title: 'Mafunzo kwa wakulima', description: 'Msaada wa vitendo kwa wafugaji wa maeneo yetu.' },
          { title: 'Ustawi wa wanyama', description: 'Ukaguzi wa daktari wa mifugo, chanjo na sera ya kutokuwa na ukatili.' },
        ],
      },
      {
        slug: 'afri-farm',
        name: 'Afri Farm',
        tagline: 'Kila kitu shamba lako linahitaji.',
        summary: 'Duka moja kwa wakulima na wafugaji, lenye bidhaa na ushauri wa kukua.',
        image: sw(IMAGES.companiesAfriFarm, 'Wafanyakazi wa Afri Farm wakimhudumia mteja'),
        services: [
          { title: 'Dawa za mifugo', description: 'Chanjo, antibiotiki, virutubisho na dawa za kudhibiti wadudu.' },
          { title: 'Zana na mashine', description: 'Vifaa vya kupanda, kuvuna na umwagiliaji.' },
          { title: 'Chakula cha mifugo', description: 'Chakula bora kwa mifugo yenye afya zaidi.' },
          { title: 'Huduma za mifugo', description: 'Bidhaa za kuzuia magonjwa na afya ya uzazi.' },
        ],
      },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Majengo',
    tagline: 'Makazi ya kisasa.',
    summary: 'Nyumba, ofisi na maduka Dar es Salaam na Iringa.',
    image: sw(IMAGES.companiesAsasRealEstate, 'Jengo la ofisi la ASAS Real Estate'),
    companies: [
      {
        slug: 'asas-real-estate',
        name: 'ASAS Real Estate',
        tagline: 'Pata makazi yako mapya.',
        summary:
          'ASAS Real Estate inajenga na kusimamia majengo ya makazi, biashara na viwanda Dar es Salaam na Iringa, kwa familia, wafanyabiashara na wawekezaji.',
        image: sw(IMAGES.companiesAsasRealEstate, 'Jengo la ofisi la ASAS Real Estate'),
        services: [
          { title: 'Mauzo', description: 'Nyumba, apartment na majengo ya biashara ya kununua.' },
          { title: 'Kupangisha', description: 'Nyumba, apartment na ofisi, bila usumbufu.' },
          { title: 'Usimamizi wa majengo', description: 'Matengenezo, ulinzi na faida kwa mali yako.' },
          { title: 'Ushauri wa uwekezaji', description: 'Taarifa za soko kwa wawekezaji wa ndani na nje.' },
        ],
      },
    ],
  },
];
