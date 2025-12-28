# LocalPros Network — Prompt Chain Blueprint

**Purpose:** Reproducible prompt chain for building SSG-optimized, GHL-integrated lead generation sites.

**Version:** 1.0  
**Last Updated:** December 2024

---

## Overview

This document provides the exact prompts to build a production-ready lead generation site with:
- ✅ Perfect SSG hydration (no console errors)
- ✅ Full OG tags on every page
- ✅ GoHighLevel CRM integration via Vercel Edge Functions
- ✅ TCPA-compliant forms
- ✅ Mobile-first responsive design

---

## Prerequisites Checklist

### Before Phase 1 (Bootstrap):
- [ ] GitHub repository connected to Lovable

### Before Phase 2 (Architecture & Integration):
- [ ] Vercel Pro connected to GitHub repo
- [ ] Custom domain configured in Vercel
- [ ] PRD document uploaded to `docs/PRD-[project-name].md`
- [ ] Vercel environment variables configured (see below)

---

## Environment Variables — CRITICAL DISTINCTION

### Where Variables Go:

| Variable Type | Where to Store | Accessible To | Example |
|---------------|----------------|---------------|---------|
| **Public keys** | In code (`.env` with `VITE_` prefix) | Frontend + Backend | `VITE_GA_ID`, `VITE_SITE_URL` |
| **Private secrets** | Vercel Project Settings → Environment Variables | Backend (Edge Functions) only | `GHL_FORM_WEBHOOK`, `GHL_LOCATION_ID` |

### Required Vercel Environment Variables (Private):

Set these in **Vercel Dashboard → Project Settings → Environment Variables**:

| Variable | Description | Where Used |
|----------|-------------|------------|
| `GHL_FORM_WEBHOOK` | GoHighLevel webhook URL | `api/submit-form.ts` |
| `GHL_LOCATION_ID` | GHL sub-account/location ID | `api/submit-form.ts` |
| `GHL_WIDGET_ID` | GHL chat widget ID (if using chatbot) | `api/submit-form.ts` |

### ⚠️ NEVER Put in Code:
- API keys that grant write/admin access
- Webhook URLs
- Database credentials
- Any secret that could be abused if exposed

### ✅ OK to Put in Code (with VITE_ prefix):
- Google Analytics ID
- Public API keys (read-only, rate-limited)
- Site URL constants

---

## Phase 1: Bootstrap Prompt

**When to use:** First prompt on a brand new Lovable project.

**Purpose:** Establish SSG-safe foundation before any features.

### Prompt 1 — Copy/Paste Exactly:

