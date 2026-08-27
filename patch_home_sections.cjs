const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Container padding and shadows
code = code.replace(
  /<div className="bg-white shadow-sm p-4">/g,
  '<div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04)] md:rounded-md p-3 md:p-6 border border-gray-100">'
);

// Grid gap
code = code.replace(
  /<div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">/g,
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">'
);

// Header titles
code = code.replace(
  /<h2 className="text-xl font-bold text-\[\#212121\]">/g,
  '<h2 className="text-lg md:text-2xl font-bold text-[#212121]">'
);

// View All buttons
code = code.replace(
  /className="bg-\[\#2874f0\] text-white px-4 py-1\.5 text-sm rounded-sm font-medium shadow-sm hover:bg-\[\#1a5bbf\]"/g,
  'className="bg-[#2874f0] text-white px-4 md:px-5 py-1.5 md:py-2 text-[13px] md:text-sm rounded-md font-semibold shadow-sm hover:shadow-md hover:bg-[#1a5bbf] transition-all"'
);

// Section Wrapper padding
code = code.replace(
  /<section className="max-w-7xl mx-auto px-2 sm:px-4 mb-2 md:mb-4">/g,
  '<section className="max-w-7xl mx-auto px-0 md:px-4 mb-3 md:mb-6">'
);

fs.writeFileSync('src/pages/Home.tsx', code);
