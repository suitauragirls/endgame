const fs = require('fs');
let code = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

// Wrapper
code = code.replace(
  'className="group flex flex-col bg-white rounded-md overflow-hidden hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-all duration-300 relative border border-gray-100 hover:-translate-y-1"',
  'className="group flex flex-col bg-white rounded-lg md:rounded-xl overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 relative border border-gray-100/80 hover:border-[#2874f0]/20 hover:-translate-y-1.5"'
);

// Image container
code = code.replace(
  'className="relative aspect-[4/5] overflow-hidden bg-gray-50"',
  'className="relative aspect-[4/5] overflow-hidden bg-[#f8f9fa] group-hover:bg-[#f1f3f6] transition-colors duration-300"'
);

// Wishlist button
code = code.replace(
  'className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 hover:shadow-md transition-all z-10 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100"',
  'className="absolute top-3 right-3 p-2.5 rounded-full bg-white/95 hover:bg-white text-gray-400 hover:text-red-500 hover:shadow-lg transition-all duration-300 z-10 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:scale-110"'
);

// Title text
code = code.replace(
  'className="text-[13px] md:text-[15px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 leading-tight md:leading-snug mb-1.5 md:mb-2"',
  'className="text-[13px] md:text-[15px] font-medium text-[#1a1a1a] hover:text-[#2874f0] line-clamp-2 leading-tight md:leading-snug mb-1.5 md:mb-2"'
);

fs.writeFileSync('src/components/ProductCard.tsx', code);
