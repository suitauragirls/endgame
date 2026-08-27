const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.tsx', 'utf8');

code = code.replace(
  `import { useProducts } from '../context/ProductContext';`,
  `import { useProducts } from '../context/ProductContext';\nimport { Search, X } from 'lucide-react';\nimport { useState, useEffect } from 'react';`
);

code = code.replace(
  `const searchParams = new URLSearchParams(location.search);`,
  `const searchParams = new URLSearchParams(location.search);\n  const navigate = require('react-router-dom').useNavigate();`
);

code = code.replace(
  `const searchQuery = searchParams.get('q');`,
  `const urlSearchQuery = searchParams.get('q') || '';\n  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);\n  useEffect(() => { setSearchQuery(urlSearchQuery); }, [urlSearchQuery]);`
);

code = code.replace(
  `{/* Product Grid */}`,
  `{/* Product Grid */}`
);

code = code.replace(
  `<div className="flex-1 bg-white shadow-sm p-4">`,
  `<div className="flex-1 bg-white shadow-sm p-4">\n          {/* Search Bar */}\n          <div className="mb-6 relative">\n            <div className="relative flex items-center w-full h-12 rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:border-[#2874f0] focus-within:ring-1 focus-within:ring-[#2874f0] transition-all shadow-sm">\n              <div className="pl-4 pr-2 text-gray-400">\n                <Search size={20} />\n              </div>\n              <input\n                type="text"\n                value={searchQuery}\n                onChange={(e) => setSearchQuery(e.target.value)}\n                placeholder="Search products by name, color, or feature..."\n                className="w-full h-full outline-none text-gray-700 text-sm md:text-base pr-4"\n              />\n              {searchQuery && (\n                <button\n                  onClick={() => setSearchQuery('')}\n                  className="px-4 text-gray-400 hover:text-gray-600 transition-colors"\n                >\n                  <X size={20} />\n                </button>\n              )}\n            </div>\n          </div>`
);

// We need to change the condition for displaying "Search results for"
code = code.replace(
  `{searchQuery && (\n            <div className="mb-4 pb-2 border-b border-gray-200">\n              <h2 className="text-lg font-bold text-[#212121]">Search results for "{searchQuery}"</h2>\n              <p className="text-[#878787] text-sm">{filteredProducts.length} items found</p>\n            </div>\n          )}`,
  `{searchQuery && (\n            <div className="mb-4 pb-2 border-b border-gray-200">\n              <h2 className="text-lg font-bold text-[#212121]">Search results for "{searchQuery}"</h2>\n              <p className="text-[#878787] text-sm">{filteredProducts.length} items found</p>\n            </div>\n          )}`
);

fs.writeFileSync('src/pages/Shop.tsx', code);
