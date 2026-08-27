import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
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

  const navLinks = [
    { name: 'Suits', path: '/shop?category=Suits' },
    { name: 'Kurtis', path: '/shop?category=Kurtis' },
    { name: 'Dresses', path: '/shop?category=Dresses' },
    { name: 'Dupattas', path: '/shop?category=Dupattas' },
    { name: 'Heels', path: '/shop?category=Heels' },
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-50">
        <div className="bg-[#2874f0] w-full h-[64px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white p-1 md:hidden"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex flex-col items-start justify-center text-white italic font-bold text-xl leading-tight">
                <span className="flex items-center gap-1 tracking-tight drop-shadow-sm">
                  Suit Aura <span className="text-[#ffe500]">Girls</span>
                </span>
                <span className="text-[10px] text-white/80 font-normal hover:underline flex items-center not-italic">
                  Explore <span className="text-[#ffe500] font-bold mx-1">Plus</span>
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
              <button type="submit" className="absolute right-0 top-0 h-full px-3 text-[#2874f0]">
                <Search size={20} />
              </button>
            </form>

            {/* Nav Actions */}
            <div className="flex items-center space-x-6 text-white font-medium text-sm">
              <button className="hidden md:flex items-center gap-1 hover:text-white/90">
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

        {/* Categories Bar */}
        <div className="bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hidden md:block relative z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center space-x-12 py-3.5">
              <Link to="/shop" className="text-[13px] font-semibold text-[#1a1a1a] hover:text-[#2874f0] flex items-center gap-1 uppercase tracking-wide transition-colors">
                Shop All <ChevronDown size={14} className="text-gray-400" />
              </Link>
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-[13px] font-semibold text-[#1a1a1a] hover:text-[#2874f0] flex items-center gap-1 uppercase tracking-wide transition-colors"
                >
                  {link.name} <ChevronDown size={14} className="text-gray-400" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden bg-[#2874f0] p-2 border-t border-white/20">
           <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="w-full h-10 pl-10 pr-4 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-all duration-300"
              />
              <button type="submit" className="absolute left-3 top-3 text-gray-500">
                <Search size={18} />
              </button>
            </form>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[113px] md:h-[116px]"></div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 md:hidden flex flex-col"
            >
              <div className="bg-[#2874f0] text-white p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2874f0]">
                  <User size={24} />
                </div>
                <div>
                  <div className="font-bold">Suit Aura Girls</div>
                  <div className="text-xs opacity-80">Sign In</div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col py-2 overflow-y-auto">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium hover:bg-gray-50">Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium hover:bg-gray-50">Shop All</Link>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 border-b text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="mt-2 border-t-4 border-gray-100"></div>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium flex items-center gap-3 hover:bg-gray-50">
                  Wishlist
                </Link>
                <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium flex items-center gap-3 hover:bg-gray-50">
                  My Orders
                </Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium flex items-center gap-3 hover:bg-gray-50">
                  My Cart
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
