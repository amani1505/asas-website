import { fireEvent, render, screen } from '@testing-library/react';
import { SplashScreen } from './SplashScreen';

const SECTORS = ['Energy', 'Logistics', 'Dairy & Farms', 'Real Estate'];

describe('SplashScreen', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.splash;
  });

  it('is a decorative overlay with the logo that never blocks clicks', () => {
    const { container } = render(<SplashScreen sectors={SECTORS} year={2026} skipLabel="Skip" />);
    const splash = container.querySelector('[data-splash-screen]')!;
    expect(splash).toHaveAttribute('aria-hidden', 'true');
    expect(splash).toHaveClass('pointer-events-none');
    expect(splash.querySelectorAll('img')).toHaveLength(2);
  });

  it('drives a truck along a route past one stop per sector', () => {
    const { container } = render(<SplashScreen sectors={SECTORS} year={2026} skipLabel="Skip" />);
    expect(container.querySelector('[data-splash-truck]')).toBeInTheDocument();
    const stops = container.querySelectorAll('[data-splash-stop]');
    expect(stops).toHaveLength(4);
    expect(stops[2]).toHaveTextContent('Dairy & Farms');
  });

  it('counts the years from the founding year to the current year', () => {
    const { container } = render(<SplashScreen sectors={SECTORS} year={2026} skipLabel="Skip" />);
    const counter = container.querySelector<HTMLElement>('[data-splash-year]')!;
    expect(counter.style.getPropertyValue('--splash-year')).toBe('2026');
    expect(counter.style.getPropertyValue('--splash-from')).toBe('1936');
  });

  it('can be skipped, which hides it for the rest of the visit', () => {
    render(<SplashScreen sectors={SECTORS} year={2026} skipLabel="Skip" />);
    fireEvent.click(screen.getByText('Skip'));
    expect(document.documentElement.dataset.splash).toBe('seen');
  });
});
