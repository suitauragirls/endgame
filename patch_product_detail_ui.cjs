const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

// Title Typography
code = code.replace(
  'className="text-xl md:text-2xl text-[#212121] mb-2 flex-1"',
  'className="text-2xl md:text-3xl font-medium text-[#212121] leading-tight mb-2 flex-1"'
);

// Prices
code = code.replace(
  'className="text-3xl font-bold text-[#212121]"',
  'className="text-4xl font-bold text-[#212121] tracking-tight"'
);
code = code.replace(
  'className="text-lg text-[#878787] line-through"',
  'className="text-xl text-[#878787] line-through"'
);
code = code.replace(
  'className="text-lg font-bold text-[#388e3c]"',
  'className="text-xl font-bold text-[#388e3c] tracking-wide"'
);

// Wishlist button
code = code.replace(
  'className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"',
  'className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-md hover:border-gray-300 transition-all"'
);

// Action Buttons
code = code.replace(
  'className="flex-1 h-12 flex items-center justify-center bg-[#ff9f00] text-white font-bold text-base shadow-sm hover:bg-[#f39700] transition-colors"',
  'className="flex-1 h-14 flex items-center justify-center rounded-md bg-[#ff9f00] text-white font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"'
);
code = code.replace(
  'className="flex-1 h-12 flex items-center justify-center bg-[#fb641b] text-white font-bold text-base shadow-sm hover:bg-[#e65a18] transition-colors"',
  'className="flex-1 h-14 flex items-center justify-center rounded-md bg-[#fb641b] text-white font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"'
);

// Quantity selector wrapper
code = code.replace(
  'className="w-32 h-12 flex items-center border border-gray-300 rounded-sm bg-white"',
  'className="w-32 h-14 flex items-center border border-gray-300 rounded-md bg-white"'
);

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
