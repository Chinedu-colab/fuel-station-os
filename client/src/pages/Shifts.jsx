import { useEffect, useState } from 'react';
import { api, formatNaira, relativeSync } from '../lib/api';
import StatusBadge from '../components/StatusBadge';

export default function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [attendants, setAttendants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.shifts(), api.attendants()])
      .then(([s, a]) => {
        setShifts(s);
        setAttendants(a);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="empty-state">Loading shifts…</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Operations</div>
        <h1 className="page-title">Shifts & closeout</h1>
        <p className="page-sub">Open shifts and attendant performance for the current period</p>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {attendants.map((a) => (
          <div key={a.id} className="stat-card">
            <div className="label">
              {a.name}
              <StatusBadge status={a.status.replace('_', ' ')} />
            </div>
            <div className="value" style={{ fontSize: 20 }}>
              {formatNaira(a.sales)}
            </div>
            <div className="hint">
              {a.litres} L · {a.shift}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 8 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Shift</th>
              <th>Attendant</th>
              <th>Status</th>
              <th>Opened</th>
              <th>Pumps</th>
              <th>Expected sales</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>{s.attendant}</td>
                <td>
                  <StatusBadge status={s.status} />
                </td>
                <td className="mono">{relativeSync(s.openedAt)}</td>
                <td>{s.pumps.join(', ')}</td>
                <td className="amount">{formatNaira(s.expectedSales)}</td>
                <td className="amount">{formatNaira(s.variance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
