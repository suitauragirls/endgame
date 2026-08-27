const fs = require('fs');
let code = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

// Update main container classes
code = code.replace(
  'className="group flex flex-col bg-white rounded-sm hover:shadow-md transition-shadow duration-300 relative border border-transparent hover:border-gray-200"',
  'className="group flex flex-col bg-white rounded-md overflow-hidden hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] transition-all duration-300 relative border border-gray-100 hover:-translate-y-1"'
);

// Update image container padding
code = code.replace(
  'className="relative aspect-[3/4] overflow-hidden p-2"',
  'className="relative aspect-[4/5] overflow-hidden bg-gray-50"'
);

// Wishlist button hover effects
code = code.replace(
  'className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10 shadow-sm"',
  'className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 hover:shadow-md transition-all z-10 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100"'
);

// Text padding container
code = code.replace(
  'className="flex flex-col p-4 pt-2"',
  'className="flex flex-col p-4"'
);

// Title typography
code = code.replace(
  'className="text-sm font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 leading-snug mb-1"',
  'className="text-[15px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 leading-snug mb-2"'
);

// Price layout
code = code.replace(
  'className="flex items-center space-x-2 pt-1"',
  'className="flex items-center flex-wrap gap-2 pt-1"'
);
code = code.replace(
  'className="text-base font-bold text-[#212121]"',
  'className="text-[17px] font-bold text-[#212121]"'
);
code = code.replace(
  'className="text-sm text-[#878787] line-through"',
  'className="text-[13px] text-[#878787] line-through"'
);
code = code.replace(
  'className="text-sm font-bold text-[#388e3c]"',
  'className="text-[13px] font-bold text-[#388e3c] tracking-wide"'
);

// Rating star styling
code = code.replace(
  'className="bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center"',
  'className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center"'
);

fs.writeFileSync('src/components/ProductCard.tsx', code);
