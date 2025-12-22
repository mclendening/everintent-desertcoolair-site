# Lovable Project Setup Guide

**A step-by-step prompting guide for building SEO-optimized, production-ready websites in Lovable.**

This guide walks you through setting up a professional website that:
- Loads fast and ranks well on Google
- Works perfectly on mobile and desktop
- Handles dynamic elements without breaking
- Excludes admin/dashboard pages from public indexing

---

## How to Use This Guide

Each phase below contains a **prompt** you can copy and paste directly into Lovable. Follow them in order for best results.

---

## Phase 1: Project Foundation

> **Copy this prompt into Lovable:**

```
Create a React + TypeScript + Vite + Tailwind CSS project with pre-rendered pages for SEO using vite-react-ssg.

Set up the following files:

1. **src/main.tsx** - Entry point:
```tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
```

2. **src/components/ClientOnly.tsx** - For browser-only features:
```tsx
import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

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
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ClientOnly } from '@/components/ClientOnly';

function AppProviders({ children }: { children: React.ReactNode }) {
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

export default function App({ children }: { children?: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
```

4. **src/routes.tsx** - Page routing (use direct imports, NOT React.lazy):
```tsx
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Layout from '@/components/layout/Layout';

// Direct imports for all pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

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
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes: (paths: string[]) => {
      // Exclude private routes from pre-rendering
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

## Phase 2: Page Template with SEO

> **Copy this prompt into Lovable:**

```
Create page components with proper SEO meta tags using Head from vite-react-ssg.

Use this template for every page:

```tsx
import { Head } from "vite-react-ssg";

export default function PageName() {
  return (
    <>
      <Head>
        <title>Page Title | Brand Name</title>
        <meta name="description" content="150-160 character description with your main keyword" />
        <link rel="canonical" href="https://yourdomain.com/page-path" />
        
        {/* Social sharing */}
        <meta property="og:title" content="Page Title | Brand Name" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:url" content="https://yourdomain.com/page-path" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
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
- Include Open Graph tags for Facebook/LinkedIn sharing
```

---

## Phase 3: Responsive Header

> **Copy this prompt into Lovable:**

```
Create a responsive Header component with:
1. Logo and navigation links
2. Background that changes on scroll (transparent at top, solid when scrolled)
3. Mobile hamburger menu

Use these patterns to prevent rendering issues:

```tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

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
  
  // Only apply scroll styling after page loads in browser
  const headerClasses = mounted && isScrolled 
    ? "bg-background/95 backdrop-blur shadow-sm" 
    : "bg-transparent";
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${headerClasses}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/">Logo</Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        {/* Mobile menu - wrapped for browser-only rendering */}
        <div className="md:hidden">
          <ClientOnly fallback={<Button variant="ghost" size="icon"><Menu /></Button>}>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu /></Button>
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

KEY PATTERNS:
- Use `mounted` state before applying scroll-based styles
- Wrap mobile menu (Sheet) in ClientOnly since it uses a portal
- Provide a fallback button for the initial render
```

---

## Phase 4: Adding New Pages

> **When adding any new page, use this prompt:**

```
Add a new [PageName] page:

1. Create src/pages/[PageName].tsx with Head component for SEO meta tags
2. Add a DIRECT IMPORT to src/routes.tsx (not React.lazy)

Example:
```tsx
// At top of routes.tsx
import NewPage from '@/pages/NewPage';

// In routes array children
{ path: 'new-page', element: <NewPage /> },
```

Do NOT use React.lazy() — it breaks pre-rendering.
```

---

## Quick Reference

### When to Use ClientOnly

| Feature | Needs ClientOnly? |
|---------|-------------------|
| Mobile menu (Sheet, Drawer) | ✅ Yes |
| Dialog/Modal popups | ✅ Yes |
| Toast notifications | ✅ Yes |
| Dropdown menus | ✅ Yes |
| Scroll-based styling | Use `mounted` state |
| Date/time display | ✅ Yes or format on mount |
| localStorage access | ✅ Yes |
| Regular text and images | ❌ No |
| Static navigation links | ❌ No |

### Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Page flickers or shows errors | Wrap dynamic content in ClientOnly |
| Scroll styling doesn't work | Add `mounted` state check |
| Mobile menu breaks | Wrap Sheet in ClientOnly with fallback |
| Meta tags not appearing | Use Head from vite-react-ssg |
| Admin pages showing in search | Add to route exclusion filter |

### File Overview

| File | Purpose |
|------|---------|
| `src/main.tsx` | App entry point |
| `src/routes.tsx` | Page routing (direct imports only) |
| `src/App.tsx` | Global providers |
| `src/components/ClientOnly.tsx` | Browser-only wrapper |
| `vite.config.ts` | Build settings + route exclusions |
| `vercel.json` | Deployment configuration |

---

## Testing Your Site

### After Building

```bash
npx vite-react-ssg build
```

Open `dist/index.html` and verify:
- ✅ Full page content is visible (not just an empty div)
- ✅ Meta tags appear in the `<head>` section
- ✅ All text is pre-rendered

### Google Rich Results Test

1. Go to https://search.google.com/test/rich-results
2. Enter your page URL
3. **Test each URL twice** — some errors only appear on the second request
4. Look for "Page is eligible for rich results"

---

## What NOT to Do

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

// ❌ DON'T: Apply scroll styles directly
const bg = isScrolled ? "bg-white" : "bg-transparent";

// ✅ DO: Check mounted first
const bg = mounted && isScrolled ? "bg-white" : "bg-transparent";
```

---

*Follow this guide phase by phase when starting a new Lovable project for the best results.*
