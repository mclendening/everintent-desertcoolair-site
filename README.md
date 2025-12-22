# Desert Cool Air - Phoenix HVAC Lead Generation

**Author:** Michael Clendening  
**Company:** [EverIntent LLC](https://everintent.com)  
**Live Site:** https://desertcoolair.com/

---

## Overview

Desert Cool Air is a high-converting HVAC lead generation website for the Phoenix, Arizona metro area. Part of the **LocalPros Network** — a portfolio of market-specific service websites designed to capture, qualify, and route leads to licensed local providers.

### Key Features

- **Static Site Generation (SSG)** — Pre-rendered HTML for SEO and performance
- **GoHighLevel Integration** — AI chatbot, forms, and CRM automation
- **Vercel Edge Functions** — Serverless form processing
- **TCPA-Compliant** — Legal consent capture on all forms
- **Mobile-First** — Conversion-optimized responsive design

---

## Documentation

| Document | Description |
|----------|-------------|
| **[SSG Prompting Guide](docs/SSG_PROMPTING_GUIDE.md)** | Complete guide for setting up SSG perfection in Lovable |
| **[Tech Stack Details](docs/TECH_STACK.md)** | Full technical architecture, patterns, and configuration |

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# SSG production build
npx vite-react-ssg build
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite + vite-react-ssg |
| Styling | Tailwind CSS + shadcn/ui |
| Deployment | Vercel Pro |
| CRM | GoHighLevel |

> **Full details:** [docs/TECH_STACK.md](docs/TECH_STACK.md)

---

## SSG Configuration

This project uses **vite-react-ssg** for Static Site Generation.

### Critical Rules

| Rule | Reason |
|------|--------|
| **NO `React.lazy()`** | Causes hydration errors; use direct imports |
| **Wrap portals in `<ClientOnly>`** | Sheet, Dialog, Toaster cause hydration mismatch |
| **Use `mounted` state for scroll styles** | Server has no scroll position |
| **Exclude admin routes from SSG** | Dynamic routes pre-render as empty |

### Route Exclusion (vite.config.ts)

```ts
ssgOptions: {
  includedRoutes: (paths: string[]) => {
    return paths.filter((path: string) => 
      !path.includes('admin') && 
      !path.includes('dashboard') &&
      !path.includes('auth')
    );
  },
}
```

> **Full SSG guide:** [docs/SSG_PROMPTING_GUIDE.md](docs/SSG_PROMPTING_GUIDE.md)

---

## Lead Flow

```
Visitor → Engagement (Chat/Form/Call) → Vercel Edge → GoHighLevel → Partner
```

1. **Capture** — Forms, AI chatbot, click-to-call
2. **Process** — Vercel Edge validates + timestamps consent
3. **Manage** — GoHighLevel CRM stores + qualifies leads
4. **Route** — Automated delivery to territory partners

---

## Business Model

| Revenue Stream | Description |
|----------------|-------------|
| Lead Sales | $25-50 per qualified lead |
| Site Sales | Turnkey sites for $2K-$10K |
| Platform MRR | SmartSites subscriptions $197-$497/mo |

---

## Compliance

### TCPA Consent

All forms require explicit checkbox consent:

> "By checking this box, I consent to receive calls and text messages from Desert Cool Air (operated by EverIntent LLC)..."

### Operating Entity Disclosure

> "This website is operated by EverIntent LLC. Services are performed by licensed independent third-party providers."

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_LOCATION_ID` | GoHighLevel sub-account |
| `GHL_WEBHOOK_URL` | Form submission endpoint |
| `GHL_WIDGET_ID` | Chat widget ID |

---

## Roadmap

- [x] Core site (Home, Services, About, Contact)
- [x] GHL form integration via Edge Functions
- [x] TCPA-compliant consent
- [x] SSG pre-rendering
- [x] Mobile-first design
- [ ] GHL AI chatbot widget
- [ ] Google Business Profile integration
- [ ] Schema.org structured data
- [ ] A/B testing framework

---

## Author

**Michael Clendening** — Solution Architect & AI Automation Consultant

- CCIE #6487
- 25+ years enterprise technology
- GoHighLevel certified partner

**Connect:** [everintent.com](https://everintent.com) | [LinkedIn](https://linkedin.com/in/clendening) | michael@everintent.com

---

## License

Proprietary to EverIntent LLC. Architecture patterns may be referenced for educational purposes.

© 2025 EverIntent LLC. All rights reserved.
