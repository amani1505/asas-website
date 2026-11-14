import { render } from '@testing-library/react';
import { ContourLines } from './ContourLines';
import { RouteDivider } from './RouteDivider';

describe('decorative line art', () => {
  it('contour lines are hidden from assistive tech and draw several rings', () => {
    const { container } = render(<ContourLines />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg.querySelectorAll('path').length).toBeGreaterThan(5);
  });

  it('the route divider is decorative and marks its stops', () => {
    const { container } = render(<RouteDivider />);
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root.querySelectorAll('[data-stop]').length).toBe(3);
  });
});
