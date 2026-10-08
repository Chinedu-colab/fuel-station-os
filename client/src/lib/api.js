const BASE = '/api';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export const api = {
  health: () => get('/healthz'),
  summary: () => get('/dashboard/summary'),
  activity: () => get('/activity'),
  pumps: () => get('/pumps'),
  transactions: () => get('/transactions'),
  inventory: () => get('/inventory'),
  shifts: () => get('/shifts'),
  reconciliation: () => get('/reconciliation'),
  attendants: () => get('/attendants'),
  audit: () => get('/audit'),
  station: () => get('/station'),
};

export function formatNaira(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return (
    '₦' +
    Number(n).toLocaleString('en-NG', {
      maximumFractionDigits: 0,
    })
  );
}

export function formatLitres(n) {
  if (n == null) return '—';
  return Number(n).toLocaleString('en-NG', { maximumFractionDigits: 1 }) + ' L';
}

export function initials(name) {
  if (!name) return '??';
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function timeOnly(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export function relativeSync(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
