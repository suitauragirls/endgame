const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Add os import if not present
if (!code.includes('import os from')) {
  code = code.replace('import fsSync from "fs";', 'import fsSync from "fs";\nimport os from "os";');
}

// Replace filepath in upload route
code = code.replace(
  "const filepath = path.join(process.cwd(), 'public', 'custom_images', filename);",
  "const filepath = isProd ? path.join(os.tmpdir(), 'custom_images', filename) : path.join(process.cwd(), 'public', 'custom_images', filename);"
);

// Add express.static for tmpdir in production
code = code.replace(
  'app.use(express.static(distPath));',
  'app.use(express.static(distPath));\n    app.use("/custom_images", express.static(path.join(os.tmpdir(), "custom_images")));'
);

fs.writeFileSync('server.ts', code);
