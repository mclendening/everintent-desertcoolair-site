# Lovable SEO Project Template

A production-ready React + Vite + TypeScript template optimized for SEO and static site generation.

---

## Quick Start

### Step 1: First Prompt (Create Blank Project)

> ⚠️ **CRITICAL**: You cannot connect GitHub until AFTER your first prompt creates the project.

Paste this minimal prompt to create your project foundation:

```
Create a new React + Vite + TypeScript + Tailwind CSS project with vite-react-ssg for static site generation.

Keep it minimal:
- Basic App.tsx with a "Hello World" heading
- Standard vite.config.ts
- Empty routes.tsx ready for pages

Do not add any pages or features yet.
```

### Step 2: Connect GitHub

After the first prompt completes:

1. Click **GitHub** → **Connect to GitHub**
2. Authorize Lovable GitHub App
3. Click **Create Repository**

### Step 3: Connect Vercel Pro

1. Go to [vercel.com](https://vercel.com) and import your new GitHub repo
2. Set build command: `npx vite-react-ssg build`
3. Set output directory: `dist`
4. Deploy

### Step 4: Configure Vercel Domain

1. **Settings → Domains** → Add your root domain (e.g., `yourdomain.com`)
2. **DO NOT** redirect root to www
3. **DO** redirect `www.yourdomain.com` → `yourdomain.com` (root)
4. Set environment variables if needed

### Step 5: Enable Supabase (Optional)

Only if your PRD requires database/auth:

```
Enable Lovable Cloud for this project.
```

> **Note**: This project uses **Vercel Edge API** or **Supabase Edge API** for backend logic. We do NOT use Lovable Cloud backend deployment.

---

## Step 6: Add Your PRD

Upload your PRD to `docs/` via one of these methods:

| Method | How |
|--------|-----|
| **Git command** | `git add docs/PRD-*.md && git commit && git push` |
| **GitHub Web** | Upload file directly in GitHub repo |
| **Lovable prompt** | Paste PRD content in second prompt |

### Second Prompt (PRD-Driven)

```
Read the PRD at docs/PRD-[feature-name].md.

Parse the requirements and create docs/task_tracker.md with all tasks from the PRD.

Format task_tracker.md as:

# Task Tracker

## In Progress
- [ ] Task description (from FR-* or NFR-*)

## Completed
- [x] Completed tasks move here

## Blocked
- [ ] Blocked tasks with reason

Then begin implementing the first task.
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [Prompting Guide](docs/LOVABLE_PROMPTING_GUIDE.md) | Step-by-step prompts for building features |
| [Tech Stack](docs/TECH_STACK.md) | Architecture and configuration details |
| `docs/PRD-*.md` | Product Requirements Documents |
| `docs/task_tracker.md` | Task status parsed from PRD |

---

## Project Scope

### In Scope
- Static marketing pages (Home, About, Services, Contact)
- SEO optimization with pre-rendered HTML
- Contact form with edge function submission
- Responsive design

### Out of Scope
- ❌ Admin routes / dashboard
- ❌ User authentication / login
- ❌ Supabase user management
- ❌ Lovable Cloud backend deployment

---

## Configuration

### vite.config.ts (Route Exclusions)

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

---

## PRD Template

Create new PRDs at `docs/PRD-[feature-name].md`:

```markdown
# PRD: [Feature Name]

## Overview
[Brief description]

## Goals
- Primary goal
- Success metrics

## Requirements

### Functional Requirements
- [ ] FR-1: [Requirement]
- [ ] FR-2: [Requirement]

### Non-Functional Requirements
- [ ] NFR-1: [Requirement]

## Out of Scope
- [Explicitly excluded items]

## Technical Approach
- Use Vercel Edge API for backend logic
- OR Supabase Edge Functions if Supabase is enabled
```

---

## Edge API Pattern

This project uses **Vercel Edge API** (preferred) or **Supabase Edge Functions** for backend logic.

```
api/
  submit-form.ts    # Vercel Edge Function
```

We do NOT use:
- Lovable Cloud backend deployment
- Direct Supabase client-side calls for sensitive operations

---

*See [docs/LOVABLE_PROMPTING_GUIDE.md](docs/LOVABLE_PROMPTING_GUIDE.md) for complete prompting instructions.*
