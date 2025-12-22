# Product Requirements Document (PRD)

## Desert Cool Air — Phoenix HVAC Lead Generation Site

**Document Version:** 1.0  
**Author:** Michael Clendening  
**Company:** EverIntent LLC  
**Last Updated:** December 2024  
**Status:** Complete

---

## 1. Executive Summary

### 1.1 Project Overview

Desert Cool Air is a high-converting lead generation website for HVAC services targeting the Phoenix, Arizona metro area. This site is part of the **LocalPros Network** — a portfolio of 20 market-specific service websites designed to capture, qualify, and route leads to licensed local providers.

### 1.2 Business Objective

Build a premium, SEO-optimized portfolio site that:

- Ranks organically for Phoenix HVAC search terms
- Captures leads via forms, AI chatbot, and click-to-call
- Routes qualified leads to partner providers at $25-50 per lead
- Demonstrates full-stack architecture for portfolio showcase

### 1.3 Site Specifications

| Attribute            | Value                                         |
| -------------------- | --------------------------------------------- |
| **Domain**           | desertcoolair.com                             |
| **Niche**            | HVAC (Heating, Ventilation, Air Conditioning) |
| **Market**           | Phoenix, Arizona Metro                        |
| **Phone**            | (602) 609-2300                                |
| **Tier**             | T3 (4 pages: Home, Services, About, Contact)  |
| **Lead Value**       | $25-50 per qualified lead                     |
| **Operating Entity** | EverIntent LLC                                |

---

## 2. Technical Architecture

### 2.1 Technology Stack

| Layer          | Technology           | Purpose                         |
| -------------- | -------------------- | ------------------------------- |
| **Framework**  | React 18 + TypeScript | Component-based UI              |
| **Build Tool** | Vite + vite-react-ssg | SSG for SEO                     |
| **Styling**    | Tailwind CSS + CSS Variables | Design system             |
| **Components** | shadcn/ui            | Pre-built accessible components |
| **Routing**    | react-router-dom v6  | Client-side navigation          |
| **Deployment** | Vercel Pro           | Edge network + serverless       |
| **Forms**      | Vercel Edge Functions | Low-latency processing         |
| **CRM**        | GoHighLevel (GHL)    | Lead management + automation    |
| **Chatbot**    | GHL Chat Widget      | 24/7 AI engagement              |

### 2.2 Why Static Site Generation (SSG)?

- **SEO Dominance:** Pre-rendered HTML means search engines see full content immediately
- **Performance:** Sub-second page loads, Core Web Vitals optimized
- **Cost:** No server required for marketing pages = infinite scale at zero marginal cost
- **Security:** No server-side vulnerabilities on static pages

### 2.3 File Structure

```
desert-cool-air/
├── api/
│   └── submit-form.ts          # Vercel Edge Function → GHL
├── docs/
│   ├── LOVABLE_PROMPTING_GUIDE.md
│   ├── TECH_STACK.md
│   └── PRD-desert-cool-air.md
├── public/
│   └── images/                 # Static images
├── src/
│   ├── components/
│   │   ├── ClientOnly.tsx      # Hydration-safe wrapper
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Fixed nav with scroll behavior
│   │   │   ├── Footer.tsx      # 4-column with legal disclosures
│   │   │   └── Layout.tsx      # Wraps all pages
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Full-viewport Arizona imagery
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   └── ContactForm.tsx # TCPA-compliant
│   │   └── ui/                 # shadcn/ui components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   ├── index.css               # Tailwind + CSS variables
│   ├── App.tsx                 # Providers wrapper
│   ├── main.tsx                # SSG entry point
│   └── routes.tsx              # Direct imports, NO React.lazy()
├── vercel.json
├── vite.config.ts              # SSG configuration
├── tailwind.config.ts
└── README.md
```

### 2.4 Environment Variables

Configured in Vercel Project Settings. **Never hardcode these values.**

