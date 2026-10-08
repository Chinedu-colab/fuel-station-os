import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { api, formatNaira } from '../lib/api';

export default function Reports() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.summary().then(setSummary).finally(() => setLoading(false));
  }, []);

  if (loading || !summary) return <div className="empty-state">Loading reports…</div>;

  const productData = Object.entries(summary.productSales).map(([name, value]) => ({
    name,
    sales: value,
  }));

  const paymentData = Object.entries(summary.paymentMix).map(([name, value]) => ({
    name,
    amount: value,
  }));

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Intelligence</div>
        <h1 className="page-title">Reports</h1>
        <p className="page-sub">Daily sales by product and payment channel</p>
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Sales by product</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ebe8e0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatNaira(v)} />
                <Bar dataKey="sales" fill="#2d6a4f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card card-pad">
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Payment channels</div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ebe8e0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => formatNaira(v)} />
                <Bar dataKey="amount" fill="#c4a35a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="stat-grid" style={{ marginTop: 20 }}>
        <div className="stat-card">
          <div className="label">Gross sales</div>
          <div className="value">{formatNaira(summary.sales)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Litres sold</div>
          <div className="value">{summary.litresSold} L</div>
        </div>
        <div className="stat-card">
          <div className="label">Pumps online</div>
          <div className="value">
            {summary.pumpsOnline}/{summary.pumpsTotal}
          </div>
        </div>
        <div className="stat-card">
          <div className="label">Open variance</div>
          <div className="value">{formatNaira(Math.abs(summary.variance))}</div>
        </div>
      </div>
    </div>
  );
}