```
Create the foundation for a static site generation (SSG) lead generation website. This must be SSG-safe from the start.

## Critical SSG Architecture Requirements

### 1. Entry Point (src/main.tsx)
Use vite-react-ssg with this exact pattern:
- Import ViteReactSSG from 'vite-react-ssg'
- Import routes directly from './routes'
- Export createRoot using ViteReactSSG({ routes })
- NO lazy loading, NO React.lazy(), NO dynamic imports

### 2. Routes Configuration (src/routes.tsx)
- Use RouteRecord type from 'vite-react-ssg'
- Import ALL page components directly (not lazy)
- Create LayoutWithProviders that wraps AppProviders around Layout
- Export routes array with path definitions

### 3. Hydration Safety (src/components/ClientOnly.tsx)
Create a ClientOnly wrapper component that:
- Uses useState(false) for mounted state
- Uses useEffect to set mounted to true
- Returns children only when mounted, otherwise returns fallback
- Include JSDoc explaining when to use it (portals, browser APIs)

### 4. App Providers (src/App.tsx)
- Initialize QueryClient with useState (not outside component)
- Wrap Toaster and Sonner in ClientOnly component
- Export AppProviders component that wraps children

### 5. Layout (src/components/layout/Layout.tsx)
- Import Header and Footer
- Use Suspense with simple loading fallback around Outlet
- NO ClientOnly needed here (pages handle their own)

### 6. Header Hydration Safety (src/components/layout/Header.tsx)
- Use mounted state: const [mounted, setMounted] = useState(false)
- useEffect(() => setMounted(true), [])
- For scroll detection: only add listener when mounted
- Wrap Sheet component in ClientOnly
- Default to non-scrolled styles during SSR

### 7. Create Placeholder Pages
Create these pages with proper Head tags:
- src/pages/Home.tsx
- src/pages/Services.tsx  
- src/pages/About.tsx
- src/pages/Contact.tsx

Each page MUST use:
- import { Head } from 'vite-react-ssg'
- Full meta tags: title, description, canonical
- Full OG tags: og:title, og:description, og:url, og:image, og:type
- Twitter cards: twitter:card, twitter:title, twitter:description, twitter:image

### 8. Design System Foundation
In index.css, establish CSS variables using HSL format:
- --background, --foreground
- --primary, --primary-foreground
- --secondary, --secondary-foreground
- --accent, --accent-foreground
- --muted, --muted-foreground
- --card, --card-foreground
- --border, --input, --ring
- Brand extensions for gradients and shadows

### 9. Footer (src/components/layout/Footer.tsx)
- Simple 4-column responsive layout
- Use semantic color tokens only
- Include placeholder for legal disclosures

### 10. Vite Config (vite.config.ts)
Ensure ssgOptions are configured:
- script: 'async'
- formatting: 'minify'
- includedRoutes filter to exclude admin/dashboard paths

## Files to Create:
1. src/main.tsx — SSG entry point
2. src/routes.tsx — Direct route imports
3. src/App.tsx — Providers with ClientOnly safety
4. src/components/ClientOnly.tsx — Hydration wrapper
5. src/components/layout/Layout.tsx — Page wrapper
6. src/components/layout/Header.tsx — With mounted state
7. src/components/layout/Footer.tsx — Semantic tokens
8. src/pages/Home.tsx — With full Head tags
9. src/pages/Services.tsx — With full Head tags
10. src/pages/About.tsx — With full Head tags
11. src/pages/Contact.tsx — With full Head tags
12. Update index.css — Design system variables
13. Update tailwind.config.ts — Custom colors/fonts

## DO NOT:
- Use React.lazy() or dynamic imports for routes
- Use window/document outside mounted checks
- Use portals (Sheet, Dialog, Toaster) without ClientOnly
- Hardcode colors — use semantic tokens only
- Skip OG tags on any page

Build this foundation now. We will add the PRD-specific features in the next prompt.
```

---

## Phase 2: Architecture & Integration Prompt

**When to use:** After GitHub, Vercel Pro, and PRD are connected.

**Purpose:** Implement full architecture from PRD with GHL integration.

### Prompt 2 — Copy/Paste and Customize [BRACKETED] Values:

