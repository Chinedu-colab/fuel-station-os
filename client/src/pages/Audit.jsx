import { useEffect, useState } from 'react';
import { api, relativeSync } from '../lib/api';

export default function Audit() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.audit().then(setRows).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="empty-state">Loading audit trail…</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Intelligence</div>
        <h1 className="page-title">Audit trail</h1>
        <p className="page-sub">Immutable log of system and operator actions</p>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="mono">{relativeSync(r.time)}</td>
                <td style={{ fontWeight: 600 }}>{r.actor}</td>
                <td>{r.action}</td>
                <td style={{ color: 'var(--text-muted)' }}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
