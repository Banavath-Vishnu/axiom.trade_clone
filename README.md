# Axiom Trade – Token Discovery Table (Frontend Assignment)

A high‑performance, pixel‑accurate replica of **Axiom Trade’s Token Discovery (Pulse) table**, built using **Next.js 14**, **TypeScript**, **Tailwind**, **Redux Toolkit**, and **React Query**.  
The project includes real‑time price updates, smooth UI interactions, loading states, and complete responsiveness down to **320px**.

---

## 🚀 Live Demo & Video  
**Vercel Deployment:** <your-vercel-url>  
**YouTube Demo (1–2 min):** <your-youtube-link>

---

## 🧰 Tech Stack  
- **Next.js 14 (App Router)**  
- **TypeScript – strict mode**  
- **Tailwind CSS**  
- **Redux Toolkit** (global + complex state)  
- **React Query** (data fetching + caching)  
- **Radix UI & shadcn/ui** (popover, tooltip, modal)  
- **Playwright** (E2E + visual regression)  
- **ESLint + Prettier**

---

## ⭐ Features

### 🔹 Pixel‑Perfect UI  
- Exact replica of Axiom Trade’s table (≤ 2 px variance).  
- All columns implemented: **New Pairs**, **Final Stretch**, **Migrated**.  
- Accurate spacing, shadows, typography, interactions.

### 🔹 Interactive Components  
- Sorting (ascending/descending).  
- Hover + active states with transitions.  
- Tooltips, popovers, and modals (Radix primitives).  
- Row click interactions.

### 🔹 Real‑Time Functionality  
- Mock WebSocket server for streaming price updates.  
- Price up/down color transitions (smooth, non‑blocking).  
- Memoized rows: no unnecessary renders.

### 🔹 Loading & Error Handling  
- Skeleton + shimmer loaders.  
- Progressive loading experience.  
- Error boundaries + retry behaviour.

### 🔹 Performance Optimized  
- Lighthouse score **90+** (mobile + desktop).  
- <100ms interaction latency.  
- Memoized components + efficient renders.  
- Dynamic imports for heavy UI parts.

### 🔹 Responsive (320px → Desktop)  
- Mobile‑friendly condensed layout.  
- Auto‑layout screenshots stored in `/assets/screenshots`.

---

## 📂 Project Structure

