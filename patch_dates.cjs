const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

code = code.replace("'Oct 12, 2023'", "'Aug 12, 2026'");
code = code.replace("'Oct 05, 2023'", "'Aug 05, 2026'");

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
