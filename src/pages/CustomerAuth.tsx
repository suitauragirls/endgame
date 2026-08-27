import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, UserRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

type Customer = { name: string; email: string; password: string };
export const CustomerAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signUp = location.pathname === '/signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const saved = JSON.parse(localStorage.getItem('suit_aura_customers') || '[]') as Customer[];
    if (signUp) {
      if (saved.some(customer => customer.email === email)) { setMessage('An account with this email already exists.'); return; }
      localStorage.setItem('suit_aura_customers', JSON.stringify([...saved, { name, email, password }]));
      localStorage.setItem('suit_aura_customer_session', JSON.stringify({ name, email }));
      navigate('/');
      return;
    }
    const customer = saved.find(item => item.email === email && item.password === password);
    if (!customer) { setMessage('Email or password is incorrect.'); return; }
    localStorage.setItem('suit_aura_customer_session', JSON.stringify({ name: customer.name, email: customer.email }));
    navigate('/');
  };
  return <main className="min-h-[70vh] bg-[#fbf8f6] flex items-center justify-center px-4 py-16"><motion.form initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="bg-white border border-[#eadfe0] p-7 md:p-10 w-full max-w-md shadow-[0_20px_60px_rgba(90,32,57,0.1)]"><div className="w-12 h-12 bg-[#fff0f2] text-[#9d3658] flex items-center justify-center"><UserRound size={23} /></div><p className="text-xs uppercase tracking-[0.22em] text-[#9d3658] mt-6">Suit Aura Girls</p><h1 className="font-serif text-3xl text-[#2b1a21] mt-2">{signUp ? 'Create your account' : 'Welcome back'}</h1><p className="text-sm text-neutral-500 mt-2 mb-7">{signUp ? 'Save your details for a smoother checkout.' : 'Sign in to view your orders and saved details.'}</p>{signUp && <label className="block text-sm mb-4">Full name<input required value={name} onChange={event => setName(event.target.value)} className="admin-input" /></label>}<label className="block text-sm mb-4">Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} className="admin-input" /></label><label className="block text-sm">Password<div className="relative"><input required minLength={6} type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} className="admin-input pr-11" /><button type="button" onClick={() => setShowPassword(value => !value)} title="Toggle password visibility" className="absolute right-3 top-3 text-neutral-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>{message && <p className="text-sm text-red-600 mt-3">{message}</p>}<button className="w-full mt-7 py-3 bg-[#690833] text-white text-sm flex items-center justify-center gap-2">{signUp ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button><button type="button" onClick={() => navigate(signUp ? '/login' : '/signup')} className="w-full mt-4 text-sm text-[#9d3658]">{signUp ? 'Already have an account? Sign in' : 'New here? Create an account'}</button></motion.form></main>;
};
