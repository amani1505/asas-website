import fs from 'node:fs';
import path from 'node:path';
import { CONTENT } from '@/content';
import { CLIENTS } from '@/constants/site.constants';
import { LOCALES } from '@/i18n/locales';

const imagePaths = (value: unknown): string[] => (JSON.stringify(value).match(/"\/images\/[^"]+"/g) ?? []).map((raw) => JSON.parse(raw));

describe.each(LOCALES)('content integrity: %s', (locale) => {
  const content = CONTENT[locale];

  it('has the 4 sectors in order', () =>
    expect(content.sectors.map((sector) => sector.slug)).toEqual(['energy', 'logistics', 'dairy-farms', 'real-estate']));

  it('has 8 companies with unique slugs', () => {
    const slugs = content.sectors.flatMap((sector) => sector.companies.map((company) => company.slug));
    expect(slugs).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
  });

  it('every image file exists in public/', () => {
    for (const src of imagePaths(content)) expect(fs.existsSync(path.join('public', src))).toBe(true);
  });

  it('news slugs are unique and dates are valid YYYY-MM-DD', () => {
    const slugs = content.news.map((item) => item.slug);
    expect(slugs.length).toBeGreaterThan(20);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const item of content.news) {
      expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(item.date))).toBe(false);
      expect(item.body.length).toBeGreaterThan(0);
    }
  });

  it('has products in every category and two offices', () => {
    expect(new Set(content.products.map((product) => product.category))).toEqual(new Set(['milk', 'yogurt', 'mtindi', 'butter', 'powder']));
    expect(content.offices.map((office) => office.id)).toEqual(['iringa', 'dar']);
  });

  it('has no placeholder or dead links', () => {
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/lorem|TBD|javascript:|"#"|demo-business|All Page General|Pngtree|1 800 222 000|Dares Salaam|88 years/i);
  });

  it('every CtaI href is an internal locale-less path', () => {
    const hrefs = [...JSON.stringify(content).matchAll(/"href":"([^"]+)"/g)].map((match) => match[1]);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toMatch(/^\/(?!en\/|sw\/|en$|sw$)/);
  });

  it('timeline is in year order and starts in 1936', () => {
    const years = content.about.timeline.map((event) => event.year);
    expect(years[0]).toBe(1936);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it('sustainability has the five tabs', () =>
    expect(content.sustainability.tabs.map((tab) => tab.id)).toEqual(['approach', 'hse', 'compliance', 'community', 'equality']));
});

describe('clients', () => {
  it('lists client logos that exist', () => {
    expect(CLIENTS.length).toBeGreaterThanOrEqual(8);
    for (const src of imagePaths(CLIENTS)) expect(fs.existsSync(path.join('public', src))).toBe(true);
  });
});
