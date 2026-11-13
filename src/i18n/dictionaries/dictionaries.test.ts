import { getDictionaryFor } from '../getDictionaryFor';
import { LOCALES } from '../locales';

const flattenKeys = (value: object, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null ? flattenKeys(child, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

describe('dictionaries', () => {
  it('never hardcodes years in business or sector/company counts (they are computed)', () => {
    for (const locale of ['en', 'sw'] as const) {
      const text = JSON.stringify(getDictionaryFor(locale));
      expect(text).not.toMatch(/\b(nine|ninety)\s+(decades|years)\b|\bmiongo\s+tisa\b|\bmiaka\s+tisini\b/i);
      expect(text).not.toMatch(/\b(four|eight)\s+(sectors|companies)\b|\b(sekta|kampuni)\s+(nne|nane)\b/i);
    }
  });

  it('sw has every key en has', () => {
    expect(flattenKeys(getDictionaryFor('sw')).sort()).toEqual(flattenKeys(getDictionaryFor('en')).sort());
  });

  it.each(LOCALES)('%s has no empty strings', (locale) => {
    expect(JSON.stringify(getDictionaryFor(locale))).not.toMatch(/""/);
  });
});
