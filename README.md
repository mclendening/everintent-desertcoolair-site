# Desert Cool Air — Phoenix HVAC Lead Generation

**A high-converting HVAC lead generation website for the Phoenix, Arizona metro area.**

Part of the **LocalPros Network** by [EverIntent LLC](https://everintent.com).

**Live Site:** https://desertcoolair.com/

---

## Documentation

| Guide | Description |
|-------|-------------|
| [**Lovable Prompting Guide**](docs/LOVABLE_PROMPTING_GUIDE.md) | Complete prompting workflow for Lovable projects |
| [**Tech Stack Details**](docs/TECH_STACK.md) | Architecture, patterns, and configuration |

---

## Getting Started in Lovable

### New Project Setup (In Order)

1. **Connect GitHub** — Version control first
   ```
   Connect this project to GitHub. Create a new repository.
   ```

2. **Enable Lovable Cloud** — Backend infrastructure
   ```
   Enable Lovable Cloud for this project.
   ```

3. **Configure Deployment** — Vercel settings
   ```
   Review the vercel.json configuration for pre-rendered static site deployment.
   ```

4. **Follow the Prompting Guide** — [docs/LOVABLE_PROMPTING_GUIDE.md](docs/LOVABLE_PROMPTING_GUIDE.md)

### PRD-Driven Development

After initial setup, create PRD documents for each feature:

```
Create a PRD document at docs/PRD-[feature-name].md for [feature description].
```

Then implement:

```
Implement the feature described in docs/PRD-[feature-name].md.
```

See the [Prompting Guide](docs/LOVABLE_PROMPTING_GUIDE.md#prd-driven-development) for PRD templates.

---

## Quick Start (Local Development)

```bash
npm install                    # Install dependencies
npm run dev                    # Development server
npx vite-react-ssg build       # Production build
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

See [Tech Stack Details](docs/TECH_STACK.md) for architecture and patterns.

---

## Key Configuration

### Route Exclusions (vite.config.ts)

Admin, dashboard, and auth routes are excluded from pre-rendering:

```ts
ssgOptions: {
  includedRoutes: (paths: string[]) => {
    return paths.filter((path: string) => 
      !path.includes('admin') && 
      !path.includes('dashboard') &&
      !path.includes('auth')
    );
  },
},
```

### Deployment (vercel.json)

```json
{
  "buildCommand": "npx vite-react-ssg build",
  "outputDirectory": "dist",
  "framework": null,
  "cleanUrls": true,
  "trailingSlash": false
}
```

---

## Project Structure

```
├── docs/
│   ├── LOVABLE_PROMPTING_GUIDE.md   # Prompting workflow
│   ├── TECH_STACK.md                # Architecture details
│   └── PRD-*.md                     # Feature requirements
├── src/
│   ├── components/
│   │   ├── ClientOnly.tsx           # Hydration-safe wrapper
│   │   ├── layout/                  # Header, Footer, Layout
│   │   ├── sections/                # Page sections
│   │   └── ui/                      # shadcn components
│   ├── pages/                       # Route pages
│   ├── routes.tsx                   # Route definitions
│   ├── App.tsx                      # Providers
│   └── main.tsx                     # Entry point
├── api/                             # Vercel Edge Functions
├── vite.config.ts                   # Build configuration
└── vercel.json                      # Deployment settings
```

---

## Product Requirements

| PRD | Status | Description |
|-----|--------|-------------|
| *Create PRDs in docs/ as needed* | — | — |

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
