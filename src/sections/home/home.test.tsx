import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { getNews } from '@/services/content.service';
import { HeroSection } from './HeroSection';
import { LatestNewsSection } from './LatestNewsSection';
import { ClosingCtaSection } from './ClosingCtaSection';

const en = getDictionaryFor('en');

describe('HeroSection', () => {
  const stats = { years: 90, companies: 8, sectors: 4, offices: 2 };
  const sectors = CONTENT.en.sectors;
  const renderHero = (locale: 'en' | 'sw' = 'en') =>
    render(<HeroSection hero={CONTENT.en.home.hero} locale={locale} sectors={sectors} stats={stats} dict={en} />);
  const thumb = (name: string) => screen.getByRole('button', { name: `${en.home.showSlide} ${name}` });
  const activeCaption = (container: HTMLElement) => container.querySelector('[data-caption][data-active="true"]')!;

  it('shows the headline with the highlighted words', () => {
    renderHero();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Powering Tanzania since 1936.');
    expect(screen.getByText('since 1936').tagName).toBe('SPAN');
  });

  it('links its calls to action to localized pages', () => {
    renderHero('sw');
    expect(screen.getByRole('link', { name: CONTENT.en.home.hero.primaryCta.label })).toHaveAttribute('href', '/sw/businesses');
    expect(screen.getByRole('link', { name: CONTENT.en.home.hero.secondaryCta.label })).toHaveAttribute('href', '/sw/contact');
  });

  it('counts up the group numbers under the calls to action', () => {
    renderHero();
    const items = screen.getAllByTestId('hero-stat');
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByText('90+')).toBeInTheDocument();
    expect(within(items[1]).getByText(en.stats.companies)).toBeInTheDocument();
  });

  it('shows one described slide per sector in a labelled slideshow', () => {
    renderHero();
    const show = screen.getByRole('region', { name: en.home.heroSlidesLabel });
    for (const sector of sectors) expect(within(show).getByRole('img', { name: sector.image.alt })).toBeInTheDocument();
  });

  it('starts on the first sector, and a thumbnail jumps the whole slideshow to its sector', async () => {
    const { container } = renderHero();
    expect(thumb(sectors[0].name)).toHaveAttribute('aria-current', 'true');
    expect(activeCaption(container)).toHaveTextContent(sectors[0].tagline);
    await userEvent.click(thumb(sectors[2].name));
    expect(thumb(sectors[2].name)).toHaveAttribute('aria-current', 'true');
    expect(thumb(sectors[0].name)).not.toHaveAttribute('aria-current');
    expect(activeCaption(container)).toHaveTextContent(sectors[2].tagline);
  });

  it('lets visitors pause and resume the slideshow', async () => {
    renderHero();
    await userEvent.click(screen.getByRole('button', { name: en.home.pauseSlides }));
    expect(screen.getByRole('button', { name: en.home.playSlides })).toBeInTheDocument();
  });
});

describe('LatestNewsSection', () => {
  const items = getNews('en');

  it('features the newest story and lines up the next four as stops on a route', () => {
    render(<LatestNewsSection items={items} locale="en" dict={en} />);
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(5);
    expect(articles[0]).toHaveAttribute('data-featured', 'true');
    expect(within(articles[0]).getByRole('heading')).toHaveTextContent(items[0].title);
    expect(within(articles[0]).getByRole('link', { name: new RegExp(items[0].title) })).toHaveAttribute('href', `/en/news/${items[0].slug}`);
    const stops = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(stops).toHaveLength(4);
    expect(within(stops[0]).getByRole('heading')).toHaveTextContent(items[1].title);
    expect(within(stops[0]).getByText((_, el) => el?.tagName === 'TIME' && el.getAttribute('datetime') === items[1].date)).toBeInTheDocument();
  });

  it('links to all news', () => {
    render(<LatestNewsSection items={items} locale="en" dict={en} />);
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
