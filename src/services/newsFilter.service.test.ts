import type { NewsItemI } from '@/interfaces/content.interface';
import { filterNews, groupNewsByYear, newsYears } from './newsFilter.service';

const item = (slug: string, date: string, category: string, title = slug, excerpt = ''): NewsItemI => ({
  slug,
  date,
  category,
  title,
  excerpt,
  body: [],
});

const NEWS = [
  item('lpg', '2025-06-05', 'Energy', 'Tanga LPG terminal opens', 'Clean energy for East Africa'),
  item('butter', '2025-03-12', 'Dairy & Farms', 'Butter buckets', 'New products'),
  item('summit', '2024-12-20', 'Energy', 'Energy summit'),
  item('fleet', '2021-04-13', 'Logistics', 'Fleet of the future'),
];

describe('filterNews', () => {
  it('keeps everything with no filters', () => {
    expect(filterNews(NEWS, {})).toHaveLength(4);
  });

  it('narrows by category, year and both', () => {
    expect(filterNews(NEWS, { category: 'Energy' }).map((n) => n.slug)).toEqual(['lpg', 'summit']);
    expect(filterNews(NEWS, { year: 2025 }).map((n) => n.slug)).toEqual(['lpg', 'butter']);
    expect(filterNews(NEWS, { category: 'Energy', year: 2024 }).map((n) => n.slug)).toEqual(['summit']);
  });

  it('searches titles and summaries, ignoring case and extra spaces', () => {
    expect(filterNews(NEWS, { query: '  lpg ' }).map((n) => n.slug)).toEqual(['lpg']);
    expect(filterNews(NEWS, { query: 'EAST AFRICA' }).map((n) => n.slug)).toEqual(['lpg']);
    expect(filterNews(NEWS, { query: 'nothing like this' })).toEqual([]);
  });
});

describe('groupNewsByYear', () => {
  it('groups newest year first, keeping the order inside each year', () => {
    const groups = groupNewsByYear(NEWS);
    expect(groups.map((group) => group.year)).toEqual([2025, 2024, 2021]);
    expect(groups[0].items.map((n) => n.slug)).toEqual(['lpg', 'butter']);
  });
});

describe('newsYears', () => {
  it('lists the years that have stories, oldest first, with counts', () => {
    expect(newsYears(NEWS)).toEqual([
      { year: 2021, count: 1 },
      { year: 2024, count: 1 },
      { year: 2025, count: 2 },
    ]);
  });
});
