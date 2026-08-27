const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

// Insert getReviewerNames function before ProductDetail component
const funcString = `
const nameList = ["Neha", "Pooja", "Sneha", "Riya", "Simran", "Komal", "Ayesha", "Shreya", "Nisha", "Kavya", "Muskan", "Tanya", "Sakshi", "Mehak", "Divya", "Anjali", "Kritika", "Payal", "Isha", "Radhika"];
const lastNames = ["S.", "M.", "K.", "R.", "P.", "D.", "V.", "J.", "A.", "G.", "B."];

const getReviewerNames = (productId: string | undefined) => {
  const sum = (productId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const idx1 = sum % nameList.length;
  const idx2 = (sum + 7) % nameList.length;
  const ln1 = lastNames[sum % lastNames.length];
  const ln2 = lastNames[(sum + 3) % lastNames.length];
  return [\`\${nameList[idx1]} \${ln1}\`, \`\${nameList[idx2]} \${ln2}\`];
};

export const ProductDetail: React.FC = () => {`;

code = code.replace("export const ProductDetail: React.FC = () => {", funcString);

// Replace useState initialization
code = code.replace(
  /const \[reviews, setReviews\] = useState\(\[\s*\{\s*id: 1,\s*name: 'Priya S.',\s*rating: 5,\s*text: 'Amazing quality!',\s*date: 'Aug 12, 2026'\s*\},\s*\{\s*id: 2,\s*name: 'Ananya M.',\s*rating: 4,\s*text: 'Looks exactly like the picture.',\s*date: 'Aug 05, 2026'\s*\}\s*\]\);/,
  `const [reviews, setReviews] = useState(() => {
    const pNames = getReviewerNames(id);
    return [
      { id: 1, name: pNames[0], rating: 5, text: 'Amazing quality!', date: 'Aug 12, 2026' },
      { id: 2, name: pNames[1], rating: 4, text: 'Looks exactly like the picture.', date: 'Aug 05, 2026' }
    ];
  });`
);

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
