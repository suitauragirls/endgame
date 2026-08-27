const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// For p9, ensure it only uses p9 images
code = code.replace(/id:\s*'p9'[\s\S]*?images:\s*\[([\s\S]*?)\]/, (match, imagesBlock) => {
  let newImagesBlock = imagesBlock.replace(/\/images\/p7\/royal-blue\.webp/g, '/custom_images/p9_beige.png');
  newImagesBlock = newImagesBlock.replace(/\/images\/p7\/black\.webp/g, '/custom_images/p9_brown.png');
  newImagesBlock = newImagesBlock.replace(/\/images\/p7\/yellow\.webp/g, '/custom_images/p9_beige.png');
  newImagesBlock = newImagesBlock.replace(/\/custom_images\/p8_royal_blue\.png/g, '/custom_images/p9_brown.png');
  return match.replace(imagesBlock, newImagesBlock);
});

fs.writeFileSync('src/data.ts', code);
