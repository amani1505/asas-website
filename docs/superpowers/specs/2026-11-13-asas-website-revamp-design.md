# ASAS Group website revamp — design

Date: 2026-11-13
Status: open questions answered, awaiting approval

## 1. Intent

Rebuild https://asas.co.tz/ as a fresh site with a **Gen Z look and feel**: bold, clean, lively, and very simple both in **content** and in **look**. The current site is a cluttered template: a three-level menu, about 20 thin pages, a 9-slide carousel, dead buttons, repeated blocks, and stale or contradictory facts. The new site should feel modern and alive, with smooth page transitions and animated interactions. It should also say less, more clearly.

The audience is everyone who lands on the group site: business clients (fuel majors, WFP, logistics customers), dairy consumers, job seekers, and the Tanzanian public. No single audience is privileged. The site presents the group and routes each visitor quickly to the business they care about, or to a way to get in touch.

## 2. Goals, non-goals, anti-goals

**Goals**
- Simple content: short copy, one idea per section, no filler. Merge pages wherever possible.
- Simple look: lots of space, big confident type, few colors, `rounded-md` corners everywhere.
- Multiple languages: English and Swahili.
- Light/dark theme with the circle-reveal toggle from `docs/theme-reveal-effect.md`.
- Animation everywhere it helps: page-to-page transitions and animated interactions.
- Fully responsive, mobile-first, fluid from 320px to ultrawide (per `CLAUDE.md`).
- Every link and button works. Facts are correct and consistent.

**Non-goals (this version)**
- No CMS. Content lives in typed files in the repo.
- No online ordering or e-commerce for dairy products. The product catalogue is browse-only, with a contact/WhatsApp call to action.
- No rebuild of the "AI Tracker" (`vts.asas.co.tz`). Just link to it.
- No newsletter backend. The subscribe box is dropped.

**Anti-goals (a failure even if it "works")**
- Looking like a template again: generic icon rows ("World-class services", "Award winning company"), carousels, logo walls on every page.
- Motion that slows people down, makes them dizzy, or blocks reading. All motion must be short and interruptible, and must switch off under `prefers-reduced-motion`.
- Any dead link, `#` / `javascript:0` href, placeholder text, or contradictory phone number.
- Horizontal scroll or broken layout at any width.

## 3. Constraints

- Stack already in the repo: **Next.js 16.4.6 (App Router), React 19.3, Tailwind CSS 4.3, TypeScript**. Per `AGENTS.md`, read the relevant guide in `node_modules/next/dist/docs/` before writing code, because this Next version differs from older conventions (e.g. `proxy.ts` instead of `middleware.ts`).
- Follow `CLAUDE.md`: folder structure, naming (`I`-suffixed interfaces, `*.util.ts`, etc.), max 400 lines per file, fluid tokens (`--text-*`, `--space-*`), mobile-first, `"use client"` only where needed, tests next to files.
- `CLAUDE.md`'s Actions → Services layers exist for API calls. This site has none: it is static content, and the contact form hands off to WhatsApp (§9). So there are no Actions. A thin `content.service.ts` returns typed, locale-specific content to pages, and `contact.service.ts` builds the WhatsApp message and link.
- Radius: the user explicitly wants `rounded-md`. That overrides `CLAUDE.md`'s fluid radius tokens. Use Tailwind `rounded-md` (map the shadcn `--radius` to it) on cards, buttons, inputs, images, and menus. No pills, no `rounded-2xl`.

## 4. Approaches considered (animation)

| | Approach | Trade-off |
|---|---|---|
| **A (chosen)** | React `<ViewTransition>` (native View Transitions) for page changes + **Motion** (`motion/react`) for interactions | Built into React 19.3 / Next 16 with no config. Same browser tech as the theme toggle, so they feel related. Supports shared-element morphs between pages. Older browsers just switch instantly. |
| B | Motion for everything, including page transitions | Same in every browser. But exit animations fight the App Router's page swapping; that needs fragile workarounds. |
| C | CSS only | Lightest. Too limited for springy presses, staggers, and layout animation, so it won't feel lively enough. |

The user picked **A**.

## 5. Visual design

- **Brand colors** (from the logo):
  - Primary red `#BE0F0D`
  - Charcoal `#373435`
  - Light background: warm off-white (~`#FAF8F5`)
  - Dark background: near-black warm charcoal (~`#141213`)
  - Red is used sparingly: primary buttons, active states, one highlighted word per headline.
  - Each sector gets a subtle tint used only on its chip/card accent:
    - Energy: amber
    - Logistics: blue
    - Dairy & Farms: fresh green
    - Real Estate: violet
  - All text/background pairs meet WCAG AA in both themes.
- **Type:**
  - Headings: **Bricolage Grotesque** (bold, characterful, very large on desktop, tight leading).
  - Body: **Geist**.
  - Both loaded via `next/font`, and both cover Swahili characters.
  - Sizes come from fluid tokens.
- **Shape and surface:**
  - `rounded-md` everywhere.
  - Thin 1px borders instead of heavy shadows. A slight lift on hover.
  - Optional faint grain/noise texture on hero backgrounds.
