# Desert Cool Air — Phoenix HVAC Lead Generation

**A high-converting HVAC lead generation website for the Phoenix, Arizona metro area.**

Part of the **LocalPros Network** by [EverIntent LLC](https://everintent.com).

**Live Site:** https://desertcoolair.com/

---

## How We Built This Site

This project was built using a structured prompting workflow in [Lovable](https://lovable.dev). Below is the exact process we followed, documented so you can replicate it for your own projects.

### Step 1: First Prompt (Minimal — Just Get a Blank Project)

Your first prompt in a new Lovable project must be minimal. You cannot connect GitHub until after this prompt completes.

```
Create a minimal React + Vite + TypeScript + Tailwind CSS project with:
- A basic home page
- Clean project structure
- No routing yet, just a placeholder
```

**Why minimal?** Lovable creates the project on this first prompt. Keep it simple—we'll build properly after connecting services.

### Step 2: Connect GitHub

After the first prompt completes, connect your repository:

1. Click **GitHub** in the Lovable editor
2. Click **Connect to GitHub**
3. Authorize and select your account
4. Click **Create Repository**

All code changes now sync automatically.

### Step 3: Connect Vercel Pro

Set up production deployment:

1. Go to [Vercel](https://vercel.com) and import your new GitHub repo
2. Configure build settings:
   - Build Command: `npx vite-react-ssg build`
   - Output Directory: `dist`
   - Framework Preset: `Other`
3. Set environment variables (GHL_LOCATION_ID, GHL_WEBHOOK_URL, etc.)
4. Configure custom domain:
   - Add your root domain (e.g., `desertcoolair.com`)
   - Set `www.desertcoolair.com` to **redirect to root** (not the other way around)
   - Do NOT redirect root to www

### Step 4: Enable Supabase (If Needed)

**Note:** For this project, Supabase was out of scope. We use Vercel Edge API for backend needs.

If your project requires a database or authentication:
1. Click **Cloud** in the Lovable editor
2. Enable Lovable Cloud
3. This provisions Supabase automatically

**Out of scope for this project:**
- Supabase database
- Admin routes
- User login/authentication

### Step 5: Upload PRD to docs/

After connecting services, add your Product Requirements Document:

**Option A: Via Git command**
```bash
git add docs/PRD-[feature-name].md
git commit -m "Add PRD for [feature]"
git push
```

**Option B: Via GitHub web interface**
1. Navigate to your repo on GitHub
2. Click Add file → Create new file
3. Name it `docs/PRD-[feature-name].md`
4. Paste your PRD content
5. Commit to main branch

**Option C: Via Lovable (second prompt)**
```
Create a PRD document at docs/PRD-homepage.md for the homepage design and content.
```

### Step 6: PRD-Driven Development

All subsequent prompts must follow the PRD and prompting guidelines. The second or third prompt should establish task tracking:

```
Parse docs/PRD-homepage.md and create docs/task_tracker.md with all requirements as trackable tasks. Mark initial status as pending.
```

Then implement features from the PRD:

```
Implement requirement FR-1 from docs/PRD-homepage.md. Update docs/task_tracker.md when complete.
```

---

## Documentation

| Guide | Description |
|-------|-------------|
| [**Lovable Prompting Guide**](docs/LOVABLE_PROMPTING_GUIDE.md) | Complete prompting workflow with JSDoc patterns |
| [**Tech Stack Details**](docs/TECH_STACK.md) | Architecture, patterns, and configuration |

---

## Backend Approach

This project uses **Vercel Edge API** for backend functionality—not Lovable Cloud/Supabase.

```
├── api/
│   └── submit-form.ts    # Vercel Edge Function for form handling
```

If your project requires Supabase, use its Edge API (not Lovable's backend).

---

## Key Configuration

### Route Exclusions (vite.config.ts)

Admin, dashboard, and auth routes are excluded from pre-rendering by default:

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

### Vercel Domain Configuration

- **Root domain:** `desertcoolair.com` (primary)
- **WWW redirect:** `www.desertcoolair.com` → redirects to root
- **Do NOT:** redirect root to www

---

## Project Structure

```
├── docs/
│   ├── LOVABLE_PROMPTING_GUIDE.md   # Prompting workflow
│   ├── TECH_STACK.md                # Architecture details
│   ├── PRD-*.md                     # Feature requirements
│   └── task_tracker.md              # Task tracking from PRD
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
| Backend | Vercel Edge API |
| Deployment | Vercel Pro |
| CRM | GoHighLevel |

See [Tech Stack Details](docs/TECH_STACK.md) for architecture and patterns.

---

## Product Requirements

| PRD | Status | Description |
|-----|--------|-------------|
| *Create PRDs in docs/ as features are planned* | — | — |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_LOCATION_ID` | GoHighLevel sub-account |
| `GHL_WEBHOOK_URL` | Form submission endpoint |
| `GHL_WIDGET_ID` | Chat widget ID |

Set these in Vercel project settings, not in code.

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
