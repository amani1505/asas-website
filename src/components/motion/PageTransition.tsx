import { ViewTransition, type ReactNode } from 'react';

/**
 * Wrap each page's content (not the layout) so route changes animate:
 * the old page fades out, the new one fades in with a small rise.
 * Styles live in src/styles/view-transitions.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
