# Lovable Project Prompting Guide

**The definitive guide for building production-ready, SEO-optimized websites in Lovable.**

This guide provides copy-paste prompts that establish professional patterns from day one. Each code example includes JSDoc documentation for maintainability.

---

## Table of Contents

1. [Getting Started](#getting-started) — Connect GitHub, Supabase, Vercel
2. [Phase 1: Project Foundation](#phase-1-project-foundation) — Core architecture
3. [Phase 2: SEO Page Template](#phase-2-seo-page-template) — Meta tags pattern
4. [Phase 3: Responsive Header](#phase-3-responsive-header) — Hydration-safe navigation
5. [Phase 4: Adding Pages](#phase-4-adding-pages) — Correct page setup
6. [PRD-Driven Development](#prd-driven-development) — Requirements documents
7. [Quick Reference](#quick-reference) — Patterns and troubleshooting

---

## Getting Started

Before building features, connect your essential services in order.

### Step 1: Connect GitHub

> **Prompt:**
```
Connect this project to GitHub. Create a new repository.
```

**Why first?** Version control from the start. All code changes sync automatically.

### Step 2: Enable Lovable Cloud (Supabase)

> **Prompt:**
```
Enable Lovable Cloud for this project. I need database and authentication capabilities.
```

**Why second?** Backend infrastructure for forms, auth, and data storage.

### Step 3: Configure Vercel Deployment

> **Prompt:**
```
Review the vercel.json configuration for this project. Ensure it's set up for pre-rendered static site deployment with clean URLs.
```

**Why third?** Production deployment pipeline ready before building features.

---

## Phase 1: Project Foundation

> **Copy this prompt into Lovable:**

```
Create the project foundation with JSDoc documentation throughout.

Set up these files:

1. **src/main.tsx** - Entry point:
```tsx
/**
 * @fileoverview Application entry point for vite-react-ssg
 * @description Initializes static site generation with defined routes
 * @see {@link ./routes.tsx} for route definitions
 */
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

/**
 * Creates the SSG root for static HTML generation
 * @remarks This replaces createRoot from react-dom for SSG builds
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

/**
 * Props for ClientOnly component
 */
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
 * ```tsx
 * <ClientOnly fallback={<Button>Menu</Button>}>
 *   <Sheet>...</Sheet>
 * </ClientOnly>
 * ```
 * 
 * @param props - Component props
 * @returns Fallback during SSR, children after hydration
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? <>{children}</> : <>{fallback}</>;
}
```

3. **src/App.tsx** - App wrapper with providers:
```tsx
/**
 * @fileoverview Root application component with global providers
 * @description Wraps all pages with QueryClient and toast notifications
 */
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ClientOnly } from '@/components/ClientOnly';

/**
 * Global providers wrapper for the application
 * 
 * @description Provides:
 * - React Query for server state management
 * - Toast notifications (client-only to prevent hydration issues)
 * 
 * @remarks QueryClient must be created inside component to prevent
 * SSR state leakage between requests
 * 
 * @param props - Component props
 * @param props.children - Child components to wrap
 */
function AppProviders({ children }: { children: React.ReactNode }) {
  // Create QueryClient in useState to ensure one instance per render
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </QueryClientProvider>
  );
}

/**
 * Root App component
 * 
 * @param props - Component props
 * @param props.children - Route content from vite-react-ssg
 * @returns Application wrapped with providers
 */
export default function App({ children }: { children?: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
```

4. **src/routes.tsx** - Page routing:
```tsx
/**
 * @fileoverview Application route definitions
 * @description All page routes for vite-react-ssg static generation
 * 
 * @important NEVER use React.lazy() — it breaks pre-rendering
 * @important All page imports must be static/direct imports
 */
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Layout from '@/components/layout/Layout';

// ============================================
// DIRECT IMPORTS ONLY — NO REACT.LAZY()
// ============================================
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/**
 * Application routes for static site generation
 * 
 * @description Each route becomes a pre-rendered HTML file
 * 
 * @example Adding a new page:
 * 1. Create src/pages/NewPage.tsx
 * 2. Add direct import above: import NewPage from '@/pages/NewPage';
 * 3. Add route below: { path: 'new-page', element: <NewPage /> }
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App><Layout /></App>,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
```

5. **src/components/layout/Layout.tsx**:
```tsx
/**
 * @fileoverview Main layout wrapper
 * @description Provides consistent header/footer structure across pages
 */
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Page layout component
 * 
 * @description Wraps all pages with:
 * - Fixed header navigation
 * - Flexible main content area
 * - Footer with site info
 * 
 * @returns Layout structure with Outlet for page content
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

6. **vite.config.ts** - Build configuration:
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
   * @see https://github.com/Daydreamer-rtte/vite-react-ssg
   */
  ssgOptions: {
    /** Load scripts asynchronously for performance */
    script: 'async',
    /** Minify HTML output */
    formatting: 'minify',
    /** CSS optimization settings */
    crittersOptions: {
      reduceInlineStyles: false,
    },
    /**
     * Filter routes for pre-rendering
     * @description Excludes admin, dashboard, and auth routes from SSG
     * @param paths - All discovered route paths
     * @returns Paths to pre-render
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

7. **vercel.json** - Deployment settings:
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

## Phase 2: SEO Page Template

> **Copy this prompt into Lovable:**

```
Create page components with JSDoc and SEO meta tags using Head from vite-react-ssg.

Use this template for every page:

```tsx
/**
 * @fileoverview [Page Name] page component
 * @description [Brief description of page purpose]
 * @seo
 * - Primary keyword: [main keyword]
 * - Secondary keywords: [related terms]
 */
import { Head } from "vite-react-ssg";

/**
 * [Page Name] page
 * 
 * @description [What this page does and why it exists]
 * 
 * @seo Title: "[Title]" (under 60 chars)
 * @seo Description: "[Description]" (under 160 chars)
 * @seo Canonical: https://yourdomain.com/page-path
 * 
 * @returns Page with SEO meta tags and content
 */
export default function PageName() {
  return (
    <>
      <Head>
        <title>Page Title | Brand Name</title>
        <meta name="description" content="150-160 character description with your main keyword" />
        <link rel="canonical" href="https://yourdomain.com/page-path" />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Page Title | Brand Name" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:url" content="https://yourdomain.com/page-path" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Title | Brand Name" />
        <meta name="twitter:description" content="Description for Twitter" />
      </Head>
      
      {/* Page content */}
      <section className="container py-16">
        <h1>Page Heading</h1>
      </section>
    </>
  );
}
```

IMPORTANT:
- Use Head from vite-react-ssg (NOT react-helmet-async)
- Every page needs unique title, description, and canonical URL
- Include Open Graph tags for social sharing
```

---

## Phase 3: Responsive Header

> **Copy this prompt into Lovable:**

```
Create a responsive Header component with JSDoc, scroll effects, and mobile menu.

```tsx
/**
 * @fileoverview Site header with responsive navigation
 * @description Fixed header with scroll-aware styling and mobile menu
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

/**
 * Navigation items configuration
 * @description Centralized nav links for consistency
 */
const NAV_ITEMS = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
] as const;

/**
 * Site header component
 * 
 * @description Features:
 * - Fixed positioning with backdrop blur on scroll
 * - Desktop horizontal navigation
 * - Mobile hamburger menu (uses portal, wrapped in ClientOnly)
 * 
 * @hydration
 * - Uses `mounted` state to prevent scroll style mismatch
 * - Mobile Sheet wrapped in ClientOnly with fallback button
 * 
 * @returns Header element with responsive navigation
 */
export default function Header() {
  /** Tracks if component has mounted in browser */
  const [mounted, setMounted] = useState(false);
  /** Tracks scroll position for styling */
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    /**
     * Updates scroll state based on window position
     */
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Only apply scroll styling after hydration to prevent mismatch
  const headerClasses = mounted && isScrolled 
    ? "bg-background/95 backdrop-blur shadow-sm" 
    : "bg-transparent";
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${headerClasses}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl">
          Logo
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link key={path} to={path} className="hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile menu - wrapped for hydration safety */}
        <div className="md:hidden">
          <ClientOnly fallback={<Button variant="ghost" size="icon"><Menu /></Button>}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_ITEMS.map(({ path, label }) => (
                    <Link key={path} to={path} className="text-lg">
                      {label}
                    </Link>
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

KEY PATTERNS:
- Use `mounted` state before applying browser-dependent styles
- Wrap Sheet (portal) in ClientOnly with fallback button
- Centralize nav items in a const for consistency
```

---

## Phase 4: Adding Pages

> **When adding any new page, use this prompt:**

```
Add a new [PageName] page with JSDoc documentation:

1. Create src/pages/[PageName].tsx:
   - Add @fileoverview JSDoc with page purpose
   - Add @seo JSDoc with keyword targets
   - Include Head component with meta tags
   - Document the component with JSDoc

2. Add DIRECT IMPORT to src/routes.tsx:
```tsx
// At top of routes.tsx with other imports
import NewPage from '@/pages/NewPage';

// In routes array children
{ path: 'new-page', element: <NewPage /> },
```

CRITICAL: Do NOT use React.lazy() — it breaks pre-rendering.
```

---

## PRD-Driven Development

After establishing your foundation, shift to PRD (Product Requirements Document) driven development for new features.

### Creating a PRD

> **Prompt to create a new PRD:**

```
Create a PRD document at docs/PRD-[feature-name].md for [feature description].

Structure it with these sections:

## Overview
Brief description of the feature and its purpose.

## Goals
- Primary goal
- Secondary goals
- Success metrics

## User Stories
As a [user type], I want [feature] so that [benefit].

## Requirements

### Functional Requirements
- [ ] FR-1: [Requirement]
- [ ] FR-2: [Requirement]

### Non-Functional Requirements
- [ ] NFR-1: Performance target
- [ ] NFR-2: Accessibility standard

## Technical Approach
Recommended implementation strategy.

## Dependencies
- External services needed
- Environment variables required

## Out of Scope
Features explicitly NOT included in this phase.

## Timeline
Estimated phases and milestones.
```

### Using a PRD

> **Prompt to implement from PRD:**

```
Implement the feature described in docs/PRD-[feature-name].md.

Follow the requirements in order:
1. Complete each FR-* requirement
2. Ensure NFR-* requirements are met
3. Add JSDoc to all new code
4. Update the README if new setup is required
```

### PRD Index

Keep track of all PRDs in your README:

```markdown
## Product Requirements

| PRD | Status | Description |
|-----|--------|-------------|
| [PRD-contact-form](docs/PRD-contact-form.md) | ✅ Complete | Lead capture form |
| [PRD-chat-widget](docs/PRD-chat-widget.md) | 🚧 In Progress | Live chat integration |
| [PRD-analytics](docs/PRD-analytics.md) | 📋 Planned | Event tracking |
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
| Date/time display | ✅ Yes | Varies by timezone |
| Static text/images | ❌ No | Same on server/client |
| Navigation links | ❌ No | Same on server/client |

### Common Issues & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| Hydration error #418/#423 | Server/client HTML mismatch | Wrap in ClientOnly or use `mounted` state |
| Page flickers on load | Portal rendering on server | Wrap in ClientOnly with fallback |
| Meta tags not in HTML | Wrong Head import | Use `Head` from vite-react-ssg |
| Admin pages indexed | Not excluded from SSG | Add to `includedRoutes` filter |
| Blank page after build | React.lazy() used | Replace with direct imports |

### File Overview

| File | Purpose |
|------|---------|
| `src/main.tsx` | SSG entry point |
| `src/routes.tsx` | Route definitions (direct imports only) |
| `src/App.tsx` | Global providers |
| `src/components/ClientOnly.tsx` | Browser-only wrapper |
| `vite.config.ts` | Build settings + route exclusions |
| `vercel.json` | Deployment configuration |
| `docs/PRD-*.md` | Feature requirements documents |

### Anti-Patterns to Avoid

```tsx
// ❌ DON'T: Use React.lazy for pages
const About = React.lazy(() => import('@/pages/About'));

// ✅ DO: Direct imports
import About from '@/pages/About';

// ❌ DON'T: Create QueryClient outside components
const queryClient = new QueryClient();

// ✅ DO: Create inside component with useState
const [queryClient] = useState(() => new QueryClient());

// ❌ DON'T: Use portals without wrapping
<Sheet>...</Sheet>

// ✅ DO: Wrap portals in ClientOnly
<ClientOnly fallback={<Button>Menu</Button>}>
  <Sheet>...</Sheet>
</ClientOnly>

// ❌ DON'T: Skip JSDoc on exported functions
export function formatDate(date) { ... }

// ✅ DO: Document with JSDoc
/**
 * Formats a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string { ... }
```

---

## Testing Your Site

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
4. Verify "Page is eligible for rich results"

---

## Next Steps

After completing this guide:

1. **Create your first PRD** for a major feature
2. **Add structured data** (LocalBusiness, FAQ schemas)
3. **Set up analytics** tracking
4. **Configure form endpoints** with Lovable Cloud

---

*This guide establishes patterns for maintainable, SEO-optimized Lovable projects.*
