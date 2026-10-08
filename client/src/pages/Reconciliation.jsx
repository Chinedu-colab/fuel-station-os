import { useEffect, useState } from 'react';
import { api, formatNaira } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

export default function Reconciliation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.reconciliation().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading || !data) return <div className="empty-state">Loading reconciliation…</div>;

  const channels = [
    { label: 'Moniepoint', value: data.moniepoint },
    { label: 'POS', value: data.pos },
    { label: 'Cash', value: data.cash },
    { label: 'Transfer', value: data.transfer },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Operations</div>
        <h1 className="page-title">Reconciliation</h1>
        <p className="page-sub">{data.period}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Expected (pump totalizers)</div>
          <div className="value">{formatNaira(data.expected)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Actual (settled)</div>
          <div className="value">{formatNaira(data.actual)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Variance</div>
          <div className="value" style={{ color: data.variance === 0 ? 'var(--success)' : 'var(--danger)' }}>
            {formatNaira(data.variance)}
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Status</div>
          <div style={{ marginTop: 8 }}>
            <StatusBadge status={data.status} />
          </div>
        </div>
      </div>

      <div className="card card-pad">
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Settlement channels</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {channels.map((c) => (
            <div
              key={c.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: '#faf9f6',
                borderRadius: 10,
              }}
            >
              <span style={{ fontWeight: 600 }}>{c.label}</span>
              <span className="amount">{formatNaira(c.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
