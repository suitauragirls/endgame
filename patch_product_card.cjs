const fs = require('fs');
let code = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

if (!code.includes('useWishlist')) {
  code = code.replace("import { useProducts } from '../context/ProductContext';", "import { useProducts } from '../context/ProductContext';\nimport { useWishlist } from '../context/WishlistContext';\nimport { Heart } from 'lucide-react';");
}

code = code.replace("const { customImages } = useProducts();", "const { customImages } = useProducts();\n  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();\n  const inWishlist = isInWishlist(product.id);");

const heartIconCode = `
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (inWishlist) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 transition-colors z-10 shadow-sm"
          aria-label="Wishlist"
        >
          <Heart size={18} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
        </button>
`;

code = code.replace('</Link>\n      </div>', '</Link>\n      ' + heartIconCode + '</div>');

fs.writeFileSync('src/components/ProductCard.tsx', code);
