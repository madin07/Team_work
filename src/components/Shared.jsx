import React from 'react';
import { ArrowUpRight, MapPin, Star, Clock3, Navigation, ShieldCheck } from 'lucide-react';

export function PageHeading({ eyebrow, title, description, subtitle, action }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{(description || subtitle) && <p>{description || subtitle}</p>}</div>{action}</div>;
}
export function DoctorMap({ doctor, compact = false }) {
  if (!Number.isFinite(Number(doctor.lat)) || !Number.isFinite(Number(doctor.lon))) return null;
  const lat = Number(doctor.lat), lon = Number(doctor.lon);
  const bbox = `${lon-0.012},${lat-0.008},${lon+0.012},${lat+0.008}`;
  const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
  return <div className={`doctor-map ${compact ? 'doctor-map-compact' : ''}`}>
    <div className="doctor-map-heading"><span><MapPin size={14}/><strong>Clinic location</strong></span><a href={mapUrl} target="_blank" rel="noreferrer"><Navigation size={13}/> Open map</a></div>
    <iframe title={`Map for ${doctor.name} clinic`} loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`} referrerPolicy="no-referrer-when-downgrade"/>
    <p className="doctor-address"><MapPin size={13}/>{doctor.address || `${doctor.city}, Afghanistan`}</p>
    <small className="map-demo-note">Illustrative demo pin — confirm the clinic address with the provider.</small>
  </div>;
}
export function DoctorCard({ doctor, onBook, compact = false }) {
  return <article className="doctor-card glass">
    <div className="doctor-card-top"><span className={`avatar ${doctor.color || 'mint'}`}>{doctor.initials || doctor.name.split(' ').slice(-1)[0].slice(0,2).toUpperCase()}</span><div className="doctor-card-heading"><span className="verified"><ShieldCheck size={13}/> Sample profile</span><span className="rating"><Star size={13} fill="currentColor"/> {doctor.rating}</span></div></div>
    <h3>{doctor.name}</h3><p className="doctor-specialty">{doctor.specialty}</p>
    <p className="doctor-hospital"><MapPin size={14}/>{doctor.hospital || doctor.city}</p>
    <div className="doctor-meta"><span>{doctor.city}, Afghanistan</span><small>{doctor.experience}</small></div>
    <p className="availability"><Clock3 size={14}/>{doctor.available || 'Please confirm availability'}</p>
    {!compact && <DoctorMap doctor={doctor} compact/>}
    <button className="primary-button full" onClick={() => onBook(doctor)}>Request appointment <ArrowUpRight size={16}/></button>
  </article>;
}
export function EmptyResults({ title = 'Nothing found', desc = 'Try changing your search or filters.' }) { return <div className="empty-results glass"><span className="empty-icon">⌕</span><h3>{title}</h3><p>{desc}</p></div>; }
export function EmptyState({ title = 'Nothing found', text = 'Try changing your search or filters.' }) { return <div className="empty-state glass"><span className="empty-icon">⌕</span><h3>{title}</h3><p>{text}</p></div>; }
