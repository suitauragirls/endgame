const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// Reverse p7
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
  code = code.replace(new RegExp(originalPath, 'g'), customPath);
}

const missing_products = ['p9', 'p10', 'p11', 'p12'];
for (const p of missing_products) {
  // placehold.co images are generated with ?text=color
  code = code.replace(new RegExp('https://placehold.co/600x800/eeeeee/333333\\?text=([a-z_]+)', 'g'), (match, color) => {
    // Actually wait, this is doing it globally, I don't know which product it belongs to!
    // But since they are ordered, we can just look for the id block.
    return match;
  });
}
fs.writeFileSync('src/data.ts', code);
