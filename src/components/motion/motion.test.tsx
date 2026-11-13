import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'motion/react';
import { AnimatedTabs, CountUp, FilterChips, Marquee, Reveal } from './index';
import { mockMatchMedia } from '@/test-utils/mockMatchMedia';

describe('CountUp', () => {
  it('shows the final value immediately under reduced motion', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    render(
      <MotionConfig reducedMotion="user">
        <CountUp to={90} suffix="+" />
      </MotionConfig>,
    );
    expect(screen.getByText('90+')).toBeInTheDocument();
  });

  it('server-renders the final value (no-JS, crawlers, pre-hydration)', () => {
    expect(renderToString(<CountUp to={90} suffix="+" />)).toContain('90<!-- -->+');
  });

  it('always exposes the final value to assistive tech', () => {
    render(<CountUp to={8} />);
    expect(screen.getByLabelText('8')).toBeInTheDocument();
  });
});

describe('Marquee', () => {
  it('duplicates items for the loop and hides the copy from AT', () => {
    render(<Marquee label="Our clients" items={[<span key="a">Shell</span>]} />);
    const copies = screen.getAllByText('Shell');
    expect(copies).toHaveLength(2);
    expect(copies[1].closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.getByRole('region', { name: 'Our clients' })).toBeInTheDocument();
  });
});

describe('AnimatedTabs', () => {
  it('supports arrow keys', async () => {
    const onChange = jest.fn();
    render(
      <AnimatedTabs
        idPrefix="t"
        label="Topics"
        active="a"
        onChange={onChange}
        tabs={[
          { id: 'a', label: 'A' },
          { id: 'b', label: 'B' },
        ]}
      />,
    );
    screen.getByRole('tab', { name: 'A' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-controls', 't-panel-a');
  });

  it('wraps from the last tab to the first', async () => {
    const onChange = jest.fn();
    render(<AnimatedTabs idPrefix="t" label="Topics" active="b" onChange={onChange} tabs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} />);
    screen.getByRole('tab', { name: 'B' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('a');
  });
});

describe('FilterChips', () => {
  it('marks the active option and reports clicks', async () => {
    const onChange = jest.fn();
    render(
      <FilterChips
        label="Filter"
        active="all"
        onChange={onChange}
        options={[
          { id: 'all', label: 'All', count: 3 },
          { id: 'milk', label: 'Milk', count: 1 },
        ]}
      />,
    );
    expect(screen.getByRole('radio', { name: /All/ })).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(screen.getByRole('radio', { name: /Milk/ }));
    expect(onChange).toHaveBeenCalledWith('milk');
  });
});

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders visible and unmoved under reduced motion', () => {
    mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
    render(<Reveal stagger><p>one</p><p>two</p></Reveal>);
    for (const text of ['one', 'two']) {
      const element = screen.getByText(text);
      expect(element).toBeVisible();
      expect(element.closest('[style*="opacity"]')).toBeNull();
    }
  });
});
