import { useEffect, useState } from 'react';
import { api, formatNaira, initials, timeOnly } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

export default function Transactions() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.transactions().then(setRows).finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === 'ALL' ? rows : rows.filter((r) => r.status === filter);

  if (loading) return <div className="empty-state">Loading transactions…</div>;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="page-eyebrow">Control Room</div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-sub">{rows.length} records · live dispensing ledger</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['ALL', 'RECONCILED', 'PENDING', 'VARIANCE'].map((f) => (
            <button
              key={f}
              type="button"
              className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'ALL' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>ID</th>
              <th>Pump / Nozzle</th>
              <th>Product</th>
              <th>Litres</th>
              <th>Attendant</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Sync</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td className="mono">{timeOnly(t.createdAt)}</td>
                <td className="mono" style={{ fontSize: 12 }}>
                  {t.id}
                </td>
                <td>
                  <strong>{t.pump}</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>{t.nozzle}</span>
                </td>
                <td>
                  <strong>{t.product}</strong>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    ₦{t.unitPrice}/L
                  </div>
                </td>
                <td className="mono">{t.litres}</td>
                <td>
                  <div className="att-chip">
                    <div className="att-avatar">{initials(t.attendant)}</div>
                    {t.attendant}
                  </div>
                </td>
                <td>{t.payment}</td>
                <td className="amount">{formatNaira(t.amount)}</td>
                <td>
                  <StatusBadge status={t.status} />
                </td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.syncStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
