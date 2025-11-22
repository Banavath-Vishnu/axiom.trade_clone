Axiom Trade — Token Discovery Table (Pixel-Perfect Replica)

A pixel-perfect, high-performance replica of Axiom Trade’s Token Discovery (Pulse) table, built using Next.js 14, TypeScript, Tailwind, Redux Toolkit, React Query, and Radix UI/shadcn.
Includes real-time mock price updates, smooth transitions, loading states, and complete responsive behaviour down to 320px.

🚀 Live Demo & Video

Vercel Deployment: <your vercel url>
YouTube Demo (1–2 min): <your video link>

📦 Tech Stack

Next.js 14 – App Router

TypeScript (strict mode)

Tailwind CSS

Redux Toolkit (complex state)

React Query (data + caching)

Radix UI + shadcn/ui (accessible UI primitives)

Playwright (E2E + visual regression)

ESLint + Prettier

🎯 Core Features
UI / Interactions

All token columns: New Pairs, Final Stretch, Migrated

Pixel-perfect recreation (≤2px variance)

Sorting (multi-column), hover effects, click actions

Popover, tooltip, modal using accessible Radix primitives

Smooth micro-interactions and no layout shifts

Real-Time Updates

Mock WebSocket server

Live price updates with green/red color transitions

Stable, memoized rows (no re-renders / jank)

Loading & Error States

Skeleton loading

Shimmer placeholders

Progressive row mounting

Error boundaries and retry logic

Performance

≥90 Lighthouse on mobile & desktop

Memoized components

Partial hydration and dynamic imports

No unnecessary re-renders

<100ms interaction latency

Responsive

Fully responsive down to 320px

Collapsed mobile table layout

Auto-layout screenshots included in /assets/screenshots

📁 Project Structure (Atomic Architecture)
src/
  app/
    pulse/
      page.tsx
  components/
    ui/
    table/
    popovers/
    modals/
    skeletons/
  hooks/
  store/
  lib/
  styles/
tests/
  unit/
  e2e/
  visual/
assets/
  screenshots/
  reports/


Atoms → Molecules → Organisms

DRY, reusable, documented, strongly typed components

🧪 Testing
Unit Tests

React Testing Library + Jest

E2E Tests

Playwright (sorting, modal interactions, responsive behaviour)

Visual Regression

Playwright screenshot diff tests

≤2px tolerance

Baseline images included

📈 Lighthouse Performance

90+ score on Performance, Accessibility, Best Practices, SEO

Reports available in /assets/reports

🛠️ Getting Started
Install
pnpm install

Development
pnpm dev

Build
pnpm build
pnpm start

Run Tests
pnpm test
pnpm test:e2e
pnpm test:visual

📦 Deployment (Vercel)

Connect GitHub repo

Build command: pnpm build

Output directory: .next

📌 Submission Checklist

 GitHub Repo (public, clean commits)

 Vercel Deployment URL added to README

 Public YouTube demo (1–2 min)

 Responsive snapshots added to /assets/screenshots

 Visual regression baseline included

 Lighthouse ≥ 90 (mobile + desktop)

 All interactions + real-time updates working

📄 License

MIT — free to use, modify, and distribute.
