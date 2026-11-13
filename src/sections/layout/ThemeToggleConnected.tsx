'use client';

import { flushSync } from 'react-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { revealThemeChange } from '@/utils/themeTransition.util';

interface ThemeToggleConnectedProps {
  labels: { switchToLight: string; switchToDark: string };
  className?: string;
}

export function ThemeToggleConnected({ labels, className }: ThemeToggleConnectedProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <ThemeToggle
      className={className}
      resolvedTheme={resolvedTheme}
      labels={{ toLight: labels.switchToLight, toDark: labels.switchToDark }}
      onToggle={(origin) => revealThemeChange(origin, () => flushSync(() => setTheme(nextTheme)))}
    />
  );
}
