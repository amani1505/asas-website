'use client';

import { useCallback, useLayoutEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextPropsI } from '@/contexts/theme.context';
import type { ResolvedTheme, ThemePreference } from '@/interfaces/theme.interface';
import { THEME_STORAGE_KEY } from '@/utils/themeInitScript.util';

const DARK_QUERY = '(prefers-color-scheme: dark)';

// Both the OS theme and the stored choice are external stores. Reading them through
// useSyncExternalStore (with server snapshots) makes hydration match the server HTML
// and then re-render with the real values, so no attribute is left stale.

function subscribeSystemTheme(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

const getSystemTheme = (): ResolvedTheme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

const storedThemeListeners = new Set<() => void>();
/** Set only when localStorage refuses a write, so the choice still applies for this visit. */
let chosenTheme: ThemePreference | null = null;

function subscribeStoredTheme(onChange: () => void): () => void {
  const handleStorage = () => {
    chosenTheme = null; // another tab changed it: re-read storage
    onChange();
  };
  storedThemeListeners.add(onChange);
  window.addEventListener('storage', handleStorage);
  return () => {
    storedThemeListeners.delete(onChange);
    window.removeEventListener('storage', handleStorage);
  };
}

function getStoredTheme(): ThemePreference {
  if (chosenTheme) return chosenTheme;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}

const noopSubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeStoredTheme, getStoredTheme, () => 'system' as const);
  const systemTheme = useSyncExternalStore(subscribeSystemTheme, getSystemTheme, () => 'light' as const);
  const isHydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  // Layout effect: the class must be on <html> before a flushSync'd setTheme returns,
  // so the view transition's "new" snapshot shows the new theme. While hydrating, the
  // values are the server's guesses; the inline init script has already set the right class.
  useLayoutEffect(() => {
    if (!isHydrated) return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [isHydrated, resolvedTheme]);

  const setTheme = useCallback((next: ThemePreference) => {
    try {
      if (next === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
      else window.localStorage.setItem(THEME_STORAGE_KEY, next);
      chosenTheme = null;
    } catch {
      // Storage can be unavailable (private mode); keep the choice in memory for this visit.
      chosenTheme = next;
    }
    for (const listener of storedThemeListeners) listener();
  }, []);

  const value = useMemo<ThemeContextPropsI>(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
