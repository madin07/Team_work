import React from 'react';
import {
  Activity, ArrowRight, CalendarDays, CheckCircle2, Clock3, HeartPulse,
  Hospital, MapPin, Package, Search, ShieldCheck, Stethoscope, UserRound, Pill,
  UsersRound, ClipboardList, Sparkles
} from 'lucide-react';
import { doctors, hospitals } from '../data/medicalData.js';
import { DoctorCard } from './Shared.jsx';

function SummaryCard({ icon: Icon, label, value, note, tone }) {
  return <article className={`portal-stat glass tone-${tone}`}>
    <span className="portal-stat-icon"><Icon size={19} /></span>
    <div className="portal-stat-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
  </article>;
}

function QuickLink({ icon: Icon, title, description, tone, onClick }) {
  return <button className="portal-quick-link glass" onClick={onClick}>
    <span className={`portal-quick-icon ${tone}`}><Icon size={21} /></span>
    <span className="portal-quick-copy"><strong>{title}</strong><small>{description}</small></span>
    <ArrowRight className="portal-quick-arrow" size={17} />
  </button>;
}

export default function Dashboard({ go, setSearch, booked = [], currentUser }) {
  const bookedDoctors = doctors.filter(d => booked.includes(d.id));
  return <div className="patient-dashboard">
    <div className="portal-page-heading">
      <div>
        <div className="eyebrow"><span className="live-dot" /> PATIENT PORTAL · AFGHANISTAN</div>
        <h1>Dashboard<span className="portal-heading-dot">.</span></h1>
        <p>Welcome{currentUser?.name ? ` back, ${currentUser.name.split(' ')[0]}` : ' back'} — manage your care in one place.</p>
      </div>
      <div className="portal-date-chip"><CalendarDays size={16} /><span>Your health space</span></div>
    </div>

    <div className="portal-search glass">
      <span className="portal-search-icon"><Search size={19} /></span>
      <input aria-label="Search doctors, specialties or hospitals" placeholder="Search doctors, specialties or hospitals…" onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && go('Find a Doctor')} />
      <button className="primary-button" onClick={() => go('Find a Doctor')}>Find a doctor <ArrowRight size={16} /></button>
    </div>

    <section className="portal-stats-grid" aria-label="Healthcare summary">
      <SummaryCard icon={CalendarDays} label="My appointments" value={booked.length} note={booked.length ? 'Requests saved in this demo' : 'No bookings yet'} tone="mint" />
      <SummaryCard icon={Stethoscope} label="Doctors listed" value={doctors.length} note="Browse sample profiles" tone="lilac" />
      <SummaryCard icon={Hospital} label="Facilities" value={hospitals.length} note="Across Afghan cities" tone="blue" />
      <SummaryCard icon={ShieldCheck} label="Care tools" value="24/7" note="Explore services online" tone="peach" />
    </section>

    <div className="portal-main-grid">
      <section className="portal-panel glass">
        <div className="portal-section-head"><div><span className="eyebrow">YOUR SHORTCUTS</span><h2>Quick access</h2><p>Jump straight to what you need.</p></div><span className="portal-head-badge"><Sparkles size={14} /> Easy care</span></div>
        <div className="portal-quick-grid">
          <QuickLink icon={Stethoscope} title="Find a doctor" description="Search by specialty or city" tone="mint" onClick={() => go('Find a Doctor')} />
          <QuickLink icon={CalendarDays} title="Appointments" description="View your saved requests" tone="lilac" onClick={() => go('My Appointments')} />
          <QuickLink icon={Hospital} title="Hospitals & clinics" description="Explore nearby facilities" tone="blue" onClick={() => go('Hospitals')} />
          <QuickLink icon={Package} title="Medical equipment" description="Browse care essentials" tone="peach" onClick={() => go('Marketplace')} />
          <QuickLink icon={Pill} title="My Pharmacy" description="Browse medicines and orders" tone="rose" onClick={() => go('My Pharmacy')} />
          <QuickLink icon={UsersRound} title="My Dependent" description="Manage family health details" tone="blue" onClick={() => go('My Dependent')} />
          <QuickLink icon={HeartPulse} title="Health services" description="Explore available services" tone="rose" onClick={() => go('Services')} />
          <QuickLink icon={UserRound} title="Help & contact" description="Get in touch with the team" tone="mint" onClick={() => go('About & Contact')} />
        </div>
      </section>

      <section className="portal-panel glass portal-appointments-panel">
        <div className="portal-section-head"><div><span className="eyebrow">KEEP TRACK</span><h2>My appointments</h2><p>Your appointment requests appear here.</p></div><span className="portal-round-icon"><ClipboardList size={18} /></span></div>
        {bookedDoctors.length ? <div className="portal-appointment-list">{bookedDoctors.map(d => <div className="portal-appointment-row" key={d.id}>
          <img src={d.image} alt="" />
          <div className="portal-appointment-copy"><strong>{d.name}</strong><span>{d.specialty} · {d.city}</span><small><MapPin size={12} /> {d.hospital}</small></div>
          <span className="portal-status"><CheckCircle2 size={13} /> Requested</span>
        </div>)}</div> : <div className="portal-empty-state"><span><CalendarDays size={22} /></span><strong>No appointments yet</strong><p>Find a doctor and submit a booking request to see it here.</p><button className="text-button" onClick={() => go('Find a Doctor')}>Browse doctors <ArrowRight size={15} /></button></div>}
        <button className="portal-panel-link" onClick={() => go('My Appointments')}>Open appointments <ArrowRight size={15} /></button>
      </section>
    </div>

    <section className="portal-panel glass portal-doctors-panel">
      <div className="portal-section-head"><div><span className="eyebrow">DISCOVER CARE</span><h2>Featured doctors</h2><p>Sample healthcare profiles from different cities in Afghanistan.</p></div><button className="text-button" onClick={() => go('Find a Doctor')}>View all <ArrowRight size={15} /></button></div>
      <div className="doctor-preview-grid">{doctors.slice(0, 3).map(d => <DoctorCard key={d.id} doctor={d} onBook={() => go('Find a Doctor')} compact />)}</div>
    </section>

    <section className="portal-panel glass care-access-panel">
      <div className="care-access-copy">
        <span className="eyebrow">PROJECT HIGHLIGHT · DATA VISUALIZATION</span>
        <h2>Care network snapshot</h2>
        <p>A compact visual overview of the sample directory across Afghanistan. Use it to demonstrate how a health portal can turn listings into useful at-a-glance insights.</p>
        <span className="care-access-note"><Activity size={14}/> Illustrative demo data, not official health statistics</span>
      </div>
      <div className="care-access-bars" aria-label="Illustrative sample listings by city">
        {[{city:'Kabul',value:88},{city:'Herat',value:64},{city:'Mazar-i-Sharif',value:52},{city:'Kandahar',value:43}].map(item => <div className="care-access-row" key={item.city}><span>{item.city}</span><div className="care-access-track"><div className="care-access-fill" style={{width:`${item.value}%`}} /></div><strong>{item.value}%</strong></div>)}
      </div>
    </section>

    <section className="portal-afghan-banner glass">
      <div className="portal-afghan-symbol"><HeartPulse size={24} /></div>
      <div><span className="eyebrow">CARE ACROSS AFGHANISTAN</span><h2>Find care closer to home.</h2><p>Explore sample listings in Kabul, Herat, Mazar-i-Sharif, Kandahar and Jalalabad.</p></div>
      <button className="primary-button" onClick={() => go('Hospitals')}>Explore facilities <ArrowRight size={16} /></button>
    </section>
    <p className="portal-demo-disclaimer"><Activity size={13} /> Demo project: doctor, hospital, appointment and equipment listings are sample data, not verified live healthcare services.</p>
  </div>;
}
