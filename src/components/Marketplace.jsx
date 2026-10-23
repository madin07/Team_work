import React from 'react';
import { Activity, ArrowRight, Bandage, Check, Heart, HeartPulse, Microscope, Package, Pill, Plus, Search, ShieldCheck, Stethoscope, Syringe, Thermometer, Truck } from 'lucide-react';
import { products as allProducts } from '../data/medicalData.js';
import { EmptyResults, PageHeading } from './Shared.jsx';

const icons = { Activity, Bandage, HeartPulse, Microscope, ShieldCheck, Stethoscope, Syringe, Thermometer, Pill };
const categories = ['All equipment','Monitoring','Diagnostic','First Aid','Consumables'];
const money = n => `${Number(n).toLocaleString('en-US')} AFN`;

function ProductCard({ product, addToCart }) {
  const Icon = icons[product.icon] || Package;
  return <article className="product-card glass"><div className={`product-visual ${product.color}`}><span className="product-tag">{product.tag}</span><div className="product-illustration"><Icon size={49} strokeWidth={1.35}/></div><button className="product-fav" aria-label={`Save ${product.name}`} onClick={e=>e.currentTarget.classList.toggle('liked')}><Heart size={17}/></button></div><div className="product-body"><div className="product-category">{product.category}</div><h3>{product.name}</h3><div className="product-rating">★ <b>{product.rating}</b><span>·</span><span>{product.stock}</span></div><div className="product-bottom"><div><strong>{money(product.price)}</strong>{product.old && <del>{money(product.old)}</del>}</div><button className="add-button" onClick={()=>addToCart(product.id)} aria-label={`Add ${product.name} to basket`}><Plus size={18}/></button></div></div></article>;
}

export default function Marketplace({ search, setSearch, category, setCategory, products, addToCart }) {
  return <>
    <PageHeading eyebrow="HEALTHCARE SUPPLIES" title="Medical marketplace" description="Explore medical equipment and clinic essentials, priced in Afghan afghani (AFN)." action={<span className="soft-pill"><Truck size={15}/> Local delivery options</span>}/>
    <div className="market-banner glass"><div className="market-banner-copy"><span className="eyebrow">FOR HOME, CLINIC & HOSPITAL</span><h2>Equip your care.<br/><span>One essentials hub.</span></h2><p>Monitoring devices, diagnostic tools, first-aid supplies and everyday consumables.</p><div className="banner-perks"><span><Check size={14}/> Clear AFN pricing</span><span><Check size={14}/> Browse by category</span></div></div><div className="market-art"><div className="market-circle circle-a"/><div className="market-circle circle-b"/><div className="equipment-box"><div className="equipment-cross">+</div><span>MEDICAL<br/>ESSENTIALS</span></div></div></div>
    <div className="market-toolbar"><div className="market-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search equipment and supplies"/></div><span className="product-count">{products.length} products</span></div>
    <div className="filter-chips market-chips">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'chip active':'chip'}>{c}</button>)}</div>
    {products.length ? <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div> : <EmptyResults title="No products found" desc="Try a different product name or category."/>}
    <div className="seller-note glass"><span className="seller-icon"><Package size={22}/></span><div><strong>Are you a medical supplier?</strong><p>Seller registration can be added in a future release.</p></div><button className="outline-button" onClick={()=>window.alert('Supplier onboarding is a planned feature for this demo.')}>Become a supplier <ArrowRight size={15}/></button></div>
    <div className="disclaimer"><ShieldCheck size={17}/><span>Demo catalog only. Prices, stock, certifications and delivery availability are illustrative.</span></div>
  </>;
}