import { CONTENT } from '@/content';
import { OLD_URL_REDIRECTS } from './redirects.config';

const SUSTAINABILITY_TABS = CONTENT.en.sustainability.tabs.map((tab) => tab.id as string);
const ABOUT_ANCHORS = ['history', 'team'];

describe('OLD_URL_REDIRECTS', () => {
  it('covers all old site pages, permanently', () => {
    expect(OLD_URL_REDIRECTS).toHaveLength(19);
    for (const redirect of OLD_URL_REDIRECTS) expect(redirect.permanent).toBe(true);
    expect(new Set(OLD_URL_REDIRECTS.map((redirect) => redirect.source)).size).toBe(OLD_URL_REDIRECTS.length);
  });

  it('every redirect destination is a real route', () => {
    const valid = /^\/en(\/(about|sustainability|careers|news|contact|businesses\/(energy|logistics|dairy-farms|real-estate)))(#[a-z-]+)?$/;
    for (const redirect of OLD_URL_REDIRECTS) expect(redirect.destination).toMatch(valid);
  });

  it('redirect anchors exist in content', () => {
    for (const { destination } of OLD_URL_REDIRECTS) {
      const [path, anchor] = destination.split('#');
      if (!anchor) continue;
      if (path === '/en/about') expect(ABOUT_ANCHORS).toContain(anchor);
      else if (path === '/en/sustainability') expect(SUSTAINABILITY_TABS).toContain(anchor);
      else {
        const sector = CONTENT.en.sectors.find((item) => path === `/en/businesses/${item.slug}`);
        expect(sector?.companies.map((company) => company.slug)).toContain(anchor);
      }
    }
  });

  it('maps the dairy page to the dairy company section', () => {
    expect(OLD_URL_REDIRECTS).toContainEqual({ source: '/ASAS-dairy', destination: '/en/businesses/dairy-farms#asas-dairy', permanent: true });
  });
});
