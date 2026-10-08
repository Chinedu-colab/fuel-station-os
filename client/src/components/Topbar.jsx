import { useEffect, useState } from 'react';

export default function Topbar({ title = 'Good morning, operator.' }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Station</span>
        <span>›</span>
        <span>Speaker Oil & Gas</span>
        <span>›</span>
        <strong>{title}</strong>
      </div>
      <div className="topbar-right">
        <span className="status-pill">ok</span>
        <span>Local time {time}</span>
        <button type="button" aria-label="Notifications" style={{ opacity: 0.6 }}>
          🔔
        </button>
        <div className="avatar-btn">AO</div>
      </div>
    </header>
  );
}
