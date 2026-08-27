const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

code = code.replace(
  'className="bg-[#172337] text-white pt-10 pb-6 border-t border-gray-200 mt-auto"',
  'className="bg-[#172337] text-white pt-12 pb-8 border-t border-gray-200 mt-auto"'
);

code = code.replace(
  'className="text-xs text-[#878787] uppercase font-normal mb-4"',
  'className="text-[13px] text-[#878787] uppercase tracking-wider font-semibold mb-4"'
);

fs.writeFileSync('src/components/Footer.tsx', code);
