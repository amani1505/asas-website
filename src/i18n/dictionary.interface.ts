export interface DictionaryI {
  meta: { siteName: string; tagline: string; description: string };
  nav: { home: string; about: string; businesses: string; sustainability: string; news: string; careers: string; contact: string; menu: string; close: string; primary: string };
  actions: {
    exploreBusinesses: string;
    contactUs: string;
    learnMore: string;
    getDirections: string;
    sendOnWhatsApp: string;
    preferEmail: string;
    sendCv: string;
    readStory: string;
    viewAllNews: string;
    chatOnWhatsApp: string;
  };
  theme: { switchToLight: string; switchToDark: string };
  language: { label: string; en: string; sw: string };
  footer: { tagline: string; callsWhatsapp: string; calls: string; email: string; followUs: string; aiTracker: string; credit: string; rights: string; explore: string; reachUs: string };
  stats: { years: string; companies: string; sectors: string; offices: string };
  home: { sectorsEyebrow: string; sectorsTitle: string; sectorsHighlight: string; newsEyebrow: string; newsTitle: string; clientsEyebrow: string; clientsTitle: string; companiesCount: string; companyCount: string };
  businesses: { eyebrow: string; title: string; highlight: string; description: string; companiesInSector: string; services: string; jumpTo: string; ctaTitle: string; ctaBody: string };
  products: { eyebrow: string; title: string; filterLabel: string; all: string; milk: string; yogurt: string; mtindi: string; butter: string; powder: string; sizes: string };
  news: { eyebrow: string; title: string; description: string; filterLabel: string; all: string; newer: string; older: string; backToNews: string; empty: string };
  about: { eyebrow: string; historyEyebrow: string; historyTitle: string; valuesEyebrow: string; valuesTitle: string; teamEyebrow: string; teamTitle: string; videoTitle: string; playVideo: string };
  sustainability: { eyebrow: string; tabsLabel: string };
  careers: { eyebrow: string; openRoles: string; emptyTitle: string; emptyBody: string; whyTitle: string };
  contact: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    channelsTitle: string;
    officesTitle: string;
    headquarters: string;
    formTitle: string;
    formDescription: string;
    fields: { business: string; name: string; contact: string; contactHint: string; message: string };
    errors: { required: string; tooShort: string; tooLong: string; invalidContact: string };
    businessNames: { general: string; energy: string; logistics: string; 'dairy-farms': string; 'real-estate': string };
    message: { greeting: string; business: string; name: string; contact: string; emailSubject: string };
    openingWhatsApp: string;
    formHasErrors: string;
  };
  common: { skipToContent: string; readMore: string; notFoundTitle: string; notFoundBody: string; goHome: string; opensInNewTab: string };
}
