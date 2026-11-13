import { act, render, screen } from '@testing-library/react';
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
});
