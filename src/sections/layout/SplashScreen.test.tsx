import { render } from '@testing-library/react';
import { SplashScreen } from './SplashScreen';

describe('SplashScreen', () => {
  it('is a decorative overlay with the logo that never blocks clicks', () => {
    const { container } = render(<SplashScreen />);
    const splash = container.querySelector('[data-splash-screen]')!;
    expect(splash).toHaveAttribute('aria-hidden', 'true');
    expect(splash).toHaveClass('pointer-events-none');
    expect(splash.querySelectorAll('img')).toHaveLength(2);
  });
});