- **Layout language:**
  - Bento grid on Home (asymmetric cards of different sizes).
  - Generous whitespace and short line lengths (`max-width: 65ch`).
  - Small uppercase "eyebrow" labels above headings.
  - Big numbers for stats.
  - One scrolling client-logo marquee (Home only).
- **Imagery:** reuse the real photos from asas.co.tz, downloaded into `public/images/` so the new site doesn't depend on the old host. Show them via `next/image` with `aspect-ratio` + `object-fit: cover`, inside `rounded-md` frames. Do not use the stock/"test"/Pngtree images.
- **Icons:** `lucide-react`.
- **Components:** shadcn/ui on Tailwind 4, restyled to the above.

Copy tone: short, warm, direct, confident, e.g. "Powering Tanzania since 1936." No buzzword stacks.

## 6. Site structure (merged from ~20 pages to 7 sections)

All routes live under a locale: `/en/...` and `/sw/...`.

| Route | Replaces (old site) | Content |
|---|---|---|
| `/[locale]` **Home** | Home | Hero (one headline, one line, two CTAs: *Explore our businesses*, *Contact us*). Stat strip (years since 1936 · number of companies · 4 sectors · 2 offices; every number is computed from content, currently 90 · 8 · 4 · 2). Sector bento (4 cards → sector pages). Short story teaser → About. Latest 3 news. Client marquee. Closing CTA band. |
| `/[locale]/about` | About Us, Our History, The Team | "The spirit of ASAS" intro. Animated timeline (1936 A.S. Abri Transporters → 1978 ASAS Group → early 1980s dairy farm in Iringa → energy expansion …). Values. Team (if team content exists on the old site). One video (YouTube facade: thumbnail first, player loads on click). |
| `/[locale]/businesses` | the "Business" mega-menu | The 4 sectors as large cards, each listing its companies. |
| `/[locale]/businesses/[sector]` | 9 company pages + homepage tabs | One page per sector. Each company is a section with an anchor. **Energy:** ASAS Energies (wholesale, transit, retail stations, market supply; locations; The Koffee Shop). **Logistics:** Transfuel Logistics, ASAS Transporters, Universal Clearing & Forwarding. **Dairy & Farms:** ASAS Dairy (product catalogue with animated category filter), ASAS Dairies Farm, Afri Farm. **Real Estate:** ASAS Real Estate. Each sector ends with a contact CTA that pre-selects that business in the contact form. |
| `/[locale]/sustainability` | Sustainability, HSE, Compliance, CSR | One page with sticky in-page tabs: Our approach · Health, Safety & Environment · Compliance · Community (CSR) · Equal opportunities. |
| `/[locale]/news` + `/[locale]/news/[slug]` | News & Media | Card grid, newest first, with an animated category filter. Detail page with hero image, date, body, and next/previous links. |
| `/[locale]/careers` | Careers (blank today) | Why work at ASAS (short), open roles list, or an empty state ("No open roles right now: send your CV to …"). |
| `/[locale]/contact` | Contact + every per-page "contact form" | Two office cards (Iringa HQ, Dar es Salaam) with map links. Click-to-call, WhatsApp, and email buttons. One contact form with a "Which business?" select. |

**Header:** logo · flat nav (About, Businesses, Sustainability, News, Careers) · EN/SW switch · theme toggle · *Contact* button. No dropdowns. On mobile: logo + menu button, opening a full-screen animated menu that also holds the language switch and theme toggle.

**Footer:** short group line + tagline "Excellence in all we do", one contact block, socials (Facebook, Instagram, WhatsApp), the AI Tracker link, "Developed & maintained by …" credit, © year (computed, not hardcoded).

**Old URLs:** add permanent redirects from the old paths (`/about`, `/history`, `/team`, `/ASAS-dairy`, `/ASAS-energies`, `/transfuel-logistics`, …, ignoring the `?u=` query) to their new homes, so existing links and search results keep working.

## 7. Languages

- English (default) and Swahili. The locale is the first path segment: `/en`, `/sw`.
- Use the built-in App Router approach from `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`: a `[locale]` segment, typed dictionaries for UI strings, and `proxy.ts` to send `/` to the best locale (cookie → `Accept-Language` → `en`). No extra i18n library unless the guide's approach falls short.
- Content files are per locale (`src/content/en/*.ts`, `src/content/sw/*.ts`) and share one interface each, so a missing Swahili field is a type error.
- The EN/SW switch keeps the user on the same page and remembers the choice in a cookie. The switch animates as a view transition (crossfade).
- `<html lang>` is set per locale. Each page has `hreflang` alternates, plus a sitemap covering both locales.
- Swahili copy will be machine-quality on first pass and **must be reviewed by a native speaker** before launch.

## 8. Motion

**Page transitions (React `<ViewTransition>`)**
- Default route change: the old page fades out and the new page fades in with a small upward slide (~250–350 ms, ease-out).
- Shared-element morphs (`<ViewTransition name=…>`):
  - Sector card image on Home/Businesses → sector page hero.
  - News card image → news detail hero.
