const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  'if (process.env.NODE_ENV !== "production") {',
  'const isProd = process.env.NODE_ENV === "production" || fsSync.existsSync(path.join(process.cwd(), "dist", "index.html"));\n  if (!isProd) {'
);
code = code.replace(
  'import fs from "fs/promises";',
  'import fs from "fs/promises";\nimport fsSync from "fs";'
);
fs.writeFileSync('server.ts', code);
