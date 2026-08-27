const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace('"Priya S."', '"Neha S."');
code = code.replace('"Ananya M."', '"Sneha M."');
code = code.replace('"Ritu K."', '"Kavya K."');

fs.writeFileSync('src/pages/Home.tsx', code);
