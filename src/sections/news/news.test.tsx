import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getAdjacentNews, getNews, getNewsCategories } from '@/services/content.service';
import { NewsArticleSection } from './NewsArticleSection';
import { NewsGridSection } from './NewsGridSection';

const en = getDictionaryFor('en');
const news = getNews('en');
const categories = getNewsCategories('en');

describe('NewsGridSection', () => {
  it('shows every story by default', () => {
    render(<NewsGridSection items={news} categories={categories} locale="en" labels={en.news} />);
    expect(screen.getAllByRole('article')).toHaveLength(news.length);
    expect(screen.getByRole('radio', { name: new RegExp(`${en.news.all}.*${news.length}`) })).toHaveAttribute('aria-checked', 'true');
  });

  it('news filter narrows by category', async () => {
    render(<NewsGridSection items={news} categories={categories} locale="en" labels={en.news} />);
    const category = 'Dairy & Farms';
    await userEvent.click(screen.getByRole('radio', { name: new RegExp(category) }));
    await waitFor(() => {
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(news.filter((item) => item.category === category).length);
      for (const card of cards) expect(within(card).getByText(category)).toBeInTheDocument();
    });
  });
});

describe('NewsArticleSection', () => {
  it('article shows newer/older navigation', () => {
    const item = news[1];
    const { newer, older } = getAdjacentNews('en', item.slug);
    render(<NewsArticleSection item={item} newer={newer} older={older} locale="en" labels={en.news} />);
    expect(screen.getByRole('heading', { level: 1, name: item.title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(newer!.title) })).toHaveAttribute('href', `/en/news/${newer!.slug}`);
    expect(screen.getByRole('link', { name: new RegExp(older!.title) })).toHaveAttribute('href', `/en/news/${older!.slug}`);
    expect(screen.getByRole('link', { name: new RegExp(en.news.backToNews) })).toHaveAttribute('href', '/en/news');
  });

  it('the newest article has no newer link', () => {
    const item = news[0];
    const { newer, older } = getAdjacentNews('en', item.slug);
    render(<NewsArticleSection item={item} newer={newer} older={older} locale="en" labels={en.news} />);
    expect(screen.queryByText(en.news.newer)).not.toBeInTheDocument();
    expect(screen.getByText(en.news.older)).toBeInTheDocument();
  });

  it('renders every body paragraph', () => {
    const item = news[2];
    const { container } = render(<NewsArticleSection item={item} locale="en" labels={en.news} />);
    expect(container.querySelectorAll('[data-article-body] p')).toHaveLength(item.body.length);
  });
});
