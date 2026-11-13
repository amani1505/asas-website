import { act, render, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './theme.provider';
import { useTheme } from '@/hooks/useTheme';
import { THEME_STORAGE_KEY } from '@/utils/themeInitScript.util';
import { mockMatchMedia } from '@/test-utils/mockMatchMedia';

function Probe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <>
      <p>{`${theme}:${resolvedTheme}`}</p>
      <button onClick={() => setTheme('light')}>light</button>
    </>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('light', 'dark');
});

describe('ThemeProvider', () => {
  it('resolves system theme from matchMedia and puts the class on <html>', () => {
    mockMatchMedia({ '(prefers-color-scheme: dark)': true });
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(screen.getByText('system:dark')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('persists an explicit choice to localStorage under asas-theme', () => {
    render(<ThemeProvider><Probe /></ThemeProvider>);
    act(() => screen.getByRole('button', { name: 'light' }).click());
    expect(THEME_STORAGE_KEY).toBe('asas-theme');
    expect(localStorage.getItem('asas-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('restores a stored choice', () => {
    localStorage.setItem('asas-theme', 'dark');
    render(<ThemeProvider><Probe /></ThemeProvider>);
    expect(screen.getByText('dark:dark')).toBeInTheDocument();
  });

  it('corrects server-rendered (light) attributes after hydration when the OS is dark', async () => {
    mockMatchMedia({ '(prefers-color-scheme: dark)': true });
    document.documentElement.classList.add('dark'); // set by the inline init script before hydration
    function AttributeProbe() {
      const { resolvedTheme } = useTheme();
      return <p data-testid="probe" data-theme={resolvedTheme} />;
    }
    const container = document.createElement('div');
    container.innerHTML = '<p data-testid="probe" data-theme="light"></p>';
    document.body.appendChild(container);
    await act(async () => {
      hydrateRoot(container, <ThemeProvider><AttributeProbe /></ThemeProvider>, { onRecoverableError: () => {} });
    });
    expect(container.querySelector('[data-testid="probe"]')).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    container.remove();
  });

  it('still switches theme when localStorage is unavailable', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    mockMatchMedia({ '(prefers-color-scheme: dark)': true });
    render(<ThemeProvider><Probe /></ThemeProvider>);
    act(() => screen.getByRole('button', { name: 'light' }).click());
    expect(screen.getByText('light:light')).toBeInTheDocument();
    setItem.mockRestore();
    getItem.mockRestore();
  });
});
