const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

let p9_re = /id:\s*'p9'[\s\S]*?images:\s*\[([\s\S]*?)\]/;
let p10_re = /id:\s*'p10'[\s\S]*?images:\s*\[([\s\S]*?)\]/;
let p11_re = /id:\s*'p11'[\s\S]*?images:\s*\[([\s\S]*?)\]/;
let p12_re = /id:\s*'p12'[\s\S]*?images:\s*\[([\s\S]*?)\]/;

function fixProductImages(codeStr, regex, productId) {
  return codeStr.replace(regex, (match, imagesBlock) => {
    let newImagesBlock = imagesBlock.replace(/'https:\/\/placehold\.co\/600x800\/eeeeee\/333333\?text=([a-z_]+)'/g, "'/custom_images/" + productId + "_$1.png'");
    return match.replace(imagesBlock, newImagesBlock);
  });
}

code = fixProductImages(code, p9_re, 'p9');
code = fixProductImages(code, p10_re, 'p10');
code = fixProductImages(code, p11_re, 'p11');
code = fixProductImages(code, p12_re, 'p12');

fs.writeFileSync('src/data.ts', code);