| Variable           | Purpose                          |
| ------------------ | -------------------------------- |
| `GHL_FORM_WEBHOOK` | GoHighLevel webhook URL          |
| `GHL_LOCATION_ID`  | GHL Sub-account/Location ID      |
| `GHL_WIDGET_ID`    | GHL Chat Widget ID               |

**Access pattern in Edge Function:**

```ts
const webhookUrl = process.env.GHL_FORM_WEBHOOK;
const locationId = process.env.GHL_LOCATION_ID || '';
const widgetId = process.env.GHL_WIDGET_ID || '';
```

### 2.5 Routing Configuration

**CRITICAL: Direct imports only. Never use React.lazy() — breaks pre-rendering.**

```tsx
// src/routes.tsx
import type { RouteRecord } from 'vite-react-ssg';
import Layout from '@/components/layout/Layout';
import { AppProviders } from '@/App';

// DIRECT IMPORTS — NO REACT.LAZY()
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

const LayoutWithProviders = () => (
  <AppProviders>
    <Layout />
  </AppProviders>
);

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <LayoutWithProviders />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
];
```

### 2.6 SSG Configuration

```ts
// vite.config.ts
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
    // ALWAYS exclude admin/dashboard/auth from pre-rendering
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

### 2.7 Vercel Edge Function

```ts
// api/submit-form.ts
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate TCPA consent
    if (!body.tcpaConsent) {
      return new Response(JSON.stringify({ error: 'TCPA consent required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const webhookUrl = process.env.GHL_FORM_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('Webhook not configured');
    }

    const locationId = process.env.GHL_LOCATION_ID || '';
    const widgetId = process.env.GHL_WIDGET_ID || '';

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        address: body.address || '',
        serviceNeeded: body.serviceNeeded,
        preferredContact: body.preferredContact,
        message: body.message || '',
        tcpaConsent: body.tcpaConsent,
        consentTimestamp: new Date().toISOString(),
        source: 'Desert Cool Air Website',
        locationId,
        widgetId,
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error('Webhook submission failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

---

## 3. Design System

### 3.1 Design Philosophy

**This must look like it came from a high-end design studio.** Modern, polished, slick. Not a template. Not generic.

**Core Principles:**

- Generous whitespace (py-16 to py-24 between sections)
- Subtle shadows with hover depth (shadow-soft → shadow-elevated)
- Smooth transitions (transition-all duration-300)
- Clear typography hierarchy
- Polished micro-interactions
- Mobile-first, touch-friendly (44px min tap targets)

### 3.2 Color System (CSS Variables)

```css
/* src/index.css */
@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222 84% 5%;
    
    --card: 0 0% 100%;
    --card-foreground: 222 84% 5%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222 84% 5%;
    
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    
    --accent: 24 95% 53%;
    --accent-foreground: 0 0% 100%;
    
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 221 83% 53%;
    
    --radius: 0.5rem;
    
    /* Brand extensions */
    --brand-blue: 221 83% 40%;
    --brand-blue-light: 217 91% 60%;
    --brand-orange: 24 95% 53%;
    --brand-navy: 222 47% 11%;
    --brand-success: 160 84% 39%;
    
    /* Gradients */
    --gradient-hero: linear-gradient(135deg, hsl(221 83% 40%) 0%, hsl(217 91% 50%) 100%);
    --gradient-cta: linear-gradient(135deg, hsl(24 95% 53%) 0%, hsl(24 95% 45%) 100%);
    
    /* Shadows */
    --shadow-soft: 0 4px 6px -1px hsl(222 84% 5% / 0.1);
    --shadow-elevated: 0 20px 25px -5px hsl(222 84% 5% / 0.1);
    --shadow-glow: 0 0 40px hsl(221 83% 53% / 0.3);
  }
}
```

### 3.3 Color Usage Rules

| Context       | Use                                                     | Never Use                     |
| ------------- | ------------------------------------------------------- | ----------------------------- |
| Text          | `text-foreground`, `text-muted-foreground`, `text-primary` | `text-gray-900`, `text-blue-500` |
| Backgrounds   | `bg-background`, `bg-card`, `bg-primary`, `bg-accent`   | `bg-white`, `bg-gray-100`     |
| Hero overlays | `bg-black/45`, `text-primary-foreground` (exception)    | —                             |
| Borders       | `border-border`, `border-primary`                       | `border-gray-200`             |

**Rule:** Never hardcode colors. Always use semantic tokens from the design system.

### 3.4 Typography

```ts
// tailwind.config.ts
fontFamily: {
  heading: ["Montserrat", "sans-serif"],
  body: ["Inter", "sans-serif"],
}
```

**Google Fonts (index.html):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
```

### 3.5 Button Variants

Custom variants defined in shadcn Button component:

| Variant        | Purpose                | Classes                                         |
| -------------- | ---------------------- | ----------------------------------------------- |
| `default`      | Primary actions        | `bg-primary text-primary-foreground`            |
| `accent`       | CTA buttons            | `bg-accent text-accent-foreground hover:scale-[1.02]` |
| `hero`         | Hero section CTAs      | `bg-accent shadow-lg hover:scale-105 font-bold` |
| `hero-outline` | Secondary hero CTAs    | `border-primary-foreground/30 backdrop-blur-sm` |
| `ghost`        | Icon buttons, subtle   | `hover:bg-accent`                               |

### 3.6 Image Assets

**Hero:** Arizona scenic imagery stored in `/public/images/`

| Image                        | Purpose          |
| ---------------------------- | ---------------- |
| `hero-desert.jpg`            | Homepage hero    |
| `hero-services-trucks.jpg`   | Services hero    |
| `hero-about-team.jpg`        | About hero       |
| `hero-contact.jpg`           | Contact hero     |
| `service-*.jpg`              | Service cards    |
| `technician-working.jpg`     | About page       |
| `comfortable-home.jpg`       | Testimonials     |

**Image Requirements:**

- Use Arizona scenic imagery (desert, sunset, luxury homes)
- NOT AC units or generic stock photos in heroes
- Optimized for web (compressed JPG)

---

## 4. Component Specifications

### 4.1 Header.tsx

**Behavior:** Fixed header that transitions from transparent to solid navy on scroll.

**Positioning:** `fixed top-0 left-0 right-0 z-50` (NOT sticky)

**Scroll Detection Pattern:**

```tsx
const [mounted, setMounted] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  setMounted(true);
  const handleScroll = () => setIsScrolled(window.scrollY > 50);
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Only apply scroll styling after hydration
const headerBg = mounted && isScrolled 
  ? "bg-brand-navy/95 backdrop-blur-md shadow-lg" 
  : "bg-transparent";
```

**Visual States:**

| State        | Background                                    | Text                               |
| ------------ | --------------------------------------------- | ---------------------------------- |
| **At Top**   | `bg-transparent`                              | `text-white drop-shadow-md`        |
| **Scrolled** | `bg-brand-navy/95 backdrop-blur-md shadow-lg` | `text-white` (stays white on navy) |

**Logo Container:** Glassmorphic effect with `bg-white/20 backdrop-blur-sm border border-white/30`

**Desktop Layout:**

- Logo left: Snowflake icon + "Desert Cool Air" + "HVAC Experts" tagline
- Nav center: Home | Services | About | Contact
- Right: Phone "(602) 609-2300" + CTA "Get Free Estimate"
- Height: h-20

**Mobile Layout:**

- Logo left, Menu icon right
- Sheet opens with navigation
- Phone as tap-to-call prominent
- Wrapped in `<ClientOnly>` with static fallback

**Hydration Safety:**

```tsx
<ClientOnly fallback={
  <Button variant="ghost" size="icon" className="md:hidden">
    <Menu className="h-6 w-6" />
  </Button>
}>
  <Sheet>...</Sheet>
</ClientOnly>
```

### 4.2 Hero.tsx

**Layout:** Full viewport with layered background

**Structure:**

```tsx
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Layer 1: Background image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('/images/hero-desert.jpg')` }}
  >
    <div className="absolute inset-0 bg-black/45" />
  </div>

  {/* Layer 2: Content */}
  <div className="container relative z-10">
    {/* Badge, H1, Subhead, CTAs */}
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown className="h-8 w-8 text-primary-foreground/60" />
  </div>
</section>
```

**Content Elements:**

- **Badge:** Service area/credentials with pulse indicator
- **H1:** "Phoenix's Most Trusted HVAC Experts" with accent color highlight
- **Subhead:** Value props (24/7, Same-Day, Guaranteed)
- **Description:** Brief selling text
- **CTAs:** Two buttons — Schedule (hero) and Call (hero-outline)
- **Animation:** `animate-fade-in-up` with staggered delays

### 4.3 ServicesGrid.tsx

**Layout:** 3x2 grid (desktop), 2x3 (tablet), 1x6 (mobile)

**Services:**

| Service            | Icon            | Description                                     |
| ------------------ | --------------- | ----------------------------------------------- |
| AC Repair          | `Wrench`        | Fast diagnosis and repair for all AC brands     |
| AC Installation    | `PlusCircle`    | Energy-efficient systems professionally installed |
| Heating Services   | `Flame`         | Furnace repair, heat pump service               |
| Maintenance Plans  | `ShieldCheck`   | Preventive maintenance to extend equipment life |
| Emergency Service  | `Clock`         | 24/7 emergency repairs                          |
| Indoor Air Quality | `Wind`          | Air purifiers, filtration, duct cleaning        |

**Card Hover:** `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`

### 4.4 WhyChooseUs.tsx

**Layout:** 2x3 grid

**Differentiators:**

| Feature                 | Icon         | Text                                               |
| ----------------------- | ------------ | -------------------------------------------------- |
| Licensed & Insured      | `BadgeCheck` | ROC licensed, fully bonded and insured             |
| 24/7 Emergency          | `Phone`      | AC emergency at 2am? We answer the phone           |
| Upfront Pricing         | `DollarSign` | No surprises. Know the cost before we start        |
| Same-Day Service        | `Zap`        | Most calls completed the same day you call         |
| Satisfaction Guaranteed | `ThumbsUp`   | Not happy? We make it right. Period                |
| Local Phoenix Team      | `MapPin`     | We live here too. We know desert HVAC              |

### 4.5 Testimonials.tsx

**Layout:** 3-column (desktop), carousel or stack (mobile)

**Content:**

```
1. "Our AC died during a 115° week. Desert Cool Air had a tech here in 2 hours 
   and got us cool by dinner. Lifesavers!"
   — Maria R., Scottsdale ⭐⭐⭐⭐⭐

2. "Fair pricing, no upselling, and they actually showed up on time. 
   Hard to find these days. Highly recommend."
   — James T., Mesa ⭐⭐⭐⭐⭐

3. "They've maintained our system for 5 years. Never had a breakdown. 
   Worth every penny of the maintenance plan."
   — The Henderson Family, Gilbert ⭐⭐⭐⭐⭐
```

### 4.6 CTABanner.tsx

**Full-width gradient section**

```tsx
<section className="py-16 bg-gradient-to-r from-primary to-brand-navy">
  <div className="container text-center">
    <h2>Don't Sweat It — We've Got You Covered</h2>
    <p>Schedule your free estimate today</p>
    <div className="flex gap-4 justify-center">
      <Button variant="hero-outline">Call (602) 609-2300</Button>
      <Button variant="hero">Request Estimate</Button>
    </div>
  </div>
</section>
```

### 4.7 ContactForm.tsx

**Layout:** Two columns (info left, form right)

**Form Fields:**

- First Name (required)
- Last Name (required)
- Phone (required, validated)
- Email (required, validated)
- Address/Zip Code (optional)
- Service Needed (Select dropdown)
- Preferred Contact (Radio: Call, Text, Email)
- Message (Textarea, optional)
- **TCPA Checkbox (required)**
- Submit Button

**TCPA Consent (EXACT TEXT REQUIRED):**

```
☐ By checking this box, I consent to receive calls and text messages from 
Desert Cool Air (operated by EverIntent LLC) and up to 3 service providers 
in my area regarding my request. I understand that consent is not a condition 
of purchase. Message frequency varies. Message & data rates may apply. 
Reply STOP to opt-out. *
```

**Validation:**

- Checkbox must be unchecked by default
- Form cannot submit unless checkbox is checked
- Zod schema validation for all fields
- Show inline validation errors

**Submission:** Posts to `/api/submit-form`

**Emergency Banner:**

```tsx
<div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
  <p className="font-bold">AC Emergency?</p>
  <a href="tel:6026092300">Call Now: (602) 609-2300</a>
  <p>We answer 24/7</p>
</div>
```

### 4.8 Footer.tsx

**4-Column Layout:**

| Column 1                          | Column 2       | Column 3         | Column 4             |
| --------------------------------- | -------------- | ---------------- | -------------------- |
| **Brand**                         | **Quick Links** | **Services**     | **Contact**          |
| Logo + Snowflake                  | Home           | AC Repair        | (602) 609-2300       |
| "Keeping Phoenix Cool Since 2010" | Services       | AC Installation  | info@desertcoolair.com |
| Social: Facebook, Instagram, Google | About         | Heating Services | Phoenix Metro Area   |
|                                   | Contact        | Maintenance Plans |                     |
|                                   | Privacy Policy | Emergency Service |                     |
|                                   | Terms of Service |                |                     |

**REQUIRED DISCLOSURE (EXACT TEXT):**

```
© 2025 Desert Cool Air. Professional HVAC Services in Phoenix.

This website is operated by EverIntent LLC. Services are performed by 
licensed independent third-party providers in your area.

EverIntent LLC
2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815
(562) 685-9500 | Privacy Policy | Terms of Service
```

---

## 5. Page Specifications

### 5.1 Home.tsx

**SEO:**

```tsx
<Head>
  <title>Phoenix HVAC Services | AC Repair & Installation | Desert Cool Air</title>
  <meta name="description" content="Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance. Same-day service. Free estimates. Call (602) 609-2300." />
  <link rel="canonical" href="https://desertcoolair.com" />
</Head>
```

**Component Assembly:**

1. Hero
2. ServicesGrid (heading: "Our Services")
3. WhyChooseUs (heading: "Why Phoenix Trusts Us")
4. Testimonials (heading: "What Our Customers Say")
5. CTABanner

### 5.2 Services.tsx

**Hero:** Smaller (h-80) with services truck image

**SEO Title:** "HVAC Services in Phoenix | AC Repair, Installation, Heating | Desert Cool Air"

**Service Detail Sections:** Alternating image/text layout

### 5.3 About.tsx

**Hero:** Team/company image

**SEO Title:** "About Desert Cool Air | Phoenix HVAC Company Since 2010"

**Sections:**

- Our Story
- Our Values
- Certifications
- Service Area

### 5.4 Contact.tsx

**Hero:** Contact-focused image

**SEO Title:** "Contact Desert Cool Air | Free HVAC Estimates Phoenix"

**Primary content:** ContactForm component

---

## 6. SEO Requirements

### 6.1 Meta Tags

| Page     | Title                                                                          | Description                                                                                                     |
| -------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Home     | Phoenix HVAC Services \| AC Repair & Installation \| Desert Cool Air          | Phoenix's trusted HVAC experts. 24/7 emergency AC repair, installation, and maintenance. Same-day service.      |
| Services | HVAC Services in Phoenix \| AC Repair, Installation, Heating \| Desert Cool Air | Complete HVAC services for Phoenix homes and businesses. AC repair, installation, heating, maintenance.         |
| About    | About Desert Cool Air \| Phoenix HVAC Company Since 2010                       | Family-owned Phoenix HVAC company serving the Valley since 2010. NATE certified technicians, BBB accredited.   |
| Contact  | Contact Desert Cool Air \| Free HVAC Estimates Phoenix                         | Get your free HVAC estimate or schedule service. Call (602) 609-2300 for 24/7 emergency service.               |

### 6.2 Head Component

**CRITICAL: Use `Head` from vite-react-ssg, not react-helmet-async**

```tsx
import { Head } from "vite-react-ssg";

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title | Desert Cool Air</title>
        <meta name="description" content="..." />
        <link rel="canonical" href="https://desertcoolair.com/page" />
        <meta property="og:title" content="..." />
        <meta property="og:description" content="..." />
        <meta property="og:url" content="..." />
      </Head>
      {/* Page content */}
    </>
  );
}
```

### 6.3 Core Web Vitals Targets

| Metric  | Target  | Strategy                            |
| ------- | ------- | ----------------------------------- |
| **LCP** | < 2.5s  | SSG pre-rendering, optimized images |
| **FID** | < 100ms | Minimal JS, code splitting          |
| **CLS** | < 0.1   | Reserved image dimensions           |

---

## 7. Compliance Requirements

### 7.1 TCPA Consent

- Explicit checkbox (not pre-checked)
- Full disclosure language (see Section 4.7)
- Timestamp stored in CRM
- Audit trail maintained

### 7.2 Operating Entity Disclosure

- Footer must include EverIntent LLC disclosure
- Creates liability shield for lead generation model

### 7.3 Privacy & Terms

- Privacy Policy page required
- Terms of Service page required
- Links in footer

---

## 8. Acceptance Criteria

### 8.1 Header

- [x] Uses `fixed` positioning (NOT sticky)
- [x] Transparent when at top of page
- [x] Solid navy with blur when scrolled
- [x] Smooth 300ms transition
- [x] Logo has glassmorphic container
- [x] Text is white with drop-shadow
- [x] Mobile menu uses ClientOnly wrapper

### 8.2 Hero

- [x] Full viewport height (min-h-screen)
- [x] Arizona scenic background (NOT AC unit)
- [x] Dark overlay present (bg-black/45)
- [x] Text has drop-shadow for readability
- [x] CTA buttons with hover effects
- [x] Scroll indicator with bounce animation

### 8.3 Forms

- [x] Submits to /api/submit-form
- [x] TCPA checkbox required with exact language
- [x] Zod validation on required fields
- [x] Success/error feedback via toast

### 8.4 Footer

- [x] EverIntent LLC disclosure with exact language
- [x] 4-column responsive layout
- [x] All links functional

### 8.5 SSG Requirements

- [x] Uses vite-react-ssg
- [x] main.tsx exports createRoot from ViteReactSSG
- [x] routes.tsx uses direct imports (NO React.lazy)
- [x] Head imported from vite-react-ssg
- [x] ClientOnly wraps portal components
- [x] vite.config.ts excludes admin/dashboard/auth routes

### 8.6 General

- [x] All routes navigate correctly
- [x] Responsive on mobile (375px), tablet, desktop
- [x] Colors use design system tokens only
- [x] Phone: (602) 609-2300
- [x] Hover states on interactive elements

---

## 9. Out of Scope

The following are explicitly NOT part of this project:

- **Supabase database** — Using Vercel Edge API only
- **User authentication/login** — Lead gen only, no user accounts
- **Admin dashboard** — Managed in GoHighLevel CRM
- **Lovable Cloud backend** — Vercel Edge Functions preferred
- **Dynamic content/CMS** — Static marketing pages only

---

## 10. Deployment Configuration

### 10.1 Vercel Settings

| Setting          | Value                      |
| ---------------- | -------------------------- |
| Build Command    | `npx vite-react-ssg build` |
| Output Directory | `dist`                     |
| Framework        | Other (not auto-detected)  |

### 10.2 vercel.json

```json
{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "framework": "vite",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 10.3 Domain Configuration

| Domain               | Configuration          |
| -------------------- | ---------------------- |
| `desertcoolair.com`  | Primary (no redirect)  |
| `www.desertcoolair.com` | Redirects to root   |

**CRITICAL:** Do NOT redirect root to www. Always redirect www to root.

---

## 11. Document History

| Version | Date     | Author            | Changes      |
| ------- | -------- | ----------------- | ------------ |
| 1.0     | Dec 2024 | Michael Clendening | Initial PRD  |

---

**End of PRD**
