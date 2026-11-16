import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { CompanySection } from './CompanySection';
import { ProductCatalogueSection } from './ProductCatalogueSection';
import { SectorCtaSection } from './SectorCtaSection';
import { SectorChaptersSection } from './SectorChaptersSection';

const en = getDictionaryFor('en');

describe('CompanySection', () => {
  it('company sections have anchor ids', () => {
    const logistics = CONTENT.en.sectors.find((sector) => sector.slug === 'logistics')!;
    const { container } = render(
      <>
        {logistics.companies.map((company, index) => (
          <CompanySection key={company.slug} company={company} index={index} servicesLabel={en.businesses.services} />
        ))}
      </>,
    );
    expect(container.querySelector('#transfuel-logistics')).not.toBeNull();
    expect(container.querySelector('#universal-clearing-forwarding')).not.toBeNull();
  });

  it('lists every service', () => {
    const company = CONTENT.en.sectors[0].companies[0];
    render(<CompanySection company={company} index={0} servicesLabel={en.businesses.services} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(company.services.length);
  });
});

describe('ProductCatalogueSection', () => {
  it('shows only the chosen category', async () => {
    render(<ProductCatalogueSection products={CONTENT.en.products} labels={en.products} />);
    expect(screen.getAllByTestId('product-card')).toHaveLength(CONTENT.en.products.length);
    await userEvent.click(screen.getByRole('radio', { name: /Butter/ }));
    await waitFor(() => {
      const cards = screen.getAllByTestId('product-card');
      expect(cards.length).toBeGreaterThan(0);
      expect(cards.every((card) => card.dataset.category === 'butter')).toBe(true);
    });
  });

  it('shows counts per category', () => {
    render(<ProductCatalogueSection products={CONTENT.en.products} labels={en.products} />);
    const yogurts = CONTENT.en.products.filter((product) => product.category === 'yogurt').length;
    expect(screen.getByRole('radio', { name: new RegExp(`${en.products.yogurt}.*${yogurts}`) })).toBeInTheDocument();
  });
});

describe('SectorCtaSection', () => {
  it('pre-selects the business', () => {
    render(<SectorCtaSection sector={CONTENT.en.sectors[0]} locale="en" dict={en} />);
    expect(screen.getByRole('link', { name: en.actions.contactUs })).toHaveAttribute('href', '/en/contact?business=energy');
  });
});

describe('SectorChaptersSection', () => {
  const sectors = CONTENT.en.sectors;
  // The shared setup reports every element as on screen at once; a real page
  // that hasn't scrolled reports nothing, so use a silent observer here.
  const original = globalThis.IntersectionObserver;
  class SilentIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  beforeEach(() => {
    globalThis.IntersectionObserver = SilentIntersectionObserver as unknown as typeof IntersectionObserver;
  });
  afterEach(() => {
    globalThis.IntersectionObserver = original;
  });
  const renderChapters = () => render(<SectorChaptersSection sectors={sectors} locale="en" dict={en} />);

  it('gives every sector a chapter with a link to its page', () => {
    renderChapters();
    for (const sector of sectors) {
      expect(screen.getByRole('heading', { level: 2, name: sector.name })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: `${en.businesses.exploreSector} ${sector.name}` })).toHaveAttribute('href', `/en/businesses/${sector.slug}`);
    }
  });

  it('links each company straight to its place on the sector page', () => {
    renderChapters();
    expect(screen.getByRole('link', { name: /Universal Clearing & Forwarding/ })).toHaveAttribute(
      'href',
      '/en/businesses/logistics#universal-clearing-forwarding',
    );
    const companyCount = sectors.reduce((total, sector) => total + sector.companies.length, 0);
    expect(screen.getAllByTestId('company-card')).toHaveLength(companyCount);
  });

  it('marks the first sector as the current stop on the route', () => {
    renderChapters();
    const route = screen.getByRole('navigation', { name: en.businesses.routeLabel });
    const stops = within(route).getAllByRole('link');
    expect(stops).toHaveLength(sectors.length);
    expect(stops[0]).toHaveAttribute('aria-current', 'true');
    expect(stops[0]).toHaveAttribute('href', `#${sectors[0].slug}`);
  });

  it('jumping to a stop makes it current and shows that sector’s photo', async () => {
    const { container } = renderChapters();
    const route = screen.getByRole('navigation', { name: en.businesses.routeLabel });
    await userEvent.click(within(route).getByRole('link', { name: sectors[2].name }));
    expect(within(route).getByRole('link', { name: sectors[2].name })).toHaveAttribute('aria-current', 'true');
    expect(container.querySelector('[data-photo="dairy-farms"]')).toHaveAttribute('data-active', 'true');
    expect(container.querySelector('[data-photo="energy"]')).toHaveAttribute('data-active', 'false');
  });
});
