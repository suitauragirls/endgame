const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  'className="border border-gray-200 rounded-sm p-4"',
  'className="bg-white border border-gray-100 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow"'
);

code = code.replace(
  'className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center"',
  'className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center"'
);

fs.writeFileSync('src/pages/Home.tsx', code);
