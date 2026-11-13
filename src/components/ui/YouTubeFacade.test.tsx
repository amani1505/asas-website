import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YouTubeFacade } from './YouTubeFacade';

describe('YouTubeFacade', () => {
  it('loads the iframe only after click', async () => {
    render(<YouTubeFacade videoId="T51Eqp9eGgY" title="ASAS" playLabel="Play video" />);
    expect(document.querySelector('iframe')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Play video' }));
    expect(document.querySelector('iframe')?.getAttribute('src')).toContain('youtube-nocookie.com/embed/T51Eqp9eGgY');
  });
});
