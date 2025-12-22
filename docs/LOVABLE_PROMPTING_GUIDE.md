# Lovable SEO Core Prompting Guide

**A step-by-step guide for building production-ready, SEO-optimized websites in Lovable.**

This guide provides copy-paste prompts with JSDoc documentation patterns. Follow the phases in order—the sequence matters.

---

## Table of Contents

1. [Before You Start](#before-you-start) — What you need to know
2. [Phase 1: First Prompt](#phase-1-first-prompt) — Minimal project creation
3. [Phase 2: Connect Services](#phase-2-connect-services) — GitHub, Vercel, (Supabase if needed)
4. [Phase 3: Upload PRD](#phase-3-upload-prd) — Add requirements document
5. [Phase 4: Establish Task Tracker](#phase-4-establish-task-tracker) — Parse PRD into tasks
6. [Phase 5: Build Foundation](#phase-5-build-foundation) — Core architecture
7. [Phase 6: PRD-Driven Development](#phase-6-prd-driven-development) — Feature implementation
8. [Code Patterns](#code-patterns) — JSDoc, SEO, Hydration safety
9. [Quick Reference](#quick-reference) — Common issues and solutions

---

## Before You Start

### Key Constraints

- **You cannot connect GitHub until after your first prompt** — Lovable creates the project on the first prompt
- **Keep the first prompt minimal** — Just enough to create a blank project
- **All subsequent prompts must follow PRD and guidelines** — No ad-hoc development
- **JSDoc everything** — Every exported function, component, and type gets documentation
- **Exclude admin routes from pre-rendering** — Always filter these in vite.config.ts

### Backend Options

Choose your backend approach before starting:

| Option | Use When |
|--------|----------|
| **Vercel Edge API** | Simple forms, webhooks, API proxying |
| **Supabase Edge API** | Database needed, complex auth, real-time features |
| **No backend** | Static content only |

**Important:** This guide assumes Vercel Edge API. If using Supabase, enable Lovable Cloud in Phase 2.

---

## Phase 1: First Prompt

Your first prompt creates the project. Keep it minimal—we'll build properly after connecting services.

> **Copy this prompt into a NEW Lovable project:**

```
Create a minimal React + TypeScript + Tailwind CSS project with:
- A simple home page with placeholder content
- Basic project structure
- No routing configuration yet

Keep it minimal. We will configure properly after connecting GitHub.
```

**Wait for this to complete before proceeding.**

---

## Phase 2: Connect Services

### Step 2a: Connect GitHub

1. In Lovable editor, click **GitHub**
2. Click **Connect to GitHub**
3. Authorize Lovable's GitHub App
4. Select your GitHub account/organization
5. Click **Create Repository**

Your code now syncs automatically with every change.

### Step 2b: Connect Vercel Pro

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New → Project**
3. Import your new GitHub repository
4. Configure settings:

| Setting | Value |
|---------|-------|
| Build Command | `npx vite-react-ssg build` |
| Output Directory | `dist` |
| Framework Preset | `Other` |

5. Add environment variables (if needed)
6. Deploy

### Step 2c: Configure Custom Domain (Vercel)

1. Go to **Project Settings → Domains**
2. Add your root domain: `yourdomain.com`
3. Add www subdomain: `www.yourdomain.com`
4. Configure redirects:
   - **Root domain** = Primary (no redirect)
   - **WWW** = Redirects to root domain

**Critical:** Do NOT redirect root to www. Always redirect www to root.

### Step 2d: Enable Supabase (Only If Needed)

Skip this step if using Vercel Edge API only.

If your project requires database or auth:

1. In Lovable editor, click **Cloud**
2. Click **Enable Lovable Cloud**
3. Wait for Supabase provisioning

**Out of scope for many projects:**
- Admin routes
- User login/authentication
- Database management UI

---

## Phase 3: Upload PRD

Before building features, create a Product Requirements Document.

### Option A: Create via Lovable Prompt

> **Second prompt in Lovable:**

```
Create a PRD document at docs/PRD-homepage.md with this structure:

## Overview
[Brief description of the feature]

## Goals
- Primary goal
- Success metrics

## User Stories
As a [user], I want [feature] so that [benefit].

## Requirements

### Functional Requirements
- [ ] FR-1: [Requirement description]
- [ ] FR-2: [Requirement description]

### Non-Functional Requirements
- [ ] NFR-1: Page load under 3 seconds
- [ ] NFR-2: Mobile responsive

## Technical Approach
[Implementation strategy]

## Dependencies
- Environment variables needed
- External services

## Out of Scope
- Features NOT included

## Timeline
- Phase 1: [Milestone]
```

### Option B: Upload via Git

```bash
# Create PRD locally
echo "# PRD: Homepage" > docs/PRD-homepage.md

# Add and push
git add docs/PRD-homepage.md
git commit -m "Add homepage PRD"
git push
```

### Option C: Upload via GitHub Web

1. Go to your repository on GitHub
2. Navigate to `docs/` folder (create if needed)
3. Click **Add file → Create new file**
4. Name: `PRD-homepage.md`
5. Add content and commit

---

## Phase 4: Establish Task Tracker

Parse the PRD into a trackable task list.

> **Prompt in Lovable:**

```
Parse docs/PRD-homepage.md and create docs/task_tracker.md with this format:

# Task Tracker

Generated from: PRD-homepage.md
Last updated: [current date]

## Tasks

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| FR-1 | [Description from PRD] | ⬜ Pending | |
| FR-2 | [Description from PRD] | ⬜ Pending | |
| NFR-1 | [Description from PRD] | ⬜ Pending | |

## Status Legend
- ⬜ Pending
- 🔄 In Progress
- ✅ Complete
- ❌ Blocked

## Change Log
- [date]: Initial task list created from PRD
```

---

## Phase 5: Build Foundation

Now build the project foundation with proper architecture.

> **Prompt in Lovable:**

```
Set up the project foundation with JSDoc documentation throughout. Update docs/task_tracker.md as you complete each item.

Create these files:

1. **src/main.tsx** - Entry point:
```tsx
/**
 * @fileoverview Application entry point for vite-react-ssg
 * @description Initializes static site generation with defined routes
 */
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

/**
 * Creates the SSG root for static HTML generation
 * @remarks Replaces createRoot from react-dom for SSG builds
 */
export const createRoot = ViteReactSSG({ routes });
```

2. **src/components/ClientOnly.tsx** - Browser-only wrapper:
```tsx
/**
 * @fileoverview Client-side only rendering wrapper
 * @description Prevents hydration mismatches for browser-dependent features
 */
import { useState, useEffect, ReactNode } from 'react';

/** Props for ClientOnly component */
interface ClientOnlyProps {
  /** Content to render only in browser */
  children: ReactNode;
  /** Content to show during SSR/initial render */
  fallback?: ReactNode;
}

/**
 * Renders children only after client-side hydration
 * 
 * @description Use for components that:
 * - Access browser APIs (window, localStorage)
 * - Use portals (Sheet, Dialog, Toast)
 * - Display dynamic data (Date, Math.random)
 * 
 * @example
 * <ClientOnly fallback={<Button>Menu</Button>}>
 *   <Sheet>...</Sheet>
 * </ClientOnly>
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? <>{children}</> : <>{fallback}</>;
}
```

3. **src/routes.tsx** - Route definitions:
```tsx
/**
 * @fileoverview Application route definitions
 * @description All page routes for vite-react-ssg static generation
 * 
 * @important NEVER use React.lazy() — breaks pre-rendering
 * @important All page imports must be direct/static imports
 */
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Layout from '@/components/layout/Layout';

// DIRECT IMPORTS ONLY — NO REACT.LAZY()
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

/**
 * Application routes for static site generation
 * @description Each route becomes a pre-rendered HTML file
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App><Layout /></App>,
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
```

4. **vite.config.ts** - Build configuration with route exclusions:
```ts
/**
 * @fileoverview Vite configuration with SSG options
 * @description Build settings for static site generation
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  /**
   * Static Site Generation options
   */
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    /**
     * Filter routes for pre-rendering
     * @description ALWAYS exclude admin, dashboard, and auth routes
     */
    includedRoutes: (paths: string[]) => {
      return paths.filter((path: string) => 
        !path.includes('admin') && 
        !path.includes('dashboard') &&
        !path.includes('auth')
      );
    },
  },
}));
```

5. **vercel.json** - Deployment settings:
```json
{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false
}
```
```

---

## Phase 6: PRD-Driven Development

All feature development follows this pattern:

### Implementing a Requirement

> **Prompt template:**

```
Implement [FR-X] from docs/PRD-[feature].md:
[Paste the specific requirement]

Requirements:
- Add JSDoc documentation to all new code
- Follow existing code patterns
- Update docs/task_tracker.md status when complete
```

### Adding a New Page

> **Prompt template:**

```
Add a new [PageName] page following the PRD requirements:

1. Create src/pages/[PageName].tsx with:
   - @fileoverview JSDoc
   - @seo JSDoc with keyword targets
   - Head component with meta tags
   - Component JSDoc

2. Add DIRECT IMPORT to src/routes.tsx:
```tsx
import NewPage from '@/pages/NewPage';
// In children array:
{ path: 'new-page', element: <NewPage /> },
```

3. Update docs/task_tracker.md

CRITICAL: Do NOT use React.lazy() — breaks pre-rendering.
```

### Completing a Feature

After implementing all requirements from a PRD:

```
Review docs/PRD-[feature].md and verify all requirements are complete:
- Check each FR-* requirement
- Verify NFR-* requirements are met
- Update docs/task_tracker.md with final status
- Add completion note to task tracker change log
```

---

## Code Patterns

### JSDoc Standards

Every exported function and component needs JSDoc:

```tsx
/**
 * @fileoverview Brief description of the file
 * @description More detailed explanation if needed
 */

/**
 * Component/function description
 * 
 * @description What it does and why
 * @param props - Component props
 * @returns What it returns
 * 
 * @example
 * <ComponentName prop="value" />
 */
```

### SEO Page Template

```tsx
/**
 * @fileoverview [Page] page component
 * @seo Primary keyword: [keyword]
 * @seo Secondary keywords: [terms]
 */
import { Head } from "vite-react-ssg";

/**
 * [Page] page
 * 
 * @seo Title: "[Title]" (under 60 chars)
 * @seo Description: "[Desc]" (under 160 chars)
 */
export default function PageName() {
  return (
    <>
      <Head>
        <title>Page Title | Brand</title>
        <meta name="description" content="Description with keyword" />
        <link rel="canonical" href="https://domain.com/page" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Title | Brand" />
        <meta property="og:description" content="Description" />
        <meta property="og:url" content="https://domain.com/page" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Title | Brand" />
      </Head>
      
      <section className="container py-16">
        <h1>Page Heading</h1>
      </section>
    </>
  );
}
```

### Hydration-Safe Header

```tsx
/**
 * @fileoverview Site header with responsive navigation
 * @description Fixed header with scroll-aware styling and mobile menu
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

/**
 * Site header component
 * 
 * @hydration Uses mounted state for scroll styling
 * @hydration Wraps Sheet in ClientOnly with fallback
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
  
  // Only apply scroll styling after hydration
  const headerClasses = mounted && isScrolled 
    ? "bg-background/95 backdrop-blur shadow-sm" 
    : "bg-transparent";
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${headerClasses}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl">Logo</Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        {/* Mobile menu - wrapped for hydration safety */}
        <div className="md:hidden">
          <ClientOnly fallback={<Button variant="ghost" size="icon"><Menu /></Button>}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/about">About</Link>
                  <Link to="/services">Services</Link>
                  <Link to="/contact">Contact</Link>
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

### When to Use ClientOnly

| Feature | Needs ClientOnly? | Why |
|---------|-------------------|-----|
| Sheet, Dialog, Drawer | ✅ Yes | Uses portal |
| Toast notifications | ✅ Yes | Uses portal |
| Dropdown menus | ✅ Yes | Uses portal |
| Scroll-based styling | Use `mounted` state | Browser API |
| localStorage access | ✅ Yes | Browser API |
| Date/time display | ✅ Yes | Timezone varies |
| Static content | ❌ No | Same on server/client |

### Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Hydration error | Server/client mismatch | Wrap in ClientOnly or use mounted state |
| Blank page after build | React.lazy() used | Use direct imports only |
| Meta tags not in HTML | Wrong Head import | Use Head from vite-react-ssg |
| Admin pages indexed | Not excluded from SSG | Add to includedRoutes filter |

### Anti-Patterns

```tsx
// ❌ DON'T: Use React.lazy for pages
const About = React.lazy(() => import('@/pages/About'));

// ✅ DO: Direct imports
import About from '@/pages/About';

// ❌ DON'T: Use portals without wrapping
<Sheet>...</Sheet>

// ✅ DO: Wrap portals in ClientOnly
<ClientOnly fallback={<Button>Menu</Button>}>
  <Sheet>...</Sheet>
</ClientOnly>

// ❌ DON'T: Skip JSDoc
export function formatDate(date) { ... }

// ✅ DO: Document everything
/**
 * Formats a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string { ... }
```

### File Overview

| File | Purpose |
|------|---------|
| `src/main.tsx` | SSG entry point |
| `src/routes.tsx` | Route definitions (direct imports only) |
| `src/components/ClientOnly.tsx` | Browser-only wrapper |
| `vite.config.ts` | Build settings + route exclusions |
| `vercel.json` | Deployment configuration |
| `docs/PRD-*.md` | Feature requirements |
| `docs/task_tracker.md` | Task tracking from PRD |

---

## Testing

### Build Verification

```bash
npx vite-react-ssg build
```

Check `dist/index.html`:
- ✅ Full page content visible (not empty div)
- ✅ Meta tags in `<head>` section
- ✅ Text content pre-rendered

### Google Rich Results Test

1. Go to https://search.google.com/test/rich-results
2. Enter your page URL
3. **Test each URL twice** — some issues only appear on second request

---

*This guide establishes patterns for maintainable, SEO-optimized Lovable projects.*
