# Desert Cool Air — Phoenix HVAC Lead Generation

**A high-converting HVAC lead generation website for the Phoenix, Arizona metro area.**

Part of the **LocalPros Network** by [EverIntent LLC](https://everintent.com).

**Live Site:** https://desertcoolair.com/

---

## Documentation

| Guide | Description |
|-------|-------------|
| [**Lovable Prompting Guide**](docs/LOVABLE_PROMPTING_GUIDE.md) | Step-by-step prompts to build SEO-optimized sites in Lovable |
| [**Tech Stack Details**](docs/TECH_STACK.md) | Architecture, patterns, and configuration |

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Development server
npx vite-react-ssg build  # Production build
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite + vite-react-ssg |
| Styling | Tailwind CSS + shadcn/ui |
| Deployment | Vercel |
| CRM | GoHighLevel |

---

## Key Features

- **Pre-rendered pages** for SEO and fast loading
- **Mobile-first** responsive design
- **GoHighLevel integration** for forms and chat
- **TCPA-compliant** consent capture
- **Edge functions** for serverless form processing

---

## Lead Flow

```
Visitor → Form/Chat/Call → Vercel Edge → GoHighLevel → Partner
```

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_LOCATION_ID` | GoHighLevel sub-account |
| `GHL_WEBHOOK_URL` | Form submission endpoint |
| `GHL_WIDGET_ID` | Chat widget ID |

---

## Compliance

**TCPA Consent:** All forms require explicit checkbox consent before submission.

**Operating Entity:** Services performed by licensed independent third-party providers.

---

## Author

**Michael Clendening** — [EverIntent LLC](https://everintent.com)

CCIE #6487 | 25+ years enterprise technology | GoHighLevel certified

---

© 2025 EverIntent LLC. All rights reserved.
