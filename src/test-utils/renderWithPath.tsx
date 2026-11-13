import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ThemeProvider } from '@/providers/theme.provider';

const navigationState = { pathname: '/', search: '' };

/** Used by the jest.mock of next/navigation in jest.setup.ts. */
export function getMockNavigationState() {
  return navigationState;
}

export function setMockSearch(search: string): void {
  navigationState.search = search;
}

/** Renders `ui` as if the browser were at `path` (e.g. "/en/news?x=1"). */
export function renderWithPath(path: string, ui: ReactElement): RenderResult {
  const [pathname, search = ''] = path.split('?');
  navigationState.pathname = pathname;
  navigationState.search = search;
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}
