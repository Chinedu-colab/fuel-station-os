import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import Pumps from './pages/Pumps';
import Transactions from './pages/Transactions';
import Shifts from './pages/Shifts';
import Inventory from './pages/Inventory';
import Reconciliation from './pages/Reconciliation';
import Reports from './pages/Reports';
import Audit from './pages/Audit';
import Settings from './pages/Settings';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="main">
        <Topbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/pumps" element={<Pumps />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/shifts" element={<Shifts />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
