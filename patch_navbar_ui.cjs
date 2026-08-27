const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Desktop Search Bar styling
code = code.replace(
  'className="w-full h-9 pl-4 pr-10 rounded-sm outline-none text-[#212121] text-sm shadow-sm"',
  'className="w-full h-10 pl-4 pr-10 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-shadow"'
);

// Mobile Search Bar styling
code = code.replace(
  'className="w-full h-10 pl-10 pr-4 rounded-sm outline-none text-[#212121] text-sm"',
  'className="w-full h-10 pl-10 pr-4 rounded-md outline-none text-[#212121] text-sm shadow-sm focus:shadow-md transition-shadow"'
);

// Category bar spacing
code = code.replace(
  'className="flex justify-center space-x-12 py-3"',
  'className="flex justify-center space-x-12 py-3.5"'
);

// Top header height and alignment
code = code.replace(
  'className="bg-[#2874f0] w-full h-[56px] flex items-center"',
  'className="bg-[#2874f0] w-full h-[64px] flex items-center"'
);

// Spacer height adjustment (from 105 to 113 for mobile, 101 to 109 for desktop - wait, top header was 56, now 64, difference is 8px)
code = code.replace(
  'className="h-[105px] md:h-[101px]"',
  'className="h-[113px] md:h-[116px]"' // categories are py-3.5, roughly 48px + 64px = 112px
);

fs.writeFileSync('src/components/Navbar.tsx', code);
