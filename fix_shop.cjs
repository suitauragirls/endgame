const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.tsx', 'utf8');
code = code.replace(`const navigate = require('react-router-dom').useNavigate();`, ``);
fs.writeFileSync('src/pages/Shop.tsx', code);
