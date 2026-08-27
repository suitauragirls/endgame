const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace DB_FILE
code = code.replace(
  'const DB_FILE = path.join(process.cwd(), "orders_db.json");',
  'const isProdGlobal = process.env.NODE_ENV === "production" || fsSync.existsSync(path.join(process.cwd(), "dist", "index.html"));\nconst DB_FILE = isProdGlobal ? path.join(os.tmpdir(), "orders_db.json") : path.join(process.cwd(), "orders_db.json");'
);

// Replace IMAGES_DB_FILE
code = code.replace(
  'const IMAGES_DB_FILE = path.join(process.cwd(), "src", "custom_images.json");',
  'const IMAGES_DB_FILE = isProdGlobal ? path.join(os.tmpdir(), "custom_images.json") : path.join(process.cwd(), "src", "custom_images.json");'
);

fs.writeFileSync('server.ts', code);
