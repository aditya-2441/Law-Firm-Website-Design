# NyayMitra — Technical Documentation

> **Version:** Phase 1 (Frontend Prototype)  
> **Last updated:** June 2026  
> **Audience:** Developers, architects, and contributors extending this codebase

This document is the authoritative technical reference for the **Law Firm Website Design** repository — the NyayMitra legal services platform. It explains architecture, data flows, component responsibilities, styling conventions, build tooling, and planned backend integration in detail.

For a shorter project overview and quick-start guide, see the [README](../README.md) in the repository root.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Application Bootstrap](#3-application-bootstrap)
4. [Routing System](#4-routing-system)
5. [Authentication & Session Model](#5-authentication--session-model)
6. [Page Reference](#6-page-reference)
7. [Shared Components](#7-shared-components)
8. [UI Component Library (shadcn/ui)](#8-ui-component-library-shadcnui)
9. [Styling & Design Tokens](#9-styling--design-tokens)
10. [Service Taxonomy (Consultation Form)](#10-service-taxonomy-consultation-form)
11. [State Management Patterns](#11-state-management-patterns)
12. [Build Tooling & Vite Configuration](#12-build-tooling--vite-configuration)
13. [TypeScript Configuration](#13-typescript-configuration)
14. [Phase 2 Backend Integration Guide](#14-phase-2-backend-integration-guide)
15. [Deployment & Hosting](#15-deployment--hosting)
16. [File Inventory](#16-file-inventory)
17. [Troubleshooting & FAQ](#17-troubleshooting--faq)

---

## 1. Executive Summary

### 1.1 What this application is

**NyayMitra** is a web platform designed to democratize access to legal services in India. It provides:

- A **public marketing site** for client acquisition (services, testimonials, consultation booking)
- A **lawyer onboarding portal** with Bar Council credential verification UI
- **Role-specific dashboards** for clients, lawyers, and administrators
- A **messaging interface** simulating encrypted client–lawyer communication

### 1.2 What this application is not (Phase 1)

- There is **no server**, **no database**, and **no real authentication**
- Form submissions, OTP verification, and dashboard data are **simulated**
- Document uploads are captured in React state but **not transmitted**
- Chat messages exist only in memory until page refresh

### 1.3 Origin

The UI was initially exported from **Figma Make** ([design file](https://www.figma.com/design/yc1l3TnN6eWXEif9u3Qxwj/Law-Firm-Website-Design)). The codebase retains Figma-specific tooling (asset resolver plugin) and shadcn/ui components bundled with the export.

### 1.4 Design philosophy

| Principle | Implementation |
|-----------|----------------|
| Mobile-first responsive | Tailwind breakpoints (`md:`, `sm:`) throughout |
| Accessibility primitives | Radix UI under shadcn components where used |
| Bilingual UX | English + Hindi copy on public-facing sections |
| Progressive enhancement | Phase 1 UI complete; API hooks marked with `TODO: Phase 2` |
| Type safety | TypeScript interfaces on all dashboard entities |

---

## 2. System Architecture

### 2.1 High-level diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│  index.html                                                      │
│    └── #root                                                     │
│          └── main.tsx                                            │
│                └── App.tsx (RouterProvider)                      │
│                      └── routes.tsx (createBrowserRouter)        │
│                            ├── Pages (route components)          │
│                            ├── Navbar (layout)                   │
│                            ├── ChatbotWidget (overlay)           │
│                            └── ui/* (shadcn primitives)          │
├─────────────────────────────────────────────────────────────────┤
│  Persistence Layer (Phase 1)                                     │
│    └── localStorage: isAuthenticated, userType                   │
├─────────────────────────────────────────────────────────────────┤
│  External Resources (runtime)                                    │
│    └── Unsplash CDN images (hero/section backgrounds)            │
└─────────────────────────────────────────────────────────────────┘

                              │
                              │  Phase 2 (planned)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend API (Node.js / MySQL — referenced in code comments)      │
│    ├── POST /auth/login, /auth/register, /auth/verify-otp       │
│    ├── GET  /client/*, /lawyer/*, /admin/*                      │
│    ├── POST /consultations, /lawyer/verify                        │
│    └── WebSocket or REST for /conversations                     │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Architectural style

- **Single Page Application (SPA)**: One HTML document; all navigation is client-side via React Router
- **Component-driven**: Pages compose shared layout (Navbar) + local sections
- **No global store**: Each page owns its data fetching simulation
- **Colocated routes**: Route table lives in `src/app/routes.tsx`, separate from page implementations

### 2.3 User role matrix

| Role | Primary routes | Navbar "Home" target | Profile target |
|------|----------------|----------------------|----------------|
| Guest | `/`, `/login`, `/signup` | `/` | — |
| Client | `/`, `/client`, `/conversations` | `/` | `/client` |
| Lawyer | `/lawyer`, `/lawyer/dashboard`, `/conversations` | `/lawyer` | `/lawyer/dashboard` |
| Admin | `/admin` | `/` (default) | `/admin` |

---

## 3. Application Bootstrap

### 3.1 Entry chain

```
index.html
  → <script type="module" src="/src/main.tsx">
    → import "./styles/index.css"   // Global styles
    → createRoot(#root).render(<App />)
      → App.tsx
        → <RouterProvider router={router} />
```

### 3.2 `src/main.tsx`

The entry file is minimal by design:

```tsx
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

**Notes:**
- Uses React 18's `createRoot` API (concurrent features enabled)
- Non-null assertion on `#root` — fails fast if HTML shell is malformed
- Side-effect import of CSS ensures Tailwind and theme tokens load before paint

### 3.3 `src/app/App.tsx`

```tsx
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}
```

The entire application tree is delegated to React Router v7. There are no context providers, error boundaries, or theme wrappers at this level in Phase 1.

### 3.4 `index.html` metadata

| Meta | Value | Implication |
|------|-------|-------------|
| `viewport` | `width=device-width, initial-scale=1.0` | Responsive scaling |
| `description` | Legal platform summary | SEO description |
| `robots` | `noindex, nofollow` | Discourages indexing (Figma export default) |
| Inline style | `#root { height: 100% }` | Full-viewport layout support |

---

## 4. Routing System

### 4.1 Route definition file

**Location:** `src/app/routes.tsx`

Uses `createBrowserRouter` from React Router v7, which provides:
- Browser history API integration (clean URLs without `#`)
- Data APIs (loaders/actions) — **not used in Phase 1**
- Support for both `Component` and `element` route properties

### 4.2 Complete route table

```tsx
export const router = createBrowserRouter([
  { path: "/",                    Component: Home },
  { path: "/login",               Component: Login },
  { path: "/signup",              Component: SignUp },
  { path: "/lawyer",              element: <LawyerLanding /> },
  { path: "/lawyer/dashboard",    element: <LawyerDashboard /> },
  { path: "/admin",               Component: AdminDashboard },
  { path: "/conversations",      element: <Conversations /> },
  { path: "/client",              element: <ClientDashboard /> },
]);
```

### 4.3 Route property inconsistency

Some routes use `Component:` (lazy-capable shorthand) while others use `element:`. Both are valid in React Router v7. For consistency in Phase 2, standardize on one style — recommended:

```tsx
{ path: "/client", Component: ClientDashboard }
```

### 4.4 Missing route guards

**No route is protected at the router level.** Implications:

| Route | In-component protection |
|-------|-------------------------|
| `/client` | None — mock data loads regardless |
| `/lawyer/dashboard` | None |
| `/admin` | None |
| `/conversations` | Redirects to `/login` if `!isAuthenticated` |

**Phase 2 recommendation:** Add a `ProtectedRoute` wrapper or React Router `loader` that validates session before rendering.

### 4.5 Deep linking & scroll restoration

The Home page implements **anchor scrolling via router state**:

```tsx
// Navbar dispatches:
navigate("/", { state: { scrollTo: "services" } });

// Home.tsx consumes:
useEffect(() => {
  if (location.state?.scrollTo) {
    document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState({}, document.title); // Clear state after scroll
  }
}, [location]);
```

**Anchor IDs on Home:**
- `#services` — Practice areas section
- `#how-it-works` — Three-step process
- `#contact` — Consultation form

---

## 5. Authentication & Session Model

### 5.1 Phase 1 session storage

Authentication state is persisted in **`localStorage`** with two keys:

| Key | Values | Set by |
|-----|--------|--------|
| `isAuthenticated` | `"true"` / absent | `Login.tsx` on OTP verify; cleared on logout |
| `userType` | `"client"` \| `"lawyer"` \| `"admin"` | `Login.tsx`; cleared on logout |

**Reading pattern (Home.tsx, Conversations.tsx):**

```tsx
const [isAuthenticated, setIsAuthenticated] = useState(() =>
  localStorage.getItem("isAuthenticated") === "true"
);
const [userType, setUserType] = useState(() =>
  localStorage.getItem("userType") as "client" | "lawyer" | "admin" | null
);
```

### 5.2 Login flow (detailed)

```
┌──────────────┐     credentials      ┌──────────────┐
│   Step 1     │ ──────────────────►  │   Step 2     │
│ credentials  │   (any email/pwd)  │     OTP      │
└──────────────┘                      └──────────────┘
       │                                      │
       │ User selects client/lawyer           │ Any 6 digits
       │                                      │
       ▼                                      ▼
  setStep("otp")                    localStorage.setItem(...)
  setCountdown(30)                    navigate("/") or navigate("/lawyer")
```

**File:** `src/app/pages/Login.tsx`

| Step | UI state | Validation | Side effects |
|------|----------|------------|--------------|
| `credentials` | email, password, userType toggle | HTML5 `required` on inputs | Console log only |
| `otp` | 6-digit InputOTP | Length must be 6 | Writes localStorage, navigates |

**OTP UX details:**
- 30-second resend countdown via `useEffect` + `setTimeout`
- `REGEXP_ONLY_DIGITS` pattern on InputOTP
- Custom `onKeyDown` handler shows "Please enter numbers only" for invalid keys
- Back button returns to credentials step

### 5.3 Sign-up flow (detailed)

**File:** `src/app/pages/SignUp.tsx`

| Step | Fields | Validation |
|------|--------|------------|
| `details` | fullName, email, phone, password, confirmPassword | Password match check; phone digits-only (max 10); terms checkbox required |
| `otp` | 6-digit code | Length === 6 |

**Post-verification navigation:**
- Client → `/client`
- Lawyer → `/lawyer`

**Critical gap:** Sign-up does **not** call `localStorage.setItem("isAuthenticated", "true")`. After sign-up, the Navbar on Home may still show "Log In" until the user completes Login separately.

### 5.4 Logout flow

Implemented via `onLogout` callback passed to Navbar from pages that manage auth state:

```tsx
onLogout={() => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userType");
  navigate("/");
}}
```

Pages implementing logout: `Home`, `ClientDashboard`, `Conversations`.

### 5.5 Admin authentication gap

`AdminDashboard` renders with `<Navbar isAuthenticated={true} userType="admin" />` hardcoded. There is no login path that sets `userType` to `"admin"`. Admin is accessible by direct URL navigation only.

### 5.6 Phase 2 authentication architecture (recommended)

```
┌────────┐    POST /auth/login     ┌─────────┐    SMS gateway    ┌──────┐
│ Client │ ───────────────────────► │ Backend │ ────────────────► │ User │
└────────┘                          └─────────┘                   └──────┘
     │                                    │
     │    POST /auth/verify-otp           │
     │ ◄──────────────────────────────────┤
     │    { accessToken, refreshToken,    │
     │      user: { id, role } }          │
     ▼                                    ▼
  httpOnly cookie OR                 Session store /
  secure localStorage                Redis + JWT
```

**Recommended frontend changes:**
1. Create `src/app/context/AuthContext.tsx` or use React Query for session
2. Replace raw `localStorage` reads with context hook `useAuth()`
3. Add axios/fetch interceptor for token refresh
4. Implement `ProtectedRoute` component
5. Fix SignUp to establish session on successful OTP

---

## 6. Page Reference

### 6.1 Home (`src/app/pages/Home.tsx`)

**Route:** `/`  
**Purpose:** Primary marketing landing page for clients seeking legal help.

#### Sections (top to bottom)

| Section | ID | Key interactions |
|---------|-----|------------------|
| Navbar | — | Auth-aware; scroll navigation |
| Hero | — | CTA → `/signup`; WhatsApp/Call buttons (non-functional) |
| Practice areas bar | — | Horizontal scroll links (display only) |
| Services | `#services` | 4 card grid with background images |
| Why Choose Us | — | Feature grid + CTA |
| How It Works | `#how-it-works` | 3-step cards |
| Testimonials | — | 3 review cards, 4.9 rating display |
| Consultation form | `#contact` | Cascading dropdowns + submit |
| Footer | — | Links, contact info, copyright |
| ChatbotWidget | — | Floating overlay |

#### Consultation form state

```tsx
const [formData, setFormData] = useState({
  fullName: "", phone: "", service: "", subService: "", description: ""
});
```

**Submit handler:** `e.preventDefault()` → `alert("Consultation request submitted!")` → reset form.

#### Auth state on Home

Home reads localStorage on init to pass auth props to Navbar. Logout clears storage and local React state.

---

### 6.2 Login (`src/app/pages/Login.tsx`)

**Route:** `/login`  
**Purpose:** Returning user authentication with simulated 2FA.

**Dependencies:** `InputOTP`, `InputOTPGroup`, `InputOTPSlot` from shadcn; `REGEXP_ONLY_DIGITS` from `input-otp`.

**Does not include:** Navbar (standalone full-screen auth layout).

---

### 6.3 SignUp (`src/app/pages/SignUp.tsx`)

**Route:** `/signup`  
**Purpose:** New user registration for clients and lawyers.

**Phone validation:**
- `onKeyDown` → `handleNumberValidation` rejects non-numeric keys
- `onChange` strips non-digits via `.replace(/\D/g, '')`
- `maxLength={10}` for Indian mobile numbers

---

### 6.4 ClientDashboard (`src/app/pages/ClientDashboard.tsx`)

**Route:** `/client`  
**Purpose:** Client workspace for case tracking and lawyer contact.

#### TypeScript interfaces

```tsx
interface ClientProfile {
  name: string; email: string; phone: string; joinDate: string;
}
interface HiredLawyer {
  id: number; name: string; specialization: string; email: string; phone: string;
}
interface Case {
  id: number; caseType: string; lawyerName: string;
  status: "In Progress" | "Under Review" | "Resolved";
  filingDate: string; nextHearing: string;
}
```

#### Mock data loading

```tsx
useEffect(() => {
  const fetchDashboardData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
    setProfile({ ... });
    setMyCases([ ... ]);
    setMyLawyers([ ... ]);
    setIsLoading(false);
  };
  fetchDashboardData();
}, []);
```

#### UI structure

1. **Profile header** — Avatar initials, contact info, gradient background
2. **Stats row** (4 cards) — Active cases, next hearing, total lawyers, payment status
3. **Tabbed panel** — "My Cases" | "My Legal Team"
4. **Tables** — Sortable-style rows with status badges and action buttons

**Message action:** Navigates to `/conversations`.

---

### 6.5 LawyerLanding (`src/app/pages/LawyerLanding.tsx`)

**Route:** `/lawyer`  
**Purpose:** Lawyer-specific marketing + credential verification workflow.

#### Verification state machine

```
                    submit docs
  unverified ──────────────────► pending
                                    │
                                    │ admin approval (simulated)
                                    ▼
                                 verified
```

**Default state in code:** `"verified"` (demo-friendly — shows success UI immediately).

To test other states, change:
```tsx
const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("unverified");
```

#### Document upload form

Captures in React state (not uploaded):
- `barCouncilId` (text)
- `certPhoto`, `idPhoto`, `govIdPhoto` (`File | null`)

Submit simulates 2-second upload then sets status to `"pending"`.

---

### 6.6 LawyerDashboard (`src/app/pages/LawyerDashboard.tsx`)

**Route:** `/lawyer/dashboard`  
**Purpose:** Lawyer workspace — clients, cases, profile management.

#### Notable features

- **Verified badge** on profile when `profile.status === "Verified"`
- **Privacy notice** — Explains contact details hidden until case acceptance
- **Edit Profile button** — UI only (no handler)
- **Tabs:** "My Active Clients" | "Case Management"

#### Mock fetch delay: 1.5 seconds

---

### 6.7 AdminDashboard (`src/app/pages/AdminDashboard.tsx`)

**Route:** `/admin`  
**Purpose:** Platform administration console.

#### Tabs

| Tab | Content |
|-----|---------|
| `overview` | Placeholder for future analytics charts |
| `lawyers` | Approval table with Approve/Reject icon buttons |
| `users` | User list with role badges and Manage action |

#### Mock stats

- Total Users: 2,543 (+12.5%)
- Active Lawyers: 145 (+5.2%)
- Platform Activity: 8,942 (+18.4%)
- Pending Approvals: 12 (-2.1%)

Action buttons (Approve, Reject, Manage) have **no onClick handlers** in Phase 1.

---

### 6.8 Conversations (`src/app/pages/Conversations.tsx`)

**Route:** `/conversations`  
**Purpose:** Real-time-style messaging between clients and lawyers.

#### Auth gate

```tsx
useEffect(() => {
  if (!isAuthenticated) navigate("/login");
}, [isAuthenticated, navigate]);
```

Returns `null` while redirecting if auth/userType missing.

#### Role-adaptive contacts

Contacts list changes based on `userType`:

| Viewer | Sees |
|--------|------|
| `client` | Assigned lawyers (Adv. Amit Patel, Adv. Priya Sharma) |
| `lawyer` | Active clients (Rajesh Kumar, Anita Desai) |

#### Chat history architecture

```tsx
const [chatHistories, setChatHistories] = useState<Record<number, Message[]>>({
  1: [ /* messages for contact 1 */ ],
  2: [ /* messages for contact 2 */ ],
});
const currentMessages = chatHistories[activeContact.id] || [];
```

**Sending a message:**

```tsx
const newMessage: Message = {
  id: Date.now(),
  text: messageInput,
  senderRole: userType,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};
setChatHistories(prev => ({
  ...prev,
  [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
}));
```

#### Auto-scroll

`messagesEndRef` + `scrollIntoView({ behavior: "smooth" })` on message change and contact switch.

#### Layout

- **Left sidebar (1/3):** Contact list with search input, unread badges, online indicators
- **Right pane (2/3):** Chat header, encryption banner, messages, input form
- **Mobile:** Right pane hidden (`hidden md:flex`) — mobile chat view not fully implemented

---

## 7. Shared Components

### 7.1 Navbar (`src/app/components/Navbar.tsx`)

#### Props interface

```tsx
interface NavbarProps {
  isAuthenticated?: boolean;          // default: false
  userType?: "client" | "lawyer" | "admin" | null;  // default: null
  onLogout?: () => void;
}
```

#### Key behaviors

| Behavior | Implementation |
|----------|----------------|
| Sticky header | `sticky top-0 z-40` |
| Logo click | `handleNavClick("home")` — role-aware destination |
| Mobile menu | `mobileMenuOpen` state; hamburger toggle |
| Profile routing | client→`/client`, lawyer→`/lawyer/dashboard`, admin→`/admin` |
| Lawyer nav simplification | Hides Services & How It Works when lawyer logged in |

#### Desktop vs mobile

Desktop: horizontal nav + auth buttons in single flex row.  
Mobile: collapsible vertical menu below header bar.

---

### 7.2 ChatbotWidget (`src/app/components/ChatbotWidget.tsx`)

#### State

```tsx
const [isOpen, setIsOpen] = useState(false);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([
  { text: "Hello! How can I help...", sender: "bot" }
]);
```

#### Bot reply simulation

After user sends message, `setTimeout(..., 1000)` appends canned response about expert follow-up.

#### Positioning

`fixed bottom-6 right-6 z-50` — may overlap footer content on small screens.

**Used on:** `Home.tsx`, `LawyerLanding.tsx`

---

### 7.3 ImageWithFallback (`src/app/components/figma/ImageWithFallback.tsx`)

Figma export utility wrapping `<img>` with error fallback to embedded SVG placeholder. Preserves `data-original-url` attribute on failure for debugging.

---

## 8. UI Component Library (shadcn/ui)

### 8.1 Location

`src/app/components/ui/` — approximately 40 components.

### 8.2 Utility function

**File:** `src/app/components/ui/utils.ts`

```tsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Used throughout shadcn components to merge Tailwind classes without conflicts.

### 8.3 Components actively used in Phase 1

| Component | Used in |
|-----------|---------|
| `input-otp` (InputOTP, InputOTPGroup, InputOTPSlot) | Login, SignUp |

### 8.4 Available but unused (ready for Phase 2)

Includes: `button`, `dialog`, `form`, `tabs`, `table`, `chart`, `sidebar`, `calendar`, `select`, `dropdown-menu`, `alert-dialog`, `sheet`, `drawer`, `sonner` (toast), and more.

These were bundled with the Figma Make export and can be imported as needed:

```tsx
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/components/ui/dialog";
```

### 8.5 Radix UI foundation

shadcn components wrap `@radix-ui/react-*` primitives for accessibility:
- Focus trapping in dialogs
- Keyboard navigation in menus
- ARIA attributes on form controls

---

## 9. Styling & Design Tokens

### 9.1 Style import chain

```
src/styles/index.css
  ├── ./fonts.css      ⚠️ FILE MISSING — may cause build warning
  ├── ./tailwind.css   → Tailwind v4 + tw-animate-css
  └── ./theme.css      → CSS variables + @layer base
```

### 9.2 Application color palette (de facto)

Most pages bypass shadcn tokens and use Tailwind palette directly:

| Token | Tailwind class | Usage |
|-------|----------------|-------|
| Page background | `bg-slate-950` | Body, main sections |
| Card background | `bg-slate-900` | Panels, forms |
| Elevated surface | `bg-slate-800` | Inputs, table hover |
| Primary accent | `bg-amber-500`, `text-amber-500` | CTAs, active tabs, links |
| Success | `text-emerald-500`, `bg-emerald-500` | Verified, online, chatbot |
| Error | `text-red-500` | Form errors, destructive |
| Muted text | `text-slate-400`, `text-slate-500` | Descriptions, labels |

### 9.3 shadcn theme tokens (`theme.css`)

Defines semantic variables for components that use `@apply bg-background` etc.:

- `--background`, `--foreground`
- `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- `--border`, `--ring`, `--radius`
- Chart colors `--chart-1` through `--chart-5`
- Sidebar-specific tokens

Dark mode class `.dark` overrides exist but **no theme toggle** is implemented in the app.

### 9.4 Typography

Base font size: `16px` (`--font-size` in `:root`).

Marketing headings use large Tailwind sizes (`text-5xl`, `text-6xl`) overriding `@layer base` h1/h2 defaults.

### 9.5 Responsive breakpoints

Standard Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

Primary layout shift occurs at `md:` (e.g., grid columns, mobile menu toggle).

### 9.6 Animation

- `tw-animate-css` imported in tailwind.css
- Home form uses `animate-in fade-in slide-in-from-top-2` on sub-service dropdown
- Loading states use `animate-pulse` and `animate-spin` (Loader2 icon)

---

## 10. Service Taxonomy (Consultation Form)

Defined in `Home.tsx` as `subServicesMap`:

| Primary service (`service` value) | Sub-services |
|-----------------------------------|--------------|
| `divorce` | Mutual Consent, Contested, Child Custody, Alimony |
| `family` | Prenuptial/Postnuptial, DV Act, Restitution, Succession/Wills |
| `traffic` | E-Challan, DUI/DWI, License Suspension, MACT |
| `property` | RERA, Title Disputes, Landlord-Tenant, Illegal Possession |
| `consumer` | Defective Products, E-commerce Fraud, Medical Negligence, Insurance |
| `arbitration` | Commercial Arbitration, Mediation, Conciliation, Corporate Disputes |
| `other` | General Consultation, Criminal Defense, Civil Suit, Startup/Corporate |

**UX rule:** When primary service changes, `subService` is cleared:

```tsx
if (name === "service") {
  setFormData({ ...formData, service: value, subService: "" });
}
```

Sub-service dropdown renders conditionally and is marked `required` when visible.

---

## 11. State Management Patterns

### 11.1 Summary table

| Pattern | Where | Lifetime |
|---------|-------|----------|
| `useState` | All pages | Component mount |
| `useEffect` | Data fetch simulation, timers, scroll, auth redirect | — |
| `useRef` | Conversations scroll anchor | Persistent across renders |
| `useNavigate` / `useLocation` | Navigation, scroll state | — |
| `localStorage` | Auth flags | Browser persistence |

### 11.2 Loading state pattern (dashboards)

Consistent skeleton UI pattern:

```tsx
{isLoading ? (
  <div className="animate-pulse ..." />
) : (
  <ActualContent />
)}
```

### 11.3 Tab state pattern

```tsx
const [activeTab, setActiveTab] = useState<"cases" | "lawyers">("cases");
// Conditional render based on activeTab
```

Used in: ClientDashboard, LawyerDashboard, AdminDashboard.

---

## 12. Build Tooling & Vite Configuration

### 12.1 `vite.config.ts` breakdown

```ts
export default defineConfig({
  plugins: [
    figmaAssetResolver(),  // Custom: figma:asset/* → src/assets/*
    react(),               // @vitejs/plugin-react
    tailwindcss(),         // @tailwindcss/vite
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
});
```

### 12.2 Figma asset resolver

Allows imports like:

```tsx
import logo from 'figma:asset/logo.png';
```

Resolved to absolute path `src/assets/logo.png`. The `src/assets/` directory currently contains only `.gitkeep`.

### 12.3 Build output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

All routes rely on client-side JS — host must configure SPA fallback.

### 12.4 Package manager notes

- `package-lock.json` present (npm)
- `pnpm-workspace.yaml` present with vite version override
- Either npm or pnpm works; avoid mixing lockfiles

---

## 13. TypeScript Configuration

**File:** `tsconfig.json`

| Option | Value | Effect |
|--------|-------|--------|
| `strict` | `true` | Full strict type checking |
| `jsx` | `react-jsx` | Automatic JSX runtime |
| `moduleResolution` | `bundler` | Vite-compatible resolution |
| `noEmit` | `true` | Type-check only; Vite emits JS |
| `paths` | `@/* → ./src/*` | Path alias (mirrors Vite) |
| `noUnusedLocals` | `false` | Allows unused imports (Figma export leniency) |

**Note:** Path alias `@/*` works in Vite but IDE may need `tsconfig` paths for autocomplete — already configured.

---

## 14. Phase 2 Backend Integration Guide

### 14.1 TODO markers in codebase

Search for `TODO: Phase 2` or `TODO: PHASE 2` to find all integration points:

| File | Integration point |
|------|-------------------|
| `Login.tsx` | Credential verification API, OTP verify, session tokens |
| `SignUp.tsx` | User creation, OTP send/verify, account activation |
| `ClientDashboard.tsx` | `GET /api/client/profile`, cases, lawyers |
| `LawyerDashboard.tsx` | `GET /api/lawyer/profile`, clients, cases |
| `LawyerLanding.tsx` | Document upload to storage, verification status polling |
| `AdminDashboard.tsx` | Stats, lawyer approvals, user management APIs |
| `Home.tsx` | `POST /api/consultations` |

### 14.2 Recommended API structure

```
/api
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /verify-otp
│   ├── POST /resend-otp
│   └── POST /logout
├── /client
│   ├── GET /profile
│   ├── GET /cases
│   └── GET /lawyers
├── /lawyer
│   ├── GET /profile
│   ├── GET /clients
│   ├── GET /cases
│   └── POST /verify-documents
├── /admin
│   ├── GET /stats
│   ├── GET /lawyers
│   ├── PATCH /lawyers/:id/approve
│   └── GET /users
├── /consultations
│   └── POST /
└── /messages
    ├── GET /conversations
    └── POST /conversations/:id/messages
```

### 14.3 Suggested frontend additions

1. **`src/app/lib/api.ts`** — Axios/fetch client with base URL from `import.meta.env.VITE_API_BASE_URL`
2. **`src/app/hooks/useAuth.ts`** — Session hook wrapping context
3. **`src/app/components/ProtectedRoute.tsx`** — Role-based route wrapper
4. **React Query** — Cache dashboard data, optimistic message sends
5. **WebSocket client** — Real-time Conversations updates

### 14.4 Environment variables template

```env
# .env.local (not committed)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
```

Access in code: `import.meta.env.VITE_API_BASE_URL`

---

## 15. Deployment & Hosting

### 15.1 Build command

```bash
npm run build
```

### 15.2 Static hosting checklist

- [ ] Set build output directory to `dist`
- [ ] Configure SPA rewrite: all paths → `index.html`
- [ ] Enable HTTPS
- [ ] Set cache headers for hashed assets (long) vs index.html (short/no-cache)
- [ ] Remove or update `robots` meta if public indexing desired

### 15.3 Subpath deployment

If not deploying at domain root, set in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-subpath/',
  // ...
});
```

And configure React Router `basename` accordingly.

---

## 16. File Inventory

### 16.1 Pages (8 files)

| File | Lines (approx.) | Complexity |
|------|-----------------|------------|
| `Home.tsx` | 820 | High — full marketing site |
| `LawyerLanding.tsx` | 495 | High — verification FSM |
| `LawyerDashboard.tsx` | 388 | Medium |
| `ClientDashboard.tsx` | 290 | Medium |
| `Conversations.tsx` | 301 | Medium |
| `AdminDashboard.tsx` | 301 | Medium |
| `SignUp.tsx` | 408 | Medium |
| `Login.tsx` | 314 | Medium |

### 16.2 Core app files

| File | Responsibility |
|------|----------------|
| `App.tsx` | Router provider |
| `routes.tsx` | Route table |
| `main.tsx` | DOM mount |

### 16.3 Configuration files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Build config |
| `tsconfig.json` | TypeScript |
| `tsconfig.node.json` | TS for Vite config |
| `postcss.config.mjs` | PostCSS (Tailwind) |
| `package.json` | Dependencies |
| `.gitignore` | Ignores node_modules, dist, .env |

---

## 17. Troubleshooting & FAQ

### Q: Dev server shows error importing `fonts.css`

**A:** `src/styles/index.css` references `./fonts.css` which does not exist. Either create an empty `src/styles/fonts.css` or remove the import line.

### Q: I signed up but Navbar shows "Log In"

**A:** SignUp navigates to dashboard without setting `localStorage` auth keys. Log in via `/login` or patch SignUp to set session after OTP.

### Q: How do I test lawyer verification flow?

**A:** In `LawyerLanding.tsx`, change initial state:
```tsx
useState<VerificationStatus>("unverified")
```

### Q: OTP doesn't validate — is it broken?

**A:** By design in Phase 1. Any 6-digit code succeeds.

### Q: How do I access admin?

**A:** Navigate directly to `http://localhost:5173/admin`.

### Q: Messages disappear on refresh

**A:** Chat history is in-memory React state only. Phase 2 needs persistence.

### Q: Images not loading from Figma exports

**A:** Place assets in `src/assets/` and import via `figma:asset/filename.ext` or standard `/src/assets/` paths.

### Q: Which package manager should I use?

**A:** npm is safest given `package-lock.json` exists. pnpm works if preferred.

---

## Appendix A: Dependency categories

| Category | Packages |
|----------|----------|
| Core | react, react-dom, react-router |
| Build | vite, @vitejs/plugin-react, typescript |
| Styling | tailwindcss, @tailwindcss/vite, tw-animate-css |
| UI primitives | @radix-ui/react-* (20+ packages) |
| UI utilities | clsx, tailwind-merge, class-variance-authority |
| Icons | lucide-react, @mui/icons-material |
| Forms | react-hook-form, input-otp |
| Charts | recharts |
| Animation | motion |
| DnD | react-dnd, react-dnd-html5-backend |
| Carousel | embla-carousel-react, react-slick |
| Toast | sonner |
| Drawer | vaul |
| Command palette | cmdk |
| Date | date-fns, react-day-picker |
| Themes | next-themes (installed, unused) |
| Confetti | canvas-confetti |

---

## Appendix B: Glossary

| Term | Meaning |
|------|---------|
| **NyayMitra** | Brand name; Hindi for "friend of justice" |
| **Bar Council** | Indian statutory body regulating legal practitioners |
| **MACT** | Motor Accident Claims Tribunal |
| **RERA** | Real Estate Regulatory Authority |
| **OTP** | One-Time Password (SMS verification) |
| **shadcn/ui** | Copy-paste component collection built on Radix + Tailwind |
| **Figma Make** | Figma feature exporting designs to code |

---

*End of technical documentation.*
