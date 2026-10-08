import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Fuel,
  ArrowLeftRight,
  Users,
  Cylinder,
  Scale,
  FileBarChart,
  Shield,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

const controlRoom = [
  { to: '/', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/pumps', label: 'Pumps & nozzles', icon: Fuel },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight, badge: 12 },
];

const operations = [
  { to: '/shifts', label: 'Shifts & closeout', icon: Users },
  { to: '/inventory', label: 'Tank inventory', icon: Cylinder },
  { to: '/reconciliation', label: 'Reconciliation', icon: Scale },
];

const intelligence = [
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/audit', label: 'Audit trail', icon: Shield },
];

function NavGroup({ items, collapsed }) {
  return (
    <nav className="nav">
      {items.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={18} strokeWidth={1.75} />
          {!collapsed && <span className="nav-label">{label}</span>}
          {!collapsed && badge != null && <span className="nav-badge">{badge}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="logo-row">
        <div className="logo-mark">FS</div>
        {!collapsed && (
          <div className="logo-text">
            <strong>FuelStation OS</strong>
            <span>Operations Cockpit</span>
          </div>
        )}
      </div>

      <div className="station-card">
        <div className="station-avatar">SO</div>
        {!collapsed && (
          <div className="station-meta">
            <div className="name">Speaker Oil & Gas</div>
            <div className="loc">Ihie, Isuikwuato LGA Abia</div>
            <div className="live">Live</div>
          </div>
        )}
      </div>

      {!collapsed && <div className="section-label">Control Room</div>}
      <NavGroup items={controlRoom} collapsed={collapsed} />

      {!collapsed && <div className="section-label">Operations</div>}
      <NavGroup items={operations} collapsed={collapsed} />

      {!collapsed && <div className="section-label">Intelligence</div>}
      <NavGroup items={intelligence} collapsed={collapsed} />

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sync-health">
            <div className="dot" />
            <div className="sync-text">
              <div style={{ fontWeight: 600 }}>Sync health</div>
              <div style={{ opacity: 0.75, marginTop: 2 }}>All systems nominal</div>
            </div>
          </div>
        )}
        <nav className="nav">
          <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Settings size={18} strokeWidth={1.75} />
            {!collapsed && <span className="nav-label">Settings</span>}
          </NavLink>
          <button type="button" className="nav-item" onClick={onToggle} style={{ width: '100%' }}>
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            {!collapsed && <span className="nav-label">Collapse</span>}
          </button>
        </nav>
      </div>
    </aside>
  );
}
