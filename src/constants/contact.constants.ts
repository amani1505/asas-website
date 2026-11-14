export type PhoneLabelKey = 'callsWhatsapp' | 'calls';

export interface PhoneI {
  display: string;
  tel: string;
  labelKey: PhoneLabelKey;
}

export const PHONES: readonly PhoneI[] = [
  { display: '+255 749 700 500', tel: '+255749700500', labelKey: 'callsWhatsapp' },
  { display: '+255 793 600 600', tel: '+255793600600', labelKey: 'calls' },
];

export const EMAIL = 'info@asas.co.tz';
export const WHATSAPP_NUMBER = '255749700500';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/AsasDairiesLtd',
  instagram: 'https://www.instagram.com/asas_dairies',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const;

/** The tracker does not answer over HTTPS (checked 2026-11-13). */
export const AI_TRACKER_URL = 'http://vts.asas.co.tz';

/** Footer credit: the site's developer, Romanix. */
export const DEVELOPER_EMAIL = 'amanideveloper1505@gmail.com';
