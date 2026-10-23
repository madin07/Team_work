import React, { useState } from 'react';
import { Activity, ArrowRight, Hospital, MapPin, ShieldCheck, Star } from 'lucide-react';
import { hospitals } from '../data/medicalData.js';
import { PageHeading } from './Shared.jsx';

export default function HospitalsPage({ go }) {
  const [filter, setFilter] = useState('All facilities');
  const filtered = hospitals.filter(h => filter === 'All facilities' || h.city === filter);
  return <>
    <PageHeading eyebrow="CARE NETWORK" title="Hospitals & clinics" description="Explore healthcare facilities and services in major Afghan cities." action={<span className="soft-pill"><MapPin size={15}/> Afghanistan</span>}/>
    <div className="hospital-hero glass"><div><span className="eyebrow">CARE, CLOSER TO HOME</span><h2>Find the right place<br/>for your care.</h2><p>Review specialties, discover city options, and plan your next visit.</p><button className="primary-button" onClick={()=>go('Find a Doctor')}>Find a specialist <ArrowRight size={16}/></button></div><div className="hospital-illustration"><div className="hospital-building"><div className="building-cross">+</div><div className="building-windows"><i/><i/><i/><i/><i/><i/></div><div className="building-door"/></div><span className="hospital-illustration-tag"><ShieldCheck size={16}/> Care directory</span></div></div>
    <div className="filter-chips">{['All facilities','Kabul','Herat','Mazar-i-Sharif'].map(c=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'chip active':'chip'}>{c}</button>)}</div>
    <div className="hospital-list">{filtered.map(h=><article className="hospital-card glass" key={h.name}><div className={`hospital-logo ${h.color}`}><Hospital size={26}/></div><div className="hospital-info"><div className="hospital-title-row"><h3>{h.name}</h3><span className="rating-pill"><Star size={13} fill="currentColor"/>{h.rating}</span></div><p>{h.type}</p><div className="hospital-details"><span><MapPin size={14}/>{h.city}, Afghanistan</span><span><Activity size={14}/>{h.services}</span></div></div><button className="outline-button" onClick={()=>go('Find a Doctor')}>View doctors <ArrowRight size={15}/></button></article>)}</div>
    <div className="disclaimer"><ShieldCheck size={17}/><span>Hospital listings are illustrative demo content, not verified live listings.</span></div>
  </>;
}