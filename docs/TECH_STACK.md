# Technical Stack & Architecture

This document details the complete technical architecture, dependencies, and implementation patterns used in this project.

---

## Core Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | React 18 + TypeScript | Component-based UI with type safety |
| **Build Tool** | Vite + vite-react-ssg | Fast dev server + Static Site Generation |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS + accessible components |
| **Routing** | react-router-dom v6 | Client-side navigation with SSG support |
| **State** | TanStack React Query | Server state management + caching |
| **Deployment** | Vercel (Edge Functions) | Global CDN + serverless API routes |
| **CRM** | GoHighLevel (GHL) | Lead management + automation |

---

## Why This Stack?

### Static Site Generation (SSG)

**Library:** `vite-react-ssg`

**Benefits:**
- Pre-rendered HTML for every marketing page
- Sub-second page loads (critical for Core Web Vitals)
- SEO advantage: search engines see fully-rendered content
- Zero server cost for marketing pages
- Automatic code splitting per route

**Trade-offs:**
- Requires hydration-safe patterns
- Dynamic routes (admin, dashboard) must be excluded
- Build time increases with page count

### Vercel Edge Functions

**Location:** `/api/` directory

**Benefits:**
- Form submissions processed at the edge (low latency globally)
- No cold starts (unlike traditional serverless)
- API keys never exposed to client
- Automatic scaling

**Use Cases:**
- Form submission → CRM integration
- Third-party API proxying
- Webhook handling

### Tailwind CSS + shadcn/ui

**Benefits:**
- Utility-first = rapid prototyping
- shadcn/ui = accessible, customizable components
- Design tokens via CSS variables
- Tree-shaking = minimal bundle size

**Configuration:**
- `tailwind.config.ts` - Theme customization
- `src/index.css` - CSS variables and base styles
- `src/components/ui/` - shadcn component overrides

---

## Project Structure

```
project-root/
├── api/                          # Vercel Edge Functions
│   └── submit-form.ts           # Form → GHL integration
│
├── docs/                         # Documentation
│   ├── SSG_PROMPTING_GUIDE.md   # SSG setup instructions
│   └── TECH_STACK.md            # This file
│
├── public/                       # Static assets (copied as-is)
│   ├── images/                  # Optimized images
│   ├── favicon.png
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ClientOnly.tsx       # SSG hydration wrapper
│   │   ├── NavLink.tsx          # Active link styling
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Sticky nav + mobile menu
│   │   │   ├── Footer.tsx       # Multi-column footer
│   │   │   └── Layout.tsx       # Page wrapper with Outlet
│   │   ├── sections/            # Reusable page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/                  # shadcn/ui components
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn, etc.)
│   │
│   ├── pages/                   # Route components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                  # Root component + providers
│   ├── App.css                  # Global styles
│   ├── index.css                # Tailwind + CSS variables
│   ├── main.tsx                 # ViteReactSSG entry point
│   └── routes.tsx               # Route definitions
│
├── index.html                   # HTML template
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Vite + SSG configuration
├── vercel.json                  # Vercel deployment config
└── README.md                    # Project overview
```

---

## Critical Configuration Files

### vite.config.ts

```ts
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
    script: 'async',           // Async script loading
    formatting: 'minify',       // Minify HTML output
    crittersOptions: {
      reduceInlineStyles: false, // Preserve CSS
    },
    includedRoutes: (paths: string[]) => {
      // Exclude dynamic routes from SSG
      return paths.filter((path: string) => 
        !path.includes('admin') && 
        !path.includes('dashboard') &&
        !path.includes('auth')
      );
    },
  },
}));
```

### vercel.json

```json
{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false
}
```

### src/main.tsx

```tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
```

---

## SSG Hydration Patterns

### Pattern 1: ClientOnly Wrapper

For components using browser APIs or portals:

```tsx
import { ClientOnly } from '@/components/ClientOnly';

// Portal components (Sheet, Dialog, Dropdown)
<ClientOnly fallback={<Button>Menu</Button>}>
  <Sheet>...</Sheet>
</ClientOnly>

// Browser API usage
<ClientOnly>
  <MapComponent /> {/* Uses window.navigator */}
</ClientOnly>
```

