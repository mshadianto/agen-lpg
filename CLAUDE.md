# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Agen LPG** — a React application for managing an LPG gas distribution agency in Indonesia. Covers the full supply chain from agen (distributor) to pangkalan (retail outlets) to end consumers. The UI is entirely in Indonesian (Bahasa Indonesia).

## Build & Run

```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Architecture

Vite + React 18 project. No external UI libraries — all charts are pure SVG, all styling is inline with CSS custom properties for theming.

### Directory structure

```
src/
  main.jsx                    # ReactDOM entry
  App.jsx                     # Root component — composes layout, pages, modals
  constants/                  # Static data and config
    products.js, customers.js, pangkalan.js, status.js,
    roles.js, het.js, payment.js, driver.js, sales.js
  utils/
    format.js                 # fmt, fmtRp, fmtDate, pct, clamp
    analytics.js              # linReg, buildTimeSeries, buildDayLabels
    generators.js             # genOrders, genDist, genNotifications, genPayments
  hooks/
    useAppState.js            # Central state + all handlers (orders, distribution, HET checks)
    useAnalytics.js           # Computed analytics: predictions, forecasts, anomalies, segmentation
  components/
    icons/IconMap.jsx          # SVG icon system (I map + Ic component)
    charts/                    # Spark, AreaChart, Donut, HeatMap
    ui/                        # Badge, Modal, Toast, Stars, KpiCard, StatCard, PageOverlay, ScrollOverlay
    forms/                     # OrderForm, ProdForm, CustForm, RestockForm, PkForm, DistForm, PayLinkGen
    layout/                    # Sidebar, Topbar, RolePicker, DetailPanel
  pages/                       # One file per page/view
    Dashboard, Orders, Stock, Customers, Pangkalan, Delivery, Finance,
    AnalyticsPage, HetCompliance, PaymentGateway, Routes, Reconciliation,
    SalesLeads, MarketMonitoring, CompliancePage, Consumers
  styles/
    global.css                 # Fonts, animations, scrollbar
    theme.js                   # Dark/light CSS variable objects
```

### State management

All state lives in `useAppState` hook (local React state, no external store). `useAnalytics` derives computed values (time series, predictions, segmentation) via `useMemo`. Data is randomly generated on mount for demo purposes.

### Page types

- **Inline pages** (Dashboard, Orders, Stock, Customers, Pangkalan, Delivery, Finance, Analytics) render inside the main content area
- **Overlay pages** (Consumers, Routes, Reconciliation, SalesLeads, Market, Compliance, HET, Payment) render as full-screen overlays using `PageOverlay` or `ScrollOverlay`

### Role-based navigation

Four roles: pangkalan, driver, sales, owner. The `nav` array in `useAppState` filters visible pages per role. Role selection happens via `RolePicker`.

### Domain concepts

- **HET (Harga Eceran Tertinggi)** — government-mandated max retail price. Compliance engine flags violations and maintains audit trail.
- **Pangkalan** — retail distribution points with quotas, ratings, stock tracking.
- **Distribution** — dispatching cylinders from agen warehouse to pangkalan.
- **Reconciliation** — driver-level tracking of sent/delivered/returned cylinders.
- **Payment Gateway** — simulated multi-provider payment (QRIS, VA, e-wallet, COD) with fee calculations.

### Styling

Inline `style={{}}` throughout. Theme toggling via CSS custom properties (`--bg`, `--card`, `--border`, `--text`, `--text-dim`, etc.) set on root div. Font: DM Sans + DM Mono.

### Legacy file

`agen-lpg.jsx` in the root is the original monolithic version (1628 lines). The modular `src/` structure is the canonical source.
