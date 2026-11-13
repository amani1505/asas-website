# ASAS Group Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild asas.co.tz as a clean, Gen Z-styled, bilingual (EN/SW) Next.js site. It has 7 merged sections, light/dark circle-reveal theming, view-transition page changes, and Motion-driven interactions.

**Architecture:** Next.js 16 App Router under `src/app/[locale]/`, statically generated for both locales. Content lives in typed per-locale TS files and is read through `content.service.ts`. Pages pass it to Sections, and Sections pass it to presentational Components (`CLAUDE.md` layering). Page changes use React 19.3 `<ViewTransition>`. Interactions use `motion/react`. The contact form hands off to WhatsApp with no server.

**Tech Stack:** Next.js 16.4.6, React 19.3, TypeScript strict, Tailwind CSS 4.3, motion, lucide-react, class-variance-authority + clsx + tailwind-merge (shadcn-style primitives), Jest + React Testing Library (unit), Playwright (e2e).

**Spec:** `docs/superpowers/specs/2026-11-13-asas-website-revamp-design.md`. Read it before starting any task. Also read `docs/theme-reveal-effect.md` before Task 3.

## Global Constraints

- Before writing code that touches a Next API, read the matching guide in `node_modules/next/dist/docs/` (`AGENTS.md`). Middleware is `proxy.ts`. `cacheComponents: true` is on in `next.config.ts`; keep it.
- Follow `CLAUDE.md`:
  - Mobile-first, fluid tokens (`--text-*`, `--space-*`, `--section-spacing`), no fixed px for layout spacing or font sizes.
  - Max 400 lines per file. Interfaces are suffixed `I`. Constants are `UPPER_SNAKE_CASE`. Use `@/` imports and barrel `index.ts` per component folder.
  - File names follow `CLAUDE.md`'s table (`PascalCase.tsx` components, `camelCase.util.ts`, `camelCase.service.ts`, `camelCase.provider.tsx`, `useX.ts`).
- Components in `src/components/**` never consume Context. Anything that needs a hook or Context lives in `src/sections/**`, or receives data via props.
- **Radius is `rounded-md` everywhere** (cards, buttons, inputs, images, menus). No pills, no `rounded-lg`/`xl`/`2xl`/`full` except on circular icon-only buttons.
- Brand colors:
  - Red `#BE0F0D`
  - Charcoal `#373435`
  - Light background `#FAF8F5`
  - Dark background `#141213`
  - Sector tints: Energy amber, Logistics blue, Dairy & Farms green, Real Estate violet
  - Every text/background pair meets WCAG AA in both themes.
- Fonts: Bricolage Grotesque (headings), Geist (body), via `next/font/google`.
- Motion:
  - Interactions take 150–300 ms. Animate only `transform`/`opacity` (`clip-path` only for the theme reveal).
  - Wrap with `<MotionConfig reducedMotion="user">`. Under `prefers-reduced-motion: reduce`, nothing moves.
- Contact facts live in `src/constants/contact.constants.ts` only. They are:
  - Phones: `+255 749 700 500` (*Calls & WhatsApp*) and `+255 793 600 600` (*Calls*)
  - Email: `info@asas.co.tz`
  - WhatsApp: `https://wa.me/255749700500`
- Years in business are computed from `FOUNDING_YEAR = 1936`, never hardcoded. Company and sector counts are computed from content.
- No `#`, `javascript:` or placeholder hrefs anywhere. No "lorem", "TBD", "test", template copy or stock images.
- Swahili copy is a first draft. Mark `src/content/sw/README.md` "Needs native-speaker review before launch".
- Commit after each task on branch `feat/site-revamp`. Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **First paint in the wrong theme.** A visitor whose OS is dark, or whose stored choice is dark, must never see a light flash on load. The inline init script sets the `<html>` class before paint (test in Task 3 and Task 15).
2. **Theme reveal vs. named view-transition elements.** The anchored header (`view-transition-name: site-header`) must be revealed by the circle, not snap or cross-fade separately. `.theme-reveal *` forces `view-transition-name: none` (test in Task 3).
3. **Bad URLs.** `/fr/about`, `/en/nope`, `/en/businesses/unknown` and `/en/news/unknown` render the localized 404 page. They never crash. Old URLs with `?u=…&pids=none&b=` redirect to their new homes (tests in Tasks 2, 8 and 14).
4. **Contact text and query input.** Swahili accents, emoji, `&`, `#`, `?` and newlines in the message survive into the WhatsApp URL exactly once-encoded. `?business=garbage` falls back to `general` (tests in Task 13).
5. **Reduced motion.** Count-ups show their final value immediately, the marquee is static, scroll reveals render visible, and view transitions have zero duration (tests in Task 7 and Task 15).

---

## File Structure

```
next.config.ts                     # + redirects() for old URLs (Task 14)
jest.config.mjs, jest.setup.ts     # Task 1
playwright.config.ts, e2e/*.spec.ts # Task 15
scripts/download-images.mjs        # Task 5
public/images/**                   # Task 5 (downloaded real photos/logos)
src/
  proxy.ts                         # locale redirect (Task 2)
  app/
    sitemap.ts, robots.ts          # Task 14
    [locale]/
      layout.tsx                   # root layout: <html lang>, fonts, providers, shell (Tasks 2, 8)
      page.tsx                     # Home (Task 9)
      not-found.tsx, [...rest]/page.tsx  # Task 8
      opengraph-image.tsx          # Task 14
      about/page.tsx               # Task 10
      businesses/page.tsx, businesses/[sector]/page.tsx  # Task 11
      sustainability/page.tsx, careers/page.tsx          # Task 12
      news/page.tsx, news/[slug]/page.tsx                # Task 12
      contact/page.tsx             # Task 13
  i18n/
    locales.ts                     # Locale, LOCALES, hasLocale, negotiateLocale, localizePath (Task 2)
    getDictionary.ts               # Task 2
    dictionaries/{en,sw}.ts, dictionary.interface.ts     # Task 2 (UI strings)
  constants/contact.constants.ts, constants/site.constants.ts  # Task 4
  interfaces/content.interface.ts, interfaces/contact.interface.ts, interfaces/theme.interface.ts
  content/
    index.ts                       # CONTENT registry: Record<Locale, ContentBundleI> (Task 4)
    images.ts                      # shared ImageI records (Task 5)
    en/*.ts, en/news/*.ts          # Task 5
    sw/*.ts, sw/news/*.ts, sw/README.md  # Task 6
  services/content.service.ts, services/contact.service.ts
  utils/cn.util.ts, utils/years.util.ts, utils/themeTransition.util.ts, utils/metadata.util.ts
  contexts/theme.context.tsx  providers/theme.provider.tsx  providers/AppProviders.tsx  hooks/useTheme.ts
  components/
    ui/        Button, Input, Textarea, Select, Container, Eyebrow, SectionHeading, ImageFrame, ThemeToggle, index.ts
    motion/    PageTransition, Reveal, CountUp, Marquee, AnimatedTabs, FilterChips, index.ts
    domain/    SectorCard, CompanyBlock, NewsCard, ProductCard, StatItem, TimelineItem, OfficeCard, ValueCard, index.ts
  sections/
    layout/    SiteHeader, MobileMenu, SiteFooter, LanguageSwitch, ThemeToggleConnected, SkipLink
    home/ about/ businesses/ sustainability/ careers/ news/ contact/   (one file per page section)
  styles/fluid-tokens.css, styles/globals.css, styles/view-transitions.css
```

---

### Task 1: Foundation: src layout, tooling, design tokens, UI primitives

