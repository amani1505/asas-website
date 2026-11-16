# Theme reveal effect

When the user clicks the theme icon, the new theme spreads out from the icon as a growing circle until it covers the whole screen. This replaces the usual instant flip or flat cross-fade.

- One click toggles between light and dark. There is no dropdown.
- Until the user clicks, the app follows the operating system's light or dark setting, and keeps following it live.
- The animation lasts 650 ms and uses an ease-in-out curve.
- Browsers without View Transitions, and users with reduced motion enabled, get an instant switch.

## How it works

The effect is built on the [View Transitions API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API).

1. `document.startViewTransition(update)` takes a screenshot of the page as it is now (the old theme).
2. Inside `update`, the theme class on `<html>` is switched, so the DOM now shows the new theme.
3. The browser takes a second screenshot (the new theme) and places it above the old one, as the pseudo-elements `::view-transition-old(root)` and `::view-transition-new(root)`.
4. We animate a `clip-path: circle()` on the new screenshot, from radius `0` at the icon's centre to a radius that reaches the farthest corner of the viewport.
5. When the animation ends, the screenshots are removed and the live page, already in the new theme, is underneath.

The default cross-fade is switched off in CSS, so the only visible motion is the circle.

### The one detail that makes or breaks it

The `update` callback must change the DOM **synchronously**. If the theme class is applied later, the browser captures the "new" screenshot before the theme changes and the circle reveals the old theme.

In React, that means:

- Call `setTheme` inside `flushSync(...)` so React renders immediately.
- Apply the `<html>` class in a `useLayoutEffect`, not a `useEffect`. Layout effects run before `flushSync` returns; passive effects may not.

## Files

| File | Role |
|---|---|
| `src/utils/theme-transition.util.ts` | Runs the view transition and the circle animation, with the fallbacks |
| `src/components/theme-toggle.tsx` | The icon button; passes its centre point and the theme change |
| `src/providers/theme-provider.tsx` | Exposes `resolvedTheme`, follows the system theme, applies the class in a layout effect |
| `src/styles/globals.css` | Disables the default view-transition cross-fade |

## Code

### 1. The utility: `src/utils/theme-transition.util.ts`

```ts
const REVEAL_DURATION_MS = 650;

interface RevealOrigin {
  x: number;
  y: number;
}

/**
 * Applies a theme change as a circle that grows out of `origin` until it
 * covers the viewport. `applyTheme` must update the DOM synchronously
 * (wrap React state updates in flushSync). Falls back to an instant change
 * when View Transitions are unsupported or the user prefers reduced motion.
 */
export function revealThemeChange(origin: RevealOrigin, applyTheme: () => void): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion) {
    applyTheme();
    return;
  }

  // Distance to the farthest corner, so the circle always ends fully covering the screen.
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );

  const transition = document.startViewTransition(applyTheme);

  transition.ready
    .then(() => {
      document.documentElement.animate(
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
}
```

### 2. The button: `src/components/theme-toggle.tsx`

```tsx
import { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { revealThemeChange } from "@/utils/theme-transition.util";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    revealThemeChange(
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      () => flushSync(() => setTheme(nextTheme)),
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:bg-transparent hover:text-inherit"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

The circle starts from the centre of the button, so it also works for keyboard users who press Enter or Space.

### 3. The provider changes: `src/providers/theme-provider.tsx`

Three things the effect needs from the provider:

```tsx
type ResolvedTheme = "dark" | "light";

const getSystemTheme = (): ResolvedTheme =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// Inside ThemeProvider:

// a) Know which theme is actually on screen, so a click can flip it
//    even while the stored preference is still "system".
const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

// b) Follow the OS setting live while the user has not picked a theme.
useEffect(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => setSystemTheme(media.matches ? "dark" : "light");
  media.addEventListener("change", handleChange);
  return () => media.removeEventListener("change", handleChange);
}, []);

// c) Apply the class in a LAYOUT effect, so it is on <html> by the time
//    the flushSync'd setTheme returns and the browser takes its snapshot.
useLayoutEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
}, [resolvedTheme]);

// Expose it:
const value = { theme, resolvedTheme, setTheme: /* ... */ };
```

The default theme stays `"system"` (set in `AppProviders.tsx` with `<ThemeProvider defaultTheme="system">`).

### 4. The CSS: `src/styles/globals.css`

```css
/* The new theme is clipped to a growing circle, so turn off the default cross-fade. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

## Customising

| Change | Where |
|---|---|
| Speed | `REVEAL_DURATION_MS` in `theme-transition.util.ts` (400 feels snappy, 900 feels dramatic) |
| Feel of the motion | the `easing` value; `cubic-bezier(0.65, 0, 0.35, 1)` is slow-fast-slow |
| Start point | the `origin` passed in `theme-toggle.tsx`; use `event.clientX` / `event.clientY` to start from the exact click point instead of the icon centre |
| Shape | the `clipPath` keyframes; for example `inset(0 0 100% 0)` to `inset(0)` wipes down from the top instead of a circle |

### Variation: shrink the old theme away when going back to light

Some apps grow the circle when switching to dark and shrink it when switching to light. To do that, animate `::view-transition-old(root)` with the keyframes reversed, and give the old snapshot a higher `z-index` so it sits on top:

```css
.theme-shrink::view-transition-old(root) { z-index: 1; }
```

Add the `theme-shrink` class to `<html>` before calling `startViewTransition` and remove it in `transition.finished`.

## Browser support

| Browser | Behaviour |
|---|---|
| Chrome / Edge 111+ | Full effect |
| Safari 18+ | Full effect |
| Firefox (recent versions with View Transitions) | Full effect |
| Older browsers | Instant theme switch, no errors |
| Reduced motion enabled | Instant theme switch |

## Reusing it in another project

1. Copy `theme-transition.util.ts` as it is.
2. In your toggle, call `revealThemeChange(origin, () => flushSync(() => applyYourTheme()))`.
3. Make sure your theme change updates the DOM synchronously (layout effect, or set the class directly).
4. Add the four lines of CSS that disable the default cross-fade.

It works with any theming approach (a class on `<html>`, a `data-theme` attribute, CSS variables), because the browser just compares two screenshots.
