export default function StatusBadge({ status }) {
  const key = (status || '').toLowerCase();
  const map = {
    reconciled: 'reconciled',
    pending: 'pending',
    variance: 'variance',
    online: 'online',
    dispensing: 'dispensing',
    offline: 'offline',
    open: 'online',
    matched: 'reconciled',
    on_duty: 'online',
  };
  const cls = map[key] || 'pending';
  return <span className={`badge ${cls}`}>{status}</span>;
}
