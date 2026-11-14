import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { SkeletonImage } from './SkeletonImage';

describe('loading skeletons', () => {
  it('a skeleton block is hidden from assistive tech', () => {
    const { container } = render(<Skeleton className="h-4" />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('a photo shows a shimmering placeholder until it has loaded', async () => {
    const { container } = render(
      <div style={{ position: 'relative', width: 200, height: 100 }}>
        <SkeletonImage src="/images/home/driver.jpg" alt="Driver" fill sizes="200px" />
      </div>,
    );
    expect(container.querySelector('[data-skeleton]')).toBeInTheDocument();
    fireEvent.load(screen.getByRole('img', { name: 'Driver' }));
    // next/image reports the load after decoding, asynchronously.
    await waitFor(() => expect(container.querySelector('[data-skeleton]')).not.toBeInTheDocument());
  });
});
