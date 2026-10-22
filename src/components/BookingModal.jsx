import React from 'react';
import { ArrowRight, CalendarDays, X } from 'lucide-react';
import { money } from '../data/medicalData.js';

export default function BookingModal({ doctor, onClose, onSubmit }) {
  if (!doctor) return null;
  return <div className="modal-backdrop" onClick={onClose}><div className="modal glass" onClick={e=>e.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Close booking form"><X size={18}/></button>
    <div className="modal-kicker"><CalendarDays size={16}/> APPOINTMENT REQUEST</div><h2>Book a consultation</h2><p className="muted">Request an appointment with {doctor.name}. This demo does not send real medical bookings.</p>
    <div className="booking-doctor"><span className={`avatar ${doctor.color}`}>{doctor.initials}</span><div><strong>{doctor.name}</strong><small>{doctor.specialty} · {doctor.city}</small></div><b>{money(doctor.fee)}</b></div>
    <div className="doctor-detail-facts">
      <div><small>Age</small><strong>{doctor.age || '—'}</strong></div>
      <div><small>Gender</small><strong>{doctor.gender || '—'}</strong></div>
      <div><small>Specialization</small><strong>{doctor.specialty}</strong></div>
      <div><small>Experience</small><strong>{doctor.experience}</strong></div>
      <div className="wide-fact"><small>Working days</small><strong>{doctor.days || 'Please confirm with provider'}</strong></div>
      <div className="wide-fact"><small>Meeting hours</small><strong>{doctor.hours || 'Please confirm with provider'}</strong></div>
    </div>
    <form onSubmit={e=>{e.preventDefault();onSubmit(doctor);}} className="booking-form">
      <label>Your full name<input required placeholder="Enter your name"/></label>
      <label>Phone number<input required type="tel" placeholder="+93 7X XXX XXXX" pattern="[+0-9 ()-]{8,18}"/></label>
      <label>Preferred time<select defaultValue={doctor.available}><option>{doctor.available}</option><option>Next available appointment</option><option>Request a different time</option></select></label>
      <button className="primary-button full" type="submit">Send appointment request <ArrowRight size={17}/></button>
    </form>
  </div></div>;
}