import type { RevealOriginI } from '@/interfaces/theme.interface';

const REVEAL_DURATION_MS = 650;
const REVEAL_CLASS = 'theme-reveal';

/**
 * Applies a theme change as a circle that grows out of `origin` until it covers
 * the viewport. `applyTheme` must update the DOM synchronously (wrap React
 * state updates in flushSync). Falls back to an instant change when View
 * Transitions are unsupported or the user prefers reduced motion.
 *
 * While it runs, `theme-reveal` is set on <html> so the CSS only disables the
 * root cross-fade for theme changes (not page transitions) and un-names
 * elements like the anchored header so the circle reveals them too.
 */
export function revealThemeChange(origin: RevealOriginI, applyTheme: () => void): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion) {
    applyTheme();
    return;
  }

  const root = document.documentElement;
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );

  root.classList.add(REVEAL_CLASS);
  const transition = document.startViewTransition(applyTheme);

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: REVEAL_DURATION_MS,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    })
    .catch((error: unknown) => {
      // A skipped transition still applies the theme; only the animation is lost.
      console.warn('Theme reveal animation skipped:', error);
    });

  transition.finished
    .catch(() => undefined)
    .finally(() => root.classList.remove(REVEAL_CLASS));
}
