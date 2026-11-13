import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('labels the action and passes the button centre', async () => {
    const onToggle = jest.fn();
    render(<ThemeToggle resolvedTheme="light" labels={{ toLight: 'Light', toDark: 'Switch to dark mode' }} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(onToggle).toHaveBeenCalledWith(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
  });

  it('offers light mode when dark is on', () => {
    render(<ThemeToggle resolvedTheme="dark" labels={{ toLight: 'Switch to light mode', toDark: 'Dark' }} onToggle={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });
});
