const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');
code = code.replace(/\\n/g, '\n');
fs.writeFileSync('src/data.ts', code);
