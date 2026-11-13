import type { ContentBundleI, NewsItemI, SectorI } from '@/interfaces/content.interface';

const image = { src: '/images/x.jpg', alt: 'x', width: 10, height: 10 };
const company = (slug: string) => ({ slug, name: slug, tagline: '', summary: '', services: [] });
const sector = (slug: SectorI['slug'], companies: string[]): SectorI => ({
  slug, name: slug, tagline: '', summary: '', image, companies: companies.map(company),
});
const news = (slug: string, date: string, category = 'Energy'): NewsItemI => ({ slug, title: slug, date, category, excerpt: '', body: [] });

const fixture = {
  sectors: [sector('energy', ['asas-energies']), sector('logistics', ['transfuel-logistics', 'asas-transporters'])],
  news: [news('a-2017', '2017-04-02', 'Energies'), news('b-2025', '2025-06-05', 'Achievement')],
  offices: [{ id: 'iringa' }, { id: 'dar' }],
  products: [],
} as unknown as ContentBundleI;

jest.mock('@/content', () => ({
  get CONTENT() {
    return { en: fixture, sw: fixture };
  },
}));

// Imported after the mock is registered.
import { getAdjacentNews, getNews, getNewsCategories, getSector, getStats } from './content.service';

describe('content.service', () => {
  it('getNews sorts newest first', () => expect(getNews('en').map((item) => item.slug)).toEqual(['b-2025', 'a-2017']));

  it('getSector returns undefined for unknown slug', () => expect(getSector('en', 'mining')).toBeUndefined());

  it('getSector finds a known slug', () => expect(getSector('en', 'logistics')?.companies).toHaveLength(2));

  it('getAdjacentNews at the newest item has no newer', () =>
    expect(getAdjacentNews('en', 'b-2025')).toEqual({ newer: undefined, older: expect.objectContaining({ slug: 'a-2017' }) }));

  it('getNewsCategories lists categories in newest-first order without duplicates', () =>
    expect(getNewsCategories('en')).toEqual(['Achievement', 'Energies']));

  it('getStats counts companies across sectors', () =>
    expect(getStats('en', new Date('2026-01-01'))).toEqual({ years: 90, companies: 3, sectors: 2, offices: 2 }));
});
