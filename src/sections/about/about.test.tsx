import { render, screen } from '@testing-library/react';
import { CONTENT } from '@/content';
import { TeamSection } from './TeamSection';
import { TimelineSection } from './TimelineSection';
import { ValuesSection } from './ValuesSection';

describe('TimelineSection', () => {
  it('lists events in year order starting in 1936', () => {
    render(<TimelineSection eyebrow="History" heading="History" events={CONTENT.en.about.timeline} />);
    const years = screen.getAllByTestId('timeline-year').map((element) => Number(element.textContent));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(years[0]).toBe(1936);
  });

  it('is the #history anchor target', () => {
    const { container } = render(<TimelineSection eyebrow="History" heading="History" events={CONTENT.en.about.timeline} />);
    expect(container.querySelector('section#history')).not.toBeNull();
  });
});

describe('TeamSection', () => {
  it('renders nothing when empty', () => {
    const { container } = render(<TeamSection eyebrow="People" heading="Team" members={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('is the #team anchor target', () => {
    const { container } = render(<TeamSection eyebrow="People" heading="Team" members={CONTENT.en.about.team} />);
    expect(container.querySelector('section#team')).not.toBeNull();
    expect(screen.getAllByRole('img')).toHaveLength(CONTENT.en.about.team.length);
  });
});

describe('ValuesSection', () => {
  it('shows every value', () => {
    render(<ValuesSection eyebrow="Values" heading="Our values" values={CONTENT.en.about.values} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(CONTENT.en.about.values.length);
  });
});

describe('TimelineSection under reduced motion', () => {
  it('renders every event visible without entrance styles', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@/test-utils/mockMatchMedia').mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    render(<TimelineSection eyebrow="History" heading="History" events={CONTENT.en.about.timeline} />);
    for (const year of screen.getAllByTestId('timeline-year')) {
      expect(year.closest('li')?.getAttribute('style') ?? '').not.toMatch(/opacity/);
    }
  });
});
