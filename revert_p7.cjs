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
  code = code.replace(new RegExp(originalPath, 'g'), customPath);
}

fs.writeFileSync('src/data.ts', code);
