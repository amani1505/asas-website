import { createContext } from 'react';
import type { ResolvedTheme, ThemePreference } from '@/interfaces/theme.interface';

export interface ThemeContextPropsI {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextPropsI | undefined>(undefined);
