import React from 'react';
import { Activity, ArrowRight, HeartPulse, Hospital, Microscope, ShieldCheck, Stethoscope, Syringe } from 'lucide-react';
import { PageHeading } from './Shared.jsx';
const services=[
 {Icon:Stethoscope,title:'Doctor search',desc:'Search by name, specialty and city to discover care options.',target:'Find a Doctor'},
 {Icon:Hospital,title:'Hospitals & clinics',desc:'Browse sample facility profiles and available service categories.',target:'Hospitals'},
 {Icon:HeartPulse,title:'Appointment requests',desc:'Submit a frontend appointment request and review it in your session.',target:'My Appointments'},
 {Icon:Activity,title:'Medical equipment',desc:'Explore monitoring devices and clinic supplies priced in AFN.',target:'Marketplace'},
 {Icon:Microscope,title:'Diagnostic supplies',desc:'Browse illustrative laboratory and diagnostic equipment.',target:'Marketplace'},
 {Icon:Syringe,title:'Clinical consumables',desc:'Find sample listings for common clinic and first-aid essentials.',target:'Marketplace'}
];
export default function Services({go}) { return <><PageHeading eyebrow="OUR SERVICES" title="Healthcare services" description="Explore the tools and directories available in this Afghanistan-focused demo."/><div className="service-grid services-page-grid">{services.map(({Icon,title,desc,target},i)=><button className="service-card glass" key={title} onClick={()=>go(target)}><div className="service-card-top"><span className={`service-icon ${['mint','lilac','peach','blue','rose','mint'][i]}`}><Icon size={23}/></span><span className="service-number">0{i+1}</span></div><h3>{title}</h3><p>{desc}</p><span className="service-cta">Explore service <ArrowRight size={15}/></span></button>)}</div><div className="disclaimer"><ShieldCheck size={17}/><span>These are demonstration services. Medical advice, real booking, payments, and supplier fulfilment are not connected.</span></div></>; }