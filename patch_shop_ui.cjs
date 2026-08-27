const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.tsx', 'utf8');

code = code.replace(
  'className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8"',
  'className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"'
);

fs.writeFileSync('src/pages/Shop.tsx', code);
