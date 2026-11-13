import { render, screen } from '@testing-library/react';
import { CONTENT } from '@/content';
import { SectorCard } from './SectorCard';

describe('SectorCard', () => {
  it('links to the sector page', () => {
    render(<SectorCard sector={CONTENT.en.sectors[0]} locale="sw" size="md" moreLabel="Zaidi" companiesLabel="kampuni" companyLabel="kampuni" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/sw/businesses/energy');
  });

  it('shows the company count and sector tint', () => {
    const logistics = CONTENT.en.sectors[1];
    const { container } = render(<SectorCard sector={logistics} locale="en" size="lg" moreLabel="More" companiesLabel="companies" companyLabel="company" />);
    expect(screen.getByText('3 companies')).toBeInTheDocument();
    expect(container.querySelector('[data-sector="logistics"]')).not.toBeNull();
  });

  it('uses the singular for a one-company sector', () => {
    render(<SectorCard sector={CONTENT.en.sectors[0]} locale="en" size="md" moreLabel="More" companiesLabel="companies" companyLabel="company" />);
    expect(screen.getByText('1 company')).toBeInTheDocument();
  });
});
