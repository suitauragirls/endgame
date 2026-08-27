import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'suitauragirls' && password === 'abhi@7781') {
      localStorage.setItem('suit_aura_admin_session', 'demo-authenticated');
      navigate('/admin', { replace: true });
    } else {
      setError('Username or password is incorrect.');
    }
  };

  return <div className="min-h-[72vh] flex items-center justify-center bg-[#fbf8f6] px-4 py-16"><motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="w-full max-w-md bg-white border border-[#eadfe0] p-7 md:p-10 shadow-[0_20px_60px_rgba(90,32,57,0.10)]"><div className="w-12 h-12 flex items-center justify-center bg-[#f8e8ed] text-[#9d3658] mb-6"><ShieldCheck size={24} /></div><p className="text-xs uppercase tracking-[0.22em] text-[#9d3658]">Private access</p><h1 className="font-serif text-3xl text-[#2b1a21] mt-2">Admin sign in</h1><p className="text-sm text-neutral-500 mt-2 mb-7">Manage your Suit Aura Girls store securely.</p><label className="block text-sm text-[#2b1a21] mb-4">Username<input value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" className="admin-input" /></label><label className="block text-sm text-[#2b1a21]">Password<div className="relative"><input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" className="admin-input pr-11" /><button type="button" onClick={() => setShowPassword(value => !value)} title={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-3 text-neutral-400 hover:text-[#9d3658]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>{error && <p className="text-sm text-red-600 mt-3">{error}</p>}<button type="submit" className="mt-7 w-full flex items-center justify-center gap-2 bg-[#9d3658] text-white py-3 text-sm font-semibold hover:bg-[#7f2947] transition-colors">Continue to dashboard <ArrowRight size={17} /></button><p className="text-[11px] text-neutral-400 mt-5">Demo authentication for local development. Add server-side authentication before production launch.</p></motion.form></div>;
};
