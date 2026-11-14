import { render, screen, within } from '@testing-library/react';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getNews } from '@/services/content.service';
import { HeroSection } from './HeroSection';
import { LatestNewsSection } from './LatestNewsSection';
import { ClosingCtaSection } from './ClosingCtaSection';

const en = getDictionaryFor('en');

describe('HeroSection', () => {
  it('shows the headline with the highlighted words', () => {
    render(<HeroSection hero={CONTENT.en.home.hero} locale="en" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Powering Tanzania since 1936.');
    expect(screen.getByText('since 1936').tagName).toBe('SPAN');
  });

  it('links its calls to action to localized pages', () => {
    render(<HeroSection hero={CONTENT.en.home.hero} locale="sw" />);
    expect(screen.getByRole('link', { name: CONTENT.en.home.hero.primaryCta.label })).toHaveAttribute('href', '/sw/businesses');
    expect(screen.getByRole('link', { name: CONTENT.en.home.hero.secondaryCta.label })).toHaveAttribute('href', '/sw/contact');
  });
});

describe('HeroSection floating stats', () => {
  const stats = { years: 90, companies: 8, sectors: 4, offices: 2 };

  it('floats the group numbers as cards beside the photo', () => {
    render(<HeroSection hero={CONTENT.en.home.hero} locale="en" stats={stats} labels={en.stats} />);
    const cards = screen.getAllByTestId('hero-stat');
    expect(cards).toHaveLength(3);
    expect(within(cards[0]).getByText('90+')).toBeInTheDocument();
    expect(within(cards[0]).getByText(en.stats.years)).toBeInTheDocument();
    expect(within(cards[1]).getByText(en.stats.companies)).toBeInTheDocument();
  });

  it('shows the driver photo inside the blob, with decoration hidden from assistive tech', () => {
    const { container } = render(<HeroSection hero={CONTENT.en.home.hero} locale="en" stats={stats} labels={en.stats} />);
    expect(screen.getByRole('img', { name: CONTENT.en.home.hero.images[0].alt })).toBeInTheDocument();
    const decor = container.querySelectorAll('[data-hero-decor]');
    expect(decor.length).toBeGreaterThan(2);
    decor.forEach((node) => expect(node).toHaveAttribute('aria-hidden', 'true'));
  });
});

describe('LatestNewsSection', () => {
  it('shows exactly 3 newest items', () => {
    const items = getNews('en');
    render(<LatestNewsSection items={items} locale="en" dict={en} />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(3);
    expect(within(articles[0]).getByRole('heading')).toHaveTextContent(items[0].title);
    expect(screen.getByRole('link', { name: en.actions.viewAllNews })).toHaveAttribute('href', '/en/news');
  });
});

describe('ClosingCtaSection', () => {
  it('offers contact and WhatsApp', () => {
    render(<ClosingCtaSection cta={CONTENT.en.home.closingCta} locale="en" dict={en} />);
    expect(screen.getByRole('link', { name: CONTENT.en.home.closingCta.cta.label })).toHaveAttribute('href', '/en/contact');
    expect(screen.getByRole('link', { name: new RegExp(en.actions.chatOnWhatsApp) })).toHaveAttribute('href', 'https://wa.me/255749700500');
  });
});
