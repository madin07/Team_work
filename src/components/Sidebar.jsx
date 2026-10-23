import React from 'react';
import { LayoutDashboard, Stethoscope, Hospital, BriefcaseMedical, ShoppingBag, CalendarDays, Info, Moon, Sun, ShoppingCart, LogOut, Menu, Cross, Pill, UsersRound } from 'lucide-react';

const links = [
  { label: 'Find a Doctor', Icon: Stethoscope },
  { label: 'Hospitals', Icon: Hospital },
  { label: 'Services', Icon: BriefcaseMedical },
  { label: 'Marketplace', Icon: ShoppingBag },
  { label: 'My Appointments', Icon: CalendarDays },
  { label: 'My Pharmacy', Icon: Pill },
  { label: 'My Dependent', Icon: UsersRound },
  { label: 'About & Contact', Icon: Info }
];

export default function Sidebar({ active, go, dark, setDark, cartCount, setCartOpen, currentUser, signOut, collapsed, onToggleSidebar }) {
  return <aside className={`left-rail glass sidebar-panel ${collapsed ? 'is-collapsed' : ''}`} aria-label="Main dashboard navigation">
    <div className="sidebar-topline">
      {!collapsed && <div className="sidebar-title"><LayoutDashboard size={18}/><span>Dashboard</span></div>}
      <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label={collapsed ? 'Expand dashboard sidebar' : 'Collapse dashboard sidebar'} title={collapsed ? 'Expand dashboard' : 'Collapse dashboard'}><Menu size={21}/></button>
    </div>
    <div className="sidebar-brand"><span className="brand-mark"><Cross size={22} strokeWidth={3}/></span><span className="brand-copy"><strong>my patient<span>hub</span></strong><small>HEALTHCARE, CONNECTED</small></span></div>
    <div className="rail-label">YOUR HEALTH SPACE</div>
    <button title="Dashboard overview" className={`rail-link ${active === 'Overview' ? 'selected' : ''}`} onClick={() => go('Overview')}><LayoutDashboard size={18}/><span>Overview</span></button>
    <div className="rail-divider"/>
    <div className="rail-label">EXPLORE</div>
    {links.map(({label,Icon}) => <button key={label} title={label} className={`rail-link ${active === label ? 'selected' : ''}`} onClick={() => go(label)}><Icon size={18}/><span>{label}</span></button>)}
    <div className="rail-divider"/>
    <button title={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="rail-link" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}<span>{dark ? 'Light mode' : 'Dark mode'}</span></button>
    <button title="Equipment basket" className="rail-link" onClick={() => setCartOpen(true)}><ShoppingCart size={18}/><span>Equipment basket</span>{cartCount > 0 && <span className="rail-count">{cartCount}</span>}</button>
    <div className="help-card"><div className="help-icon"><Cross size={18}/></div><strong>Here for your health</strong><p>Explore healthcare information and demo services in one place.</p><button onClick={() => go('About & Contact')}>Contact support ↗</button></div>
    <div className="sidebar-account"><span className="account-avatar">{(currentUser?.name || 'G').slice(0,1).toUpperCase()}</span><span className="account-copy"><strong>{currentUser?.name || currentUser?.email || 'Guest'}</strong><small>{currentUser?.role || 'Patient'}</small></span><button title="Sign out" aria-label="Sign out" onClick={signOut}><LogOut size={16}/></button></div>
    <div className="rail-foot"><span className="online-dot"/> Demo workspace · Afghanistan</div>
  </aside>;
}
