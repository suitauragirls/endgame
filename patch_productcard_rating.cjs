const fs = require('fs');
let code = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

const helper = `
const getRatingAndReviews = (id: string) => {
  const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4.0 + ((sum % 10) / 10);
  const reviews = (sum * 13 % 3000) + 150;
  return { rating: rating.toFixed(1), reviews: reviews.toLocaleString('en-IN') };
};
`;

if (!code.includes('getRatingAndReviews')) {
    code = code.replace(
        'interface ProductCardProps {',
        helper + '\ninterface ProductCardProps {'
    );
}

// Inside component, get the values
if (!code.includes('const { rating, reviews } = getRatingAndReviews')) {
    code = code.replace(
        'const discountPercent =',
        'const { rating, reviews } = getRatingAndReviews(product.id);\n  const discountPercent ='
    );
}

// Replace the hardcoded DOM values
code = code.replace(
    '4.4 ★',
    '{rating} ★'
);
code = code.replace(
    '(1,234)',
    '({reviews})'
);

fs.writeFileSync('src/components/ProductCard.tsx', code);
