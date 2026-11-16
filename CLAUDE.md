# CLAUDE.md — React & Next.js Architecture Guide

> **Purpose**: This document instructs Claude Code on how to scaffold, structure, and maintain React and Next.js projects. Claude Code must auto-detect whether the project is React (Vite/CRA) or Next.js and apply the correct patterns. Every component must be fully responsive, mobile-first, and fluidly adaptive across all devices.

---

## Table of Contents

1. [Project Detection](#project-detection)
2. [Responsive & Fluid Design](#responsive--fluid-design)
3. [Global Rules](#global-rules)
4. [Naming Conventions](#naming-conventions)
5. [Architecture Overview](#architecture-overview)
6. [Folder Structure](#folder-structure)
7. [Layer Responsibilities](#layer-responsibilities)
8. [Styling Strategy](#styling-strategy)
9. [Data Flow & Patterns](#data-flow--patterns)
10. [Error Handling](#error-handling)
11. [Testing Strategy](#testing-strategy)
12. [Creating a New Feature](#creating-a-new-feature)
13. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Project Detection

Claude Code must detect the project type by inspecting files **before** generating any code:

| Indicator | Project Type | Key Differences |
|---|---|---|
| `next.config.*` or `"next"` in `package.json` | **Next.js (App Router)** | Server Components, `app/` directory, file-based routing, `"use client"` directive |
| `next.config.*` + `pages/` directory (no `app/`) | **Next.js (Pages Router)** | `getServerSideProps`, `getStaticProps`, `pages/` routing |
| `"react"` in `package.json` but no `next` | **React (Vite / CRA)** | Client-only, `react-router-dom`, no server components |

### Next.js App Router vs Pages Router Detection

```
app/ directory exists + next.config.*  → App Router (default, preferred)
pages/ directory exists + no app/     → Pages Router (legacy)
Both exist                            → Hybrid — check which directory the target route lives in
```

### Behavior Differences

| Concern | Next.js (App Router) | Next.js (Pages Router) | React (Vite) |
|---|---|---|---|
| Routing | File-based in `app/` | File-based in `pages/` | `react-router-dom` |
| Data fetching | Server Components + `fetch` | `getServerSideProps` / `getStaticProps` | Client-side in hooks/providers |
| Server Components | Default (opt-out with `"use client"`) | Not available | Not available |
| Layouts | `layout.tsx` (nested) | `_app.tsx` + `_document.tsx` | Manual layout components |
| Metadata/SEO | `export const metadata` or `generateMetadata()` | `<Head>` from `next/head` | `react-helmet` or manual |
| API routes | `app/api/*/route.ts` | `pages/api/*.ts` | Separate backend |
| Providers | Wrap in root `layout.tsx` with `"use client"` wrapper | Wrap in `_app.tsx` | Wrap in `main.tsx` / `App.tsx` |

---

## Responsive & Fluid Design

> **CRITICAL RULE**: Every component Claude Code generates **must be fully responsive and compatible with all devices** — from 320px mobile screens to ultrawide monitors. This is non-negotiable. All styles are written **mobile-first**. Responsiveness must be **fluid** — no layout jumps between breakpoints.

### Mobile-First Principle

All CSS starts with the smallest screen. Layer on complexity with `min-width` queries:

```css
/* ✅ CORRECT — Mobile-first */
.container {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

@media (min-width: 640px) {
  .container { gap: var(--space-md); }
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* ❌ WRONG — Desktop-first */
.container {
  max-width: 1280px;
  flex-direction: row;
}
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
```

### Fluid Design Tokens

Every project must include these fluid CSS custom properties. They scale smoothly between mobile and desktop — no jumps:

```css
/* src/styles/fluid-tokens.css — import in globals.css or index.css */
:root {
  /* ── Fluid Typography ── */
  --text-xs:   clamp(0.694rem, 0.650rem + 0.22vw, 0.800rem);
  --text-sm:   clamp(0.833rem, 0.769rem + 0.32vw, 1.000rem);
  --text-base: clamp(1.000rem, 0.913rem + 0.43vw, 1.250rem);
  --text-lg:   clamp(1.200rem, 1.080rem + 0.60vw, 1.563rem);
  --text-xl:   clamp(1.440rem, 1.274rem + 0.83vw, 1.953rem);
  --text-2xl:  clamp(1.728rem, 1.499rem + 1.14vw, 2.441rem);
  --text-3xl:  clamp(2.074rem, 1.761rem + 1.56vw, 3.052rem);
  --text-4xl:  clamp(2.488rem, 2.066rem + 2.11vw, 3.815rem);
  --text-5xl:  clamp(2.986rem, 2.425rem + 2.80vw, 4.768rem);

  /* ── Fluid Spacing ── */
  --space-3xs: clamp(0.125rem, 0.10rem + 0.13vw, 0.250rem);
  --space-2xs: clamp(0.250rem, 0.20rem + 0.25vw, 0.500rem);
  --space-xs:  clamp(0.375rem, 0.30rem + 0.38vw, 0.750rem);
  --space-sm:  clamp(0.500rem, 0.40rem + 0.50vw, 1.000rem);
  --space-md:  clamp(1.000rem, 0.80rem + 1.00vw, 2.000rem);
  --space-lg:  clamp(1.500rem, 1.15rem + 1.75vw, 3.500rem);
  --space-xl:  clamp(2.000rem, 1.50rem + 2.50vw, 5.000rem);
  --space-2xl: clamp(3.000rem, 2.00rem + 5.00vw, 8.000rem);
  --space-3xl: clamp(4.000rem, 2.50rem + 7.50vw, 12.00rem);

  /* ── Section Spacing ── */
  --section-spacing: clamp(3rem, 2rem + 5vw, 8rem);

  /* ── Fluid Border Radius ── */
  --radius-sm:  clamp(0.25rem, 0.20rem + 0.25vw, 0.50rem);
  --radius-md:  clamp(0.375rem, 0.30rem + 0.38vw, 0.75rem);
  --radius-lg:  clamp(0.50rem, 0.35rem + 0.75vw, 1.25rem);
  --radius-xl:  clamp(0.75rem, 0.50rem + 1.25vw, 2.00rem);
  --radius-full: 9999px;
}
```

### Fluid Container

```css
/* Fluid container — hugs edges on mobile, centers with max-width on desktop */
.container {
  width: min(100% - var(--space-md) * 2, 1280px);
  margin-inline: auto;
}

.container-narrow {
  width: min(100% - var(--space-md) * 2, 768px);
  margin-inline: auto;
}

.container-wide {
  width: min(100% - var(--space-sm) * 2, 1536px);
  margin-inline: auto;
}

.container-full {
  width: 100%;
  padding-inline: var(--space-md);
}
```

### Fluid Grid (No Media Queries Needed)

Use `auto-fit` + `minmax()` with the `min(100%, Xpx)` trick so grids reflow intrinsically:

```css
/* Cards reflow automatically — 1 col on mobile, 2-3 on tablet, 4 on desktop */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-md);
}

/* Sidebar + content — collapses to single column on mobile */
.sidebar-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-lg);
}
```

### Fluid Component Patterns

```tsx
// ✅ CORRECT — Fluid responsive component
export function HeroSection({ title, subtitle }: HeroProps) {
  return (
    <section style={{ paddingBlock: 'var(--section-spacing)' }}>
      <div className="container">
        <h1 style={{ fontSize: 'var(--text-5xl)', lineHeight: 1.1 }}>
          {title}
        </h1>
        <p style={{
          fontSize: 'var(--text-lg)',
          marginTop: 'var(--space-sm)',
          maxWidth: '65ch', // Readable line length
          color: 'var(--text-secondary)',
        }}>
          {subtitle}
        </p>
        <div style={{
          marginTop: 'var(--space-md)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
        }}>
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  );
}

// ❌ WRONG — Fixed pixel values, not responsive
export function HeroSection({ title }) {
  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ width: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '64px' }}>{title}</h1>
      </div>
    </section>
  );
}
```

### Implementation by Styling Approach

#### Tailwind CSS

```tsx
// Fluid with Tailwind arbitrary values + custom properties
<section className="py-[var(--section-spacing)]">
  <div className="mx-auto w-full max-w-screen-xl px-[var(--space-md)]">
    <h1 className="text-[length:var(--text-5xl)] font-bold leading-tight">
      {title}
    </h1>
    <p className="mt-[var(--space-sm)] text-[length:var(--text-lg)] text-gray-600 max-w-prose">
      {subtitle}
    </p>
  </div>
</section>

// Fluid grid — no breakpoint classes needed
<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[var(--space-md)]">
  {items.map(item => <Card key={item.id} data={item} />)}
</div>

// When using Tailwind breakpoints (for layout shifts only), always mobile-first:
<nav className="flex flex-col md:flex-row gap-[var(--space-sm)]">
  {/* Stacks vertically on mobile, horizontal on md+ */}
</nav>
```

#### CSS Modules

```css
/* UserCard.module.css */
.card {
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.cardGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-md);
}

.title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  max-width: 65ch;
}
```

```tsx
import styles from './UserCard.module.css';

export function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{user.name}</h3>
      <p className={styles.description}>{user.bio}</p>
    </div>
  );
}
```

#### Styled Components

```tsx
import styled from 'styled-components';

const Section = styled.section`
  padding-block: var(--section-spacing);
`;

const Container = styled.div`
  width: min(100% - var(--space-md) * 2, 1280px);
  margin-inline: auto;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-md);
`;

const Title = styled.h2`
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--space-lg);
`;

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <Section>
      <Container>
        <Title>Features</Title>
        <CardGrid>
          {features.map(f => <FeatureCard key={f.id} feature={f} />)}
        </CardGrid>
      </Container>
    </Section>
  );
}
```

### Breakpoint Reference

When fluid design alone isn't enough (layout shifts, show/hide elements), use these breakpoints — always with `min-width` (mobile-first):

| Token | Min-width | Target | Usage |
|---|---|---|---|
| `xs` | 0px | Small phones (320-374px) | Base styles |
| `sm` | 640px | Large phones / small tablets | Minor adjustments |
| `md` | 768px | Tablets | Navigation changes, 2-column |
| `lg` | 1024px | Small desktops / laptops | Sidebar, full navigation |
| `xl` | 1280px | Desktops | Max-width containers |
| `2xl` | 1536px | Large desktops / ultrawide | Optional wider content |

### Responsive Validation Checklist

Claude Code must verify **every** component against this list:

| Check | Requirement |
|---|---|
| **320px** | No horizontal scroll. No text overflow. All content visible. |
| **375px** | Comfortable reading. Touch targets ≥ 44px. |
| **640px** | Layout adapts (stacking → side-by-side where appropriate). |
| **768px** | Tablet layout works. Navigation adapts if applicable. |
| **1024px** | Desktop layout fully functional. Sidebar visible if applicable. |
| **1280px+** | Content has max-width. Not stretched edge-to-edge. |
| **Fluid between** | No sudden jumps between breakpoints. Resize smoothly. |
| **Text** | Uses `clamp()` or fluid tokens. Readable at all sizes. |
| **Spacing** | Uses fluid spacing tokens. Never fixed `px` for layout spacing. |
| **Images** | `width: 100%`, `max-width`, `aspect-ratio`, `object-fit`. Never fixed dimensions. |
| **Touch targets** | Minimum 44×44px on mobile. Adequate spacing between tappable elements. |
| **Orientation** | Works in both portrait and landscape. |

---

## Global Rules

These rules apply to **every** React and Next.js project:

1. **Responsive & fluid by default.** Every component uses mobile-first CSS with fluid typography, spacing, and grids. No exceptions. See [Responsive & Fluid Design](#responsive--fluid-design).
2. **Max 400 lines per file.** If a file exceeds 400 lines, refactor by extracting into separate files.
3. **Single Responsibility.** Every file, function, and component does one thing.
4. **No business logic in UI components.** Components render UI; logic lives in services and hooks.
5. **No direct API calls from UI components.** All network calls go through Actions → Services.
6. **TypeScript strict mode.** Define interfaces for all data shapes. No `any`.
7. **Environment variables.** Never hardcode API URLs, secrets, or keys. Use `.env` files with `NEXT_PUBLIC_` prefix (Next.js) or `VITE_` prefix (Vite).
8. **Barrel exports.** Each feature folder has an `index.ts` that re-exports its public API.
9. **Path aliases.** Use `@/` instead of deep relative paths (`../../../`). Configure in `tsconfig.json`.
10. **`"use client"` only when needed.** In Next.js App Router, keep components as Server Components by default. Only add `"use client"` when the component uses hooks, event handlers, browser APIs, or Context.

---

## Naming Conventions

### File Naming

| File Type | Pattern | Example |
|---|---|---|
| Component | `PascalCase.tsx` | `UserCard.tsx` |
| Page (Next.js App Router) | `page.tsx` | `app/users/page.tsx` |
| Page (Next.js Pages Router) | `kebab-case.tsx` | `pages/user-settings.tsx` |
| Page (React Router) | `PascalCase.tsx` | `UsersPage.tsx` |
| Layout (Next.js) | `layout.tsx` | `app/dashboard/layout.tsx` |
| PageSection | `PascalCase.tsx` | `UsersListSection.tsx` |
| Action | `camelCase.actions.ts` | `user.actions.ts` |
| Service | `camelCase.service.ts` | `users.service.ts` |
| Provider | `camelCase.provider.tsx` | `users.provider.tsx` |
| Context | `camelCase.context.tsx` | `users.context.tsx` |
| Hook | `useCamelCase.ts` | `useUsers.ts` |
| Interface/Type | `camelCase.interface.ts` | `user.interface.ts` |
| Utility | `camelCase.util.ts` | `date.util.ts` |
| Constant | `camelCase.constants.ts` | `api.constants.ts` |
| Test | `PascalCase.test.tsx` | `UserCard.test.tsx` |
| Style (CSS Modules) | `PascalCase.module.css` | `UserCard.module.css` |
| Style (Styled) | `PascalCase.styles.ts` | `UserCard.styles.ts` |

### Code Naming

| Element | Convention | Example |
|---|---|---|
| Components | `PascalCase` | `UserProfile`, `DashboardLayout` |
| Hooks | `useCamelCase` | `useUsers`, `useAuth`, `useDebounce` |
| Functions / Methods | `camelCase` | `fetchUsers()`, `handleSubmit()` |
| Variables / State | `camelCase` | `isLoading`, `userData`, `currentPage` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_RETRIES` |
| Interfaces | `PascalCase` with `I` suffix | `UserI`, `ApiResponseI`, `CreateUserDataI` |
| Type aliases | `PascalCase` | `UserRole`, `ButtonVariant` |
| Enums | `PascalCase` (name + members) | `UserRole.Admin`, `OrderStatus.Pending` |
| Event handlers | `handle` + Noun + Verb | `handleUserCreate`, `handleFormSubmit` |
| Boolean variables | `is`/`has`/`can`/`should` prefix | `isLoading`, `hasPermission`, `canEdit` |
| Context | `PascalCase` + `Context` | `UsersContext`, `AuthContext` |
| Provider | `PascalCase` + `Provider` | `UsersProvider`, `AuthProvider` |
| CSS classes (modules) | `camelCase` | `styles.cardGrid`, `styles.headerTitle` |
| CSS classes (Tailwind) | `kebab-case` (standard) | `text-lg`, `flex-col` |
| Route paths | `kebab-case` | `/user-settings`, `/order-history` |

### Folder Naming

- Feature folders: `camelCase` (`users`, `orderItems`)
- Component folders: `PascalCase` when containing a single component + its files (`UserCard/`)
- Route folders (Next.js): `kebab-case` or `(groupName)` for route groups

---

## Architecture Overview

### Architecture Flow

```
Actions → Services → Provider & Context → Hooks → Pages → PageSections → Components
```

Every feature follows this strict unidirectional data flow. Each layer communicates only with its adjacent layers.

### Why This Architecture

| Benefit | Explanation |
|---|---|
| **Separation of Concerns** | Each layer has a single, well-defined purpose |
| **Testability** | Each layer can be tested independently with mocked dependencies |
| **Maintainability** | Changes in one layer don't cascade to others |
| **Reusability** | Services and Actions can be used by multiple providers |
| **Scalability** | New features follow the same pattern consistently |
| **Type Safety** | TypeScript interfaces flow through all layers end-to-end |

---

## Folder Structure

### Next.js (App Router) — Recommended

```
src/
├── actions/                    # API communication only
│   ├── base.action.ts          # Base class with HTTP methods
│   ├── user.actions.ts
│   └── order.actions.ts
├── services/                   # Business logic & orchestration
│   ├── users.service.ts
│   └── orders.service.ts
├── contexts/                   # React Context definitions
│   ├── users.context.tsx
│   └── auth.context.tsx
├── providers/                  # State management wrappers
│   ├── users.provider.tsx
│   ├── auth.provider.tsx
│   └── AppProviders.tsx        # Combines all providers
├── hooks/                      # Custom hooks
│   ├── useUsers.ts
│   ├── useAuth.ts
│   └── useDebounce.ts
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (wraps AppProviders)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + fluid tokens
│   ├── (auth)/                 # Route group — auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/            # Route group — dashboard pages
│   │   ├── layout.tsx          # Dashboard layout (sidebar, nav)
│   │   ├── users/
│   │   │   ├── page.tsx        # Users list page
│   │   │   └── [id]/
│   │   │       └── page.tsx    # User detail page
│   │   └── orders/
│   │       └── page.tsx
│   └── api/                    # API routes (if needed)
│       └── health/
│           └── route.ts
├── sections/                   # Page sections (major layout blocks)
│   ├── users/
│   │   ├── UsersListSection.tsx
│   │   ├── UserDetailSection.tsx
│   │   └── UserFormSection.tsx
│   └── orders/
│       └── OrdersListSection.tsx
├── components/                 # Reusable UI components
│   ├── ui/                     # Atomic/base UI (Button, Input, Modal, Skeleton)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   └── index.ts            # Barrel export
│   └── domain/                 # Domain-specific (UserCard, OrderRow, UserAvatar)
│       ├── UserCard.tsx
│       ├── UserTable.tsx
│       └── OrderRow.tsx
├── interfaces/                 # TypeScript interfaces & types
│   ├── user.interface.ts
│   ├── order.interface.ts
│   └── api.interface.ts        # ApiResponseI, PaginatedResponseI, etc.
├── utils/                      # Pure utility functions
│   ├── format.util.ts
│   ├── validation.util.ts
│   └── date.util.ts
├── constants/                  # App-wide constants
│   ├── api.constants.ts        # API_PATHS, API_BASE_URL
│   └── app.constants.ts
├── config/                     # App configuration
│   └── env.config.ts
└── styles/                     # Global styles
    ├── fluid-tokens.css        # Fluid typography + spacing variables
    └── globals.css             # Base styles, resets
```

### React (Vite) — Same Architecture, Different Routing

```
src/
├── actions/
├── services/
├── contexts/
├── providers/
├── hooks/
├── pages/                      # Route-level components
│   ├── UsersPage.tsx
│   ├── UserDetailPage.tsx
│   └── LoginPage.tsx
├── sections/
├── components/
│   ├── ui/
│   └── domain/
├── router/                     # React Router configuration
│   ├── AppRouter.tsx
│   ├── routes.tsx
│   └── ProtectedRoute.tsx
├── interfaces/
├── utils/
├── constants/
├── config/
├── styles/
│   ├── fluid-tokens.css
│   └── index.css
├── App.tsx                     # Root component (wraps providers + router)
└── main.tsx                    # Entry point
```

---

## Layer Responsibilities

### 1. Actions Layer (`/src/actions`)

**Purpose**: Handle all API communication. Nothing else.

**Rules**:
- Make HTTP requests (GET, POST, PUT, PATCH, DELETE)
- Handle API endpoints and URL construction
- Return raw API responses
- **No** business logic
- **No** state management
- **No** error transformation (let errors propagate)

**Base Action**:

```typescript
// src/actions/base.action.ts
import { ApiResponseI } from '@/interfaces/api.interface';

export abstract class BaseAction {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async get<T>(url: string): Promise<ApiResponseI<T>> {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  protected async post<T>(url: string, data: unknown, successMessage?: string): Promise<ApiResponseI<T>> {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response, successMessage);
  }

  protected async put<T>(url: string, data: unknown): Promise<ApiResponseI<T>> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  protected async patch<T>(url: string, data: unknown): Promise<ApiResponseI<T>> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  protected async delete<T>(url: string): Promise<ApiResponseI<T>> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  private getHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(response: Response, successMessage?: string): Promise<ApiResponseI<T>> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiError(response.status, error.message || 'Request failed', error);
    }
    const data = await response.json();
    return { data, message: successMessage };
  }
}

// Custom error class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

**Feature Action**:

```typescript
// src/actions/user.actions.ts
import { BaseAction } from './base.action';
import { API_PATHS } from '@/constants/api.constants';
import { ApiResponseI } from '@/interfaces/api.interface';
import { UserI, CreateUserDataI, UpdateUserDataI } from '@/interfaces/user.interface';

class UserActions extends BaseAction {
  async fetchAll(): Promise<ApiResponseI<UserI[]>> {
    return await this.get(`${API_PATHS.AUTH}${this.endpoint}`);
  }

  async fetchById(id: string): Promise<ApiResponseI<UserI>> {
    return await this.get(`${API_PATHS.AUTH}${this.endpoint}/${id}`);
  }

  async create(data: CreateUserDataI): Promise<ApiResponseI<UserI>> {
    return await this.post(
      `${API_PATHS.AUTH}${this.endpoint}`,
      data,
      'User created successfully!',
    );
  }

  async update(id: string, data: UpdateUserDataI): Promise<ApiResponseI<UserI>> {
    return await this.patch(`${API_PATHS.AUTH}${this.endpoint}/${id}`, data);
  }

  async remove(id: string): Promise<ApiResponseI<void>> {
    return await this.delete(`${API_PATHS.AUTH}${this.endpoint}/${id}`);
  }
}

export const userActions = new UserActions('/users');
```

### 2. Services Layer (`/src/services`)

**Purpose**: Business logic and orchestration.

**Rules**:
- Call Actions to fetch/send data
- Transform and format data if needed
- Implement business rules and validation
- Orchestrate multiple actions in a single operation
- Aggregate data from multiple sources
- **No** state management
- **No** direct API calls (always through Actions)

```typescript
// src/services/users.service.ts
import { userActions } from '@/actions/user.actions';
import { ApiResponseI } from '@/interfaces/api.interface';
import { UserI, CreateUserDataI, UpdateUserDataI } from '@/interfaces/user.interface';

class UserService {
  async findAll(setUsers: (response: ApiResponseI<UserI[]>) => void): Promise<ApiResponseI<UserI[]>> {
    const response = await userActions.fetchAll();
    // Business logic: filter, sort, transform
    setUsers(response);
    return response;
  }

  async findById(id: string, setUser: (response: ApiResponseI<UserI>) => void): Promise<ApiResponseI<UserI>> {
    const response = await userActions.fetchById(id);
    setUser(response);
    return response;
  }

  async createUser(data: CreateUserDataI): Promise<ApiResponseI<UserI>> {
    // Validation / transformation before sending
    const sanitized = {
      ...data,
      email: data.email.toLowerCase().trim(),
    };
    return await userActions.create(sanitized);
  }

  async updateUser(id: string, data: UpdateUserDataI): Promise<ApiResponseI<UserI>> {
    return await userActions.update(id, data);
  }

  async deleteUser(id: string): Promise<ApiResponseI<void>> {
    return await userActions.remove(id);
  }
}

export const userService = new UserService();
```

### 3. Context Layer (`/src/contexts`)

**Purpose**: Define the shape of shared state.

```typescript
// src/contexts/users.context.tsx
import { createContext } from 'react';
import { ApiResponseI } from '@/interfaces/api.interface';
import { UserI, CreateUserDataI, UpdateUserDataI } from '@/interfaces/user.interface';

export interface UsersContextProps {
  // State
  users: ApiResponseI<UserI[]>;
  selectedUser: ApiResponseI<UserI> | null;
  isLoading: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  isDeleteLoading: boolean;
  error: string | null;

  // Methods
  findAllUsers: () => Promise<void>;
  findUserById: (id: string) => Promise<void>;
  createUser: (data: CreateUserDataI) => Promise<void>;
  updateUser: (id: string, data: UpdateUserDataI) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearError: () => void;
}

export const UsersContext = createContext<UsersContextProps | undefined>(undefined);
```

### 4. Provider Layer (`/src/providers`)

**Purpose**: Manage state, call services, distribute data via Context.

**Rules**:
- Manage application/feature state with `useState`
- Call Services (never Actions directly) to fetch/update data
- Handle loading, error, and success states
- Distribute data through React Context
- **No** direct API calls
- **No** business logic (delegate to Services)

```typescript
// src/providers/users.provider.tsx
'use client'; // Required for Next.js App Router

import React, { useState, useCallback, useMemo } from 'react';
import { UsersContext, UsersContextProps } from '@/contexts/users.context';
import { userService } from '@/services/users.service';
import { ApiResponseI } from '@/interfaces/api.interface';
import { UserI, CreateUserDataI, UpdateUserDataI } from '@/interfaces/user.interface';

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [users, setUsers] = useState<ApiResponseI<UserI[]>>({ data: [] });
  const [selectedUser, setSelectedUser] = useState<ApiResponseI<UserI> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Methods
  const findAllUsers = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await userService.findAll(setUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const findUserById = useCallback(async (id: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await userService.findById(id, setSelectedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: CreateUserDataI) => {
    try {
      setError(null);
      setIsCreateLoading(true);
      await userService.createUser(data);
      await findAllUsers(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      throw err; // Re-throw so UI can handle
    } finally {
      setIsCreateLoading(false);
    }
  }, [findAllUsers]);

  const updateUser = useCallback(async (id: string, data: UpdateUserDataI) => {
    try {
      setError(null);
      setIsUpdateLoading(true);
      await userService.updateUser(id, data);
      await findAllUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    } finally {
      setIsUpdateLoading(false);
    }
  }, [findAllUsers]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setError(null);
      setIsDeleteLoading(true);
      await userService.deleteUser(id);
      await findAllUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    } finally {
      setIsDeleteLoading(false);
    }
  }, [findAllUsers]);

  const clearError = useCallback(() => setError(null), []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<UsersContextProps>(() => ({
    users,
    selectedUser,
    isLoading,
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,
    error,
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    clearError,
  }), [
    users, selectedUser, isLoading, isCreateLoading, isUpdateLoading,
    isDeleteLoading, error, findAllUsers, findUserById, createUser,
    updateUser, deleteUser, clearError,
  ]);

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};
```

**Combined Providers**:

```typescript
// src/providers/AppProviders.tsx
'use client';

import React from 'react';
import { AuthProvider } from './auth.provider';
import { UsersProvider } from './users.provider';
import { OrdersProvider } from './orders.provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <OrdersProvider>
          {children}
        </OrdersProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
```

```typescript
// Next.js App Router: src/app/layout.tsx
import { AppProviders } from '@/providers/AppProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
```

### 5. Hooks Layer (`/src/hooks`)

**Purpose**: Consume Context. Provide ergonomic API. Keep simple.

**Rules**:
- Consume Context data
- Provide type-safe access to state and methods
- Can add component-specific logic (debounce, local UI state)
- Handle side effects (`useEffect`) for data fetching on mount
- **No** business logic (delegate to Services)
- **No** API calls

```typescript
// src/hooks/useUsers.ts
import { useContext } from 'react';
import { UsersContext } from '@/contexts/users.context';

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
```

**Utility hooks**:

```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage: const isMobile = useMediaQuery('(max-width: 639px)');
```

### 6. Pages Layer

**Purpose**: Route-level components. Minimal logic.

**Rules**:
- Define application routes
- Use hooks to get data
- Trigger data fetching on mount
- Pass data to PageSections
- Handle page-level layout
- SEO and metadata (Next.js: `export const metadata` or `generateMetadata()`)
- **No** business logic
- **No** direct API calls
- **No** complex UI — delegate to Sections and Components

**Next.js App Router**:

```typescript
// src/app/(dashboard)/users/page.tsx
import { Metadata } from 'next';
import { UsersPageContent } from './UsersPageContent';

export const metadata: Metadata = {
  title: 'Users | Dashboard',
  description: 'Manage system users',
};

export default function UsersPage() {
  return <UsersPageContent />;
}

// src/app/(dashboard)/users/UsersPageContent.tsx
'use client';

import { useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UsersListSection } from '@/sections/users/UsersListSection';

export function UsersPageContent() {
  const { users, isLoading, error, findAllUsers } = useUsers();

  useEffect(() => {
    findAllUsers();
  }, [findAllUsers]);

  return (
    <UsersListSection
      users={users}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

**React (Vite)**:

```typescript
// src/pages/UsersPage.tsx
import { useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UsersListSection } from '@/sections/users/UsersListSection';

export default function UsersPage() {
  const { users, isLoading, error, findAllUsers } = useUsers();

  useEffect(() => {
    findAllUsers();
  }, [findAllUsers]);

  return (
    <UsersListSection
      users={users}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

### 7. PageSections Layer (`/src/sections`)

**Purpose**: Major logical sections of a page.

**Rules**:
- Organize page content into logical blocks
- Receive data from Pages via props
- Pass data to Components
- Handle section-specific layout
- Can use hooks for section-specific logic (e.g., search filtering)
- **No** direct API calls
- Must be fluid and responsive

```typescript
// src/sections/users/UsersListSection.tsx
import { useState } from 'react';
import { ApiResponseI } from '@/interfaces/api.interface';
import { UserI } from '@/interfaces/user.interface';
import { UserTable } from '@/components/domain/UserTable';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { useDebounce } from '@/hooks/useDebounce';

interface UsersListSectionProps {
  users: ApiResponseI<UserI[]>;
  isLoading: boolean;
  error: string | null;
}

export function UsersListSection({ users, isLoading, error }: UsersListSectionProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = users.data?.filter(user =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) ?? [];

  if (error) return <ErrorAlert message={error} />;

  return (
    <section style={{ paddingBlock: 'var(--space-lg)' }}>
      {/* Header — stacks on mobile, row on desktop */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-md)',
      }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>Users</h1>
        <Button>Add User</Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 'var(--space-md)', maxWidth: '400px', width: '100%' }}
      />

      {/* Content */}
      {isLoading ? (
        <Skeleton count={5} height="60px" />
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </section>
  );
}
```

### 8. Components Layer (`/src/components`)

**Purpose**: Reusable, presentational UI components.

**Rules**:
- Render UI elements
- Receive data exclusively through props
- Handle user interactions and emit events to parent
- Must be fully responsive using fluid tokens
- **No** direct API calls
- **No** business logic
- **No** Context consumption (receive everything via props)

```typescript
// src/components/domain/UserTable.tsx
import { UserI } from '@/interfaces/user.interface';
import { UserRow } from './UserRow';

interface UserTableProps {
  users: UserI[];
  onEdit?: (user: UserI) => void;
  onDelete?: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-xl)',
        fontSize: 'var(--text-lg)',
        color: 'var(--text-secondary)',
      }}>
        No users found
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}> {/* Horizontal scroll on mobile for wide tables */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

```typescript
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

---

## Styling Strategy

### Detecting Styling Approach

Claude Code must detect the styling approach from project files:

| Indicator | Approach |
|---|---|
| `tailwind.config.*` or `"tailwindcss"` in deps | **Tailwind CSS** |
| `*.module.css` or `*.module.scss` files exist | **CSS Modules** |
| `"styled-components"` in deps | **Styled Components** |
| Multiple present | Use whichever is dominant in existing components |

### Rules (All Approaches)

1. **Always use fluid tokens** (`var(--text-*)`, `var(--space-*)`) for typography and spacing.
2. **Mobile-first** — base styles for mobile, layer up with `min-width`.
3. **No fixed `px` values** for layout spacing, font sizes, or container widths.
4. **Fluid grids** with `auto-fit`/`auto-fill` + `minmax(min(100%, Xpx), 1fr)`.
5. **Max line length** for readability: `max-width: 65ch` on text blocks.

### Tailwind CSS Specifics

```css
/* tailwind.config.ts — extend with fluid tokens */
module.exports = {
  theme: {
    extend: {
      // Reference fluid tokens defined in CSS
      // Use arbitrary values in templates: text-[length:var(--text-xl)]
    },
  },
};
```

```tsx
// Prefer Tailwind utilities + arbitrary values for fluid tokens:
<h1 className="text-[length:var(--text-4xl)] font-bold leading-tight">Title</h1>
<p className="mt-[var(--space-sm)] text-[length:var(--text-base)] max-w-prose">Text</p>

// Use Tailwind breakpoints ONLY for layout shifts (not sizing):
<div className="flex flex-col md:flex-row gap-[var(--space-md)]">
  <aside className="w-full md:w-64 lg:w-80">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

### CSS Modules Specifics

```css
/* Component.module.css */
.wrapper {
  padding: var(--space-md);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-md);
}

.title {
  font-size: var(--text-2xl);
  font-weight: 700;
}

/* Layout shift only — not for sizing */
@media (min-width: 1024px) {
  .wrapper {
    display: grid;
    grid-template-columns: 280px 1fr;
  }
}
```

### Styled Components Specifics

```typescript
// Use css helper for shared fluid styles
import styled, { css } from 'styled-components';

const fluidSection = css`
  padding-block: var(--section-spacing);
  padding-inline: var(--space-md);
`;

const fluidContainer = css`
  width: min(100% - var(--space-md) * 2, 1280px);
  margin-inline: auto;
`;

const fluidGrid = (minColWidth = '300px') => css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, ${minColWidth}), 1fr));
  gap: var(--space-md);
`;

// Usage
const Section = styled.section`${fluidSection}`;
const Container = styled.div`${fluidContainer}`;
const CardGrid = styled.div`${fluidGrid('320px')}`;
```

---

## Data Flow & Patterns

### Complete Create Flow

```typescript
// 1. Component triggers action via event handler
<Button onClick={() => handleCreateUser(formData)}>Create User</Button>

// 2. PageSection calls hook method
function UsersFormSection() {
  const { createUser, isCreateLoading } = useUsers();

  const handleCreateUser = async (data: CreateUserDataI) => {
    try {
      await createUser(data);
      toast.success('User created!');
    } catch {
      toast.error('Failed to create user');
    }
  };

  return <UserForm onSubmit={handleCreateUser} isLoading={isCreateLoading} />;
}

// 3. Hook consumes Context
export const useUsers = () => useContext(UsersContext);

// 4. Provider calls Service
const UsersProvider = ({ children }) => {
  const createUser = async (data: CreateUserDataI) => {
    setIsCreateLoading(true);
    try {
      await userService.createUser(data);
      await findAllUsers(); // Refresh list
    } finally {
      setIsCreateLoading(false);
    }
  };
};

// 5. Service applies business logic, calls Action
class UserService {
  async createUser(data: CreateUserDataI) {
    const sanitized = { ...data, email: data.email.toLowerCase().trim() };
    return await userActions.create(sanitized);
  }
}

// 6. Action makes HTTP request
class UserActions extends BaseAction {
  async create(data: CreateUserDataI) {
    return await this.post(`${API_PATHS.AUTH}${this.endpoint}`, data, 'User created!');
  }
}
```

### Next.js Server Components + Client Architecture

In Next.js App Router, Server Components can fetch data directly. Integrate with the architecture:

```typescript
// src/app/(dashboard)/users/page.tsx — Server Component (default)
import { Metadata } from 'next';
import { UsersPageContent } from './UsersPageContent';

export const metadata: Metadata = {
  title: 'Users | Dashboard',
};

// Server Component — renders on server, passes initial data
export default async function UsersPage() {
  // Optional: fetch initial data on server for SSR/SEO
  // const initialUsers = await fetch(`${API_URL}/users`).then(r => r.json());

  return <UsersPageContent /* initialUsers={initialUsers} */ />;
}

// src/app/(dashboard)/users/UsersPageContent.tsx — Client Component
'use client';
// This component uses hooks/context, so it must be "use client"
// The architecture flow (Actions → Services → Providers → Hooks) runs client-side

import { useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UsersListSection } from '@/sections/users/UsersListSection';

export function UsersPageContent() {
  const { users, isLoading, error, findAllUsers } = useUsers();

  useEffect(() => {
    findAllUsers();
  }, [findAllUsers]);

  return <UsersListSection users={users} isLoading={isLoading} error={error} />;
}
```

### Interface Definitions

```typescript
// src/interfaces/api.interface.ts
export interface ApiResponseI<T> {
  data: T;
  message?: string;
  meta?: PaginationMetaI;
}

export interface PaginationMetaI {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorI {
  status: number;
  message: string;
  details?: unknown;
}

// src/interfaces/user.interface.ts
export interface UserI {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDataI {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDataI {
  name?: string;
  email?: string;
  role?: UserRole;
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
}
```

---

## Error Handling

### Error Boundary (Catches Rendering Errors)

```typescript
// src/components/ui/ErrorBoundary.tsx
'use client';

import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
    // Report to error tracking service (Sentry, etc.)
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} reset={this.reset} />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{
      padding: 'var(--space-xl)',
      textAlign: 'center',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
        {error.message}
      </p>
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
```

### Next.js App Router Error Handling

```typescript
// src/app/(dashboard)/users/error.tsx
'use client';

export default function UsersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'var(--text-2xl)' }}>Failed to load users</h2>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
        {error.message}
      </p>
      <button onClick={reset} style={{ marginTop: 'var(--space-md)' }}>
        Retry
      </button>
    </div>
  );
}

// src/app/(dashboard)/users/loading.tsx
export default function UsersLoading() {
  return (
    <div style={{ padding: 'var(--space-xl)' }}>
      <Skeleton width="200px" height="40px" style={{ marginBottom: 'var(--space-md)' }} />
      <Skeleton count={5} height="60px" gap="var(--space-sm)" />
    </div>
  );
}

// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'var(--text-3xl)' }}>404</h2>
      <p style={{ fontSize: 'var(--text-lg)' }}>Page not found</p>
    </div>
  );
}
```

### API Error Handling Pattern

Errors flow through the architecture:

```
API Error → BaseAction (throws ApiError) → Service (can catch/transform) →
Provider (catches, sets error state) → Hook (exposes error) →
Page/Section (displays error UI)
```

```typescript
// Provider handles errors uniformly
const findAllUsers = useCallback(async () => {
  try {
    setError(null);
    setIsLoading(true);
    await userService.findAll(setUsers);
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        // Redirect to login
        router.push('/login');
        return;
      }
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setIsLoading(false);
  }
}, []);
```

---

## Testing Strategy

### Libraries

| Purpose | Library |
|---|---|
| Test runner | **Vitest** (Vite projects) or **Jest** (Next.js) |
| Component testing | **React Testing Library** (`@testing-library/react`) |
| HTTP mocking | **MSW** (Mock Service Worker) |
| E2E testing | **Playwright** (preferred) or Cypress |
| User events | `@testing-library/user-event` |
| Coverage | Vitest/Jest `--coverage` |

### What to Test per Layer

| Layer | What to Test | Mock Strategy |
|---|---|---|
| **Actions** | Correct endpoints, headers, error mapping | MSW for HTTP mocking |
| **Services** | Business logic, data transformation, validation | Mock Actions |
| **Providers** | State transitions, loading/error/success flows | Mock Services |
| **Hooks** | Return values, side effects | Wrap in test Provider |
| **Sections** | Layout, data display, user interactions | Mock hooks |
| **Components** | Renders correctly, props reflected, events fired, accessibility | Mock props |

### Test Examples

**Action Test**:

```typescript
// src/actions/user.actions.test.ts
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { userActions } from './user.actions';

const server = setupServer(
  http.get('*/users', () => {
    return HttpResponse.json({ data: [{ id: '1', name: 'John' }] });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserActions', () => {
  it('fetchAll returns users', async () => {
    const result = await userActions.fetchAll();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('John');
  });

  it('fetchAll handles 500 error', async () => {
    server.use(
      http.get('*/users', () => HttpResponse.json({ message: 'Server error' }, { status: 500 })),
    );
    await expect(userActions.fetchAll()).rejects.toThrow('Server error');
  });
});
```

**Service Test**:

```typescript
// src/services/users.service.test.ts
import { userService } from './users.service';
import { userActions } from '@/actions/user.actions';

vi.mock('@/actions/user.actions');

describe('UserService', () => {
  it('findAll calls action and passes response to setter', async () => {
    const mockResponse = { data: [{ id: '1', name: 'John', email: 'john@test.com' }] };
    vi.mocked(userActions.fetchAll).mockResolvedValue(mockResponse);
    const setter = vi.fn();

    await userService.findAll(setter);

    expect(userActions.fetchAll).toHaveBeenCalled();
    expect(setter).toHaveBeenCalledWith(mockResponse);
  });

  it('createUser sanitizes email before sending', async () => {
    vi.mocked(userActions.create).mockResolvedValue({ data: {} as any });

    await userService.createUser({
      name: 'John',
      email: '  John@Test.COM  ',
      password: 'pass123',
    });

    expect(userActions.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'john@test.com' }),
    );
  });
});
```

**Provider Test**:

```typescript
// src/providers/users.provider.test.tsx
import { render, act, renderHook, waitFor } from '@testing-library/react';
import { UsersProvider } from './users.provider';
import { useUsers } from '@/hooks/useUsers';
import { userService } from '@/services/users.service';

vi.mock('@/services/users.service');

function wrapper({ children }: { children: React.ReactNode }) {
  return <UsersProvider>{children}</UsersProvider>;
}

describe('UsersProvider', () => {
  it('sets loading state during fetch', async () => {
    vi.mocked(userService.findAll).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100)),
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current.isLoading).toBe(false);

    act(() => { result.current.findAllUsers(); });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('sets error state on failure', async () => {
    vi.mocked(userService.findAll).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      await result.current.findAllUsers();
    });

    expect(result.current.error).toBe('Network error');
  });
});
```

**Component Test**:

```typescript
// src/components/domain/UserTable.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserTable } from './UserTable';

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@test.com', role: 'admin' },
  { id: '2', name: 'Bob', email: 'bob@test.com', role: 'user' },
];

describe('UserTable', () => {
  it('renders all users', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows empty state when no users', () => {
    render(<UserTable users={[]} />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn();
    render(<UserTable users={mockUsers} onDelete={onDelete} />);

    await userEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
```

**E2E Test (Playwright)**:

```typescript
// e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Users Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
  });

  test('displays users list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('search filters users', async ({ page }) => {
    await page.getByPlaceholder('Search users...').fill('Alice');
    await expect(page.getByText('Alice')).toBeVisible();
    await expect(page.getByText('Bob')).not.toBeVisible();
  });

  test('responsive: table scrolls horizontally on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    // Table container should have overflow-x: auto
  });

  test('responsive: layout adapts at tablet breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  });
});
```

### Test File Location

Tests live **next to** the file they test:

```
src/actions/user.actions.ts
src/actions/user.actions.test.ts

src/services/users.service.ts
src/services/users.service.test.ts

src/components/domain/UserTable.tsx
src/components/domain/UserTable.test.tsx
```

E2E tests live in a top-level `e2e/` or `tests/` directory.

---

## Creating a New Feature

To add a new feature (e.g., "Products"), create files in this exact order:

### Step 1: Interfaces

```typescript
// src/interfaces/product.interface.ts
export interface ProductI {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface CreateProductDataI {
  name: string;
  price: number;
  category: string;
}

export interface UpdateProductDataI {
  name?: string;
  price?: number;
  category?: string;
}
```

### Step 2: Action

```typescript
// src/actions/product.actions.ts
class ProductActions extends BaseAction {
  async fetchAll(): Promise<ApiResponseI<ProductI[]>> {
    return await this.get(`${API_PATHS.BASE}${this.endpoint}`);
  }
  async create(data: CreateProductDataI): Promise<ApiResponseI<ProductI>> {
    return await this.post(`${API_PATHS.BASE}${this.endpoint}`, data);
  }
  // ... fetchById, update, remove
}
export const productActions = new ProductActions('/products');
```

### Step 3: Service

```typescript
// src/services/products.service.ts
class ProductService {
  async findAll(setProducts: (r: ApiResponseI<ProductI[]>) => void) {
    const response = await productActions.fetchAll();
    setProducts(response);
    return response;
  }
  // ... createProduct, updateProduct, deleteProduct
}
export const productService = new ProductService();
```

### Step 4: Context

```typescript
// src/contexts/products.context.tsx
export interface ProductsContextProps {
  products: ApiResponseI<ProductI[]>;
  isLoading: boolean;
  error: string | null;
  findAllProducts: () => Promise<void>;
  createProduct: (data: CreateProductDataI) => Promise<void>;
  // ...
}
export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);
```

### Step 5: Provider

```typescript
// src/providers/products.provider.tsx
'use client';
export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State + methods following the UsersProvider pattern
  // Add to AppProviders.tsx
};
```

### Step 6: Hook

```typescript
// src/hooks/useProducts.ts
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within ProductsProvider');
  return context;
};
```

### Step 7: Page

```typescript
// Next.js: src/app/(dashboard)/products/page.tsx
// React: src/pages/ProductsPage.tsx
```

### Step 8: Section

```typescript
// src/sections/products/ProductsListSection.tsx
// — receives data via props, renders layout with fluid responsive tokens
```

### Step 9: Components

```typescript
// src/components/domain/ProductCard.tsx
// — pure presentation, fully responsive, fluid spacing/typography
```

### Step 10: Tests

```
src/actions/product.actions.test.ts
src/services/products.service.test.ts
src/providers/products.provider.test.tsx
src/components/domain/ProductCard.test.tsx
```

### Step 11: Register Provider

```typescript
// src/providers/AppProviders.tsx — add ProductsProvider to the chain
<AuthProvider>
  <UsersProvider>
    <ProductsProvider>
      {children}
    </ProductsProvider>
  </UsersProvider>
</AuthProvider>
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Do This Instead |
|---|---|---|
| API calls in components | Couples UI to network; untestable | Route through Actions → Services |
| Business logic in Actions | Actions should be thin HTTP transport | Put logic in Services |
| State management in Services | Services should be stateless functions | State lives in Providers |
| Direct API calls in Providers | Skips the service layer | Always call through Services |
| Complex logic in Hooks | Makes hooks hard to test and reuse | Extract to Services |
| Skipping the Service layer | Providers become bloated with logic | Always route through Services |
| `useContext` directly in components | Components become coupled to Context | Create a custom hook (`useUsers`) |
| God components (400+ lines) | Unreadable, unmaintainable | Split into Sections + child Components |
| Prop drilling 3+ levels | Fragile, verbose | Use Context/Provider pattern |
| Fixed `px` for spacing/fonts | Not responsive, breaks on different devices | Use fluid tokens (`var(--space-*)`, `var(--text-*)`) |
| Desktop-first CSS (`max-width`) | Overriding down is fragile | Mobile-first with `min-width` |
| Media queries for grid columns | Breakpoint-dependent, not fluid | Use `auto-fit` + `minmax()` |
| Hardcoded colors/sizes | Inconsistent, hard to theme | Use CSS custom properties or theme tokens |
| `any` type usage | Defeats TypeScript safety | Define proper interfaces |
| Missing `"use client"` | Runtime error in Next.js App Router | Add when component uses hooks/events/browser APIs |
| `useEffect` without deps array | Infinite re-render loop | Always specify dependencies |
| Missing `useCallback`/`useMemo` on context values | Unnecessary re-renders of all consumers | Memoize context value object |
| Missing error boundaries | One error crashes the entire app | Wrap route segments in `<ErrorBoundary>` |
| Catching errors silently | Bugs become invisible | Log, set error state, or re-throw |
| `localStorage` in SSR | `ReferenceError: window is not defined` | Guard with `typeof window !== 'undefined'` |
| Barrel export cycles | Webpack/bundler circular dependency errors | Keep barrel exports shallow (1 level) |
| Not testing responsive behavior | Broken layouts ship to production | Include viewport tests in E2E suite |

---

## Best Practices Summary

| Layer | Do | Don't |
|---|---|---|
| **Actions** | Keep thin — only HTTP calls | Add business logic, state, or error transformation |
| **Services** | Validate, transform, orchestrate | Manage state or make direct HTTP calls |
| **Providers** | Manage state, handle loading/error, call services | Call actions directly or add business logic |
| **Hooks** | Simple context consumption, utility logic | Complex business logic or API calls |
| **Pages** | Minimal — routing, metadata, data fetch trigger | Complex UI rendering or business logic |
| **Sections** | Organize layout, receive props, section-level UI logic | Direct API calls or deep business logic |
| **Components** | Pure presentation, props in, events out | Context consumption, API calls, business logic |
| **Styling** | Fluid tokens, mobile-first, `clamp()`, `auto-fit` grids | Fixed `px`, desktop-first, breakpoint-only sizing |