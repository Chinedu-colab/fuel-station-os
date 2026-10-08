import { useEffect, useState } from 'react';
import { Fuel } from 'lucide-react';
import { api, formatLitres, relativeSync } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

export default function Pumps() {
  const [pumps, setPumps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.pumps().then(setPumps).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="empty-state">Loading pumps…</div>;

  const online = pumps.filter((p) => p.status !== 'OFFLINE').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Control Room</div>
        <h1 className="page-title">Pumps & nozzles</h1>
        <p className="page-sub">
          {online}/{pumps.length} controllers online · ExEn read-only telemetry
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {pumps.map((p) => (
          <div key={p.id} className="card card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: p.status === 'OFFLINE' ? '#f0f0f0' : '#e8f5ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: p.status === 'OFFLINE' ? '#888' : 'var(--success)',
                  }}
                >
                  <Fuel size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{p.model}</div>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div
              style={{
                marginTop: 18,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                fontSize: 13,
              }}
            >
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>Nozzles</div>
                <div style={{ fontWeight: 600 }}>{p.nozzles}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>Totalizer</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(p.totalizerLitres)}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>Last seen</div>
                <div className="mono">{relativeSync(p.lastSeenAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
