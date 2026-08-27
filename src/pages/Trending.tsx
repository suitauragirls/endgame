import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export const Trending: React.FC = () => {
  const { products } = useProducts();
  const trending = products.filter(product => product.isNewArrival || product.isBestSeller);
  const visibleProducts = trending.length ? trending : products;

  return <div className="min-h-screen bg-[#fbf8f6] pb-16"><section className="relative overflow-hidden bg-[#5a2039] text-white"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#e7bd78 1px, transparent 1px)', backgroundSize: '22px 22px' }} /><div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24"><div className="max-w-2xl"><div className="flex items-center gap-2 text-[#e7bd78] text-xs uppercase tracking-[0.24em] mb-5"><Sparkles size={16} /> Curated now</div><h1 className="font-serif text-4xl md:text-6xl leading-tight">The edit everyone is saving.</h1><p className="text-white/75 text-base md:text-lg mt-5 max-w-xl">Fresh silhouettes, festive colour and occasion-ready details selected for your next memorable look.</p><Link to="/shop" className="inline-flex items-center gap-2 mt-8 bg-[#e7bd78] text-[#351d28] px-6 py-3 text-sm font-semibold hover:bg-[#f0cf96] transition-colors">Explore all styles <ArrowRight size={17} /></Link></div></div></section><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"><div className="flex items-end justify-between mb-6"><div><p className="text-xs uppercase tracking-[0.2em] text-[#9d3658]">Trending collection</p><h2 className="font-serif text-3xl text-[#2b1a21] mt-2">Most-loved this week</h2></div><span className="text-sm text-neutral-500">{visibleProducts.length} styles</span></div><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">{visibleProducts.map(product => <ProductCard key={product.id} product={product} />)}</motion.div></section></div>;
};
