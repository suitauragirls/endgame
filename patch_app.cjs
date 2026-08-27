const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace("import { CartProvider } from './context/CartContext';", "import { CartProvider } from './context/CartContext';\nimport { WishlistProvider } from './context/WishlistContext';\nimport { Wishlist } from './pages/Wishlist';");

code = code.replace("<CartProvider>", "<CartProvider>\n        <WishlistProvider>");
code = code.replace("</CartProvider>", "        </WishlistProvider>\n      </CartProvider>");

code = code.replace('<Route path="/cart" element={<Cart />} />', '<Route path="/cart" element={<Cart />} />\n                <Route path="/wishlist" element={<Wishlist />} />');

fs.writeFileSync('src/App.tsx', code);
