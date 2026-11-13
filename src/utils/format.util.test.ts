import { formatDate, localeHref } from './format.util';

describe('formatDate', () => {
  it('formats an ISO date the same way on any server timezone', () => {
    expect(formatDate('2025-06-05', 'en')).toBe('5 Jun 2025');
    expect(formatDate('2025-06-05', 'sw')).toMatch(/2025/);
  });
});

describe('localeHref', () => {
  it('prefixes internal paths and leaves external links alone', () => {
    expect(localeHref('sw', '/contact')).toBe('/sw/contact');
    expect(localeHref('en', '/')).toBe('/en');
    expect(localeHref('en', 'https://wa.me/1')).toBe('https://wa.me/1');
  });
});
