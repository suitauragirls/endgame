const fs = require('fs');
let code = fs.readFileSync('/app/applet/src/components/Footer.tsx', 'utf8');

const newsletterSection = `
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
              className="px-6 py-2.5 bg-[#ffe500] hover:bg-[#ffc200] text-[#212121] font-bold rounded-md shadow-sm transition-colors text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2`;

code = code.replace(
  `<div className="grid grid-cols-2`,
  newsletterSection
);

fs.writeFileSync('/app/applet/src/components/Footer.tsx', code);
