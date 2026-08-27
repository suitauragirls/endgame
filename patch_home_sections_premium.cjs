const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Section containers
code = code.replace(
  /<div className="bg-white shadow-\[0_2px_4px_rgba\(0,0,0,0\.04\)\] md:rounded-md p-3 md:p-6 border border-gray-100">/g,
  '<div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:rounded-xl p-4 md:p-8 border border-gray-100/50">'
);

// Section headers (border bottom spacing)
code = code.replace(
  /<div className="flex justify-between items-center mb-4 border-b pb-4">/g,
  '<div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-5">'
);

// Heading text
code = code.replace(
  /<h2 className="text-lg md:text-2xl font-bold text-\[\#212121\]">/g,
  '<h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight">'
);

code = code.replace(
  /<h2 className="text-xl font-bold text-\[\#212121\] mb-6">/g, // for customer reviews section
  '<h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight mb-8">'
);

// VIEW ALL button
code = code.replace(
  /className="bg-\[\#2874f0\] text-white px-4 md:px-5 py-1\.5 md:py-2 text-\[13px\] md:text-sm rounded-md font-semibold shadow-sm hover:shadow-md hover:bg-\[\#1a5bbf\] transition-all"/g,
  'className="bg-[#2874f0] text-white px-5 py-2 md:px-6 md:py-2.5 text-[12px] md:text-[13px] rounded-full font-bold tracking-wide shadow-[0_4px_12px_rgba(40,116,240,0.25)] hover:shadow-[0_6px_16px_rgba(40,116,240,0.35)] hover:bg-[#1a5bbf] hover:-translate-y-0.5 transition-all duration-300"'
);

// Wrapper padding mb
code = code.replace(
  /<section className="max-w-7xl mx-auto px-0 md:px-4 mb-3 md:mb-6">/g,
  '<section className="max-w-7xl mx-auto px-0 md:px-4 mb-6 md:mb-10">'
);

fs.writeFileSync('src/pages/Home.tsx', code);
