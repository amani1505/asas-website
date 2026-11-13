import { getDictionaryFor } from '../getDictionaryFor';
import { LOCALES } from '../locales';

const flattenKeys = (value: object, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, child]) =>
    typeof child === 'object' && child !== null ? flattenKeys(child, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

describe('dictionaries', () => {
  it('sw has every key en has', () => {
    expect(flattenKeys(getDictionaryFor('sw')).sort()).toEqual(flattenKeys(getDictionaryFor('en')).sort());
  });

  it.each(LOCALES)('%s has no empty strings', (locale) => {
    expect(JSON.stringify(getDictionaryFor(locale))).not.toMatch(/""/);
  });
});
