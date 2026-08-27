const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const p10_images = [
  '/custom_images/p8_wine.png',
  '/images/p7/ivory.webp',
  '/custom_images/p8_royal_blue.png',
  '/custom_images/p8_peach.png',
  '/images/p7/red.webp',
  '/images/p7/black.webp',
  '/custom_images/p12_rani_pink.png'
];

const p11_images = [
  '/custom_images/p8_royal_blue.png',
  '/images/p7/yellow.webp',
  '/custom_images/p9_brown.png',
  '/custom_images/p12_rani_pink.png',
  '/custom_images/p8_peach.png',
  '/images/p7/black.webp',
  '/custom_images/p8_wine.png'
];

const p12_images = [
  '/images/p7/baby-pink.webp',
  '/custom_images/p8_wine.png',
  '/images/p7/red.webp',
  '/images/p7/yellow.webp',
  '/custom_images/p12_rani_pink.png',
  '/images/p7/light-green.webp',
  '/custom_images/p8_peach.png',
  '/custom_images/p8_wine.png',
  '/images/p7/black.webp'
];

code = code.replace(/id:\s*'p10'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  return match.replace(imagesBlock, '\n' + p10_images.map(img => `      '${img}'`).join(',\n') + '\n    ');
});

code = code.replace(/id:\s*'p11'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  return match.replace(imagesBlock, '\n' + p11_images.map(img => `      '${img}'`).join(',\n') + '\n    ');
});

code = code.replace(/id:\s*'p12'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  return match.replace(imagesBlock, '\n' + p12_images.map(img => `      '${img}'`).join(',\n') + '\n    ');
});

fs.writeFileSync('src/data.ts', code);