**Files:**
- Move: `app/` → `src/app/` (delete the starter `page.tsx`/`layout.tsx`; they're replaced in Tasks 2/8). Move `app/favicon.ico` → `src/app/favicon.ico`.
- Modify: `tsconfig.json` (`"@/*": ["./src/*"]`), `package.json` (scripts `test`, `test:e2e`)
- Create: `jest.config.mjs`, `jest.setup.ts`, `src/styles/fluid-tokens.css` (copy verbatim from `CLAUDE.md`), `src/styles/globals.css`, `src/utils/cn.util.ts`, `src/components/ui/{Button,Input,Textarea,Select,Container,Eyebrow,SectionHeading,ImageFrame}.tsx`, `src/components/ui/index.ts`
- Test: `src/components/ui/Button.test.tsx`, `src/utils/cn.util.test.ts`

**Interfaces:**
- Produces:
  - `cn(...inputs: ClassValue[]): string`
  - `Button` (`variant: 'primary' | 'secondary' | 'outline' | 'ghost'`, `size: 'sm' | 'md' | 'lg' | 'icon'`, `asChild?` not needed; accepts `href?: string`, which renders a `next/link` `<Link>`; wraps with `motion.button` / `motion(Link)` for `whileTap={{ scale: 0.97 }}`)
  - `Input`, `Textarea`, `Select` (forwardRef, `invalid?: boolean` → `aria-invalid` + red ring)
  - `Container` (`size?: 'default' | 'narrow' | 'wide'`, maps to the `CLAUDE.md` container classes)
  - `Eyebrow({ children })`
  - `SectionHeading({ eyebrow?, title, highlight?, description?, as?: 'h1' | 'h2' })` (`highlight` is a substring of `title` rendered in red)
  - `ImageFrame({ image: ImageI, ratio: string, priority?, sizes })` (`rounded-md`, `overflow-hidden`, `next/image` `fill` + `object-cover`)
- CSS custom properties in `globals.css` (`@theme inline`):
  - Colors: `--color-background`, `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border`, `--color-card`, `--color-primary` (#BE0F0D), `--color-primary-foreground`
  - Sector tints: `--color-sector-energy`, `--color-sector-logistics`, `--color-sector-dairy`, `--color-sector-realestate`
  - Fonts: `--font-heading`, `--font-sans`
  - Radius: `--radius: 0.375rem`
  - Light values on `:root, .light`; dark values on `.dark`

- [ ] **Step 1:** Install deps.
  - `npm i motion lucide-react class-variance-authority clsx tailwind-merge`
  - `npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest @playwright/test`
  - Expected: exit 0.
- [ ] **Step 2:** Create `jest.config.mjs` with `next/jest` (read `node_modules/next/dist/docs/01-app/02-guides/testing/jest.md`), `testEnvironment: 'jsdom'`, `moduleNameMapper` for `@/`, `testPathIgnorePatterns: ['/e2e/']`. `jest.setup.ts` imports `@testing-library/jest-dom` and stubs `window.matchMedia` (returns `matches: false`, plus add/removeEventListener) and `IntersectionObserver` (immediately reports intersecting).
- [ ] **Step 3: Write failing tests**

```tsx
// src/utils/cn.util.test.ts
it('merges tailwind conflicts, last wins', () => {
  expect(cn('px-2 rounded-md', false && 'hidden', 'px-4')).toBe('rounded-md px-4');
});
// src/components/ui/Button.test.tsx
it('renders a button with rounded-md and primary styles by default', () => {
  render(<Button>Go</Button>);
  const btn = screen.getByRole('button', { name: 'Go' });
  expect(btn.className).toMatch(/rounded-md/);
  expect(btn.className).toMatch(/bg-primary/);
});
it('renders a link when href is given', () => {
  render(<Button href="/en/contact">Contact</Button>);
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/en/contact');
});
it('icon size keeps a 44px touch target', () => {
  render(<Button size="icon" aria-label="Menu">x</Button>);
  expect(screen.getByRole('button', { name: 'Menu' }).className).toMatch(/size-11/);
});
```

- [ ] **Step 4:** Run `npx jest src/utils src/components/ui`. Expected: FAIL (modules not found).
- [ ] **Step 5:** Implement the files above.
  - `globals.css` imports `tailwindcss`, `./fluid-tokens.css` and `./view-transitions.css` (create it empty here; it's filled in Tasks 3/7).
  - It sets `body` to `bg-background text-foreground font-sans`, headings to `font-heading` with tight leading, and `::selection` in brand red.
  - It defines a visible `:focus-visible` ring (2px brand red, 2px offset, `rounded-md`).
  - It adds a `@media (prefers-reduced-motion: reduce)` block that sets `animation-duration: 0s !important; transition-duration: 0s !important` on `*`.
- [ ] **Step 6:** Run `npx jest src/utils src/components/ui`. Expected: PASS.
- [ ] **Step 7:** Commit `feat: project foundation, tokens and ui primitives`.

---

### Task 2: Locales, routing proxy, dictionaries, root layout

**Files:**
- Create: `src/i18n/locales.ts`, `src/i18n/dictionary.interface.ts`, `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/sw.ts`, `src/i18n/getDictionary.ts`, `src/proxy.ts`, `src/app/[locale]/layout.tsx` (minimal: `<html lang>`, fonts, `<body>`, children; the shell is added in Task 8)
- Test: `src/i18n/locales.test.ts`, `src/i18n/dictionaries/dictionaries.test.ts`

**Interfaces:**
- Produces (`src/i18n/locales.ts`):
  - `LOCALES = ['en', 'sw'] as const`
  - `type Locale = (typeof LOCALES)[number]`
  - `DEFAULT_LOCALE: Locale = 'en'`
  - `LOCALE_COOKIE = 'asas-locale'`
  - `hasLocale(value: string): value is Locale`
  - `negotiateLocale(acceptLanguage: string | null, cookieValue?: string): Locale`: cookie first if valid, then the highest-q `Accept-Language` entry whose primary subtag is `en`/`sw`, then `en`
  - `localizePath(pathname: string, locale: Locale): string`: replaces the leading locale segment if present, otherwise prefixes it; keeps the rest, including query
  - `stripLocale(pathname: string): string`: returns `'/'` for a bare locale
- `src/i18n/dictionary.interface.ts`: `DictionaryI` holds every UI string (content text lives in `src/content`):
  - `nav`: about, businesses, sustainability, news, careers, contact, menu, close
  - `actions`: exploreBusinesses, contactUs, learnMore, getDirections, sendOnWhatsApp, preferEmail, sendCv
  - `theme`: switchToLight, switchToDark
  - `language`: label, en, sw
  - `footer`: tagline, callsWhatsapp, calls, email, followUs, aiTracker, credit, rights
  - `stats`: years, companies, sectors, offices
  - `products`: all, plus one per `ProductCategory`
  - `news`: all, newer, older, backToNews
  - `careers`: emptyTitle, emptyBody
  - `about`: playVideo
  - `contact`: form labels, errors keyed by `ContactFormErrorsI` values, business option names, WhatsApp message labels (greeting, business, name, contact), openingWhatsApp
  - `common`: skipToContent, readMore, notFoundTitle, notFoundBody, goHome
- `getDictionaryFor(locale: Locale): DictionaryI` (sync, pure) and `getDictionary(): Promise<DictionaryI>` (reads `locale()` from `next/root-params`, `notFound()` if invalid)
- `proxy.ts`:
  - If the path has no locale prefix, redirect (307) to `localizePath(path, negotiateLocale(...))`.
  - Matcher: `'/((?!_next|api|.*\\..*).*)'`.
- Layout: `generateStaticParams()` returns both locales. The layout is `async`, reads `params.locale`, calls `notFound()` if `!hasLocale`, and renders `<html lang={locale} suppressHydrationWarning>`.

- [ ] **Step 1: Write failing tests**

```ts
// src/i18n/locales.test.ts
describe('negotiateLocale', () => {
  it('prefers a valid cookie', () => expect(negotiateLocale('en-US,en;q=0.9', 'sw')).toBe('sw'));
  it('ignores an invalid cookie', () => expect(negotiateLocale('sw-TZ,sw;q=0.9', 'fr')).toBe('sw'));
  it('uses highest q-value supported language', () =>
    expect(negotiateLocale('fr;q=1, sw;q=0.8, en;q=0.5')).toBe('sw'));
  it('falls back to en', () => expect(negotiateLocale(null)).toBe('en'));
  it('falls back to en for garbage header', () => expect(negotiateLocale(';;;q=abc')).toBe('en'));
});
describe('localizePath', () => {
  it('swaps locale', () => expect(localizePath('/en/news/energy-expansion', 'sw')).toBe('/sw/news/energy-expansion'));
  it('prefixes unprefixed path', () => expect(localizePath('/about', 'en')).toBe('/en/about'));
  it('handles root', () => expect(localizePath('/', 'sw')).toBe('/sw'));
  it('keeps query', () => expect(localizePath('/en/contact?business=energy', 'sw')).toBe('/sw/contact?business=energy'));
  it('does not treat /english as a locale', () => expect(localizePath('/english', 'sw')).toBe('/sw/english'));
});
it('stripLocale', () => { expect(stripLocale('/sw')).toBe('/'); expect(stripLocale('/en/about')).toBe('/about'); });
// src/i18n/dictionaries/dictionaries.test.ts
it('sw has every key en has and no empty strings', () => {
  const flat = (o: object, p = ''): string[] => Object.entries(o).flatMap(([k, v]) =>
    typeof v === 'object' ? flat(v, `${p}${k}.`) : [`${p}${k}`]);
  expect(flat(getDictionaryFor('sw')).sort()).toEqual(flat(getDictionaryFor('en')).sort());
  for (const loc of LOCALES) expect(JSON.stringify(getDictionaryFor(loc))).not.toMatch(/""/);
});
```

- [ ] **Step 2:** Run `npx jest src/i18n`. Expected: FAIL.
- [ ] **Step 3:** Implement. In `proxy.ts`, read the guide at `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` (find it with `ls`).
- [ ] **Step 4:** Run `npx jest src/i18n`. Expected: PASS.
- [ ] **Step 5:** Run `npm run dev` and check:
  - `curl -sI localhost:3000/ -H 'Accept-Language: sw'` returns `location: /sw`.
  - `curl -sI localhost:3000/fr/about` returns a redirect to `/en/fr/about`. That path becomes a 404 once Task 8 adds the catch-all.
- [ ] **Step 6:** Commit `feat: locale routing and dictionaries`.

---

### Task 3: Theme system with circle reveal

Implements `docs/theme-reveal-effect.md`, with file names mapped to `CLAUDE.md` and two fixes: the CSS is scoped to `.theme-reveal`, and named elements are suppressed during the reveal.

**Files:**
- Create:
  - `src/interfaces/theme.interface.ts`
  - `src/contexts/theme.context.tsx`
  - `src/providers/theme.provider.tsx`
  - `src/hooks/useTheme.ts`
  - `src/utils/themeTransition.util.ts`
  - `src/utils/themeInitScript.util.ts`
  - `src/components/ui/ThemeToggle.tsx`
  - `src/sections/layout/ThemeToggleConnected.tsx`
- Modify: `src/styles/view-transitions.css`, `src/app/[locale]/layout.tsx` (inline init script as the first child of `<head>`, wrap in `ThemeProvider`)
- Test: `src/utils/themeTransition.util.test.ts`, `src/providers/theme.provider.test.tsx`, `src/components/ui/ThemeToggle.test.tsx`

**Interfaces:**
- `type ThemePreference = 'light' | 'dark' | 'system'`
- `type ResolvedTheme = 'light' | 'dark'`
- `interface RevealOriginI { x: number; y: number }`
- `ThemeContextPropsI { theme: ThemePreference; resolvedTheme: ResolvedTheme; setTheme(t: ThemePreference): void }`
- `THEME_STORAGE_KEY = 'asas-theme'`
- `THEME_INIT_SCRIPT: string`: an IIFE that reads localStorage (try/catch), falls back to `matchMedia('(prefers-color-scheme: dark)')`, and adds `light`/`dark` to `document.documentElement`
- `revealThemeChange(origin: RevealOriginI, applyTheme: () => void): void`: same as the doc (650 ms, `cubic-bezier(0.65, 0, 0.35, 1)`, fallbacks). In addition, it adds the `theme-reveal` class to `<html>` before `startViewTransition` and removes it in `transition.finished.finally(...)`.
- `ThemeToggle({ resolvedTheme, labels: { toLight, toDark }, onToggle(origin: RevealOriginI): void })`: pure, a 44px icon button
- `ThemeToggleConnected({ labels })`: uses `useTheme` and calls `revealThemeChange(origin, () => flushSync(() => setTheme(next)))`
- Provider:
  - Lazy-inits `theme` from localStorage (default `'system'`) and persists it on change.
  - Follows `prefers-color-scheme` live while `theme === 'system'`.
  - Applies the class in `useLayoutEffect` (as in the doc).

- [ ] **Step 1: Write failing tests**

```ts
// src/utils/themeTransition.util.test.ts
it('applies instantly when startViewTransition is missing', () => {
  const apply = jest.fn();
  // @ts-expect-error test
  delete document.startViewTransition;
  revealThemeChange({ x: 10, y: 10 }, apply);
  expect(apply).toHaveBeenCalledTimes(1);
  expect(document.documentElement.classList.contains('theme-reveal')).toBe(false);
});
it('adds theme-reveal during the transition and removes it after', async () => {
  let finish!: () => void;
  const finished = new Promise<void>((r) => (finish = r));
  document.startViewTransition = jest.fn((cb: () => void) => {
    expect(document.documentElement.classList.contains('theme-reveal')).toBe(true);
    cb();
    return { ready: Promise.resolve(), finished, updateCallbackDone: Promise.resolve(), skipTransition() {} };
  }) as never;
  document.documentElement.animate = jest.fn() as never;
  revealThemeChange({ x: 0, y: 0 }, jest.fn());
  finish(); await finished; await Promise.resolve();
  expect(document.documentElement.classList.contains('theme-reveal')).toBe(false);
});
it('skips the animation when reduced motion is preferred', () => { /* matchMedia → matches: true for reduce; expect startViewTransition not called */ });
// src/providers/theme.provider.test.tsx
it('resolves system theme from matchMedia and puts the class on <html>', () => { /* mock matchMedia dark → html has class "dark" */ });
it('persists an explicit choice to localStorage under asas-theme', () => { /* setTheme('light') → localStorage.getItem('asas-theme') === 'light' */ });
// src/components/ui/ThemeToggle.test.tsx
it('labels the action and passes the button centre', async () => {
  const onToggle = jest.fn();
  render(<ThemeToggle resolvedTheme="light" labels={{ toLight: 'Light', toDark: 'Switch to dark mode' }} onToggle={onToggle} />);
  await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(onToggle).toHaveBeenCalledWith(expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }));
});
```

- [ ] **Step 2:** Run `npx jest src/utils/themeTransition src/providers src/components/ui/ThemeToggle`. Expected: FAIL.
- [ ] **Step 3:** Implement. `view-transitions.css` gets:

```css
::view-transition { pointer-events: none; }
html.theme-reveal * { view-transition-name: none !important; }
html.theme-reveal::view-transition-old(root),
html.theme-reveal::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
```

  Render the init script with the `InlineScript` pattern from `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` (`type="text/plain"` on the client). Put `suppressHydrationWarning` on `<html>`.
- [ ] **Step 4:** Run the same jest command. Expected: PASS.
- [ ] **Step 5:** Commit `feat: theme provider with circle reveal toggle`.

---

### Task 4: Content model, constants and content service

**Files:**
- Create: `src/interfaces/content.interface.ts`, `src/constants/contact.constants.ts`, `src/constants/site.constants.ts`, `src/utils/years.util.ts`, `src/content/index.ts`, `src/services/content.service.ts`
- Test: `src/services/content.service.test.ts` (uses a fixture bundle via `jest.mock('@/content')`), `src/utils/years.util.test.ts`

**Interfaces:**
- `content.interface.ts`:

```ts
export type SectorSlug = 'energy' | 'logistics' | 'dairy-farms' | 'real-estate';
export type ProductCategory = 'milk' | 'yogurt' | 'mtindi' | 'butter' | 'powder';
export interface ImageI { src: string; alt: string; width: number; height: number }
export interface CtaI { label: string; href: string }            // href is locale-less, e.g. '/contact'
export interface ServiceI { title: string; description: string }
export interface CompanyI { slug: string; name: string; tagline: string; summary: string; services: ServiceI[]; image?: ImageI; highlights?: string[] }
export interface SectorI { slug: SectorSlug; name: string; tagline: string; summary: string; image: ImageI; companies: CompanyI[] }
export interface ProductI { slug: string; name: string; category: ProductCategory; sizes: string[]; image: ImageI }
export interface NewsItemI { slug: string; title: string; date: string /* YYYY-MM-DD */; category: string; excerpt: string; body: string[]; image?: ImageI }
export interface TimelineEventI { year: number; title: string; description: string }
export interface ValueI { title: string; description: string }
export interface TeamMemberI { name: string; role: string; image?: ImageI }
export interface OfficeI { id: 'iringa' | 'dar'; name: string; isHeadquarters: boolean; address: string; mapUrl: string }
export interface SustainabilityTabI { id: 'approach' | 'hse' | 'compliance' | 'community' | 'equality'; title: string; paragraphs: string[]; points?: string[] }
export interface ClientI { name: string; logo: ImageI }
export interface HomeContentI { hero: { eyebrow: string; title: string; highlight: string; subtitle: string; image: ImageI; primaryCta: CtaI; secondaryCta: CtaI }; storyTeaser: { title: string; body: string; cta: CtaI; image: ImageI }; closingCta: { title: string; body: string; cta: CtaI } }
export interface AboutContentI { intro: { title: string; highlight: string; body: string[] }; timeline: TimelineEventI[]; values: ValueI[]; team: TeamMemberI[]; videoId: string }
export interface CareersContentI { intro: { title: string; body: string[] }; reasons: ValueI[]; roles: { title: string; location: string; type: string; summary: string }[] }
export interface ContentBundleI { home: HomeContentI; about: AboutContentI; sectors: SectorI[]; products: ProductI[]; news: NewsItemI[]; sustainability: { intro: { title: string; body: string }; tabs: SustainabilityTabI[] }; careers: CareersContentI; offices: OfficeI[] }
```

- `contact.constants.ts`:
  - `PHONES: readonly { display: string; tel: string; labelKey: 'callsWhatsapp' | 'calls' }[]`: `{ '+255 749 700 500', '+255749700500', 'callsWhatsapp' }`, then `{ '+255 793 600 600', '+255793600600', 'calls' }`
  - `EMAIL = 'info@asas.co.tz'`
  - `WHATSAPP_NUMBER = '255749700500'`
  - `SOCIAL_LINKS = { facebook: 'https://www.facebook.com/AsasDairiesLtd', instagram: 'https://www.instagram.com/asas_dairies', whatsapp: 'https://wa.me/255749700500' }`
  - `AI_TRACKER_URL`: `curl -sI https://vts.asas.co.tz`; use `https://` if it answers 2xx/3xx, else `http://vts.asas.co.tz`
- `site.constants.ts`:
  - `FOUNDING_YEAR = 1936`
  - `SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://asas.co.tz'` (add `.env.example`)
  - `CLIENTS: ClientI[]` (not localized)
- `years.util.ts`: `yearsSince(year: number, now: Date): number`
- `content/index.ts`: `export const CONTENT: Record<Locale, ContentBundleI>`, importing `./en` and `./sw`.
  - In this task, `src/content/en/index.ts` and `src/content/sw/index.ts` export minimal typed bundles (empty arrays, short real strings from the old site). Tasks 5 and 6 fill them.
  - Service tests don't use them: they `jest.mock('@/content')` with an inline fixture.
- `content.service.ts`:
  - `getContent(locale): ContentBundleI`
  - `getSectors(locale): SectorI[]`
  - `getSector(locale, slug: string): SectorI | undefined`
  - `getProducts(locale): ProductI[]`
  - `getNews(locale): NewsItemI[]` (sorted by date desc; ties broken by title)
  - `getNewsItem(locale, slug): NewsItemI | undefined`
  - `getAdjacentNews(locale, slug): { newer?: NewsItemI; older?: NewsItemI }`
  - `getNewsCategories(locale): string[]` (unique, in first-seen order of sorted news)
  - `getStats(locale, now: Date): { years: number; companies: number; sectors: number; offices: number }`

- [ ] **Step 1: Write failing tests**

```ts
it('yearsSince', () => expect(yearsSince(1936, new Date('2026-11-13'))).toBe(90));
it('getNews sorts newest first', () => expect(getNews('en').map(n => n.slug)).toEqual(['b-2025', 'a-2017']));
it('getSector returns undefined for unknown slug', () => expect(getSector('en', 'mining')).toBeUndefined());
it('getAdjacentNews at the newest item has no newer', () => expect(getAdjacentNews('en', 'b-2025')).toEqual({ newer: undefined, older: expect.objectContaining({ slug: 'a-2017' }) }));
it('getStats counts companies across sectors', () =>
  expect(getStats('en', new Date('2026-01-01'))).toEqual({ years: 90, companies: 3, sectors: 2, offices: 2 }));
```

  The fixture (inline in the test) has 2 sectors with 1 + 2 companies, 2 offices, and news items `a-2017` (2017-04-02) and `b-2025` (2025-06-05).
- [ ] **Step 2:** Run `npx jest src/services/content src/utils/years`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run the same command. Expected: PASS. Also run `npx tsc --noEmit`. Expected: 0 errors.
- [ ] **Step 5:** Commit `feat: content model, constants and content service`.

---

### Task 5: English content and images from the live site

**Files:**
- Create:
  - `scripts/download-images.mjs`
  - `public/images/{brand,home,sectors,products,clients,news,about}/…`
  - `src/content/images.ts`
  - `src/content/en/{home,about,sectors,products,sustainability,careers,offices}.ts`
  - `src/content/en/news/<slug>.ts` + `src/content/en/news/index.ts`
- Modify: `src/content/en/index.ts`, `src/constants/site.constants.ts` (`CLIENTS`)
- Test: `src/content/content.integrity.test.ts`

**Interfaces:**
- Consumes: the `ContentBundleI` types (Task 4).
- Produces:
  - A complete `CONTENT.en`.
  - `IMAGES` records in `src/content/images.ts` (`Record<string, ImageI>`, with real `width`/`height` read from the files).

- [ ] **Step 1: Write the failing integrity test** (it runs over every locale in `CONTENT`, so Task 6 inherits it)

```ts
describe.each(LOCALES)('content integrity: %s', (locale) => {
  const c = CONTENT[locale];
  it('has the 4 sectors in order', () => expect(c.sectors.map(s => s.slug)).toEqual(['energy', 'logistics', 'dairy-farms', 'real-estate']));
  it('has 8 companies with unique slugs', () => {
    const slugs = c.sectors.flatMap(s => s.companies.map(co => co.slug));
    expect(slugs).toHaveLength(8); expect(new Set(slugs).size).toBe(8);
  });
  it('every image file exists in public/', () => {
    const imgs = JSON.stringify(c).match(/"\/images\/[^"]+"/g) ?? [];
    for (const src of imgs) expect(fs.existsSync(path.join('public', JSON.parse(src)))).toBe(true);
  });
  it('news slugs are unique and dates are valid YYYY-MM-DD', () => { /* … */ });
  it('has no placeholder or dead links', () => {
    const s = JSON.stringify(c);
    expect(s).not.toMatch(/lorem|TBD|javascript:|"#"|demo-business|All Page General|Pngtree|1 800 222 000|Dares Salaam|88 years/i);
  });
  it('every CtaI href is an internal locale-less path', () => {
    const hrefs = [...JSON.stringify(c).matchAll(/"href":"([^"]+)"/g)].map(m => m[1]);
    for (const h of hrefs) expect(h).toMatch(/^\/(?!en\/|sw\/)/);
  });
});
```

- [ ] **Step 2:** Run `npx jest src/content`. Expected: FAIL (not enough sectors/companies, missing images).
- [ ] **Step 3: Gather content.** Fetch each old page and write its text into the content files:
  - `/about?u=7`, `/history?u=8`, `/team?u=9`
  - `/sustainability?u=11`, `/health-safety?u=14`, `/compliance?u=12`, `/csr?u=15`
  - `/transfuel-logistics?u=33`, `/ASAS-transporters?u=34`, `/clearing-forwarding?u=35`
  - `/ASAS-dairy?u=42`, `/ASAS-dairies-farm?u=36`, `/afrifarm?u=43`
  - `/ASAS-energies?u=37`, `/ASAS-real-estate?u=38`
  - `/news?u=6` and each news item

  Rewrite the copy to be short and plain: one idea per paragraph, and no paragraph over about 60 words. Apply spec §10 corrections. Drop template text, stock and "test" images, and the generic icon row.
  - Company slugs: `asas-energies`, `transfuel-logistics`, `asas-transporters`, `universal-clearing-forwarding`, `asas-dairy`, `asas-dairies-farm`, `afri-farm`, `asas-real-estate`.
  - Products come from the Dairy page: yogurts, fresh milk, full cream, butter, mtindi and powder, each with its sizes. Drop duplicates.
  - Home hero: title `Powering Tanzania since 1936.`, highlight `since 1936`.
  - Map URLs use `https://www.google.com/maps/search/?api=1&query=<encoded address>`.
- [ ] **Step 4:** Write `scripts/download-images.mjs`: a URL → `public/images/...` list. It skips existing files and fails loudly on non-200. Run `node scripts/download-images.mjs`. Prefer the full-size originals over `100x100` thumbnails.
- [ ] **Step 5:** Run `npx jest src/content`. Expected: the `en` block PASSES; the `sw` block still fails (fixed in Task 6).
- [ ] **Step 6:** Commit `feat: english content and images from asas.co.tz`.

---

### Task 6: Swahili content

**Files:**
- Create: `src/content/sw/*.ts` (same files as `en`), `src/content/sw/news/*.ts`, `src/content/sw/README.md`
- Modify: `src/content/sw/index.ts`
- Test: extend `src/content/content.integrity.test.ts`

- [ ] **Step 1: Write the failing parity test**

```ts
it('sw mirrors en structure', () => {
  const ids = (b: ContentBundleI) => ({
    sectors: b.sectors.map(s => [s.slug, s.companies.map(c => c.slug)]),
    products: b.products.map(p => p.slug), news: b.news.map(n => n.slug),
    tabs: b.sustainability.tabs.map(t => t.id), offices: b.offices.map(o => o.id),
    timeline: b.about.timeline.map(t => t.year),
  });
  expect(ids(CONTENT.sw)).toEqual(ids(CONTENT.en));
});
it('sw long text is actually translated', () => {
  const longEn = new Set(JSON.stringify(CONTENT.en).match(/"[^"]{60,}"/g));
  const leaked = (JSON.stringify(CONTENT.sw).match(/"[^"]{60,}"/g) ?? []).filter(s => longEn.has(s));
  expect(leaked).toEqual([]);
});
```

- [ ] **Step 2:** Run `npx jest src/content`. Expected: FAIL.
- [ ] **Step 3:** Translate every string into natural, simple Swahili. Keep proper nouns (company names, product names like "Mtindi", place names) as they are. Image objects are shared via `IMAGES`, but alt text is translated. `README.md` states: "First-draft translation. Needs native-speaker review before launch."
- [ ] **Step 4:** Run `npx jest src/content`. Expected: PASS for both locales.
- [ ] **Step 5:** Commit `feat: swahili content draft`.

---

### Task 7: Motion primitives and view-transition styles

**Files:**
- Create: `src/components/motion/{PageTransition,Reveal,CountUp,Marquee,AnimatedTabs,FilterChips}.tsx`, `src/components/motion/index.ts`
- Modify: `src/styles/view-transitions.css`
- Test: `src/components/motion/motion.test.tsx`

**Interfaces:**
- `PageTransition({ children })`: `<ViewTransition enter="page-enter" exit="page-exit" default="none">`
- `Reveal({ children, delay?: number, as?: 'div' | 'section' | 'li', stagger?: boolean })`: `whileInView` fade + 16px rise, `viewport={{ once: true, margin: '-10% 0px' }}`. With `stagger`, direct children animate 50 ms apart.
- `CountUp({ to: number, suffix?: string, durationMs?: number = 1200 })`: counts when in view. Under reduced motion it renders `to` immediately. It always exposes the final value as `aria-label` text.
- `Marquee({ items: ReactNode[], speedSeconds?: number = 40, label: string })`: CSS keyframe loop over a duplicated track (the duplicate is `aria-hidden`). Pauses on hover/focus-within. Static under reduced motion.
- `AnimatedTabs<T extends string>({ tabs: { id: T; label: string }[], active: T, onChange(id: T): void, idPrefix: string })`: `role="tablist"`, arrow-key navigation, sliding indicator via `layoutId={`${idPrefix}-indicator`}`.
- `FilterChips<T extends string>({ options: { id: T; label: string; count?: number }[], active: T, onChange(id: T): void, label: string })`: `role="radiogroup"` with a sliding active background.
- `view-transitions.css` adds:
  - `page-enter` / `page-exit` classes: exit 150 ms fade out; enter 250 ms fade + `translateY(12px → 0)`, delayed 120 ms
  - `.morph` group at 400 ms with the `via-blur` keyframe (from the Next view-transitions guide)
  - Header anchoring: `::view-transition-group(site-header) { animation: none; z-index: 100 }`, `::view-transition-old(site-header) { display: none }`, `::view-transition-new(site-header) { animation: none }`
  - The guide's reduced-motion block (`animation-duration: 0s !important` on `::view-transition-*(*)`)

- [ ] **Step 1: Write failing tests**

```tsx
it('CountUp shows the final value immediately under reduced motion', () => {
  mockMatchMedia({ '(prefers-reduced-motion: reduce)': true });
  render(<MotionConfig reducedMotion="user"><CountUp to={90} suffix="+" /></MotionConfig>);
  expect(screen.getByText('90+')).toBeInTheDocument();
});
it('Marquee duplicates items for the loop and hides the copy from AT', () => {
  render(<Marquee label="Our clients" items={[<span key="a">Shell</span>]} />);
  expect(screen.getAllByText('Shell')).toHaveLength(2);
  expect(screen.getAllByText('Shell')[1].closest('[aria-hidden="true"]')).not.toBeNull();
});
it('AnimatedTabs supports arrow keys', async () => {
  const onChange = jest.fn();
  render(<AnimatedTabs idPrefix="t" active="a" onChange={onChange} tabs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} />);
  screen.getByRole('tab', { name: 'A' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(onChange).toHaveBeenCalledWith('b');
  expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
});
it('FilterChips marks the active option', () => { /* role=radio aria-checked */ });
```

- [ ] **Step 2:** Run `npx jest src/components/motion`. Expected: FAIL.
- [ ] **Step 3:** Implement. Import from `motion/react`. All motion components are `'use client'`.
- [ ] **Step 4:** Run `npx jest src/components/motion`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: motion primitives and view-transition styles`.

---

### Task 8: Site shell: header, mobile menu, footer, language switch, 404

**Files:**
- Create:
  - `src/sections/layout/{SiteHeader,MobileMenu,SiteFooter,LanguageSwitch,SkipLink}.tsx`
  - `src/providers/AppProviders.tsx` (`ThemeProvider` + `MotionConfig reducedMotion="user"`)
  - `src/app/[locale]/not-found.tsx`
  - `src/app/[locale]/[...rest]/page.tsx` (calls `notFound()`)
- Modify: `src/app/[locale]/layout.tsx` (renders `SkipLink`, `SiteHeader`, `<main id="main">`, `SiteFooter`; header and footer get the dictionary slices as props)
- Test: `src/sections/layout/layout.test.tsx`

**Interfaces:**
- Consumes: `getDictionary()`, `localizePath`, `LOCALE_COOKIE`, `ThemeToggleConnected`, `PHONES`, `EMAIL`, `SOCIAL_LINKS`, `AI_TRACKER_URL`, `Button`, `Container`.
- `SiteHeader({ locale, dict })` (client):
  - Sticky, with `style={{ viewTransitionName: 'site-header' }}`. A translucent background with `backdrop-blur` appears after 8px of scroll.
  - From `lg` up: logo, flat nav (About, Businesses, Sustainability, News, Careers), `LanguageSwitch`, theme toggle, `Contact` button.
  - Below `lg`: logo + menu button (44px; the icon morphs ☰→✕).
  - The active nav item gets a sliding underline (`layoutId="nav-underline"`), active when `stripLocale(pathname)` starts with the item's path.
- `MobileMenu({ open, onClose, locale, dict })`:
  - A full-screen panel (`AnimatePresence`, fade + slide). Links stagger in at 50 ms. It also holds the language switch, theme toggle and Contact button.
  - Focus is trapped while open, Escape closes it, the body scroll is locked, and it closes on route change.
- `LanguageSwitch({ locale, labels })`: two `<Link>`s, `EN` and `SW`, with `href={localizePath(pathname + search, target)}`. `onClick` sets `document.cookie = 'asas-locale=<target>; path=/; max-age=31536000'`. The current locale gets `aria-current="true"`. The links are `hrefLang`-tagged.
- `SiteFooter({ locale, dict })`:
  - Logo + tagline "Excellence in all we do".
  - Nav links, both phones with labels (`tel:` links), email, socials (`aria-label`s), AI Tracker link.
  - Credit "Developed & maintained by Iakka Automation" (→ https://iakka.com).
  - `© {year} ASAS Group`. Compute the year in a `'use cache'` helper if `cacheComponents` rejects `new Date()` during prerender (check the build output).
- `not-found.tsx`: localized title/body + "Go home" button (read the locale via `next/root-params`).

- [ ] **Step 1: Write failing tests**

```tsx
it('nav links are locale-prefixed', () => {
  renderWithPath('/sw/news', <SiteHeader locale="sw" dict={getDictionaryFor('sw')} />);
  expect(screen.getAllByRole('link', { name: getDictionaryFor('sw').nav.about })[0]).toHaveAttribute('href', '/sw/about');
});
it('language switch keeps the current page', () => {
  renderWithPath('/en/businesses/logistics', <LanguageSwitch locale="en" labels={getDictionaryFor('en').language} />);
  expect(screen.getByRole('link', { name: /SW/ })).toHaveAttribute('href', '/sw/businesses/logistics');
});
it('mobile menu closes on Escape and returns focus to the trigger', async () => { /* … */ });
it('footer lists both phones with labels and correct tel links', () => {
  render(<SiteFooter locale="en" dict={getDictionaryFor('en')} />);
  expect(screen.getByRole('link', { name: /\+255 749 700 500/ })).toHaveAttribute('href', 'tel:+255749700500');
  expect(screen.getByRole('link', { name: /\+255 793 600 600/ })).toHaveAttribute('href', 'tel:+255793600600');
  expect(screen.getByText(getDictionaryFor('en').footer.callsWhatsapp)).toBeInTheDocument();
});
```

  `renderWithPath` mocks `next/navigation`'s `usePathname`/`useSearchParams`. Put it in `src/test-utils/renderWithPath.tsx`.
- [ ] **Step 2:** Run `npx jest src/sections/layout`. Expected: FAIL.
- [ ] **Step 3:** Implement. Wrap reads of `useSearchParams` in `<Suspense>` (required under `cacheComponents`).
- [ ] **Step 4:** Run `npx jest src/sections/layout`. Expected: PASS. Run `npm run build`. Expected: success, with `/en` and `/sw` prerendered.
- [ ] **Step 5:** Commit `feat: site shell with header, mobile menu, footer and 404`.

---

### Task 9: Home page

**Files:**
- Create:
  - `src/app/[locale]/page.tsx`
  - `src/sections/home/{HeroSection,StatsSection,SectorsBentoSection,StoryTeaserSection,LatestNewsSection,ClientsSection,ClosingCtaSection}.tsx`
  - `src/components/domain/{SectorCard,NewsCard,StatItem}.tsx`
- Test: `src/sections/home/home.test.tsx`, `src/components/domain/SectorCard.test.tsx`

**Interfaces:**
- Consumes: `getContent`, `getSectors`, `getNews`, `getStats`, `CLIENTS`, the motion primitives, `ImageFrame`, `SectionHeading`.
- `SectorCard({ sector: SectorI, locale, size: 'lg' | 'md', moreLabel })`:
  - A link to `/{locale}/businesses/{slug}`.
  - The image is wrapped in `<ViewTransition name={`sector-${slug}`} share="morph" default="none">`.
  - Shows a sector tint chip (`data-sector={slug}`), the company count, and an arrow that nudges on hover.
  - Hover lift −3px, image scale 1.04 inside `rounded-md`.
- `NewsCard({ item: NewsItemI, locale, dateFormat: Intl.DateTimeFormat })`:
  - The image is wrapped in `<ViewTransition name={`news-${slug}`} share="morph" default="none">`.
  - Dates are formatted with `Intl.DateTimeFormat(locale === 'sw' ? 'sw-TZ' : 'en-GB', { dateStyle: 'medium' })` from the ISO string with `timeZone: 'UTC'` (deterministic on server and client).
- `StatItem({ value: number, suffix?: string, label: string })`: wraps `CountUp`.
- Page:
  - `generateMetadata` (title/description from content; Task 14 adds alternates).
  - The body is wrapped in `PageTransition`.
  - Sections in spec order: hero → stats → sector bento (asymmetric 2-col: first card `lg`, spanning 2 rows on `md+`; mobile 1 col) → story teaser → latest 3 news → client marquee → closing CTA.
- Hero: `h1` uses `--text-5xl`, with the highlight in red. The image is `priority`. Two buttons (`/contact`, `/businesses`). Mobile: text stacks above the image.

- [ ] **Step 1: Write failing tests**

```tsx
it('hero shows the headline with the highlighted words', () => {
  render(<HeroSection hero={CONTENT.en.home.hero} locale="en" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Powering Tanzania since 1936.');
  expect(screen.getByText('since 1936').tagName).toBe('SPAN');
});
it('stats render computed values', () => {
  render(<StatsSection stats={{ years: 90, companies: 8, sectors: 4, offices: 2 }} labels={getDictionaryFor('en').stats} />);
  expect(screen.getByText('90')).toBeInTheDocument(); expect(screen.getByText('8')).toBeInTheDocument();
});
it('SectorCard links to the sector page', () => {
  render(<SectorCard sector={CONTENT.en.sectors[0]} locale="sw" size="md" moreLabel="Zaidi" />);
  expect(screen.getByRole('link')).toHaveAttribute('href', '/sw/businesses/energy');
});
it('latest news shows exactly 3 newest items', () => { /* … */ });
```

- [ ] **Step 2:** Run `npx jest src/sections/home src/components/domain/SectorCard`. Expected: FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run the same command. Expected: PASS. In `npm run dev`, check `/en` and `/sw` at 320, 768 and 1280 widths: no horizontal scroll, and the sector cards reflow.
- [ ] **Step 5:** Commit `feat: home page`.

---

### Task 10: About page

**Files:**
- Create:
  - `src/app/[locale]/about/page.tsx`
  - `src/sections/about/{AboutIntroSection,TimelineSection,ValuesSection,TeamSection,VideoSection}.tsx`
  - `src/components/domain/{TimelineItem,ValueCard}.tsx`
  - `src/components/ui/YouTubeFacade.tsx`
- Test: `src/sections/about/about.test.tsx`, `src/components/ui/YouTubeFacade.test.tsx`

**Interfaces:**
- `TimelineSection({ events: TimelineEventI[], heading })`:
  - A vertical line, drawn as it scrolls into view with `scaleY` from 0 → 1 (`useScroll` + `useTransform`).
  - Items reveal alternately left/right on `md+` and in a single column on mobile.
  - `id="history"` (used by the Task 14 redirects).
- `TeamSection({ members: TeamMemberI[], heading })`: `id="team"`. **If `members` is empty, render nothing.**
- `YouTubeFacade({ videoId, title, playLabel })`: a `rounded-md` thumbnail from `https://i.ytimg.com/vi/<id>/hqdefault.jpg` with a play button. On click it swaps to an `<iframe src="https://www.youtube-nocookie.com/embed/<id>?autoplay=1">`. Add `i.ytimg.com` to `images.remotePatterns` in `next.config.ts`.

- [ ] **Step 1: Write failing tests**

```tsx
it('timeline lists events in year order', () => {
  render(<TimelineSection heading="History" events={CONTENT.en.about.timeline} />);
  const years = screen.getAllByTestId('timeline-year').map(e => Number(e.textContent));
  expect(years).toEqual([...years].sort((a, b) => a - b)); expect(years[0]).toBe(1936);
});
it('team section renders nothing when empty', () => {
  const { container } = render(<TeamSection heading="Team" members={[]} />); expect(container).toBeEmptyDOMElement();
});
it('YouTubeFacade loads the iframe only after click', async () => {
  render(<YouTubeFacade videoId="T51Eqp9eGgY" title="ASAS" playLabel="Play video" />);
  expect(document.querySelector('iframe')).toBeNull();
  await userEvent.click(screen.getByRole('button', { name: 'Play video' }));
  expect(document.querySelector('iframe')?.getAttribute('src')).toContain('youtube-nocookie.com/embed/T51Eqp9eGgY');
});
```

- [ ] **Step 2:** Run `npx jest src/sections/about src/components/ui/YouTubeFacade`. Expected: FAIL.
- [ ] **Step 3:** Implement. The page is wrapped in `PageTransition`.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit `feat: about page`.

---

### Task 11: Businesses index, sector pages and dairy catalogue

**Files:**
- Create:
  - `src/app/[locale]/businesses/page.tsx`
  - `src/app/[locale]/businesses/[sector]/page.tsx`
  - `src/sections/businesses/{BusinessesGridSection,SectorHeroSection,CompanySection,ProductCatalogueSection,SectorCtaSection}.tsx`
  - `src/components/domain/{CompanyBlock,ProductCard}.tsx`
- Test: `src/sections/businesses/businesses.test.tsx`

**Interfaces:**
- `[sector]/page.tsx`:
  - `generateStaticParams()` returns the 4 slugs × 2 locales. It calls `notFound()` when `getSector` returns undefined.
  - Hero image: `<ViewTransition name={`sector-${slug}`} share="morph" default="none">`, the pair to `SectorCard`.
  - Below the hero: a sticky in-page company jump bar when the sector has more than one company (anchor links to `#<company-slug>`, active one highlighted).
- `CompanySection({ company: CompanyI, index })`:
  - `id={company.slug}` and `scroll-margin-top` = header height.
  - Alternating image side on `md+`. Services are a fluid grid of `rounded-md` bordered cards.
- `ProductCatalogueSection({ products: ProductI[], labels })`:
  - Rendered only on `dairy-farms`, inside the `asas-dairy` company section.
  - `FilterChips` for `all` plus the categories that have products, with counts.
  - The grid uses `AnimatePresence mode="popLayout"` + `layout` so items animate in, out and to new positions.
  - `ProductCard` shows the image, name and size chips.
- `SectorCtaSection({ sector, locale, dict })`: a button to `/{locale}/contact?business={sector.slug}` and a WhatsApp quick link.

- [ ] **Step 1: Write failing tests**

```tsx
it('company sections have anchor ids', () => {
  const s = CONTENT.en.sectors.find(x => x.slug === 'logistics')!;
  const { container } = render(<>{s.companies.map((c, i) => <CompanySection key={c.slug} company={c} index={i} />)}</>);
  expect(container.querySelector('#transfuel-logistics')).not.toBeNull();
  expect(container.querySelector('#universal-clearing-forwarding')).not.toBeNull();
});
it('product filter shows only the chosen category', async () => {
  render(<ProductCatalogueSection products={CONTENT.en.products} labels={getDictionaryFor('en').products} />);
  await userEvent.click(screen.getByRole('radio', { name: /Butter/ }));
  await waitFor(() => expect(screen.getAllByTestId('product-card').every(c => c.dataset.category === 'butter')).toBe(true));
});
it('sector CTA pre-selects the business', () => {
  render(<SectorCtaSection sector={CONTENT.en.sectors[0]} locale="en" dict={getDictionaryFor('en')} />);
  expect(screen.getByRole('link', { name: getDictionaryFor('en').actions.contactUs })).toHaveAttribute('href', '/en/contact?business=energy');
});
```

- [ ] **Step 2:** Run `npx jest src/sections/businesses`. Expected: FAIL.
- [ ] **Step 3:** Implement. Both pages are wrapped in `PageTransition`.
- [ ] **Step 4:** Run the same command. Expected: PASS. `npm run build` shows 8 sector routes plus 2 index routes. In dev, `/en/businesses/unknown` shows the localized 404.
- [ ] **Step 5:** Commit `feat: businesses and sector pages with dairy catalogue`.

---

### Task 12: Sustainability, Careers and News pages

**Files:**
- Create:
  - `src/app/[locale]/sustainability/page.tsx`
  - `src/sections/sustainability/SustainabilityTabsSection.tsx`
  - `src/app/[locale]/careers/page.tsx`
  - `src/sections/careers/{CareersIntroSection,OpenRolesSection}.tsx`
  - `src/app/[locale]/news/page.tsx`
  - `src/app/[locale]/news/[slug]/page.tsx`
  - `src/sections/news/{NewsGridSection,NewsArticleSection}.tsx`
- Test: `src/sections/sustainability/sustainability.test.tsx`, `src/sections/careers/careers.test.tsx`, `src/sections/news/news.test.tsx`

**Interfaces:**
- `SustainabilityTabsSection({ tabs: SustainabilityTabI[] })` (client):
  - `AnimatedTabs`, sticky below the header. The panel content cross-fades (`AnimatePresence mode="wait"`, 200 ms).
  - The initial tab comes from `location.hash` (`#hse`, `#compliance`, `#community`, `#equality`), default `approach`. Changing tabs updates the hash with `history.replaceState`.
  - On mobile the tablist scrolls horizontally inside its own container (never the page).
- `OpenRolesSection({ roles, empty: { title, body }, email })`: when `roles` is empty, it shows the empty state with a `mailto:info@asas.co.tz?subject=CV` button.
- `NewsGridSection({ items: NewsItemI[], categories: string[], locale, labels })`: `FilterChips` (all + categories) + an animated grid of `NewsCard`.
- `news/[slug]/page.tsx`:
  - `generateStaticParams` over all slugs. `notFound()` for unknown slugs.
  - The hero image uses `name={`news-${slug}`} share="morph" default="none"`.
  - The body paragraphs are `max-w-[65ch]`. Newer/older links come from `getAdjacentNews`, plus a back link to `/news`.

- [ ] **Step 1: Write failing tests**

```tsx
it('sustainability opens the tab named in the hash', () => {
  window.location.hash = '#hse';
  render(<SustainabilityTabsSection tabs={CONTENT.en.sustainability.tabs} />);
  expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(CONTENT.en.sustainability.tabs.find(t => t.id === 'hse')!.title);
});
it('sustainability ignores an unknown hash', () => { window.location.hash = '#zzz'; /* approach selected */ });
it('careers shows the empty state with a CV mailto', () => {
  render(<OpenRolesSection roles={[]} empty={{ title: 'No open roles right now', body: '…' }} email="info@asas.co.tz" />);
  expect(screen.getByRole('link', { name: /CV/ })).toHaveAttribute('href', 'mailto:info@asas.co.tz?subject=CV');
});
it('news filter narrows by category', async () => { /* click a category radio → every card has that category */ });
it('article shows newer/older navigation', () => { /* middle item → both links present */ });
```

- [ ] **Step 2:** Run `npx jest src/sections/sustainability src/sections/careers src/sections/news`. Expected: FAIL.
- [ ] **Step 3:** Implement. Every page is wrapped in `PageTransition`.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit `feat: sustainability, careers and news pages`.

---

### Task 13: Contact page with WhatsApp hand-off

**Files:**
- Create:
  - `src/interfaces/contact.interface.ts`
  - `src/services/contact.service.ts`
  - `src/app/[locale]/contact/page.tsx`
  - `src/sections/contact/{ContactChannelsSection,OfficesSection,ContactFormSection}.tsx`
  - `src/components/domain/OfficeCard.tsx`
- Test: `src/services/contact.service.test.ts`, `src/sections/contact/ContactFormSection.test.tsx`

**Interfaces:**
- `type BusinessOption = 'general' | SectorSlug`
- `ContactFormDataI { business: BusinessOption; name: string; contact: string; message: string }`
- `ContactFormErrorsI = Partial<Record<'name' | 'contact' | 'message', 'required' | 'tooShort' | 'tooLong' | 'invalidContact'>>`
- `ContactMessageLabelsI { greeting: string; business: string; name: string; contact: string; businessNames: Record<BusinessOption, string> }`
- `contact.service.ts`:
  - `parseBusiness(value: string | null): BusinessOption` (unknown → `'general'`)
  - `validateContactForm(data: ContactFormDataI): ContactFormErrorsI`:
    - name: trimmed, 2–80 characters
    - contact: an email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), or a phone of 9–15 digits after stripping `+`, spaces, `-` and `()`
    - message: trimmed, 10–1000 characters
  - `composeContactMessage(data, labels): string`: lines of greeting, `Business: …`, `Name: …`, `Contact: …`, a blank line, then the message (all trimmed)
  - `buildWhatsAppUrl(message: string, number = WHATSAPP_NUMBER): string` → `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  - `buildMailtoUrl(subject: string, body: string, to = EMAIL): string` (`encodeURIComponent` on both)
- `ContactFormSection({ dict })` (client):
  - Reads `?business=` via `useSearchParams` inside `<Suspense>`.
  - Validates on submit and on blur after the first submit. Errors animate in (height + opacity), are linked via `aria-describedby`, and are announced through an `aria-live="polite"` region.
  - On success it calls `window.open(url, '_blank', 'noopener')`, briefly shows the "Opening WhatsApp…" state, and the button morphs to a check.
  - The secondary link "Prefer email?" uses `buildMailtoUrl` with the same text.
- `ContactChannelsSection`: big `rounded-md` tiles for WhatsApp, Call (both numbers with labels) and Email.
- `OfficesSection`: two `OfficeCard`s (Iringa HQ badge, Dar es Salaam), each with a "Get directions" link to the office's `mapUrl` (`target="_blank" rel="noopener"`).

- [ ] **Step 1: Write failing tests**

```ts
it('parseBusiness falls back to general', () => {
  expect(parseBusiness('energy')).toBe('energy'); expect(parseBusiness('garbage')).toBe('general'); expect(parseBusiness(null)).toBe('general');
});
it('validates contact as email or phone', () => {
  const base = { business: 'general' as const, name: 'Asha', message: 'Habari, naomba bei ya mafuta.' };
  expect(validateContactForm({ ...base, contact: '+255 712 345 678' })).toEqual({});
  expect(validateContactForm({ ...base, contact: 'asha@example.co.tz' })).toEqual({});
  expect(validateContactForm({ ...base, contact: '12ab' })).toEqual({ contact: 'invalidContact' });
  expect(validateContactForm({ ...base, name: ' ', contact: '' })).toEqual({ name: 'required', contact: 'required' });
});
it('encodes special characters exactly once', () => {
  const url = buildWhatsAppUrl('Bei & punguzo? #1\nAsante 🙏 — ñ');
  expect(url.startsWith('https://wa.me/255749700500?text=')).toBe(true);
  expect(decodeURIComponent(url.split('?text=')[1])).toBe('Bei & punguzo? #1\nAsante 🙏 — ñ');
  expect(url).not.toMatch(/%25/);
});
it('composeContactMessage includes the business name', () => {
  expect(composeContactMessage({ business: 'energy', name: ' Asha ', contact: '0712345678', message: 'Hello there team' }, labelsEn))
    .toBe('Hello ASAS Group,\nBusiness: Energy\nName: Asha\nContact: 0712345678\n\nHello there team');
});
```

```tsx
it('pre-selects business from the query and opens WhatsApp on valid submit', async () => {
  mockSearchParams('business=dairy-farms'); const open = jest.spyOn(window, 'open').mockReturnValue(null);
  render(<ContactFormSection dict={getDictionaryFor('en')} />);
  expect(await screen.findByRole('combobox')).toHaveValue('dairy-farms');
  /* fill name/contact/message, submit */
  expect(open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/255749700500?text='), '_blank', 'noopener');
});
it('shows errors and does not open WhatsApp when invalid', async () => { /* submit empty → 3 alerts, open not called */ });
```

- [ ] **Step 2:** Run `npx jest src/services/contact src/sections/contact`. Expected: FAIL.
- [ ] **Step 3:** Implement. The page is wrapped in `PageTransition`.
- [ ] **Step 4:** Run the same command. Expected: PASS.
- [ ] **Step 5:** Commit `feat: contact page with whatsapp hand-off`.

---

### Task 14: SEO, old-URL redirects, sitemap and OG image

**Files:**
- Create: `src/utils/metadata.util.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/[locale]/opengraph-image.tsx`, `.env.example`
- Modify: `next.config.ts` (`redirects()`), every `page.tsx` `generateMetadata` (use `buildMetadata`)
- Test: `src/utils/metadata.util.test.ts`, `src/config/redirects.test.ts` (with the redirect list extracted to `src/config/redirects.config.ts` and imported by `next.config.ts`)

**Interfaces:**
- `buildMetadata({ locale, path, title, description, image? }): Metadata`:
  - `title`: `"<title> | ASAS Group"`; home uses `"ASAS Group of Companies"`
  - `metadataBase: new URL(SITE_URL)`
  - `alternates: { canonical: `/${locale}${path}`, languages: { en: `/en${path}`, sw: `/sw${path}`, 'x-default': `/en${path}` } }`
  - `openGraph` with `locale: 'en_TZ' | 'sw_TZ'`
- `OLD_URL_REDIRECTS: { source: string; destination: string; permanent: true }[]`:

| source | destination |
|---|---|
| `/about` | `/en/about` |
| `/history` | `/en/about#history` |
| `/team` | `/en/about#team` |
| `/sustainability` | `/en/sustainability` |
| `/health-safety` | `/en/sustainability#hse` |
| `/compliance` | `/en/sustainability#compliance` |
| `/csr` | `/en/sustainability#community` |
| `/ASAS-energies` | `/en/businesses/energy` |
| `/transfuel-logistics` | `/en/businesses/logistics#transfuel-logistics` |
| `/ASAS-transporters` | `/en/businesses/logistics#asas-transporters` |
| `/clearing-forwarding` | `/en/businesses/logistics#universal-clearing-forwarding` |
| `/ASAS-dairy` | `/en/businesses/dairy-farms#asas-dairy` |
| `/ASAS-dairies-farm` | `/en/businesses/dairy-farms#asas-dairies-farm` |
| `/afrifarm` | `/en/businesses/dairy-farms#afri-farm` |
| `/ASAS-real-estate` | `/en/businesses/real-estate` |
| `/careers` | `/en/careers` |
| `/news` | `/en/news` |
| `/serviceDetails` | `/en/news` |
| `/contact` | `/en/contact` |

- `sitemap.ts`: every static route plus every sector and news slug, × 2 locales, each with `alternates.languages`.
- `robots.ts`: allow all, with the sitemap URL.
- `opengraph-image.tsx`: `ImageResponse` 1200×630, a charcoal background, a red accent bar, "ASAS Group" plus the localized tagline.

- [ ] **Step 1: Write failing tests**

```ts
it('buildMetadata sets canonical and hreflang alternates', () => {
  const m = buildMetadata({ locale: 'sw', path: '/news', title: 'Habari', description: 'd' });
  expect(m.alternates).toEqual({ canonical: '/sw/news', languages: { en: '/en/news', sw: '/sw/news', 'x-default': '/en/news' } });
  expect(m.title).toBe('Habari | ASAS Group');
});
it('every redirect destination is a real route', () => {
  const valid = /^\/en(\/(about|sustainability|careers|news|contact|businesses\/(energy|logistics|dairy-farms|real-estate)))(#[a-z-]+)?$/;
  for (const r of OLD_URL_REDIRECTS) expect(r.destination).toMatch(valid);
});
it('redirect anchors exist in content', () => { /* every #company-slug in destinations is a company slug in CONTENT.en */ });
```

- [ ] **Step 2:** Run `npx jest src/utils/metadata src/config`. Expected: FAIL.
- [ ] **Step 3:** Implement. Read `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md`. Next.js redirects pass the query string through, and a `?u=42` on the destination is harmless.
- [ ] **Step 4:** Run the same jest command. Expected: PASS. Then run `npm run build && npm run start` and check: `curl -sI 'localhost:3000/ASAS-dairy?u=42&pids=none&b='` returns 308 with `location` starting `/en/businesses/dairy-farms`.
- [ ] **Step 5:** Commit `feat: seo metadata, sitemap, og image and old-url redirects`.

---

### Task 15: End-to-end, responsive and final verification

**Files:**
- Create: `playwright.config.ts` (`webServer: npm run build && npm run start -- -p 3100`; projects: chromium desktop 1280×800, chromium mobile 375×667, webkit desktop), `e2e/{navigation,i18n,theme,contact,responsive,motion}.spec.ts`

- [ ] **Step 1: Write the e2e specs**
  - **navigation:**
    - Clicking each header link lands on its page with the right `h1`.
    - `/fr/about`, `/en/nope`, `/en/businesses/unknown` and `/en/news/unknown` show the 404 heading.
    - No page contains an `a[href="#"]` or `a[href^="javascript:"]`.
    - Clicking a home sector card lands on the sector page.
  - **i18n:**
    - On `/en/businesses/logistics`, clicking `SW` lands on `/sw/businesses/logistics` with `html[lang=sw]`. The `asas-locale` cookie is then `sw`, and visiting `/` redirects to `/sw`.
  - **theme:**
    - With `colorScheme: 'dark'` and no stored choice, `<html>` has class `dark` in the first `DOMContentLoaded` snapshot (`page.evaluate` in an `addInitScript` listener).
    - Clicking the toggle switches to `light`, and the choice survives a reload.
    - While `html.theme-reveal` is set (forced via `evaluate`), `getComputedStyle(header).viewTransitionName === 'none'`.
  - **contact:**
    - Opening `/en/contact?business=energy` pre-selects Energy.
    - Submitting a valid form triggers a popup whose URL starts with `https://wa.me/255749700500?text=`. Use `context.route('https://wa.me/**', r => r.abort())` and read `popup.url()`.
    - `?business=garbage` selects General.
  - **responsive:**
    - For every route × widths [320, 375, 640, 768, 1024, 1280, 1920]: `document.documentElement.scrollWidth <= innerWidth`.
    - Every visible `button, a` in the header/mobile menu is ≥ 44×44 at 375.
  - **motion:**
    - With `reducedMotion: 'reduce'`, the home stats show their final values without scrolling or waiting, and the marquee track's computed `animation-name` is `none` (or its duration is `0s`).
- [ ] **Step 2:** Run `npx playwright install chromium webkit && npm run test:e2e`. Fix the failures this exposes in the owning files. Expected: all pass.
- [ ] **Step 3:** Run `npx jest && npm run lint && npx tsc --noEmit && npm run build`. Expected: all exit 0, with no build warnings about `cacheComponents` or dynamic usage.
- [ ] **Step 4:** Run Lighthouse on mobile for `/en` and `/en/businesses/dairy-farms` (`npx lighthouse http://localhost:3100/en --form-factor=mobile --quiet --chrome-flags=--headless --only-categories=performance,accessibility,seo,best-practices`). Expected: every category ≥ 90. Fix regressions (usually image `sizes`, font preload or contrast).
- [ ] **Step 5:** Run `wc -l` over every file in `src/`. Expected: none over 400 lines.
- [ ] **Step 6:** Commit `test: e2e, responsive and motion coverage`.
