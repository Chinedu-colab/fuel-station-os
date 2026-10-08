# FuelStation OS — Operations Cockpit

A full rebuild of the Fuel Station operations dashboard (original: `fuel-station-os--genprosper.replit.app`).

## Features

- **Overview (Station Pulse)** — live KPIs, recent activity feed, payment mix donut, product performance bars
- **Pumps & nozzles** — controller status cards (ONLINE / DISPENSING / OFFLINE)
- **Transactions** — filterable ledger with reconciliation status
- **Shifts & closeout** — open shifts + attendant performance
- **Tank inventory** — capacity, stock, variance per product (PMS / AGO / DPK)
- **Reconciliation** — expected vs actual settlement by channel
- **Reports** — bar charts for product & payment mix
- **Audit trail** — system / operator action log
- **Settings** — station profile

Design language matches the original: dark green sidebar, cream canvas, status badges, ₦ formatting, Nigerian product codes.

## Stack

- **Frontend**: React 18 + Vite + React Router + Recharts + Lucide
- **Backend**: Express (mock APIs matching the original shapes)
- **Fonts**: Manrope + Space Mono

## Run locally

```bash
cd fuel-station-os
npm install
npm run dev
```

- API: http://localhost:3001  
- UI:  http://localhost:5173  

Or production build:

```bash
npm run build
NODE_ENV=production npm start
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/healthz` | Health check |
| GET | `/api/dashboard/summary` | Station KPIs + product/payment mix |
| GET | `/api/activity` | Recent dispensing feed |
| GET | `/api/pumps` | Pump controllers |
| GET | `/api/transactions` | Full transaction ledger |
| GET | `/api/inventory` | Tank inventory |
| GET | `/api/shifts` | Open shifts |
| GET | `/api/reconciliation` | Settlement reconciliation |
| GET | `/api/attendants` | Attendant performance |
| GET | `/api/audit` | Audit trail |

Data is deterministic mock data that mirrors the live demo station **Speaker Oil & Gas**.
