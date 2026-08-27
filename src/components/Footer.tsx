import React from 'react';
import { MapPin, Mail, Phone, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#172337] text-white pt-12 lg:pt-16 pb-8 border-t-0 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Column 1 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#878787] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">About</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200 block">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-200 block">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors duration-200 block">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors duration-200 block">Press</Link></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#878787] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Help</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/payments" className="hover:text-white transition-colors duration-200 block">Payments</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors duration-200 block">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors duration-200 block">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors duration-200 block">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div className="col-span-1">
            <h4 className="text-[12px] md:text-[13px] text-[#878787] uppercase tracking-[0.1em] font-semibold mb-4 md:mb-6">Policy</h4>
            <ul className="space-y-3.5 text-[13px] font-medium text-gray-300">
              <li><Link to="/return-policy" className="hover:text-white transition-colors duration-200 block">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors duration-200 block">Terms Of Use</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors duration-200 block">Security</Link></li>
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
              <MapPin size={16} className="text-[#ff9f00] group-hover:animate-bounce" /> Become a Seller
            </span>
            <span className="flex items-center gap-2 text-white hover:text-[#ff9f00] cursor-pointer transition-colors group">
              <StarIcon size={16} className="text-[#ff9f00] group-hover:rotate-12 transition-transform" /> Advertise
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

const StarIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)