```
I have uploaded the PRD to docs/PRD-[project-name].md. Read it completely.

Implement the full site architecture based on the PRD with these critical constraints:

## 0. Vercel Configuration (vercel.json)

Create vercel.json in project root with this EXACT configuration:

```json
{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false
}
```

Why each property matters:
- `buildCommand`: Uses SSG plugin to pre-render all routes to static HTML
- `outputDirectory`: Where SSG outputs the pre-rendered files
- `framework`: Tells Vercel to use Vite optimizations
- `cleanUrls`: Enables `/services` instead of `/services.html` (critical for SEO)
- `trailingSlash`: false prevents duplicate URLs hurting SEO

## 1. Vercel Edge Function for GHL (api/submit-form.ts)

Create the edge function with this exact pattern:

```typescript
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone, tcpaConsent } = body;
    if (!firstName || !lastName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TCPA consent is legally required
    if (!tcpaConsent) {
      return new Response(
        JSON.stringify({ error: 'TCPA consent is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get GHL configuration from environment
    const webhookUrl = process.env.GHL_FORM_WEBHOOK;
    const locationId = process.env.GHL_LOCATION_ID;
    const widgetId = process.env.GHL_WIDGET_ID;

    if (!webhookUrl) {
      console.error('GHL_FORM_WEBHOOK not configured');
      return new Response(
        JSON.stringify({ error: 'Form submission unavailable' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Submit to GHL webhook
    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone,
      address: body.address || '',
      service_needed: body.serviceNeeded || '',
      preferred_contact: body.preferredContact || '',
      message: body.message || '',
      tcpa_consent: tcpaConsent,
      consent_timestamp: new Date().toISOString(),
      source: '[SITE_NAME] Website',
      location_id: locationId,
      widget_id: widgetId,
    };

    const ghlResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error('GHL webhook error:', ghlResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Submission failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

## 2. ContactForm Component Constraints

The ContactForm MUST:
- Submit to '/api/submit-form' endpoint
- Include TCPA checkbox with EXACT disclosure text from PRD
- TCPA checkbox must be unchecked by default
- Form cannot submit unless TCPA is checked
- Show loading state during submission
- Show success toast on completion
- Show error toast on failure
- Reset form after successful submission

## 3. Page-Level SEO Requirements

Every page MUST have in its Head component:
- <title> with primary keyword
- <meta name="description"> max 160 chars
- <link rel="canonical" href="https://[DOMAIN]/[path]">
- <meta property="og:title">
- <meta property="og:description">
- <meta property="og:url">
- <meta property="og:image" content="https://[DOMAIN]/og-[page].jpg">
- <meta property="og:type" content="website">
- <meta name="twitter:card" content="summary_large_image">
- <meta name="twitter:title">
- <meta name="twitter:description">
- <meta name="twitter:image">

## 4. Header Scroll Behavior

The Header component MUST:
- Use fixed positioning (NOT sticky)
- Be transparent with white text over hero
- Transition to solid background when scrolled
- Use mounted state to prevent hydration mismatch
- Wrap Sheet (mobile menu) in ClientOnly

## 5. Hero Component Pattern

Each page hero MUST:
- Have proper background image with dark overlay
- Use text-white with drop-shadow for readability
- Include proper heading hierarchy (single H1)
- Have responsive height (min-h-screen for home, h-80 for inner)

## 6. Design System Enforcement

- ALL colors must use semantic tokens from CSS variables
- NO hardcoded colors (no text-white except on overlays, no bg-gray-*)
- Use HSL format for all color definitions
- Custom gradients defined in index.css
- Brand colors extended in tailwind.config.ts

## 7. Component Structure from PRD

Build these section components:
- Hero.tsx — Full viewport with layered background
- ServicesGrid.tsx — 3x2 grid with hover effects
- WhyChooseUs.tsx — 2x3 differentiators grid
- Testimonials.tsx — 3-column or carousel
- CTABanner.tsx — Full-width gradient section
- ContactForm.tsx — Two-column with TCPA compliance

## 8. Footer Requirements

Footer MUST include:
- 4-column responsive layout
- Operating entity disclosure (exact text from PRD)
- Privacy Policy and Terms of Service links
- Contact information
- Social media links

## 9. Hydration Safety Checklist

Verify these are wrapped in ClientOnly:
- Toaster (sonner)
- Sheet (mobile menu)
- Any component using portals
- Any component accessing window/document

Verify these use mounted state:
- Header scroll detection
- Any scroll-based animations
- LocalStorage access

## 10. Console Error Prevention

Before completion, verify:
- No window/document access during SSR
- No React.lazy() usage
- All portal components in ClientOnly
- QueryClient initialized inside component
- No hydration mismatches in Header

Read the PRD now and implement the complete site architecture.
```

---

## Phase 3: PRD-Driven Feature Implementation

**When to use:** For adding features, pages, or refinements after Phase 2.

**Purpose:** Implement specific PRD requirements while maintaining SSG safety.

### Prompt 3 Template — Customize Per Feature:

```
Implement [FEATURE_NAME] from the PRD (docs/PRD-[project-name].md).

## SSG Safety Constraints (MUST follow):
1. No React.lazy() — use direct imports
2. Wrap portal components (Sheet, Dialog, Toaster) in ClientOnly
3. Use mounted state for any window/document access
4. All colors via semantic tokens from design system

## SEO Constraints (MUST follow):
1. If adding a page, include full Head component with:
   - Title, description, canonical URL
   - Complete OG tags (title, description, url, image, type)
   - Twitter card meta tags
2. Maintain single H1 per page
3. Use semantic HTML (section, article, nav, main)

## GHL Integration Constraints (if form-related):
1. Submit to /api/submit-form endpoint
2. Include TCPA checkbox with exact PRD language
3. Validate required fields client-side
4. Handle loading, success, and error states

## Design System Constraints:
1. Use only semantic color tokens
2. No hardcoded colors
3. Follow spacing patterns from existing components
4. Match hover/transition patterns

Implement this feature now, following all constraints above.
```

---

## Quick Reference: Common Patterns

### ClientOnly Usage
```tsx
import { ClientOnly } from '@/components/ClientOnly';

// For portals
<ClientOnly>
  <Sheet>...</Sheet>
</ClientOnly>

// For toasters
<ClientOnly>
  <Toaster />
  <Sonner />
</ClientOnly>
```

### Mounted State Pattern
```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// For scroll detection
useEffect(() => {
  if (!mounted) return;
  
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [mounted]);
```

### Head Component Pattern
```tsx
import { Head } from 'vite-react-ssg';

<Head>
  <title>Page Title | Brand Name</title>
  <meta name="description" content="Max 160 characters..." />
  <link rel="canonical" href="https://domain.com/page" />
  <meta property="og:title" content="Page Title | Brand Name" />
  <meta property="og:description" content="Same as meta description" />
  <meta property="og:url" content="https://domain.com/page" />
  <meta property="og:image" content="https://domain.com/og-page.jpg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title | Brand Name" />
  <meta name="twitter:description" content="Same as meta description" />
  <meta name="twitter:image" content="https://domain.com/og-page.jpg" />
</Head>
```

### Form Submission Pattern
```tsx
const handleSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        serviceNeeded: data.serviceNeeded,
        message: data.message,
        tcpaConsent: data.tcpaConsent,
      }),
    });
    
    if (response.ok) {
      toast.success('Thank you! We will contact you shortly.');
      form.reset();
    } else {
      const error = await response.json();
      toast.error(error.message || 'Submission failed. Please try again.');
    }
  } catch (error) {
    toast.error('Network error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Validation Checklist

Before considering the site complete:

### SSG Validation
- [ ] Run `npx vite-react-ssg build` — no errors
- [ ] Check dist/index.html has full rendered HTML (not empty div)
- [ ] No console errors on page load
- [ ] No hydration mismatch warnings

### SEO Validation
- [ ] Test each page at https://search.google.com/test/rich-results
- [ ] Test both Desktop and Mobile user agents
- [ ] Verify OG tags render in page source
- [ ] Confirm canonical URLs are correct

### GHL Integration Validation
- [ ] Submit test form
- [ ] Verify lead appears in GHL CRM
- [ ] Check TCPA consent is recorded with timestamp
- [ ] Verify all custom fields populated

### Design System Validation
- [ ] No hardcoded colors in components
- [ ] All colors use semantic tokens
- [ ] Responsive on mobile (375px), tablet, desktop
- [ ] Hover states work on all interactive elements

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Blank page after build | React.lazy() used | Use direct imports |
| Hydration mismatch in Header | Scroll state during SSR | Add mounted check |
| Sheet not rendering | Portal without ClientOnly | Wrap in ClientOnly |
| OG tags missing | Wrong Head import | Use `import { Head } from 'vite-react-ssg'` |
| Form 500 error | Missing env variable | Check GHL_FORM_WEBHOOK in Vercel |
| Console error on load | window access during SSR | Add mounted state check |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2024 | Initial prompt chain blueprint |

---

**End of Blueprint**
