const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `      {/* Categories Horizontal Scroll */}
      <section className="bg-white p-4 mb-2 md:mb-4 shadow-sm">
        <div className="flex overflow-x-auto gap-6 hide-scrollbar py-2 max-w-7xl mx-auto px-4 md:justify-center">
          {CATEGORIES.map((category, index) => (
            <Link key={category} to={\`/shop?category=\${category}\`} className="flex flex-col items-center min-w-[80px] group">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100 group-hover:shadow-md transition-shadow"> 
                 <img  
                      src={\`https://images.unsplash.com/photo-\${index % 2 === 0 ? '1585487000160-6ebcfceb0d03' : '1595777457583-95e059d581b8'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80\`}
                     alt={category}
                    className="w-full h-full object-cover object-top"
                  />
              </div>
              <span className="text-[13px] font-medium text-[#212121] group-hover:text-[#2874f0]">{category}</span>
            </Link>
          ))}
        </div>
      </section>`;

const replacement = `      {/* Categories Horizontal Scroll */}
      <section className="bg-white py-4 md:py-6 mb-2 md:mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.04)] border-b border-gray-100">
        <div className="flex overflow-x-auto gap-6 md:gap-10 snap-x snap-mandatory hide-scrollbar max-w-7xl mx-auto px-4 sm:px-6 md:justify-center scroll-smooth pb-1 md:pb-0">
          {CATEGORIES.map((category, index) => (
            <Link key={category} to={\`/shop?category=\${category}\`} className="flex flex-col items-center min-w-[72px] md:min-w-[90px] snap-center group">
              <div className="w-[68px] h-[68px] md:w-[84px] md:h-[84px] rounded-full mb-3 bg-gray-50 p-[2px] md:p-1 border border-transparent group-hover:border-[#2874f0]/30 transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(40,116,240,0.15)] group-hover:-translate-y-1"> 
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 shadow-inner">
                  <img  
                    src={\`https://images.unsplash.com/photo-\${index % 2 === 0 ? '1585487000160-6ebcfceb0d03' : '1595777457583-95e059d581b8'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80\`}
                    alt={category}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-[13px] md:text-[14px] font-semibold text-[#212121] group-hover:text-[#2874f0] transition-colors">{category}</span>
            </Link>
          ))}
        </div>
      </section>`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/pages/Home.tsx', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
