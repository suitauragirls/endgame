const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const p7_map = {
  'Light Blue': 'light-blue.webp',
  'Baby Pink': 'baby-pink.webp',
  'Red': 'red.webp',
  'Royal Blue': 'royal-blue.webp',
  'Hot Pink': 'hot-pink.webp',
  'Black': 'black.webp',
  'Ivory': 'ivory.webp',
  'Orange': 'orange.webp',
  'Yellow': 'yellow.webp',
  'Light Green': 'light-green.webp'
};

for (const [color, filename] of Object.entries(p7_map)) {
  const customPath = '/custom_images/p7_' + color.toLowerCase().replace(/\s+/g, '_') + '.png';
  const originalPath = '/images/p7/' + filename;
  // Reverse: replace originalPath with customPath
  code = code.replace(new RegExp(originalPath, 'g'), customPath);
}

const missing_products = ['p9', 'p10', 'p11', 'p12'];
for (const p of missing_products) {
  // We matched: '/custom_images/' + p + '_([a-z_]+)\\.png'
  // And replaced with: 'https://placehold.co/600x800/eeeeee/333333?text=$1'
  // To reverse: replace placehold back to custom_images
  code = code.replace(new RegExp('https://placehold.co/600x800/eeeeee/333333\\?text=([a-z_]+)', 'g'), (match, p1) => {
     // Wait, we lost the product ID in the regex if we just matchplacehold.co
     // But wait, they are in blocks for each product.
     return `__PLACEHOLDER_${p1}__`; 
  });
}
fs.writeFileSync('src/data.ts', code);
