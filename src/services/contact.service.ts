import { EMAIL, WHATSAPP_NUMBER } from '@/constants/contact.constants';
import type { BusinessOption, ContactFieldError, ContactFormDataI, ContactFormErrorsI, ContactMessageLabelsI } from '@/interfaces/contact.interface';

export const BUSINESS_OPTIONS: readonly BusinessOption[] = ['general', 'energy', 'logistics', 'dairy-farms', 'real-estate'];

const NAME_LENGTH = { min: 2, max: 80 };
const MESSAGE_LENGTH = { min: 10, max: 1000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{9,15}$/;

export function parseBusiness(value: string | null): BusinessOption {
  return BUSINESS_OPTIONS.find((option) => option === value) ?? 'general';
}

function checkLength(value: string, { min, max }: { min: number; max: number }): ContactFieldError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'required';
  if (trimmed.length < min) return 'tooShort';
  if (trimmed.length > max) return 'tooLong';
  return undefined;
}

function checkContact(value: string): ContactFieldError | undefined {
  const trimmed = value.trim();
  if (!trimmed) return 'required';
  if (EMAIL_PATTERN.test(trimmed)) return undefined;
  return PHONE_PATTERN.test(trimmed.replace(/[+\s\-()]/g, '')) ? undefined : 'invalidContact';
}

export function validateContactForm(data: ContactFormDataI): ContactFormErrorsI {
  const errors: ContactFormErrorsI = {
    name: checkLength(data.name, NAME_LENGTH),
    contact: checkContact(data.contact),
    message: checkLength(data.message, MESSAGE_LENGTH),
  };
  return Object.fromEntries(Object.entries(errors).filter(([, error]) => error)) as ContactFormErrorsI;
}

export function composeContactMessage(data: ContactFormDataI, labels: ContactMessageLabelsI): string {
  return [
    labels.greeting,
    `${labels.business}: ${labels.businessNames[data.business]}`,
    `${labels.name}: ${data.name.trim()}`,
    `${labels.contact}: ${data.contact.trim()}`,
    '',
    data.message.trim(),
  ].join('\n');
}

const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

/** encodeURIComponent that never throws: lone surrogates (e.g. a half-typed emoji) become U+FFFD. */
function encodeText(text: string): string {
  return encodeURIComponent(text.replace(LONE_SURROGATE, '\uFFFD'));
}

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeText(message)}`;
}

export function buildMailtoUrl(subject: string, body: string, to: string = EMAIL): string {
  return `mailto:${to}?subject=${encodeText(subject)}&body=${encodeText(body)}`;
}