### Pattern 2: Mounted State

For scroll-dependent or client-only styling:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);

// Server renders transparent, client applies scroll effect
const headerBg = mounted && isScrolled 
  ? "bg-background shadow" 
  : "bg-transparent";
```

### Pattern 3: SSG-Safe Providers

QueryClient must be created inside component:

```tsx
function AppProviders({ children }) {
  // ✅ Created inside component with useState
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## Route Configuration

### SSG Routes (Pre-rendered)

All marketing pages use direct imports:

```tsx
// src/routes.tsx
import Home from '@/pages/Home';
import About from '@/pages/About';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App><Layout /></App>,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
    ],
  },
];
```

### Dynamic Routes (Excluded from SSG)

Admin and authenticated routes are:
1. Excluded via `includedRoutes` filter in vite.config.ts
2. Can use React.lazy() for code splitting
3. Rendered client-side only

---

## SEO Implementation

### Per-Page Meta Tags

Using `Head` from vite-react-ssg:

```tsx
import { Head } from "vite-react-ssg";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Brand Name</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://..." />
        <meta property="og:title" content="..." />
        <meta property="og:description" content="..." />
      </Head>
      {/* Content */}
    </>
  );
}
```

### Structured Data (JSON-LD)

```tsx
<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Business Name",
      "address": { ... },
      "telephone": "...",
    })}
  </script>
</Head>
```

---

## Edge Function Pattern

### Form Submission

```ts
// api/submit-form.ts
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const body = await req.json();
  
  // Validate
  if (!body.email) {
    return new Response(JSON.stringify({ error: 'Email required' }), {
      status: 400,
    });
  }
  
  // Send to CRM
  await fetch(process.env.GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...body,
      source: 'website',
      timestamp: new Date().toISOString(),
    }),
  });
  
  return new Response(JSON.stringify({ success: true }));
}
```

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **SSG** | Pre-rendered HTML via vite-react-ssg |
| **Code Splitting** | Automatic per-route chunks |
| **Image Optimization** | WebP format, proper dimensions |
| **Critical CSS** | Critters inlines above-fold CSS |
| **Lazy Loading** | Images below fold load on scroll |
| **Edge Caching** | Vercel Edge Network CDN |

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | SSG + optimized hero images |
| **FID** | < 100ms | Minimal JS, deferred scripts |
| **CLS** | < 0.1 | Reserved image dimensions |

---

## Environment Variables

### Vercel Dashboard

| Variable | Purpose |
|----------|---------|
| `GHL_LOCATION_ID` | GoHighLevel sub-account ID |
| `GHL_WEBHOOK_URL` | Form submission webhook |
| `GHL_WIDGET_ID` | Chat widget identifier |

### Local Development

Create `.env.local`:

```
GHL_LOCATION_ID=xxx
GHL_WEBHOOK_URL=https://...
```

---

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Configure environment variables
3. Deploy triggers on push to `main`

### Manual Build

```bash
# Install dependencies
npm install

# Development server
npm run dev

# SSG production build
npx vite-react-ssg build

# Preview production build
npm run preview
```

### Build Output

```
dist/
├── index.html          # Pre-rendered home page
├── about/
│   └── index.html      # Pre-rendered /about
├── services/
│   └── index.html      # Pre-rendered /services
├── contact/
│   └── index.html      # Pre-rendered /contact
└── assets/             # JS/CSS chunks
```

---

## Dependencies

### Production

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Server state management |
| `tailwindcss` | Utility CSS |
| `vite-react-ssg` | Static site generation |
| `lucide-react` | Icon library |

### Development

| Package | Purpose |
|---------|---------|
| `vite` | Build tool |
| `typescript` | Type checking |
| `@vitejs/plugin-react-swc` | Fast React compilation |

---

*For SSG setup instructions, see [SSG_PROMPTING_GUIDE.md](./SSG_PROMPTING_GUIDE.md)*
