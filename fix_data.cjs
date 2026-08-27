const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// 1. Restore p7 to /images/p7/...
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

code = code.replace(/id:\s*'p7'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  let newImagesBlock = imagesBlock;
  for (const [color, filename] of Object.entries(p7_map)) {
    const customPath = '/custom_images/p7_' + color.toLowerCase().replace(/\s+/g, '_') + '.png';
    const originalPath = '/images/p7/' + filename;
    newImagesBlock = newImagesBlock.replace(new RegExp(customPath, 'g'), originalPath);
  }
  return match.replace(imagesBlock, newImagesBlock);
});

// 2. p8 should already be /custom_images/p8_... which is correct as it exists.
// Let's verify p8 uses /custom_images/
code = code.replace(/id:\s*'p8'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  return match; // It should be correct.
});

// 3. For p9, p10, p11, p12, we must replace any placeholder or broken /custom_images/ paths with valid existing paths.
const valid_images = {
  'beige': '/custom_images/p9_beige.png',
  'brown': '/custom_images/p9_brown.png',
  'royal_blue': '/images/p7/royal-blue.webp',
  'black': '/images/p7/black.webp',
  'yellow': '/images/p7/yellow.webp',
  'navy_blue': '/custom_images/p8_royal_blue.png',
  
  'maroon': '/custom_images/p8_wine.png',
  'ivory': '/images/p7/ivory.webp',
  'peach': '/custom_images/p8_peach.png',
  'red': '/images/p7/red.webp',
  'rani_pink': '/custom_images/p12_rani_pink.png',
  
  'pink': '/images/p7/baby-pink.webp',
  'purple': '/custom_images/p8_wine.png',
  'green': '/custom_images/p8_bottle_green.png',
};

const missing_products = ['p9', 'p10', 'p11', 'p12'];
for (const p of missing_products) {
  const regex = new RegExp(`id:\\s*'${p}'[\\s\\S]*?images:\\s*\\[([\\s\\S]*?)\\]`);
  code = code.replace(regex, (match, imagesBlock) => {
    let newImagesBlock = imagesBlock;
    
    // Check what is currently there. It could be placehold.co or /custom_images/pX_color.png
    // We will extract each line and replace it.
    newImagesBlock = newImagesBlock.replace(/['"](.*?)['"]/g, (m, url) => {
      // Determine the color from the url
      let colorKey = '';
      if (url.includes('placehold.co')) {
        const match = url.match(/text=([a-z_]+)/);
        if (match) colorKey = match[1];
      } else if (url.includes('/custom_images/')) {
        const match = url.match(/\/custom_images\/p\d+_([a-z_]+)\.png/);
        if (match) colorKey = match[1];
      }
      
      if (colorKey) {
        return "'" + (valid_images[colorKey] || '/images/p7/black.webp') + "'";
      }
      return m;
    });
    
    return match.replace(imagesBlock, newImagesBlock);
  });
}

fs.writeFileSync('src/data.ts', code);
