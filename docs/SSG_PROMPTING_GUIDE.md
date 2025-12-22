# SSG Perfection Prompting Guide for Lovable

**Use this guide to set up a new Lovable project with Static Site Generation (SSG) perfection.**

This is a phased, copy-paste-ready prompt sequence designed to achieve:
- Pre-rendered HTML for every marketing page
- Zero hydration errors in Google Rich Results Test
- SEO-optimized with proper meta tag handling
- Admin/dynamic routes excluded from pre-rendering

---

## Phase 1: Foundation Setup

> **Prompt to Lovable:**

```
Create a new React + TypeScript + Vite + Tailwind CSS project with Static Site Generation using vite-react-ssg.

CRITICAL SSG REQUIREMENTS:

1. **src/main.tsx** - Use ViteReactSSG instead of createRoot:
```tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
```

2. **src/components/ClientOnly.tsx** - Create hydration-safe wrapper:
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

3. **src/App.tsx** - SSG-safe providers:
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

4. **src/routes.tsx** - Direct imports only (NO React.lazy):
```tsx
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Layout from '@/components/layout/Layout';

// CRITICAL: Direct imports - NO React.lazy() for SSG routes
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

6. **vite.config.ts** - SSG configuration with admin exclusion:
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
      // CRITICAL: Exclude admin/dashboard routes from SSG
      return paths.filter((path: string) => 
        !path.includes('admin') && 
        !path.includes('dashboard') &&
        !path.includes('auth')
      );
    },
  },
}));
```

7. **vercel.json**:
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

> **Prompt to Lovable:**

```
Create page components using the Head component from vite-react-ssg for SEO.

TEMPLATE FOR EVERY PAGE:
```tsx
import { Head } from "vite-react-ssg";

export default function PageName() {
  return (
    <>
      <Head>
        <title>Page Title | Brand Name</title>
        <meta name="description" content="150-160 char description with target keyword" />
        <link rel="canonical" href="https://yourdomain.com/page-path" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Title | Brand Name" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:url" content="https://yourdomain.com/page-path" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Twitter */}
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
- Every page MUST have unique title, description, and canonical URL
- Include Open Graph and Twitter meta tags for social sharing
```

---

## Phase 3: Header with Hydration Safety

> **Prompt to Lovable:**

```
Create a responsive Header component that handles:
1. Scroll-dependent styling (transparent → solid background)
2. Mobile menu using Sheet (a portal component)

CRITICAL HYDRATION PATTERNS:

```tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

export default function Header() {
  // PATTERN 1: Mounted state for scroll-dependent styling
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Server renders transparent, client applies scroll effect after mount
  const headerClasses = mounted && isScrolled 
    ? "bg-background/95 backdrop-blur shadow-sm" 
    : "bg-transparent";
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${headerClasses}`}>
      <div className="container flex items-center justify-between h-16">
        <Link to="/">Logo</Link>
        
        {/* Desktop nav - renders on server */}
        <nav className="hidden md:flex gap-6">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        {/* PATTERN 2: Wrap portal components in ClientOnly */}
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

KEY RULES:
- Server has no scroll position, so use `mounted` state before applying scroll styles
- Sheet uses a portal (renders outside React tree), wrap in ClientOnly
- Provide fallback content for SSR (static button placeholder)
```

---

## Phase 4: Adding New Pages

> **When adding any new page, use this prompt:**

```
Add a new [PageName] page:

1. Create src/pages/[PageName].tsx with Head component for SEO
2. Add DIRECT IMPORT to src/routes.tsx (NOT React.lazy)

Example route addition:
```tsx
// At top of routes.tsx
import NewPage from '@/pages/NewPage';

// In routes array children
{ path: 'new-page', element: <NewPage /> },
```

NEVER use React.lazy() for SSG routes - it causes hydration errors.
```

---

## SSG Hydration Cheat Sheet

| Scenario | Solution |
|----------|----------|
| Portal components (Sheet, Dialog, Dropdown, Toaster) | Wrap in `<ClientOnly fallback={...}>` |
| Scroll-dependent styling | Use `mounted` state in useEffect |
| Browser APIs (window, document, localStorage) | Check `typeof window !== 'undefined'` or use ClientOnly |
| localStorage/sessionStorage | Wrap in useEffect or ClientOnly |
| Current date/time display | Use ClientOnly or format on mount |
| Random values (Math.random) | Generate in useEffect after mount |
| Admin/dashboard routes | Exclude in vite.config.ts `includedRoutes` |

---

## Common Bugs & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| React #418/#423 hydration error | Server/client HTML mismatch | Use ClientOnly wrapper or mounted state |
| "Page cannot be rendered" in Rich Results | Hydration failure during crawl | Remove React.lazy(), wrap portals in ClientOnly |
| Random SSG build failures | Non-deterministic content (dates, random) | Generate dynamic content client-side only |
| Blank page in production | JS error during hydration | Check console, verify no browser APIs in SSR |
| Meta tags not in page source | Using react-helmet-async | Switch to Head from vite-react-ssg |
| Admin pages pre-rendered | Not excluded from SSG | Add to `includedRoutes` filter in vite.config.ts |

---

## Verification Checklist

### After Build
```bash
npx vite-react-ssg build
```

Check `dist/index.html`:
- ✅ Full HTML content visible (not just empty `<div id="root">`)
- ✅ Meta tags present in `<head>`
- ✅ All text content pre-rendered

### Google Rich Results Test
1. Go to https://search.google.com/test/rich-results
2. Test each public page URL
3. **Run each URL TWICE** — errors often appear on second request
4. Check for:
   - ✅ "Page is eligible for rich results"
   - ❌ "Page cannot be rendered" = hydration error

### Admin Routes Verification
After build, verify admin routes are NOT in `dist/`:
```bash
ls dist/admin/  # Should not exist or be empty
```

---

## Quick Reference: File Purposes

| File | Purpose |
|------|---------|
| `src/main.tsx` | Entry point using ViteReactSSG |
| `src/routes.tsx` | Route definitions with direct imports |
| `src/App.tsx` | Providers wrapped SSG-safe |
| `src/components/ClientOnly.tsx` | Hydration-safe wrapper |
| `vite.config.ts` | SSG options + route exclusions |
| `vercel.json` | Build command override |

---

## Anti-Patterns to Avoid

```tsx
// ❌ NEVER: React.lazy for SSG routes
const About = React.lazy(() => import('@/pages/About'));

// ✅ ALWAYS: Direct imports
import About from '@/pages/About';

// ❌ NEVER: QueryClient outside component
const queryClient = new QueryClient();

// ✅ ALWAYS: QueryClient inside component with useState
const [queryClient] = useState(() => new QueryClient());

// ❌ NEVER: Unwrapped portals
<Sheet>...</Sheet>

// ✅ ALWAYS: ClientOnly wrapper for portals
<ClientOnly fallback={<Button>Menu</Button>}>
  <Sheet>...</Sheet>
</ClientOnly>

// ❌ NEVER: Direct scroll check without mounted state
const bg = isScrolled ? "bg-white" : "bg-transparent";

// ✅ ALWAYS: Check mounted first
const bg = mounted && isScrolled ? "bg-white" : "bg-transparent";
```

---

*This guide ensures SSG perfection for Lovable projects. Follow each phase in order for best results.*
