import { fireEvent, render, screen } from '@testing-library/react';
import { CONTENT } from '@/content';
import { SectorPanels } from './SectorPanels';

const sectors = CONTENT.en.sectors;
const labels = { companies: 'companies', company: 'company', explore: 'Explore' };

const panel = (name: string) => screen.getByRole('link', { name: new RegExp(`^${name}`) });

describe('SectorPanels', () => {
  it('links every sector to its localized page', () => {
    render(<SectorPanels sectors={sectors} locale="sw" labels={labels} />);
    for (const sector of sectors) {
      expect(panel(sector.name)).toHaveAttribute('href', `/sw/businesses/${sector.slug}`);
    }
  });

  it('opens the first sector by default', () => {
    render(<SectorPanels sectors={sectors} locale="en" labels={labels} />);
    expect(panel(sectors[0].name)).toHaveAttribute('data-active', 'true');
    expect(panel(sectors[1].name)).toHaveAttribute('data-active', 'false');
  });

  it('opens a sector on hover and on keyboard focus', () => {
    render(<SectorPanels sectors={sectors} locale="en" labels={labels} />);
    fireEvent.mouseEnter(panel(sectors[2].name));
    expect(panel(sectors[2].name)).toHaveAttribute('data-active', 'true');
    expect(panel(sectors[0].name)).toHaveAttribute('data-active', 'false');
    fireEvent.focus(panel(sectors[3].name));
    expect(panel(sectors[3].name)).toHaveAttribute('data-active', 'true');
  });

  it('a first tap on a closed sector opens it instead of leaving the page', () => {
    render(<SectorPanels sectors={sectors} locale="en" labels={labels} />);
    const logistics = panel(sectors[1].name);
    fireEvent.touchStart(logistics);
    const followed = fireEvent.click(logistics);
    expect(followed).toBe(false);
    expect(logistics).toHaveAttribute('data-active', 'true');
  });

  it('a mouse click always follows the link', () => {
    render(<SectorPanels sectors={sectors} locale="en" labels={labels} />);
    const realEstate = panel(sectors[3].name);
    fireEvent.pointerDown(realEstate, { pointerType: 'mouse' });
    expect(fireEvent.click(realEstate)).toBe(true);
  });

  it('shows the company count for the open sector', () => {
    render(<SectorPanels sectors={sectors} locale="en" labels={labels} />);
    const count = sectors[0].companies.length;
    expect(panel(sectors[0].name)).toHaveTextContent(`${count} ${count === 1 ? 'company' : 'companies'}`);
  });
});
