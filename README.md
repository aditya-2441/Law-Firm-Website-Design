# NyayMitra — Law Firm Website Design

**NyayMitra** (न्यायमित्र — "Justice Friend") is a bilingual (English/Hindi) legal services platform that connects clients with lawyers. The application provides public marketing pages, role-specific dashboards, secure messaging UI, and an admin console — all built as a modern React single-page application (SPA).

This repository contains the **Phase 1 frontend prototype**, exported from [Figma Make](https://www.figma.com/design/yc1l3TnN6eWXEif9u3Qxwj/Law-Firm-Website-Design) and extended with interactive flows. Backend integration, real authentication, and persistent data are planned for Phase 2 (see [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md) for the full technical reference).

---

## Table of Contents

- [Overview](#overview)
- [Features by User Role](#features-by-user-role)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing & Navigation](#routing--navigation)
- [Authentication (Current Behavior)](#authentication-current-behavior)
- [Design System & Styling](#design-system--styling)
- [Key Components](#key-components)
- [Data & State Management](#data--state-management)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Phase 2 Roadmap](#phase-2-roadmap)
- [Known Limitations](#known-limitations)
- [Attributions & License](#attributions--license)
- [Further Reading](#further-reading)

---

## Overview

NyayMitra targets the Indian legal market with affordable, accessible legal help across practice areas including divorce & family law, traffic violations, property disputes, consumer rights, and arbitration. The platform serves three audiences:

| Role | Purpose |
|------|---------|
| **Client** | Browse services, book consultations, track cases, message assigned lawyers |
| **Lawyer** | Verify Bar Council credentials, manage clients/cases, communicate via encrypted chat |
| **Admin** | Monitor platform metrics, approve lawyer registrations, manage users |

The UI uses a consistent dark theme (`slate-950` backgrounds, `amber-500` accent) with bilingual copy throughout marketing and form sections.

---

## Features by User Role

### Public (Unauthenticated)

- **Home page** (`/`): Hero, practice areas, testimonials, "How It Works", free consultation form with cascading service/sub-service dropdowns, footer
- **Floating chatbot widget**: Simulated legal assistant on Home and Lawyer landing pages
- **Login** (`/login`): Two-step flow — credentials → 6-digit OTP (UI only, no server validation)
- **Sign up** (`/signup`): Registration form → phone OTP verification → redirect to role dashboard

### Client

- **Dashboard** (`/client`): Profile header, stats (active cases, next hearing, lawyers, payments), tabbed views for cases and legal team
- **Messaging** (`/conversations`): Chat with assigned lawyers; contact list and per-contact message history

### Lawyer

- **Landing** (`/lawyer`): Lawyer-focused marketing, Bar Council document upload / verification states (unverified → pending → verified)
- **Dashboard** (`/lawyer/dashboard`): Profile with verification badge, client list, case management table, privacy notice for contact details

### Admin

- **Dashboard** (`/admin`): System stats, lawyer approval queue, user management tables (mock data)

---

## Tech Stack

| Layer | Technology | Version (approx.) |
|-------|------------|-------------------|
| UI framework | React | 18.3 |
| Language | TypeScript | 5.7 |
| Build tool | Vite | 6.3 |
| Routing | React Router | 7.13 |
| Styling | Tailwind CSS | 4.1 |
| Component primitives | Radix UI | various |
| UI kit | shadcn/ui patterns | — |
| Icons | Lucide React | 0.487 |
| Forms (OTP) | input-otp + custom shadcn `InputOTP` | — |
| Charts (available) | Recharts | 2.15 |
| Animation | Motion, tw-animate-css | — |
| Optional UI libs | MUI, Emotion (installed, lightly used) | — |

---

## Project Structure

```
Law Firm Website Design/
├── index.html                 # HTML shell; mounts React at #root
├── vite.config.ts             # Vite + React + Tailwind + Figma asset resolver
├── tsconfig.json              # TypeScript config; @/* → src/*
├── package.json               # Dependencies and npm scripts
├── ATTRIBUTIONS.md            # shadcn/ui and Unsplash credits
├── guidelines/
│   └── Guidelines.md          # Placeholder for AI/design guidelines
├── docs/
│   └── DOCUMENTATION.md       # Exhaustive technical documentation
└── src/
    ├── main.tsx               # Application entry point
    ├── vite-env.d.ts          # Vite type declarations
    ├── assets/                # Local images (Figma exports via figma:asset/ protocol)
    ├── styles/
    │   ├── index.css          # Aggregates fonts, tailwind, theme
    │   ├── tailwind.css       # Tailwind v4 @source directives
    │   └── theme.css          # CSS variables (shadcn design tokens)
    └── app/
        ├── App.tsx            # RouterProvider wrapper
        ├── routes.tsx         # Route definitions (createBrowserRouter)
        ├── pages/             # Route-level page components
        │   ├── Home.tsx
        │   ├── Login.tsx
        │   ├── SignUp.tsx
        │   ├── ClientDashboard.tsx
        │   ├── LawyerLanding.tsx
        │   ├── LawyerDashboard.tsx
        │   ├── AdminDashboard.tsx
        │   └── Conversations.tsx
        └── components/
            ├── Navbar.tsx           # Global navigation (role-aware)
            ├── ChatbotWidget.tsx    # Floating support chat
            ├── figma/
            │   └── ImageWithFallback.tsx
            └── ui/                  # shadcn/ui component library (~40 components)
```

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher (20+ recommended)
- **npm**, **pnpm**, or **yarn** (project includes `pnpm-workspace.yaml` but works with npm)

### Installation

```bash
# Clone the repository (if not already local)
git clone <repository-url>
cd "Law Firm Website Design"

# Install dependencies
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite provides hot module replacement (HMR) for instant feedback during development.

### Production preview

```bash
npm run build
npm run preview
```

Preview serves the built `dist/` folder locally (default port 4173).

---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server on port 5173 |
| `build` | `vite build` | Type-check and bundle for production → `dist/` |
| `preview` | `vite preview` | Serve production build locally |

---

## Routing & Navigation

Routes are defined in `src/app/routes.tsx` using React Router v7's `createBrowserRouter`.

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | `Home` | Public | Main marketing landing page |
| `/login` | `Login` | Public | Sign-in with OTP step |
| `/signup` | `SignUp` | Public | Account registration |
| `/client` | `ClientDashboard` | Client* | Client case & lawyer dashboard |
| `/lawyer` | `LawyerLanding` | Lawyer* | Lawyer marketing + verification |
| `/lawyer/dashboard` | `LawyerDashboard` | Lawyer* | Lawyer workspace |
| `/admin` | `AdminDashboard` | Admin* | Platform administration |
| `/conversations` | `Conversations` | Authenticated* | Client ↔ lawyer messaging |

\* *Currently unprotected at the router level; some pages check auth in-component.*

### Navbar behavior

The shared `Navbar` component adapts based on authentication state:

- **Guest**: Home, Services, How It Works, Contact, Log In, Sign Up
- **Authenticated**: Home (role-aware), Contact, Messages, Profile, Logout
- **Lawyer logged in**: Services and How It Works links are hidden; Home routes to `/lawyer`
- **Scroll-to-section**: From non-home pages, clicking Services/How It Works/Contact navigates to `/` with `location.state.scrollTo` to smooth-scroll to `#services`, `#how-it-works`, or `#contact`

---

## Authentication (Current Behavior)

> **Important:** Authentication is **client-side mock only**. There is no backend, JWT, or session server.

### How it works today

1. **Login** (`Login.tsx`): After entering email/password and any 6-digit OTP, the app writes to `localStorage`:
   - `isAuthenticated` = `"true"`
   - `userType` = `"client"` or `"lawyer"`
   - Redirects: client → `/`, lawyer → `/lawyer`

2. **Sign up** (`SignUp.tsx`): After OTP step, navigates to `/client` or `/lawyer` but **does not** set `localStorage` auth keys (inconsistency — see Known Limitations).

3. **Logout**: Clears `localStorage` keys and redirects to `/`.

4. **Conversations**: Reads `localStorage` on mount; redirects to `/login` if not authenticated.

5. **Admin**: No login path sets `userType` to `"admin"`; access `/admin` directly for demo.

### Planned Phase 2 auth

Code comments reference backend API calls for credential verification, OTP SMS, and session tokens. See `docs/DOCUMENTATION.md` § Authentication Architecture.

---

## Design System & Styling

### Visual identity

- **Background**: `bg-slate-950`, `bg-slate-900` for cards/sections
- **Accent**: `amber-500` / `amber-600` for CTAs, highlights, active tabs
- **Success**: `emerald-500` (verified badges, chatbot, online indicators)
- **Typography**: System fonts via Tailwind; base 16px in `theme.css`
- **Layout**: `container mx-auto px-6` pattern; responsive grids with `md:` breakpoints

### Tailwind CSS v4

Configured via `@tailwindcss/vite` plugin. Source scanning is declared in `src/styles/tailwind.css`:

```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';
```

### shadcn/ui tokens

`src/styles/theme.css` defines CSS custom properties for light/dark themes (`:root` and `.dark`), mapped into Tailwind via `@theme inline`. Most marketing pages use raw Tailwind utilities rather than shadcn semantic tokens; auth flows use shadcn `InputOTP`.

### Bilingual content

Marketing copy pairs English with Hindi (Devanagari) for headings, stats labels, form labels, and testimonials — reflecting the target Indian audience.

---

## Key Components

### `Navbar`

Props: `isAuthenticated`, `userType`, `onLogout`. Handles desktop/mobile menus, role-based link visibility, profile routing, and cross-page anchor scrolling.

### `ChatbotWidget`

Fixed bottom-right floating button opening a chat panel. Messages are stored in local React state; bot replies are simulated with a 1-second delay. Rendered on `Home` and `LawyerLanding`.

### `Home` consultation form

- Primary service dropdown drives a **conditional sub-service** dropdown via `subServicesMap` (7 categories, 4 sub-options each)
- Submit shows an `alert()` — no API call

### Dashboard pages

All three dashboards (`ClientDashboard`, `LawyerDashboard`, `AdminDashboard`) follow the same pattern:

1. `useEffect` simulates API fetch with `setTimeout`
2. Skeleton loaders during `isLoading`
3. Stats cards + tabbed data tables
4. Mock TypeScript interfaces for type safety

### `Conversations`

Split-pane chat UI: contact sidebar + message thread. Maintains `chatHistories` as a `Record<contactId, Message[]>` so switching contacts preserves separate histories. Message alignment depends on `senderRole === userType`.

### UI library (`src/app/components/ui/`)

Full shadcn/ui component set (Button, Dialog, Tabs, Chart, Sidebar, etc.) built on Radix UI primitives. Utility helper `cn()` in `utils.ts` merges class names via `clsx` + `tailwind-merge`. Available for Phase 2 features even if not all are used on current pages.

---

## Data & State Management

| Concern | Current approach |
|---------|------------------|
| Global auth | `localStorage` (`isAuthenticated`, `userType`) |
| Page data | Local `useState` + mock fetch in `useEffect` |
| Forms | Controlled inputs with React state |
| Routing state | React Router (`useNavigate`, `useLocation`) |
| Chat (Conversations) | In-memory state; lost on refresh |
| Chatbot | Component-local state |

There is **no** Redux, Zustand, React Query, or global context provider in Phase 1.

---

## Building for Production

```bash
npm run build
```

Output directory: **`dist/`** — static HTML, JS, and CSS suitable for any static host.

### Vite configuration highlights

- **`@` alias**: Maps to `./src` for clean imports
- **`figmaAssetResolver`**: Resolves `figma:asset/<filename>` imports to `src/assets/<filename>`
- **`assetsInclude`**: Allows raw import of `.svg` and `.csv` files

### Environment variables

No `.env` files are required for Phase 1. When adding a backend, create `.env` (gitignored) with values such as `VITE_API_BASE_URL`.

---

## Deployment

Deploy the contents of `dist/` to any static hosting provider:

| Platform | Notes |
|----------|-------|
| **Vercel / Netlify** | Connect repo; build command `npm run build`; publish directory `dist` |
| **GitHub Pages** | May require `base` in `vite.config.ts` if serving from a subpath |
| **AWS S3 + CloudFront** | Upload `dist/`; configure SPA fallback to `index.html` |

### SPA routing

Because this is a client-side router, the host must rewrite all routes to `index.html`. Without this, direct visits to `/login` or `/client` will 404 on static servers.

Example Netlify `_redirects`:

```
/*    /index.html   200
```

---

## Phase 2 Roadmap

The codebase contains `TODO: Phase 2` comments marking integration points:

- [ ] REST/GraphQL backend (Node.js + MySQL referenced in admin comments)
- [ ] Real email/password authentication with SMS OTP
- [ ] Persistent cases, clients, lawyers, and messages
- [ ] Lawyer document upload to secure storage
- [ ] Admin approve/reject actions wired to API
- [ ] Consultation form submission to CRM/notification system
- [ ] Route guards and protected routes
- [ ] Replace Unsplash hotlinked images with CDN/assets

See [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md) for file-by-file integration notes.

---

## Known Limitations

1. **No backend** — All data is mock; changes do not persist across refreshes (except `localStorage` auth flags).
2. **Sign-up auth gap** — Sign-up completes without setting `localStorage`; user may appear logged out on Home until manual login.
3. **Admin access** — No UI path to authenticate as admin; navigate to `/admin` manually.
4. **Missing `fonts.css`** — `src/styles/index.css` imports `./fonts.css` which is not present in the repo (may cause a dev warning).
5. **OTP not validated** — Any 6 digits succeed on login/sign-up.
6. **SEO** — `index.html` sets `robots: noindex, nofollow` (typical for Figma Make exports).
7. **No tests** — No unit, integration, or E2E test suite configured.

---

## Attributions & License

- UI components from [shadcn/ui](https://ui.shadcn.com/) (MIT)
- Stock photos from [Unsplash](https://unsplash.com) (Unsplash License)

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for details.

---

## Further Reading

For exhaustive documentation — architecture diagrams, per-page breakdowns, component API reference, auth flow sequences, service taxonomy, and developer extension guides — see:

**[docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)**

---

## Quick Demo Paths

Try these flows after `npm run dev`:

1. **Public visitor**: `/` → scroll sections → submit consultation form → open chatbot
2. **Client login**: `/login` → select Client → any email/password → any 6-digit OTP → Profile or `/client`
3. **Lawyer login**: `/login` → select Lawyer → OTP → `/lawyer` → Enter Dashboard → `/lawyer/dashboard`
4. **Messaging**: Log in → `/conversations` → switch contacts → send messages
5. **Admin**: Navigate directly to `/admin`
