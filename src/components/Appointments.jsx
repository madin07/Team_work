import React from 'react';
import { ArrowRight, CalendarDays, ShieldCheck } from 'lucide-react';
import { doctors } from '../data/medicalData.js';
import { PageHeading } from './Shared.jsx';

export default function Appointments({ booked, setBooking, go }) {
  const bookedDoctors = doctors.filter(d => booked.includes(d.id));
  return <>
    <PageHeading eyebrow="YOUR CARE PLAN" title="My appointments" description="Keep your appointment requests and next steps in one place."/>
    {bookedDoctors.length ? <div className="appointment-list">{bookedDoctors.map(d=><article className="appointment-card glass" key={d.id}><span className={`avatar ${d.color}`}>{d.initials}</span><div className="appointment-main"><span className="status-pill"><span className="live-dot"/> Request submitted</span><h3>{d.name}</h3><p>{d.specialty} · {d.hospital}</p><span className="appointment-time"><CalendarDays size={15}/>{d.available}</span></div><button className="outline-button" onClick={()=>setBooking(d)}>View request <ArrowRight size={15}/></button></article>)}</div> : <div className="empty-appointments glass"><span className="empty-icon"><CalendarDays size={29}/></span><h2>Your care journey starts here</h2><p>You haven't submitted any appointment requests yet. Browse the directory to find a healthcare professional.</p><button className="primary-button" onClick={()=>go('Find a Doctor')}>Find a doctor <ArrowRight size={16}/></button></div>}
    <div className="appointment-help"><ShieldCheck size={18}/><p>Requests are saved only during this page session. This demo is not connected to hospitals.</p></div>
  </>;
}