- Header and footer stay put (their own view-transition names) so only the content animates.
- **Conflict to resolve:** `docs/theme-reveal-effect.md` sets `::view-transition-old(root), ::view-transition-new(root) { animation: none }` globally, which would also kill page transitions. Scope it to theme changes only: add a class (e.g. `theme-reveal`) to `<html>` before `startViewTransition` in the theme util, remove it in `transition.finished`, and write the CSS as `.theme-reveal::view-transition-old(root)` etc. While `theme-reveal` is on, also force `view-transition-name: none !important` on every element, so that named elements such as the anchored header are revealed by the circle rather than snapping on their own.

**Theme toggle:** exactly as `docs/theme-reveal-effect.md` (650 ms circle from the icon, follows the system until clicked, instant fallback), with the scoping fix above.

**Interactions (Motion)**
- Buttons: press scales to ~0.97 with a spring. Hover nudges the arrow icon.
- Cards: hover lift (translateY −2 to −4px) + border tint; image zooms slightly inside its `rounded-md` frame.
- Scroll reveals: sections and card groups fade/slide in once, with a short stagger (40–60 ms per item).
- Stat numbers count up when first visible.
- Tabs and filters (sustainability tabs, news and dairy filters): sliding active indicator (`layoutId`); filtered grids animate items in, out, and to new positions (`AnimatePresence` + `layout`).
- Mobile menu: panel slides/fades in, links stagger in, icon morphs ☰ → ✕.
- Client marquee: continuous slow scroll, pauses on hover/focus.
- Form: focus ring animates in; submit button shows loading → success check.

**Rules**
- Interaction motion is 150–300 ms. Nothing blocks input.
- `<MotionConfig reducedMotion="user">`, plus a CSS `prefers-reduced-motion` guard: no movement, only instant state changes.
- Only animate `transform` and `opacity` (and `clip-path` for the theme reveal).

## 9. Contact form

- Fields: name, email or phone, business (select: General, Energy, Logistics, Dairy & Farms, Real Estate), message.
- **Delivery: WhatsApp, no server (user's decision).** On submit, validate on the client, then `contact.service.ts` composes a message (business, name, contact, message) and opens `https://wa.me/255749700500?text=<encoded message>` in a new tab. This works with the WhatsApp app on mobile and with WhatsApp Web on desktop.
- Under the form: a secondary "Prefer email?" link that opens a `mailto:info@asas.co.tz` with the same pre-filled subject and body.
- Sector-page CTAs link to `/contact?business=<sector>` to pre-select the business.
- Validation errors and the "Opening WhatsApp…" state are animated and announced to screen readers.
- Nothing is stored on the site.

## 10. Content corrections (apply everywhere)

- Years in business: computed from 1936 (90 in 2026), never hardcoded.
- **Both phone numbers, labelled and the same everywhere (user's decision):** +255 749 700 500 (*Calls & WhatsApp*, the number the old WhatsApp link uses) and +255 793 600 600 (*Calls*); the labels are my call. Email: `info@asas.co.tz`. The header shows only the Contact button; the numbers appear in the footer and on the Contact page.
- Fix the email `mailto` mismatch, the "Dares Salaam" typo, the cut-off "We make the creative solutions for your" line, and the testimonial typos.
- Remove template leftovers ("All Page General", demo blog links, `tel:1 800 222 000`).
- WhatsApp link format: `https://wa.me/255749700500` (no `+`).
- AI Tracker link: use `https://` if the subdomain supports it, otherwise keep `http://`.

## 11. Quality bar

- **Responsive:** passes the `CLAUDE.md` checklist (320 / 375 / 640 / 768 / 1024 / 1280+), touch targets ≥ 44px, both orientations.
- **Accessibility:** keyboard reachable, visible focus, skip link, alt text, AA contrast in both themes, `aria-label`s on icon buttons.
- **Performance:** images through `next/image`, fonts through `next/font`, YouTube via facade, static rendering for all pages × both locales (`generateStaticParams`). Target Lighthouse ≥ 90 on mobile.
- **SEO:** per-page, per-locale metadata, Open Graph image, sitemap, robots, hreflang.
- **Tests:** unit tests for utils, the content service, and key components. Playwright e2e for navigation, the language switch (stays on the same page), the theme toggle, the contact form (asserts the WhatsApp URL and its encoded text), the dairy filter, and viewport checks at 375 and 1280.

## 12. Decisions from the user

1. **Contact form:** the WhatsApp option, with no server (§9).
2. **Phone numbers:** show both (§10).
3. **Careers:** no open roles. The page launches with a short "Why ASAS" section and an empty state: "No open roles right now — send your CV to info@asas.co.tz". The role list component should still exist so that roles can be added to the content file later.

## 13. Left to the builder

- Exact copy edits and Swahili first-draft translation (flagged for review).
- Scraping the remaining old pages (history, team, HSE, compliance, CSR, the logistics/farm/real-estate company pages, and news article bodies) for content and images.
- Exact easing curves and durations within the ranges above.
- Grain texture on or off, the exact sector tint shades, and the marquee speed.
- Which old-site news items to keep (default: keep all, newest first).
