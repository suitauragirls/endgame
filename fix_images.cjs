const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');

const p7_images = [
  '/images/p7/light-blue.webp',
  '/images/p7/baby-pink.webp',
  '/images/p7/red.webp',
  '/images/p7/royal-blue.webp',
  '/images/p7/hot-pink.webp',
  '/images/p7/black.webp',
  '/images/p7/ivory.webp',
  '/images/p7/orange.webp',
  '/images/p7/yellow.webp',
  '/images/p7/light-green.webp',
  '/custom_images/p7_red.png',
  '/custom_images/p7_baby_pink.png',
  '/custom_images/p7_royal_blue.png',
  '/custom_images/p7_light_blue.png',
  '/custom_images/p7_hot_pink.png',
  '/custom_images/p7_orange.png',
  '/custom_images/p7_light_green.png',
  '/custom_images/p7_black.png',
  '/custom_images/p7_ivory.png',
  '/custom_images/p7_yellow.png'
];

const p8_images = [
  '/custom_images/p8_hot_pink.png',
  '/custom_images/p8_royal_blue.png',
  '/custom_images/p8_light_blue.png',
  '/custom_images/p8_black.png',
  '/custom_images/p8_peach.png',
  '/custom_images/p8_wine.png',
  '/custom_images/p8_bottle_green.png',
  '/custom_images/p8_red.png'
];

const p9_images = [
  '/custom_images/p9_beige.png',
  '/custom_images/p9_brown.png'
];

const p10_images = [];
const p11_images = [];

const p12_images = [
  '/custom_images/p12_rani_pink.png'
];

function replaceImages(code, id, imagesArray) {
  const regex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?images:\\s*\\[([\\s\\S]*?)\\]`);
  const replacement = imagesArray.length > 0 
    ? '\\n' + imagesArray.map(img => `      '${img}'`).join(',\\n') + '\\n    '
    : '';
  return code.replace(regex, (match, imagesBlock) => {
    return match.replace(imagesBlock, replacement);
  });
}

code = replaceImages(code, 'p7', p7_images);
code = replaceImages(code, 'p8', p8_images);
code = replaceImages(code, 'p9', p9_images);
code = replaceImages(code, 'p10', p10_images);
code = replaceImages(code, 'p11', p11_images);
code = replaceImages(code, 'p12', p12_images);

fs.writeFileSync('src/data.ts', code);
