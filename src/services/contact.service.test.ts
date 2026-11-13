import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import type { ContactMessageLabelsI } from '@/interfaces/contact.interface';
import { buildMailtoUrl, buildWhatsAppUrl, composeContactMessage, parseBusiness, validateContactForm } from './contact.service';

const en = getDictionaryFor('en');
const labelsEn: ContactMessageLabelsI = { ...en.contact.message, businessNames: en.contact.businessNames };
const base = { business: 'general' as const, name: 'Asha', message: 'Habari, naomba bei ya mafuta.' };

describe('parseBusiness', () => {
  it('parseBusiness falls back to general', () => {
    expect(parseBusiness('energy')).toBe('energy');
    expect(parseBusiness('real-estate')).toBe('real-estate');
    expect(parseBusiness('garbage')).toBe('general');
    expect(parseBusiness('')).toBe('general');
    expect(parseBusiness(null)).toBe('general');
    expect(parseBusiness('toString')).toBe('general');
  });
});

describe('validateContactForm', () => {
  it('validates contact as email or phone', () => {
    expect(validateContactForm({ ...base, contact: '+255 712 345 678' })).toEqual({});
    expect(validateContactForm({ ...base, contact: '(0712) 345-678' })).toEqual({});
    expect(validateContactForm({ ...base, contact: 'asha@example.co.tz' })).toEqual({});
    expect(validateContactForm({ ...base, contact: '12ab' })).toEqual({ contact: 'invalidContact' });
    expect(validateContactForm({ ...base, contact: '12345678' })).toEqual({ contact: 'invalidContact' });
    expect(validateContactForm({ ...base, contact: '1234567890123456' })).toEqual({ contact: 'invalidContact' });
    expect(validateContactForm({ ...base, name: ' ', contact: '' })).toEqual({ name: 'required', contact: 'required' });
  });

  it('checks name and message lengths after trimming', () => {
    const ok = { ...base, contact: 'asha@example.co.tz' };
    expect(validateContactForm({ ...ok, name: ' A ' })).toEqual({ name: 'tooShort' });
    expect(validateContactForm({ ...ok, name: 'A'.repeat(81) })).toEqual({ name: 'tooLong' });
    expect(validateContactForm({ ...ok, message: '   short   ' })).toEqual({ message: 'tooShort' });
    expect(validateContactForm({ ...ok, message: 'x'.repeat(1001) })).toEqual({ message: 'tooLong' });
    expect(validateContactForm({ ...ok, message: '  ' })).toEqual({ message: 'required' });
  });
});

describe('url builders', () => {
  it('encodes special characters exactly once', () => {
    const text = 'Bei & punguzo? #1\nAsante 🙏 — ñ';
    const url = buildWhatsAppUrl(text);
    expect(url.startsWith('https://wa.me/255749700500?text=')).toBe(true);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(text);
    expect(url).not.toMatch(/%25/);
  });

  it('never throws on lone surrogates (half-typed emoji) and keeps whole emoji intact', () => {
    expect(() => buildWhatsAppUrl('Asante \uD83D')).not.toThrow();
    expect(() => buildMailtoUrl('x\uDE4F', 'y\uD83D')).not.toThrow();
    expect(decodeURIComponent(buildWhatsAppUrl('Asante \uD83D').split('?text=')[1])).toBe('Asante \uFFFD');
    expect(decodeURIComponent(buildWhatsAppUrl('🙏').split('?text=')[1])).toBe('🙏');
  });

  it('builds a mailto with encoded subject and body', () => {
    const url = buildMailtoUrl('Enquiry & more', 'Line 1\nLine 2 #');
    expect(url).toBe('mailto:info@asas.co.tz?subject=Enquiry%20%26%20more&body=Line%201%0ALine%202%20%23');
  });
});

describe('composeContactMessage', () => {
  it('composeContactMessage includes the business name', () => {
    expect(composeContactMessage({ business: 'energy', name: ' Asha ', contact: '0712345678', message: 'Hello there team' }, labelsEn)).toBe(
      'Hello ASAS Group,\nBusiness: Energy\nName: Asha\nContact: 0712345678\n\nHello there team',
    );
  });
});
