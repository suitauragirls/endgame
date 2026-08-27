const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Logo
code = code.replace(
  'className="flex items-center gap-1"',
  'className="flex items-center gap-1 tracking-tight drop-shadow-sm"'
);

// Desktop search bar focus effect
code = code.replace(
  'className="w-full h-10 pl-4 pr-10 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-shadow"',
  'className="w-full h-10 pl-4 pr-10 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-[0_0_0_2px_rgba(255,255,255,0.4)] focus:shadow-md transition-all duration-300"'
);

// Mobile search bar focus effect
code = code.replace(
  'className="w-full h-10 pl-10 pr-4 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-shadow"',
  'className="w-full h-10 pl-10 pr-4 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-all duration-300"'
);

// Categories bar borders/shadows
code = code.replace(
  'className="bg-white border-b shadow-sm hidden md:block"',
  'className="bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hidden md:block relative z-40"'
);
code = code.replace(
  'className="text-sm font-medium text-gray-800 hover:text-[#2874f0] flex items-center gap-1"',
  'className="text-[13px] font-semibold text-[#1a1a1a] hover:text-[#2874f0] flex items-center gap-1 uppercase tracking-wide transition-colors"'
);

// We need a global replace for the categories links because they're mapped and there is one "Shop All"
code = code.replace(
  /className="text-sm font-medium text-gray-800 hover:text-\[\#2874f0\] flex items-center gap-1"/g,
  'className="text-[13px] font-semibold text-[#1a1a1a] hover:text-[#2874f0] flex items-center gap-1 uppercase tracking-wide transition-colors"'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
