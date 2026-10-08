import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Zap, DollarSign, Droplets, Fuel, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { api, formatNaira, formatLitres, initials, timeOnly } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

const PAY_COLORS = {
  MONIEPOINT: '#f0a500',
  CASH: '#2d6a4f',
  POS: '#1a5a7a',
  TRANSFER: '#b42318',
};

export default function Overview() {
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [s, a] = await Promise.all([api.summary(), api.activity()]);
      setSummary(s);
      setActivity(a);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  if (loading && !summary) {
    return <div className="empty-state">Loading station pulse…</div>;
  }

  const paymentData = summary
    ? Object.entries(summary.paymentMix).map(([name, value]) => ({ name, value }))
    : [];

  const productEntries = summary ? Object.entries(summary.productSales) : [];
  const maxProduct = Math.max(...productEntries.map(([, v]) => v), 1);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-eyebrow">Station Pulse</div>
          <h1 className="page-title">Good morning, operator.</h1>
          <p className="page-sub">Here is the live operating picture for today.</p>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          📅 Today, {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </div>
      </div>

      <div className="status-banner">
        <div className="left">
          <div className="icon">
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>Station is operating normally</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              Telemetry synced {summary ? new Date(summary.lastSyncAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '—'} · all connected equipment responding
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={load}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">
            Today&apos;s sales <DollarSign size={16} style={{ opacity: 0.4 }} />
          </div>
          <div className="value">{formatNaira(summary?.sales)}</div>
          <div className="hint up">↑ vs yesterday 8.4%</div>
        </div>
        <div className="stat-card">
          <div className="label">
            Litres dispensed <Droplets size={16} style={{ opacity: 0.4 }} />
          </div>
          <div className="value">{formatLitres(summary?.litresSold)}</div>
          <div className="hint">Across all products</div>
        </div>
        <div className="stat-card">
          <div className="label">
            Pumps online <Fuel size={16} style={{ opacity: 0.4 }} />
          </div>
          <div className="value">
            {summary?.pumpsOnline}/{summary?.pumpsTotal}
          </div>
          <div className="hint">Network availability</div>
        </div>
        <div className="stat-card">
          <div className="label">
            Open variance <AlertCircle size={16} style={{ opacity: 0.4 }} />
          </div>
          <div className="value">{formatNaira(Math.abs(summary?.variance || 0))}</div>
          <div className="hint">Needs review</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-pad" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 700 }}>Recent activity</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Live dispensing feed</div>
            </div>
            <Link to="/transactions" style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
              View all ›
            </Link>
          </div>
          <table className="table">
            <tbody>
              {activity.map((row) => (
                <tr key={row.id}>
                  <td className="mono" style={{ color: 'var(--text-muted)', width: 56 }}>
                    {timeOnly(row.time)}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>
                      {row.pump} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{row.nozzle}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.product}</div>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {row.litres} L × ₦{row.price}
                    </div>
                  </td>
                  <td>
                    <div className="att-chip">
                      <div className="att-avatar">{initials(row.attendant)}</div>
                      <span>{row.attendant}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="amount">{formatNaira(row.amount)}</div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Payment mix</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Today&apos;s settled sales</div>
              </div>
            </div>
            <div className="donut-wrap">
              <div style={{ width: 140, height: 140, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={64}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {paymentData.map((entry) => (
                        <Cell key={entry.name} fill={PAY_COLORS[entry.name] || '#888'} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <div className="amount" style={{ fontSize: 14 }}>
                    {formatNaira(summary?.sales)}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>gross sales</div>
                </div>
              </div>
              <div className="legend">
                {paymentData.map((p) => (
                  <div key={p.name} className="legend-item">
                    <span className="legend-dot" style={{ background: PAY_COLORS[p.name] }} />
                    <span style={{ flex: 1 }}>{p.name}</span>
                    <span className="amount">{formatNaira(p.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Product performance</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sales by product</div>
              </div>
              <Link to="/reports" style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
                Report ›
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {productEntries.map(([product, value]) => (
                <div key={product}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{product}</span>
                    <span className="amount">{formatNaira(value)}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={
                        product === 'PMS' ? 'fill-pms' : product === 'AGO' ? 'fill-ago' : 'fill-dpk'
                      }
                      style={{ width: `${(value / maxProduct) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
