import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button with rounded-md and primary styles by default', () => {
    render(<Button>Go</Button>);
    const button = screen.getByRole('button', { name: 'Go' });
    expect(button.className).toMatch(/rounded-md/);
    expect(button.className).toMatch(/bg-primary/);
  });

  it('renders a link when href is given', () => {
    render(<Button href="/en/contact">Contact</Button>);
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/en/contact');
  });

  it('icon size keeps a 44px touch target', () => {
    render(
      <Button size="icon" aria-label="Menu">
        x
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Menu' }).className).toMatch(/size-11/);
  });
});
