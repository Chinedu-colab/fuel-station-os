import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  pumps,
  inventory,
  shifts,
  attendants,
  transactions,
  getDashboardSummary,
  getActivity,
  getReconciliation,
  auditTrail,
  station,
} from './data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/dashboard/summary', (_req, res) => {
  res.json(getDashboardSummary());
});

app.get('/api/activity', (_req, res) => {
  res.json(getActivity());
});

app.get('/api/pumps', (_req, res) => {
  res.json(pumps);
});

app.get('/api/transactions', (_req, res) => {
  res.json(transactions);
});

app.get('/api/inventory', (_req, res) => {
  res.json(inventory);
});

app.get('/api/shifts', (_req, res) => {
  res.json(shifts);
});

app.get('/api/reconciliation', (_req, res) => {
  res.json(getReconciliation());
});

app.get('/api/attendants', (_req, res) => {
  res.json(attendants);
});

app.get('/api/audit', (_req, res) => {
  res.json(auditTrail);
});

app.get('/api/station', (_req, res) => {
  res.json(station);
});

// Production static serve
if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`FuelStation OS API running on http://localhost:${PORT}`);
});
