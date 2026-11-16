import { IMAGES } from '@/content/images';
import { sw } from './alt.util';
import type { SustainabilityContentI } from '@/interfaces/content.interface';

export const sustainability: SustainabilityContentI = {
  intro: {
    title: 'Biashara njema, kwa watu na mazingira.',
    highlight: 'watu na mazingira.',
    body: 'Jinsi tunavyowaweka watu wetu salama, tunavyofuata sheria na tunavyorudisha kwa jamii tunazofanyia kazi.',
  },
  tabs: [
    {
      id: 'approach',
      title: 'Mtazamo wetu',
      paragraphs: [
        'Tangu 1936, dhamira yetu imewahudumia watu na mazingira.',
        'Maadili yetu yanadai ubora, viwango na uaminifu. Tunawaweka wateja, jamii, usalama na uendelevu mbele, huku tukibaki wabunifu, waaminifu na wataalamu tunapokua.',
      ],
      points: ['Ubora', 'Uwajibikaji', 'Maendeleo ya taifa'],
    },
    {
      id: 'hse',
      image: sw(IMAGES.sustainabilityHse, 'Wafanyakazi wa ASAS wakiwa na vifaa vya usalama'),
      title: 'Afya, usalama na mazingira',
      paragraphs: [
        'Usalama wa watu wetu, mashine zetu na mizigo yako unakuja kwanza. Madereva wanafunzwa udereva wa kujihami, na timu yetu ya matengenezo hukagua magari kabla na baada ya kila safari.',
        'Tunaheshimu mazingira na jamii tunazofanyia kazi, na tunahakikisha hakuna shughuli yetu inayoyadhuru.',
      ],
      points: ['Lengo letu ni saa sifuri za ajali', 'Mafunzo ya HSEQ ya mara kwa mara kwa kila timu', 'Ukaguzi wa hatari na ukaguzi wa nje wa usalama', 'Tathmini ya mazingira kabla ya kila eneo jipya'],
    },
    {
      id: 'compliance',
      title: 'Uzingatiaji wa sheria',
      paragraphs: ['Tunafuata sheria na Kanuni zetu za Maadili ya Kitaaluma katika kila tunalofanya, na tunajipima kwa viwango vya kimataifa.'],
      points: [
        'ISO 9001: usimamizi wa ubora',
        'ISO 14001: usimamizi wa mazingira',
        'ISO 45001: afya na usalama kazini',
        'OSHA: Wakala wa Usalama na Afya Mahali pa Kazi',
        'Superbrands Afrika Mashariki, Toleo la Nane',
      ],
    },
    {
      id: 'community',
      image: sw(IMAGES.sustainabilityCommunity, 'Kituo salama cha damu ASAS ilichojenga katika Hospitali ya Rufaa ya Mkoa wa Iringa'),
      title: 'Jamii',
      paragraphs: ['Tunawekeza tunapofanyia kazi: katika afya, elimu, michezo na biashara za wenyeji.'],
      points: [
        'Tumejenga kituo cha damu salama katika Hospitali ya Rufaa ya Mkoa wa Iringa',
        'Tumekarabati wodi ya watoto wachanga, sasa inahudumia zaidi ya watoto 43',
        'Tumesaidia kupanua ICU na kujenga chumba cha CT-scan',
        'Madarasa, madawati na maziwa ya shule mkoani Iringa',
        'Mafunzo ya usalama wa moto, barabarani na binafsi kwa wanafunzi',
        'Tamasha la kila mwaka la mpira wa miguu la SAMAKIBA',
        'Mitaji na msaada kwa vijana, madereva na SACCOS za wanawake',
      ],
    },
    {
      id: 'equality',
      title: 'Fursa sawa',
      paragraphs: [
        'Kila mtu anastahili haki sawa, fursa sawa na upatikanaji sawa wa rasilimali, bila kujali jinsia.',
        'Tunahimiza haki katika ajira, ukuaji na maamuzi katika kila kampuni ya ASAS.',
      ],
    },
  ],
};
