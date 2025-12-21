# Desert Cool Air - Phoenix HVAC Portfolio Site

**Author:** Michael Clendening  
**Company:** [EverIntent LLC](https://everintent.com)  
**Role:** Solution Architect & Lead Developer
**Contact:** michael@everintent.com | [LinkedIn](https://linkedin.com/in/clendening)
**Live Site:** [Desert Cool Air](https://desertcoolair.com)  
---

## 🏜️ Project Overview

Desert Cool Air is a high-converting lead generation website for HVAC services in the Phoenix, Arizona metro area. This project is part of the **LocalPros Network** — a portfolio of 20 market-specific service websites designed to capture, qualify, and route leads to licensed local providers.

This isn't just a website. It's a **lead generation engine** with:
- Static Site Generation (SSG) for lightning-fast performance and SEO dominance
- GoHighLevel (GHL) integration for AI chatbot, forms, and CRM automation
- Vercel Edge Functions for serverless form processing
- TCPA-compliant consent capture for legal protection
- Mobile-first, conversion-optimized design

---

## 🎯 Business Model: LocalPros Lead Generation

### The Problem
Local service businesses (HVAC, plumbing, roofing, etc.) struggle with:
- Inconsistent lead flow
- Expensive pay-per-click advertising
- No time to build/maintain websites
- Missed calls = missed revenue

### The Solution
EverIntent LLC builds, owns, and operates portfolio sites that look and feel like established local businesses. These sites:

1. **Rank organically** for high-intent local searches ("Phoenix AC repair", "emergency HVAC Phoenix")
2. **Capture leads** via forms, phone calls, SMS, and AI chatbot
3. **Qualify prospects** automatically through GHL workflows
4. **Route to partners** — licensed, insured providers in guaranteed zip code territories
5. **Charge per lead** — partners pay $25-50 per qualified lead

### Revenue Model (Triple-Threat)
| Stream | Description |
|--------|-------------|
| **Lead Sales** | $25-50 per qualified lead to partner providers |
| **Site Sales** | Sell turnkey sites with traffic + automation for $2K-$10K |
| **SmartSites Conversion** | Convert partners to full SmartSites platform ($197-$497/mo MRR) |

---

## 🏗️ Technical Architecture

### Stack
| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite with vite-react-ssg |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Routing** | react-router-dom v6 |
| **Deployment** | Vercel Pro (Edge Functions) |
| **CRM/Automation** | GoHighLevel (GHL) |
| **Forms** | Vercel Edge → GHL REST API |
| **Chatbot** | GHL Chat Widget (AI-powered) |

### Why This Stack?

**Static Site Generation (SSG)**
- Pre-rendered HTML for every marketing page
- Sub-second page loads (Core Web Vitals optimized)
- SEO advantage: search engines see fully-rendered content
- No server required for marketing pages = infinite scale at zero marginal cost

**Vercel Edge Functions**
- Form submissions processed at the edge (low latency globally)
- No cold starts like traditional serverless
- Secure: API keys never exposed to client

**GoHighLevel Integration**
- Single platform for CRM, automation, SMS, calling, chatbot
- Contacts created instantly on form submission
- AI chatbot handles 24/7 visitor engagement
- Automated follow-up sequences nurture leads to conversion

---

## 🔄 Lead Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      VISITOR ARRIVES                            │
│         (Organic Search, Direct, Referral, Paid)                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ENGAGEMENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   AI Chat    │  │  Lead Form   │  │  Click-to-   │          │
│  │   Widget     │  │  (TCPA)      │  │  Call        │          │
│  │   (GHL)      │  │              │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼─────────────────┼─────────────────┼───────────────────┘
          │                 │                 │
          ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  VERCEL EDGE FUNCTION                           │
│            POST /api/submit-form                                │
│   • Validates input                                             │
│   • Adds TCPA consent timestamp                                 │
│   • Tags: website-lead, hvac, phoenix                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOHIGHLEVEL CRM                              │
│   • Contact created with all form fields                        │
│   • Custom fields: service_needed, tcpa_consent                 │
│   • Source tracking: "Desert Cool Air Website"                  │
│   • Pipeline: Discovery → Qualified → Routed                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 AUTOMATION WORKFLOWS                            │
│   • Instant SMS confirmation to lead                            │
│   • Email notification to partner                               │
│   • AI qualification call (optional)                            │
│   • Lead scoring and routing logic                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PARTNER RECEIVES LEAD                         │
│   • Real-time SMS/email with lead details                       │
│   • Accept/reject within 15 minutes                             │
│   • Billable at $25-50 per qualified lead                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
desert-cool-air/
├── api/
│   └── submit-form.ts        # Vercel Edge Function → GHL
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Sticky nav, mobile menu
│   │   │   └── Footer.tsx    # 4-col, legal disclosures
│   │   ├── sections/
│   │   │   ├── Hero.tsx      # Full-viewport Arizona imagery
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   └── ContactForm.tsx  # TCPA-compliant
│   │   └── ui/               # shadcn/ui components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   ├── lib/
│   │   └── utils.ts
│   ├── index.css             # Tailwind + CSS variables
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
├── vercel.json
├── vite.config.ts            # SSG configuration
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🔐 Compliance & Legal

### TCPA Consent
All forms include explicit consent language:

> "By checking this box, I consent to receive calls and text messages from Desert Cool Air (operated by EverIntent LLC) and up to 3 service providers in my area regarding my request. I understand that consent is not a condition of purchase. Message frequency varies. Message & data rates may apply. Reply STOP to opt-out."

- Checkbox required (not pre-checked)
- Consent timestamp stored in CRM
- Full audit trail for legal protection

### Operating Entity Disclosure
Footer includes required disclosure:

> "This website is operated by EverIntent LLC. Services are performed by licensed independent third-party providers in your area."

This creates a liability shield — EverIntent captures leads, partners perform services.

---

## ⚡ Performance & SEO

### Core Web Vitals Targets
| Metric | Target | How We Achieve It |
|--------|--------|-------------------|
| **LCP** | < 2.5s | SSG pre-rendering, optimized images |
| **FID** | < 100ms | Minimal JS, code splitting |
| **CLS** | < 0.1 | Reserved image dimensions, no layout shift |

### SEO Implementation
- Pre-rendered HTML (SSG) — search engines see full content
- Semantic HTML5 structure
- Meta tags per page (title, description, Open Graph)
- Schema.org LocalBusiness markup
- Mobile-first responsive design
- Fast TTFB via Vercel Edge Network

### Target Keywords
- "Phoenix AC repair"
- "Emergency HVAC Phoenix"
- "Air conditioning installation Phoenix"
- "24 hour AC service Phoenix"
- "Phoenix heating and cooling"

---

## 🚀 Deployment

### Environment Variables (Vercel)
| Variable | Purpose |
|----------|---------|
| `GHL_LOCATION_ID` | GHL Sub-account/Location ID |
| `GHL_WIDGET_ID` | GHL Chat Widget ID |
| `GHL_FORM_WEBHOOK` | GHL Form Webhook URL |

### Deploy to Vercel
1. Connect GitHub repo to Vercel
2. Configure environment variables
3. Deploy (auto-builds on push to main)
4. Add custom domain: desertcoolair.com

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Organic traffic | 500+ visits/month within 6 months |
| Form conversion rate | 3-5% of visitors |
| Lead quality score | 70%+ accepted by partners |
| Cost per lead | $0 (organic traffic) |
| Revenue per lead | $25-50 |
| Monthly lead volume | 15-25 qualified leads |

---

## 🛣️ Roadmap

- [x] Core site build (Home, Services, About, Contact)
- [x] GHL form integration via Vercel Edge Functions
- [x] TCPA-compliant consent capture
- [x] SSG pre-rendering for SEO
- [x] Vercel Pro deployment
- [x] Mobile-first responsive design
- [ ] GHL AI chatbot widget integration
- [ ] Google Business Profile integration
- [ ] Review automation workflow
- [ ] A/B testing on hero CTA
- [ ] Blog/content hub for long-tail SEO
- [ ] Schema.org structured data markup

---

## 👨‍💻 About the Author

**Michael Clendening** is a Solution Architect and AI Automation Consultant with 25+ years of enterprise technology experience. As founder of EverIntent LLC, he builds AI-powered systems that deliver 3x-10x efficiency gains for businesses.

**Credentials:**
- CCIE #6487 (Cisco Certified Internetwork Expert)
- Built two companies from $0 to $10M+
- Deep expertise in contact centers, CRM, and marketing automation
- GoHighLevel certified partner

**What I Build:**
- Lead generation systems that convert
- AI-powered automation workflows
- Full-stack web applications with modern tooling
- CRM integrations and marketing automation

**Portfolio:**
- [EverIntent.com](https://everintent.com) — AI & Automation Consultancy
- LocalPros Network — 20 lead generation portfolio sites

---

## 📄 License

This project is proprietary to EverIntent LLC. The codebase demonstrates architecture patterns and may be referenced for educational purposes.

© 2025 EverIntent LLC. All rights reserved.

---

## 🤝 Connect

- **Website:** [everintent.com](https://everintent.com)
- **LinkedIn:** [linkedin.com/in/michaelclendening](https://linkedin.com/in/clendening)
- **Email:** michael@everintent.com

---

*Built with ❤️ in Long Beach, California*
