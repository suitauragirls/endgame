import React from 'react';
import { MapPin, Mail, Phone, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export const Footer: React.FC = () => {
  const { categories } = useProducts();
  return (
    <footer className="bg-[#351d28] text-white pt-12 lg:pt-16 pb-8 border-t-0 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-gray-700/60 pb-10 mb-10 gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm md:text-[15px]">Get updates on our latest collections, exclusive offers, and festive sales delivered straight to your inbox.</p>
          </div>
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              const form = e.target;
              form.reset();
              alert('Thank you for subscribing to Suit Aura Girls!'); 
            }} 
            className="flex w-full lg:w-[400px] gap-2 shrink-0"
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-2.5 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#ffe500] focus:ring-1 focus:ring-[#ffe500] text-sm transition-all shadow-inner"
            />
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-[#e7bd78] hover:bg-[#d5a75f] text-[#351d28] font-bold rounded-md shadow-sm transition-colors text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Column 1 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#d9a7b7] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Shop Collections</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition-colors duration-200 block">All Collections</Link></li>
              <li><Link to="/trending" className="hover:text-white transition-colors duration-200 block">New Arrivals</Link></li>
              {categories.slice(0, 5).map(category => <li key={category}><Link to={`/shop?category=${encodeURIComponent(category)}`} className="hover:text-white transition-colors duration-200 block">{category}</Link></li>)}
            </ul>
          </div>
          
          {/* Column 2 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#d9a7b7] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Customer Support</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/orders" className="hover:text-white transition-colors duration-200 block">Track Your Order</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-200 block">Shipping</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-200 block">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors duration-200 block">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#d9a7b7] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Brand & Policies</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-200 block">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-200 block">Terms Of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-200 block">Security & Privacy</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors duration-200 block">Privacy</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - Address */}
          <div className="col-span-1 md:border-l border-gray-700/50 md:pl-8">
            <h4 className="text-[12px] md:text-[13px] text-[#878787] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Registered Office Address</h4>
            <div className="text-[13px] leading-relaxed font-medium text-gray-300 space-y-3">
              <div>
                <p className="text-white font-semibold mb-1 flex items-start gap-2">
                   <Building2 size={16} className="text-[#878787] shrink-0 mt-0.5" />
                   <span>Suit Aura Girls</span>
                </p>
                <p className="pl-6">Near Asansol Junction</p>
                <p className="pl-6">West Bengal, India</p>
              </div>
              <div className="pt-2 space-y-2">
                <p className="flex items-center gap-3">
                  <Phone size={16} className="text-[#878787] shrink-0" /> 
                  <span>+91 80583 35184</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={16} className="text-[#878787] shrink-0" /> 
                  <span>Suitauragirls@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700/60 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-[13px] font-medium text-gray-300">
          
          {/* Action Links */}
          <div className="flex flex-wrap justify-center items-center gap-6"> 
            <span className="flex items-center gap-2 text-white hover:text-[#ff9f00] cursor-pointer transition-colors group">
              <MapPin size={16} className="text-[#e7bd78] group-hover:animate-bounce" /> Become a Seller
            </span>
            <span className="flex items-center gap-2 text-white hover:text-[#ff9f00] cursor-pointer transition-colors group">
              <StarIcon size={16} className="text-[#e7bd78] group-hover:rotate-12 transition-transform" /> Advertise
            </span>
          </div>
          
          {/* Copyright */}
          <p className="text-[#878787] text-center">
            &copy; {new Date().getFullYear()} Suit Aura Girls. <span className="hidden md:inline">All rights reserved.</span>
          </p>
          
          {/* Payments Logo */}
          <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" 
              alt="Payments" 
              className="h-7 w-auto object-contain" 
            />
          </div>
          
        </div>
      </div>
    </footer>
  );
};

const StarIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)
