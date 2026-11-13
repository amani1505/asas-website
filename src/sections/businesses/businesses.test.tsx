import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONTENT } from '@/content';
import { getDictionaryFor } from '@/i18n/getDictionaryFor';
import { CompanySection } from './CompanySection';
import { ProductCatalogueSection } from './ProductCatalogueSection';
import { SectorCtaSection } from './SectorCtaSection';
import { BusinessesGridSection } from './BusinessesGridSection';

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

describe('BusinessesGridSection', () => {
  it('links every sector and names its companies', () => {
    render(<BusinessesGridSection sectors={CONTENT.en.sectors} locale="en" dict={en} />);
    expect(screen.getByRole('link', { name: /Real Estate/ })).toHaveAttribute('href', '/en/businesses/real-estate');
    expect(screen.getByText('Universal Clearing & Forwarding')).toBeInTheDocument();
  });
});
