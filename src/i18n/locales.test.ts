import { localizePath, negotiateLocale, stripLocale } from './locales';

describe('negotiateLocale', () => {
  it('prefers a valid cookie', () => expect(negotiateLocale('en-US,en;q=0.9', 'sw')).toBe('sw'));
  it('ignores an invalid cookie', () => expect(negotiateLocale('sw-TZ,sw;q=0.9', 'fr')).toBe('sw'));
  it('uses highest q-value supported language', () => expect(negotiateLocale('fr;q=1, sw;q=0.8, en;q=0.5')).toBe('sw'));
  it('falls back to en', () => expect(negotiateLocale(null)).toBe('en'));
  it('falls back to en for garbage header', () => expect(negotiateLocale(';;;q=abc')).toBe('en'));
});

describe('localizePath', () => {
  it('swaps locale', () => expect(localizePath('/en/news/energy-expansion', 'sw')).toBe('/sw/news/energy-expansion'));
  it('prefixes unprefixed path', () => expect(localizePath('/about', 'en')).toBe('/en/about'));
  it('handles root', () => expect(localizePath('/', 'sw')).toBe('/sw'));
  it('keeps query', () => expect(localizePath('/en/contact?business=energy', 'sw')).toBe('/sw/contact?business=energy'));
  it('does not treat /english as a locale', () => expect(localizePath('/english', 'sw')).toBe('/sw/english'));
});

describe('stripLocale', () => {
  it('returns / for a bare locale', () => expect(stripLocale('/sw')).toBe('/'));
  it('removes the locale segment', () => expect(stripLocale('/en/about')).toBe('/about'));
});
