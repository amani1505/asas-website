import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getAdjacentNews, getNews, getNewsCategories } from '@/services/content.service';
import { NewsArticleSection } from './NewsArticleSection';
import { NewsroomSection } from './NewsroomSection';

const en = getDictionaryFor('en');
const news = getNews('en');
const categories = getNewsCategories('en');
const yearOf = (date: string) => Number(date.slice(0, 4));
const renderNewsroom = () =>
  render(<NewsroomSection items={news} categories={categories} locale="en" labels={en.news} readLabel={en.home.readArticle} />);

describe('NewsroomSection', () => {
  it('shows every story by default, the newest as the lead', () => {
    renderNewsroom();
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(news.length);
    expect(articles[0]).toHaveAttribute('data-featured', 'true');
    expect(within(articles[0]).getByRole('heading')).toHaveTextContent(news[0].title);
    expect(screen.getByRole('radio', { name: new RegExp(`${en.news.all}.*${news.length}`) })).toHaveAttribute('aria-checked', 'true');
  });

  it('files the rest of the stories under year headings, newest year first', () => {
    renderNewsroom();
    const years = screen.getAllByRole('heading', { level: 2 }).map((heading) => Number(heading.textContent));
    expect(years.length).toBeGreaterThan(1);
    expect([...years].sort((a, b) => b - a)).toEqual(years);
  });

  it('narrows by category', async () => {
    renderNewsroom();
    const category = 'Dairy & Farms';
    await userEvent.click(screen.getByRole('radio', { name: new RegExp(category) }));
    await waitFor(() => {
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(news.filter((item) => item.category === category).length);
      for (const card of cards) expect(within(card).getByText(category)).toBeInTheDocument();
    });
  });

  it('narrows by year from the year route', async () => {
    renderNewsroom();
    const year = yearOf(news[news.length - 1].date);
    const route = screen.getByRole('radiogroup', { name: en.news.yearsLabel });
    await userEvent.click(within(route).getByRole('radio', { name: new RegExp(`^${year}`) }));
    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(news.filter((item) => yearOf(item.date) === year).length);
    });
  });

  it('searches as you type and offers a way back when nothing matches', async () => {
    renderNewsroom();
    const search = screen.getByRole('searchbox', { name: en.news.searchLabel });
    await userEvent.type(search, 'LPG');
    await waitFor(() => {
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
      for (const article of articles) expect(article.textContent).toMatch(/LPG/i);
    });
    await userEvent.clear(search);
    await userEvent.type(search, 'zzzz no such story');
    await waitFor(() => expect(screen.queryAllByRole('article')).toHaveLength(0));
    expect(screen.getByText(en.news.empty)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: en.news.reset }));
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(news.length));
    expect(search).toHaveValue('');
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
