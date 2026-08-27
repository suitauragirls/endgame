import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const { products } = useProducts();
  const CATEGORIES = ['Suits', 'Kurtis', 'Dresses', 'Dupattas', 'Heels'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.slice(0, 4);

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-8">
      {/* Hero Banner (Premium Flipkart-inspired style) */}
      <section className="bg-white p-2 md:p-4 mb-2 md:mb-4 shadow-sm">
        <div className="relative h-[300px] md:h-[480px] w-full max-w-7xl mx-auto bg-[#172337] overflow-hidden rounded-md md:rounded-xl shadow-inner group">
          <img 
            src="https://images.unsplash.com/photo-1583391733958-d67b2d56c547?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Hero Banner"
            className="w-full h-full object-cover object-center md:object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172337]/90 via-[#172337]/50 to-transparent flex items-center">
            <div className="px-6 md:px-12 w-full text-white max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-[11px] md:text-xs font-bold uppercase tracking-wider mb-4 border border-white/30 shadow-sm">
                New Collection 2026
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
                Grand Festive <span className="text-[#ffe500]">Sale</span>
              </h1>
              <p className="text-base md:text-xl mb-8 text-gray-100 font-medium leading-relaxed max-w-lg">
                Elevate your ethnic wardrobe with our premium selection. Up to 60% Off on exclusive styles.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ffe500] text-[#212121] text-lg font-bold shadow-[0_4px_14px_rgba(255,229,0,0.4)] hover:bg-[#ffc200] hover:shadow-[0_6px_20px_rgba(255,229,0,0.6)] hover:-translate-y-0.5 transition-all duration-300 rounded-md"
              >
                Shop Collection <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

            {/* Categories Horizontal Scroll */}
      <section className="bg-white py-4 md:py-6 mb-2 md:mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.04)] border-b border-gray-100">
        <div className="flex overflow-x-auto gap-6 md:gap-10 snap-x snap-mandatory hide-scrollbar max-w-7xl mx-auto px-4 sm:px-6 md:justify-center scroll-smooth pb-1 md:pb-0">
          {CATEGORIES.map((category, index) => (
            <Link key={category} to={`/shop?category=${category}`} className="flex flex-col items-center min-w-[72px] md:min-w-[90px] snap-center group">
              <div className="w-[68px] h-[68px] md:w-[84px] md:h-[84px] rounded-full mb-3 bg-gray-50 p-[2px] md:p-1 border border-transparent group-hover:border-[#2874f0]/30 transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(40,116,240,0.15)] group-hover:-translate-y-1"> 
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 shadow-inner">
                  <img  
                    src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1585487000160-6ebcfceb0d03' : '1595777457583-95e059d581b8'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                    alt={category}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-[13px] md:text-[14px] font-semibold text-[#212121] group-hover:text-[#2874f0] transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-0 md:px-4 mb-6 md:mb-10">
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:rounded-xl p-4 md:p-8 border border-gray-100/50">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-5">
            <h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight">Trending Offers</h2>
            <Link to="/shop" className="bg-[#2874f0] text-white px-5 py-2 md:px-6 md:py-2.5 text-[12px] md:text-[13px] rounded-full font-bold tracking-wide shadow-[0_4px_12px_rgba(40,116,240,0.25)] hover:shadow-[0_6px_16px_rgba(40,116,240,0.35)] hover:bg-[#1a5bbf] hover:-translate-y-0.5 transition-all duration-300">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-0 md:px-4 mb-6 md:mb-10">
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:rounded-xl p-4 md:p-8 border border-gray-100/50">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-5">
            <h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight">Best Sellers</h2>
            <Link to="/shop" className="bg-[#2874f0] text-white px-5 py-2 md:px-6 md:py-2.5 text-[12px] md:text-[13px] rounded-full font-bold tracking-wide shadow-[0_4px_12px_rgba(40,116,240,0.25)] hover:shadow-[0_6px_16px_rgba(40,116,240,0.35)] hover:bg-[#1a5bbf] hover:-translate-y-0.5 transition-all duration-300">
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:rounded-xl p-4 md:p-8 border border-gray-100/50">
          <h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Neha S.", text: "The silk suit I ordered is absolutely stunning. The fit is perfect and the quality of the fabric feels extremely premium." },
              { name: "Sneha M.", text: "I wore the velvet maxi dress for a wedding reception and received so many compliments. Fast shipping and beautiful packaging!" },
              { name: "Kavya K.", text: "My go-to store for ethnic wear now. The attention to detail in the embroidery is just breathtaking." }
            ].map((review, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center">
                    5 ★
                  </span>
                  <span className="text-sm font-bold text-[#212121]">{review.name}</span>
                  <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                    <img width="14" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="verified" className="grayscale opacity-50" />
                    Verified Buyer
                  </span>
                </div>
                <p className="text-[#212121] text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
