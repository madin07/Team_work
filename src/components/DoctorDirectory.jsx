import React from 'react';
import { MapPin, Search, SlidersHorizontal, ChevronDown, ShieldCheck, ChevronDown as Down } from 'lucide-react';
import { cities, specialties } from '../data/medicalData.js';
import { DoctorCard, EmptyResults, PageHeading } from './Shared.jsx';

export default function DoctorDirectory({ search, setSearch, specialty, setSpecialty, city, setCity, doctors, setBooking }) {
  return <>
    <PageHeading eyebrow="CARE DIRECTORY" title="Find your doctor" description="Connect with healthcare professionals across Afghanistan." action={<span className="soft-pill"><ShieldCheck size={15} /> Verified profiles</span>} />
    <div className="filter-panel glass"><div className="search-field"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Doctor, specialty or hospital" /></div><div className="select-field"><SlidersHorizontal size={16} /><select value={specialty} onChange={e => setSpecialty(e.target.value)}>{specialties.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={14} /></div><div className="select-field"><MapPin size={16} /><select value={city} onChange={e => setCity(e.target.value)}>{cities.map(c => <option key={c}>{c}</option>)}</select><ChevronDown size={14} /></div></div>
    <div className="results-row"><span><strong>{doctors.length}</strong> healthcare professionals</span><span className="sort-label">Sort: <b>Recommended <Down size={14} /></b></span></div>
    {doctors.length ? <div className="doctor-grid">{doctors.map(d => <DoctorCard key={d.id} doctor={d} onBook={() => setBooking(d)} />)}</div> : <EmptyResults title="No doctors found" desc="Try a different specialty, city, or search term." />}
    <div className="disclaimer"><ShieldCheck size={17} /><span>Doctor profiles and availability are sample demonstration data. Confirm details with providers.</span></div>
  </>;
}