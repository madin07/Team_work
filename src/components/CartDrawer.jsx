import React from 'react';
import { ArrowRight, Minus, Package, Plus, ShoppingBag, X } from 'lucide-react';
import { money } from '../data/medicalData.js';

export default function CartDrawer({ open, onClose, cart, products, changeQty, cartCount, cartTotal, setNotice, go }) {
  if (!open) return null;
  return <div className="drawer-backdrop" onClick={onClose}><aside className="cart-drawer glass" onClick={e=>e.stopPropagation()}>
    <div className="drawer-head"><div><span className="eyebrow">YOUR BASKET</span><h2>Medical equipment</h2></div><button className="icon-button" onClick={onClose}><X/></button></div>
    {cartCount === 0 ? <div className="empty-state"><span className="empty-icon"><ShoppingBag size={26}/></span><h3>Your basket is empty</h3><p>Explore equipment for homes, clinics and hospitals.</p><button className="primary-button" onClick={()=>{onClose();go('Marketplace')}}>Browse marketplace <ArrowRight size={16}/></button></div> :
      <><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-line" key={p.id}><span className={`product-mini ${p.color}`}><Package size={22}/></span><div className="cart-line-info"><strong>{p.name}</strong><small>{money(p.price)}</small><div className="quantity"><button onClick={()=>changeQty(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button onClick={()=>changeQty(p.id,1)}><Plus size={13}/></button></div></div><b>{money(p.price*cart[p.id])}</b></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><small>Delivery and final availability confirmed by the seller.</small><button className="primary-button full" onClick={()=>{onClose();setNotice('Checkout is a demo. No payment has been collected.')}}>Continue to checkout <ArrowRight size={16}/></button></div></>}
  </aside></div>;
}