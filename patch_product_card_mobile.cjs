const fs = require('fs');
let code = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

// Padding inside card
code = code.replace(
  'className="flex flex-col p-4"',
  'className="flex flex-col p-3 md:p-4"'
);

// Title typography responsive
code = code.replace(
  'className="text-[15px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 leading-snug mb-2"',
  'className="text-[13px] md:text-[15px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2 leading-tight md:leading-snug mb-1.5 md:mb-2"'
);

// Price container spacing
code = code.replace(
  'className="flex items-center flex-wrap gap-2 pt-1"',
  'className="flex items-center flex-wrap gap-1.5 md:gap-2 pt-1"'
);

// Price text sizes responsive
code = code.replace(
  'className="text-[17px] font-bold text-[#212121]"',
  'className="text-[15px] md:text-[17px] font-bold text-[#212121]"'
);
code = code.replace(
  'className="text-[13px] text-[#878787] line-through"',
  'className="text-[11px] md:text-[13px] text-[#878787] line-through"'
);
code = code.replace(
  'className="text-[13px] font-bold text-[#388e3c] tracking-wide"',
  'className="text-[11px] md:text-[13px] font-bold text-[#388e3c] tracking-wide"'
);

// Rating star responsive
code = code.replace(
  'className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center"',
  'className="bg-[#388e3c] text-white text-[10px] md:text-[11px] font-bold px-1 md:px-1.5 py-0.5 rounded-sm flex items-center"'
);
code = code.replace(
  'className="text-[#878787] text-xs"',
  'className="text-[#878787] text-[10px] md:text-xs"'
);
code = code.replace(
  'className="ml-2"',
  'className="ml-1 md:ml-2 h-[14px] md:h-auto object-contain"'
);

// Image scaling on hover
code = code.replace(
  'className="object-contain w-full h-full object-center"',
  'className="object-contain w-full h-full object-center group-hover:scale-105 transition-transform duration-500"'
);

fs.writeFileSync('src/components/ProductCard.tsx', code);
