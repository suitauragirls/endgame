const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

code = code.replace(/className="text-xs text-\[\#878787\] uppercase font-normal mb-4"/g, 'className="text-[13px] text-[#878787] uppercase tracking-wider font-semibold mb-4"');

code = code.replace(/className="space-y-2 text-xs font-medium text-white"/g, 'className="space-y-3 text-[13px] font-medium text-[#c8c8c8] hover:[&_a]:text-white transition-colors"');

fs.writeFileSync('src/components/Footer.tsx', code);
