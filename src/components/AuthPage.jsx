import React, { useState } from 'react';
import { Cross, Eye, EyeOff, LockKeyhole, Mail, UserRound, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AuthPage({ onAuthenticated, dark, setDark }) {
  const [mode,setMode] = useState('signin');
  const [show,setShow] = useState(false);
  const [error,setError] = useState('');
  const [form,setForm] = useState({name:'',email:'',password:'',role:'Patient'});
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault(); setError('');
    if (mode==='signup' && form.password.length<6) { setError('Please use at least 6 characters for your password.'); return; }
    const users = JSON.parse(localStorage.getItem('mph-demo-users') || '[]');
    if (mode==='signup') {
      if(users.some(u=>u.email.toLowerCase()===form.email.toLowerCase())) { setError('An account with this email already exists on this device. Please sign in.'); return; }
      users.push({name:form.name,email:form.email,password:form.password,role:form.role});
      localStorage.setItem('mph-demo-users',JSON.stringify(users));
      localStorage.setItem('mph-demo-session',JSON.stringify({name:form.name,email:form.email,role:form.role}));
      onAuthenticated({name:form.name,email:form.email,role:form.role});
    } else {
      const user=users.find(u=>u.email.toLowerCase()===form.email.toLowerCase() && u.password===form.password);
      if(!user) { setError('We could not find a matching demo account. Create an account first or check your details.'); return; }
      const session={name:user.name,email:user.email,role:user.role};
      localStorage.setItem('mph-demo-session',JSON.stringify(session)); onAuthenticated(session);
    }
  };
  return <div className="auth-screen">
    <div className="auth-glow auth-glow-a"/><div className="auth-glow auth-glow-b"/>
    <header className="auth-top"><div className="auth-brand"><span className="brand-mark"><Cross size={23} strokeWidth={3}/></span><span className="brand-copy"><strong>my patient<span>hub</span></strong><small>HEALTHCARE, CONNECTED</small></span></div><button className="auth-theme" onClick={()=>setDark(!dark)}>{dark?'☀ Light mode':'☾ Dark mode'}</button></header>
    <main className="auth-layout"><section className="auth-story"><span className="auth-kicker"><HeartPulse size={15}/> A HEALTHIER CONNECTION</span><h1>Your health journey,<br/><span>all in one place.</span></h1><p>Discover doctors, explore hospitals, request appointments and find medical essentials across Afghanistan.</p><div className="auth-benefits"><div><span><ShieldCheck size={18}/></span><div><b>Care made clearer</b><small>Explore services in one organized hub.</small></div></div><div><span><LockKeyhole size={18}/></span><div><b>Your own demo account</b><small>Sign in to see your personalized workspace.</small></div></div></div><div className="auth-map-label"><span className="auth-pulse"/> Designed for communities across Afghanistan</div></section>
    <section className="auth-card glass"><div className="auth-tabs"><button className={mode==='signin'?'chosen':''} onClick={()=>{setMode('signin');setError('')}}>Sign in</button><button className={mode==='signup'?'chosen':''} onClick={()=>{setMode('signup');setError('')}}>Create account</button></div><div className="auth-heading"><div className="auth-icon"><Cross size={21}/></div><h2>{mode==='signin'?'Welcome back':'Create your account'}</h2><p>{mode==='signin'?'Sign in to continue to My Patient Hub.':'Join My Patient Hub to organize your healthcare journey.'}</p></div>
    <form className="auth-form" onSubmit={submit}>
      {mode==='signup' && <label>Full name<div className="auth-input"><UserRound size={17}/><input name="name" value={form.name} onChange={update} required placeholder="Your full name" autoComplete="name"/></div></label>}
      <label>Email address<div className="auth-input"><Mail size={17}/><input name="email" value={form.email} onChange={update} required type="email" placeholder="you@example.com" autoComplete="email"/></div></label>
      <label>Password<div className="auth-input"><LockKeyhole size={17}/><input name="password" value={form.password} onChange={update} required type={show?'text':'password'} placeholder={mode==='signup'?'At least 6 characters':'Enter your password'} autoComplete={mode==='signup'?'new-password':'current-password'}/><button type="button" className="show-password" onClick={()=>setShow(!show)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
      {mode==='signup' && <label>Account type<select name="role" value={form.role} onChange={update}><option>Patient</option><option>Doctor</option><option>Medical supplier</option></select></label>}
      {error && <div className="auth-error" role="alert">{error}</div>}
      <button className="primary-button auth-submit" type="submit">{mode==='signin'?'Sign in securely':'Create account'} <ArrowRight size={17}/></button>
    </form><div className="auth-divider"><span/>or<span/></div><button className="guest-button" onClick={()=>onAuthenticated({name:'Guest',email:'',role:'Guest'})}>Continue as guest</button><p className="auth-legal">By continuing, you acknowledge this is a demonstration frontend. Accounts are stored only in this browser; no real authentication server is connected.</p><p className="auth-switch">{mode==='signin'?"New to My Patient Hub?":"Already have an account?"} <button onClick={()=>{setMode(mode==='signin'?'signup':'signin');setError('')}}>{mode==='signin'?'Create an account':'Sign in'}</button></p></section></main>
    <footer className="auth-footer">© 2026 My Patient Hub · Afghanistan <span>Care begins with connection.</span></footer>
  </div>;
}