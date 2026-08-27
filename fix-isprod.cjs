const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Remove isProd from the bottom
code = code.replace(
  'const isProd = process.env.NODE_ENV === "production" || fsSync.existsSync(path.join(process.cwd(), "dist", "index.html"));\n  if (!isProd) {',
  'if (!isProd) {'
);

// Add isProd at the top of startServer
code = code.replace(
  'async function startServer() {\n  const app = express();',
  'async function startServer() {\n  const isProd = process.env.NODE_ENV === "production" || fsSync.existsSync(path.join(process.cwd(), "dist", "index.html"));\n  const app = express();'
);

fs.writeFileSync('server.ts', code);
