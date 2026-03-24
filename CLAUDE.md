# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Agen LPG** — a React application for managing an LPG gas distribution agency in Indonesia. Covers the full supply chain from agen (distributor) to pangkalan (retail outlets) to end consumers. UI in Bahasa Indonesia.

**Live demo:** https://mshadianto.github.io/agen-lpg/
**Repository:** https://github.com/mshadianto/agen-lpg

## Build & Run

```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Deployment

GitHub Pages via Actions workflow (`.github/workflows/deploy.yml`). Auto-deploys on push to `main`. Vite `base` is set to `/agen-lpg/` for the GitHub Pages subpath.

## Architecture

Vite + React 18. Zero external UI/state libraries — charts are pure SVG, styling is inline with CSS custom properties for theming.

### Directory structure

```
src/
  main.jsx                    # ReactDOM entry point
  App.jsx                     # Root — composes layout, routing, pages, modals
  constants/                  # Static seed data and configuration
    products.js               # LPG product catalog (3kg, 5.5kg, 12kg, 50kg)
    customers.js              # Customer records
    pangkalan.js              # Retail outlet (pangkalan) data
    status.js                 # Order/distribution/pangkalan status maps
    roles.js                  # Role definitions and feature lists
    het.js                    # HET config and initial audit log
    payment.js                # Payment gateway providers (QRIS, VA, e-wallet, COD)
    driver.js                 # Driver routes and reconciliation seed data
    sales.js                  # Sales leads, consumers, compliance items
  utils/
    format.js                 # fmt, fmtRp, fmtDate, fmtTime, fmtDT, pct, clamp
    analytics.js              # linReg, buildTimeSeries, buildDayLabels
    generators.js             # genOrders, genDist, genNotifications, genPayments
  hooks/
    useAppState.js            # Central state + all handlers (CRUD, HET checks, distribution)
    useAnalytics.js           # Derived analytics: time series, predictions, anomalies, segmentation
  components/
    icons/IconMap.jsx          # SVG icon registry (I map) + Ic component
    charts/                    # Spark, AreaChart, Donut, HeatMap — all pure SVG
    ui/                        # Badge, Modal, Toast, Stars, KpiCard, StatCard, PageOverlay, ScrollOverlay
    forms/                     # OrderForm, ProdForm, CustForm, RestockForm, PkForm, DistForm, PayLinkGen, FormPrimitives
    layout/                    # Sidebar, Topbar, RolePicker, DetailPanel
  pages/                       # One component per page/view (16 total)
  styles/
    global.css                 # Google Fonts import, keyframe animations, scrollbar
    theme.js                   # Dark/light CSS variable objects (getTheme)
```

### State management

`useAppState` holds all application state and handlers in a single hook (React useState/useCallback). `useAnalytics` derives computed values (30-day time series, linear regression predictions, stock forecasts, anomaly detection, customer segmentation) via `useMemo`. No external store — all local state. Demo data is randomly generated on mount.

### Page routing

No router library. `page` state string determines which component renders. Two rendering patterns:
- **Inline pages** (Dashboard, Orders, Stock, Customers, Pangkalan, Delivery, Finance, Analytics) — render in the main content area beside the sidebar
- **Overlay pages** (Consumers, Routes, Reconciliation, SalesLeads, Market, Compliance, HET, Payment) — render as full-screen backdrop overlays via `PageOverlay` or `ScrollOverlay`

### Role-based access

Four roles: `pangkalan`, `driver`, `sales`, `owner`. Each role sees a filtered subset of nav items defined in the `nav` array inside `useAppState`. Role selection happens via `RolePicker` on initial load.

### Domain concepts

- **HET (Harga Eceran Tertinggi)** — government max retail price. Compliance engine in `useAppState` auto-flags violations on order/product creation and maintains an audit trail (`hetLog`).
- **Pangkalan** — retail sub-agent distribution points with monthly quotas (`qm`/`qu`), star ratings, per-product stock tracking.
- **Distribution** — dispatching LPG cylinders from agen warehouse to pangkalan, tracked through pending → dispatched → received workflow.
- **Reconciliation** — driver-level reconciliation of sent vs delivered vs returned cylinders including empty cylinder collection.
- **Payment Gateway** — simulated multi-provider payment processing (QRIS, VA BCA/Mandiri/BNI/BSI, GoPay, OVO, DANA, COD) with per-method fee calculation.

### Styling

All inline `style={{}}`. Theme toggle (dark/light) via CSS custom properties (`--bg`, `--card`, `--card2`, `--border`, `--text`, `--text-dim`, `--hover`, `--accent`, `--accent2`, `--shadow`, `--sidebar`, `--topbar`) set on the root div. Fonts: DM Sans (UI) + DM Mono (numbers).

### Legacy

`agen-lpg.jsx` in root is the original monolithic version (1628 lines). The modular `src/` structure is the canonical codebase.
