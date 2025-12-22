# Lovable SEO Prompting Guide

A step-by-step guide for building production-ready, SEO-optimized websites in Lovable.

---

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Phase 1: First Prompt](#phase-1-first-prompt) — Minimal project creation
3. [Phase 2: Connect Services](#phase-2-connect-services) — GitHub, Vercel, Supabase
4. [Phase 3: PRD & Task Tracker](#phase-3-prd--task-tracker) — Requirements-driven development
5. [Phase 4: Foundation Prompt](#phase-4-foundation-prompt) — Core architecture
6. [Phase 5: Page Templates](#phase-5-page-templates) — SEO-optimized pages
7. [Phase 6: Components](#phase-6-components) — Hydration-safe components
8. [Quick Reference](#quick-reference)

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  1. FIRST PROMPT         → Creates blank project                │
│  2. CONNECT GITHUB       → Version control (can't do before #1) │
│  3. CONNECT VERCEL PRO   → Production deployment                │
│  4. CONFIGURE DOMAIN     → Root domain, www → root redirect     │
│  5. ENABLE SUPABASE      → Only if PRD requires it              │
│  6. ADD PRD TO docs/     → Via git, GitHub web, or prompt       │
│  7. PARSE PRD            → Creates task_tracker.md              │
│  8. IMPLEMENT            → Follow PRD requirements              │
└─────────────────────────────────────────────────────────────────┘
```

### Critical Rules

- ⚠️ **GitHub cannot be connected until AFTER the first prompt**
- ⚠️ **Use Vercel Edge API or Supabase Edge API** — NOT Lovable Cloud backend
- ⚠️ **Admin routes and user login are OUT OF SCOPE** for this template

---

## Phase 1: First Prompt

> **Goal**: Create a minimal blank project so you can connect GitHub.

### Prompt

```
Create a new React + Vite + TypeScript + Tailwind CSS project.

Minimal setup only:
- src/main.tsx with ViteReactSSG entry point
- src/App.tsx with placeholder content
- src/routes.tsx with empty routes array
- vite.config.ts with basic SSG options
- vercel.json for deployment

Do not create any pages or features yet. Keep it minimal.
```

### Expected Output

```tsx
/**
 * @fileoverview Minimal entry point
 */
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
```

---

## Phase 2: Connect Services

> **Goal**: Establish version control and deployment pipeline.

### Step 2.1: Connect GitHub

1. Click **GitHub** → **Connect to GitHub** in Lovable
2. Authorize the Lovable GitHub App
3. Select your GitHub account/organization
4. Click **Create Repository**

### Step 2.2: Connect Vercel Pro

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your new GitHub repository
4. Configure build settings:

| Setting | Value |
|---------|-------|
| Build Command | `npx vite-react-ssg build` |
| Output Directory | `dist` |
| Framework Preset | Other |

5. Deploy

### Step 2.3: Configure Domain in Vercel

1. **Settings** → **Domains**
2. Add your root domain: `yourdomain.com`
3. **DO NOT** redirect root to www
4. Add `www.yourdomain.com` and set it to **redirect to root**

```
yourdomain.com       → Primary (no redirect)
www.yourdomain.com   → Redirects to yourdomain.com
```

### Step 2.4: Enable Supabase (If Required)

Only enable if your PRD explicitly requires database or authentication:

```
Enable Lovable Cloud for this project.
```

> **Note**: We use Supabase Edge Functions for backend logic, NOT Lovable Cloud backend deployment.

---

## Phase 3: PRD & Task Tracker

> **Goal**: Drive all development from documented requirements.

### Step 3.1: Create or Upload PRD

Add your PRD to the `docs/` folder using one of these methods:

| Method | Instructions |
|--------|--------------|
| **Git CLI** | Create `docs/PRD-feature.md` locally, commit, push |
| **GitHub Web** | Click Add File → Upload in your repo's `docs/` folder |
| **Lovable Prompt** | Paste PRD content directly (see template below) |

### PRD Template

```markdown
# PRD: [Feature Name]

## Overview
[One paragraph describing the feature]

## Goals
- Primary: [Main objective]
- Secondary: [Supporting objectives]
- Metrics: [How we measure success]

## User Stories
- As a [user], I want [feature] so that [benefit]

## Requirements

### Functional Requirements
- [ ] FR-1: [Specific requirement]
- [ ] FR-2: [Specific requirement]
- [ ] FR-3: [Specific requirement]

### Non-Functional Requirements
- [ ] NFR-1: Page load under 3 seconds
- [ ] NFR-2: Mobile responsive
- [ ] NFR-3: WCAG 2.1 AA accessible

## Technical Approach
- Frontend: React components with JSDoc
- Backend: Vercel Edge API (or Supabase Edge Functions)
- No admin routes or user authentication

## Out of Scope
- Admin dashboard
- User login/registration
- [Other excluded items]

## Dependencies
- Environment variables: [List any needed]
- Third-party services: [List any needed]
```

### Step 3.2: Parse PRD into Task Tracker

> **Second/Third Prompt**:

```
Read the PRD at docs/PRD-[feature-name].md.

Create docs/task_tracker.md by parsing all FR-* and NFR-* requirements.

Format:

# Task Tracker

Generated from: docs/PRD-[feature-name].md
Last updated: [date]

## In Progress
- [ ] [First task to work on]

## To Do
- [ ] FR-1: [Requirement text]
- [ ] FR-2: [Requirement text]
- [ ] NFR-1: [Requirement text]

## Completed
(Move completed tasks here with [x])

## Blocked
(Tasks that cannot proceed with reason)

---

Then begin implementing the first task from "To Do".
Move it to "In Progress" when you start.
Move it to "Completed" when done.
```

---

## Phase 4: Foundation Prompt

> **Goal**: Establish core architecture with JSDoc documentation.

### Prompt

```
Create the project foundation following the PRD. Include JSDoc on all exports.

1. **src/main.tsx** - SSG entry point:

/**
 * @fileoverview Application entry point for vite-react-ssg
 * @description Initializes static site generation with defined routes
 */
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

/**
 * SSG root creator
 * @remarks Replaces createRoot from react-dom for static builds
 */
export const createRoot = ViteReactSSG({ routes });

2. **src/components/ClientOnly.tsx** - Hydration wrapper:

/**
 * @fileoverview Client-side only rendering wrapper
 * @description Prevents hydration mismatches for browser-only features
 */
import { useState, useEffect, ReactNode } from 'react';

/**
 * @interface ClientOnlyProps
 * @property {ReactNode} children - Content to render after hydration
 * @property {ReactNode} [fallback] - Content during SSR
 */
interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Renders children only after client-side hydration
 * @description Use for: portals, browser APIs, dynamic content
 * @example
 * <ClientOnly fallback={<Button>Menu</Button>}>
 *   <Sheet>...</Sheet>
 * </ClientOnly>
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}

3. **src/routes.tsx** - Direct imports only:

/**
 * @fileoverview Route definitions for static generation
 * @important NEVER use React.lazy() - breaks pre-rendering
 */
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Layout from '@/components/layout/Layout';

// DIRECT IMPORTS ONLY
import Home from '@/pages/Home';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

/**
 * Application routes
 * @description Each route becomes a pre-rendered HTML file
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App><Layout /></App>,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

4. **vite.config.ts** - Exclude admin routes:

/**
 * @fileoverview Vite + SSG configuration
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    /**
     * Excludes admin/dashboard/auth from pre-rendering
     * @param paths - All discovered routes
     * @returns Routes to pre-render
     */
    includedRoutes: (paths: string[]) => {
      return paths.filter((p: string) => 
        !p.includes('admin') && 
        !p.includes('dashboard') &&
        !p.includes('auth')
      );
    },
  },
});

5. **vercel.json**:

{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false
}

Update docs/task_tracker.md after completing each file.
```

---

## Phase 5: Page Templates

> **Goal**: Create SEO-optimized pages with proper meta tags.

### Prompt

```
Create page components with JSDoc and SEO meta tags.

Template for every page:

/**
 * @fileoverview [Page Name] page
 * @description [Purpose of this page]
 * @seo Primary keyword: [keyword]
 */
import { Head } from "vite-react-ssg";

/**
 * [Page Name] component
 * @returns Page with SEO meta tags
 */
export default function PageName() {
  return (
    <>
      <Head>
        <title>Page Title | Brand Name</title>
        <meta name="description" content="150-160 chars with keyword" />
        <link rel="canonical" href="https://yourdomain.com/path" />
        <meta property="og:title" content="Page Title | Brand Name" />
        <meta property="og:description" content="Social description" />
        <meta property="og:url" content="https://yourdomain.com/path" />
        <meta property="og:type" content="website" />
      </Head>
      
      <section className="container py-16">
        <h1>Page Heading</h1>
        {/* Page content */}
      </section>
    </>
  );
}

IMPORTANT:
- Use Head from vite-react-ssg (NOT react-helmet-async)
- Every page needs unique title, description, canonical
- Add Open Graph tags for social sharing
```

---

## Phase 6: Components

> **Goal**: Create hydration-safe reusable components.

### Header with Mobile Menu

```
Create a responsive Header with JSDoc:

/**
 * @fileoverview Site header with responsive navigation
 * @description Fixed header with scroll effects and mobile menu
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

/**
 * Navigation configuration
 */
const NAV_ITEMS = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
] as const;

/**
 * Site header component
 * @hydration Uses mounted state for scroll styling
 * @hydration Wraps Sheet in ClientOnly
 */
export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const headerClasses = mounted && isScrolled 
    ? "bg-background/95 backdrop-blur shadow-sm" 
    : "bg-transparent";
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${headerClasses}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl">Logo</Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link key={path} to={path}>{label}</Link>
          ))}
        </nav>
        
        {/* Mobile menu - hydration safe */}
        <div className="md:hidden">
          <ClientOnly fallback={<Button variant="ghost" size="icon"><Menu /></Button>}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu /></Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_ITEMS.map(({ path, label }) => (
                    <Link key={path} to={path}>{label}</Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
```

---

## Quick Reference

### ClientOnly Usage

| Component | Needs ClientOnly? | Reason |
|-----------|-------------------|--------|
| Sheet, Dialog, Drawer | ✅ Yes | Portal |
| Toast, Dropdown | ✅ Yes | Portal |
| Scroll-based styles | Use `mounted` | Browser API |
| localStorage | ✅ Yes | Browser API |
| Static content | ❌ No | Same server/client |

### Common Issues

| Problem | Solution |
|---------|----------|
| Hydration error #418/#423 | Wrap in ClientOnly |
| Meta tags missing | Use Head from vite-react-ssg |
| Admin pages indexed | Add to includedRoutes filter |
| Blank page after build | Replace React.lazy with direct import |

### Anti-Patterns

```tsx
// ❌ WRONG: React.lazy breaks SSG
const About = React.lazy(() => import('@/pages/About'));

// ✅ CORRECT: Direct import
import About from '@/pages/About';

// ❌ WRONG: Bare portal component
<Sheet>...</Sheet>

// ✅ CORRECT: Wrapped for hydration
<ClientOnly fallback={<Button>Menu</Button>}>
  <Sheet>...</Sheet>
</ClientOnly>
```

---

## Edge API Pattern

This template uses **Vercel Edge API** or **Supabase Edge Functions** for backend logic.

### Vercel Edge Function

```ts
// api/submit-form.ts

/**
 * @fileoverview Form submission edge function
 * @description Handles contact form POST requests
 */
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  const data = await req.json();
  // Process form data
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

### What We Do NOT Use

- ❌ Lovable Cloud backend deployment
- ❌ Admin routes or dashboards
- ❌ User authentication/login
- ❌ Supabase client-side auth

---

## Testing

### Build Verification

```bash
npx vite-react-ssg build
```

Check `dist/index.html`:
- ✅ Content pre-rendered (not empty div)
- ✅ Meta tags in `<head>`
- ✅ No hydration errors in console

### Google Rich Results Test

1. Go to https://search.google.com/test/rich-results
2. Enter your deployed URL
3. **Test twice** — some issues only appear on second request

---

*Follow these prompts in order for a production-ready Lovable project.*
