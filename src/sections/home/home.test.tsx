import { render, screen, within } from '@testing-library/react';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getNews } from '@/services/content.service';
import { HeroSection } from './HeroSection';
import { LatestNewsSection } from './LatestNewsSection';
import { StatsSection } from './StatsSection';
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

describe('StatsSection', () => {
  it('renders computed values', () => {
    render(<StatsSection stats={{ years: 90, companies: 8, sectors: 4, offices: 2 }} labels={en.stats} />);
    expect(screen.getByLabelText('90+')).toBeInTheDocument();
    expect(screen.getByLabelText('8')).toBeInTheDocument();
    expect(screen.getByText(en.stats.companies)).toBeInTheDocument();
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
