export default function Settings() {
  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">System</div>
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Station profile and cockpit preferences</p>
      </div>

      <div className="card card-pad" style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Station name</div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Speaker Oil & Gas</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Location</div>
          <div style={{ fontWeight: 600 }}>Ihie, Isuikwuato LGA, Abia State</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Controller brand</div>
          <div style={{ fontWeight: 600 }}>ExEn · read-only telemetry</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Currency</div>
          <div style={{ fontWeight: 600 }}>NGN (₦)</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Products</div>
          <div style={{ fontWeight: 600 }}>PMS · AGO · DPK</div>
        </div>
      </div>
    </div>
  );
}
