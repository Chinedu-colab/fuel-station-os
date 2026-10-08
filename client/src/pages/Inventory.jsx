import { useEffect, useState } from 'react';
import { api, formatLitres } from '../lib/api';

export default function Inventory() {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.inventory().then(setTanks).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="empty-state">Loading tank inventory…</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Operations</div>
        <h1 className="page-title">Tank inventory</h1>
        <p className="page-sub">Opening stock, deliveries, dispensing and variance by product</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {tanks.map((t) => (
          <div key={t.id} className="card card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.product}</div>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: t.fillPercent < 40 ? 'var(--warning)' : 'var(--success)',
                }}
              >
                {t.fillPercent}%
              </div>
            </div>

            <div className="progress-bar" style={{ margin: '14px 0 18px', height: 10 }}>
              <div
                className={
                  t.product === 'PMS' ? 'fill-pms' : t.product === 'AGO' ? 'fill-ago' : 'fill-dpk'
                }
                style={{ width: `${Math.min(t.fillPercent, 100)}%` }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 16px',
                fontSize: 13,
              }}
            >
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Capacity</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(t.capacity)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Opening</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(t.openingStock)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Deliveries</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(t.deliveries)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Dispensed</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(t.dispensing)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Expected close</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {formatLitres(t.expectedClosing)}
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Actual / Variance</div>
                <div className="mono" style={{ fontWeight: 600 }}>
                  {t.actualClosing != null ? formatLitres(t.actualClosing) : '—'}{' '}
                  <span style={{ color: t.variance < 0 ? 'var(--danger)' : 'var(--success)' }}>
                    ({t.variance > 0 ? '+' : ''}
                    {t.variance} L)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
