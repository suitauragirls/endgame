const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `      {/* Hero Banner (Similar to Flipkart carousel style) */}
      <section className="bg-white p-2 md:p-4 mb-2 md:mb-4 shadow-sm">
        <div className="relative h-[250px] md:h-[400px] w-full bg-[#2874f0] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1583391733958-d67b2d56c547?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Hero Banner"
            className="w-full h-full object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Grand Festive Sale</h1>
              <p className="text-lg md:text-xl mb-6">Up to 60% Off on Premium Ethnic Wear</p>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#ffe500] text-[#212121] font-bold shadow-md hover:bg-[#ffc200] transition-colors rounded-sm"
              >
                Shop Now <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>`;

const replacement = `      {/* Hero Banner (Premium Flipkart-inspired style) */}
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
      </section>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/Home.tsx', code);
