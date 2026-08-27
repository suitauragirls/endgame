import { createServer } from 'vite';
async function run() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  const mod = await vite.ssrLoadModule('/src/data.ts');
  const p7 = mod.PRODUCTS.find(p => p.id === 'p7');
  console.log("Images for p7:", p7.images);
  process.exit(0);
}
run();
