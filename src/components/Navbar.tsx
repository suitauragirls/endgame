import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, ChevronDown, Heart, ArrowRight, Sparkles, Package, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { categories } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [{ name: 'Trending', path: '/trending' }, ...categories.map(name => ({ name, path: `/shop?category=${encodeURIComponent(name)}` }))];

  return (
    <>
      <header className="fixed w-full top-0 z-50">
        <div className="bg-white w-full h-[64px] flex items-center shadow-[0_8px_24px_rgba(90,32,57,0.08)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#2b1a21] p-1"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex flex-col items-start justify-center text-[#690833] italic font-bold text-xl leading-tight">
                <span className="flex items-center gap-1 tracking-tight drop-shadow-sm">
                  Suit Aura <span className="text-[#9d3658]">Girls</span>
                </span>
                <span className="text-[10px] text-[#56616a] font-normal hover:underline flex items-center not-italic">
                  Explore <span className="text-[#9d3658] font-bold mx-1">Plus</span>
                  <img width="10" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="ml-1" />
                </span>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more" 
                className="w-full h-10 pl-4 pr-10 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-[0_0_0_2px_rgba(255,255,255,0.4)] focus:shadow-md transition-all duration-300"
              />
                <button type="submit" className="absolute right-0 top-0 h-full px-3 text-[#9d3658]">
                <Search size={20} />
              </button>
            </form>

            {/* Nav Actions */}
            <div className="flex items-center space-x-6 text-[#2b1a21] font-medium text-sm">
              <button onClick={() => navigate('/login')} className="flex items-center gap-1 hover:text-[#9d3658]">
                <User size={18} />
                <span>Login</span>
                <ChevronDown size={14} />
              </button>
              
              <Link to="/wishlist" className="hidden md:flex items-center hover:text-white/90">
                Wishlist
              </Link>

              <Link to="/orders" className="hidden md:flex items-center hover:text-white/90">
                My Orders
              </Link>

              <Link to="/cart" className="flex items-center gap-2 hover:text-white/90 font-bold">
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden bg-white p-2 border-t border-[#eadfe0]">
           <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="w-full h-10 pl-10 pr-4 rounded-md outline-none text-[#212121] text-sm border border-[#eadfe0] focus:border-[#9d3658] shadow-sm transition-all duration-300"
              />
              <button type="submit" className="absolute left-3 top-3 text-gray-500">
                <Search size={18} />
              </button>
            </form>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[113px] md:h-[100px]"></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[min(360px,88vw)] bg-white z-50 flex flex-col"
            >
              <div className="bg-white text-[#2b1a21] p-4 flex items-center gap-3 border-b border-[#eadfe0]">
                <div className="w-10 h-10 bg-[#fff0f2] rounded-full flex items-center justify-center text-[#9d3658]">
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="font-serif text-lg text-[#690833]">Suit Aura Girls</div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[#9d3658]">Store navigation</div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto text-[#56616a]">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col py-4 px-4 overflow-y-auto">
                <div className="rounded-xl bg-[#fff0f2] border border-[#f2d7de] px-4 py-4 mb-4"><p className="text-sm font-semibold text-[#690833]">✨ Free shipping above ₹499</p><p className="text-xs text-[#56616a] mt-1">Prepaid store • Authentic handpicked quality</p></div>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 rounded-lg bg-[#fff5f6] text-sm font-semibold text-[#690833] flex items-center justify-between">Home <ArrowRight size={17} /></Link>
                <Link to="/trending" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 text-sm font-semibold text-[#2b1a21] border-b border-[#f1e7e8] flex items-center justify-between">New Arrivals <ArrowRight size={17} className="text-[#9aa1a8]" /></Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 text-sm font-semibold text-[#2b1a21] border-b border-[#f1e7e8] flex items-center justify-between">Shop All <ArrowRight size={17} className="text-[#9aa1a8]" /></Link>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-4 border-b border-[#f1e7e8] text-sm font-semibold text-[#2b1a21] hover:bg-[#fff5f6] flex items-center justify-between"
                  >
                    {link.name} <ArrowRight size={17} className="text-[#9aa1a8]" />
                  </Link>
                ))}
                <Link to="/shop?sale=true" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-4 border-b border-[#f1e7e8] text-sm font-semibold text-[#b34b70] flex items-center justify-between">Sale <ArrowRight size={17} className="text-[#9aa1a8]" /></Link>
                <p className="px-4 pt-6 pb-2 text-sm font-serif font-semibold text-[#690833]">Help & Information</p>
                <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm text-[#56616a] flex items-center gap-3"><Package size={18} className="text-[#c45b7f]" /> Track Order Status</Link>
                <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm text-[#56616a] flex items-center gap-3"><Info size={18} className="text-[#c45b7f]" /> Help Centre</Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm text-[#56616a] flex items-center gap-3"><Heart size={18} className="text-[#c45b7f]" /> Wishlist</Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm text-[#56616a] flex items-center gap-3"><ShoppingCart size={18} className="text-[#c45b7f]" /> Cart</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
