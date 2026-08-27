const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

if (!code.includes('useWishlist')) {
  code = code.replace("import { useProducts } from '../context/ProductContext';", "import { useProducts } from '../context/ProductContext';\nimport { useWishlist } from '../context/WishlistContext';");
}

if (!code.includes('const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();')) {
  code = code.replace("const { addToCart } = useCart();", "const { addToCart } = useCart();\n  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();");
}

code = code.replace("const [error, setError] = useState('');", "const [error, setError] = useState('');\n  const inWishlist = product ? isInWishlist(product.id) : false;");

const wishlistBtn = `
                <button 
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"
                >
                  <Heart size={20} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
                </button>`;
                
code = code.replace(/<h1 className="text-xl md:text-2xl text-\[\#212121\] mb-2">\{product\.name\}<\/h1>/, `<div className="flex justify-between items-start gap-4">\n              <h1 className="text-xl md:text-2xl text-[#212121] mb-2 flex-1">{product.name}</h1>\n${wishlistBtn}\n            </div>`);

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
