const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.tsx', 'utf8');

code = code.replace("const categoryFilter = searchParams.get('category');", "const categoryFilter = searchParams.get('category');\n  const searchQuery = searchParams.get('q');");

code = code.replace(
  "const filteredProducts = categoryFilter \n    ? products.filter(p => p.category === categoryFilter)\n    : products;",
  `let filteredProducts = products;
  
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }
  
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.colors && p.colors.some(c => c.toLowerCase().includes(q))) ||
      (p.features && p.features.some(f => f.toLowerCase().includes(q))) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }`
);

code = code.replace(
  "<div className=\"flex-1 bg-white shadow-sm p-4\">",
  `<div className="flex-1 bg-white shadow-sm p-4">
          {searchQuery && (
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#212121]">Search results for "{searchQuery}"</h2>
              <p className="text-[#878787] text-sm">{filteredProducts.length} items found</p>
            </div>
          )}`
);

code = code.replace(
  "<p className=\"text-gray-500\">No products found in this category.</p>",
  "<p className=\"text-[#878787]\">No products found matching your criteria.</p>"
);

// Keep "All Products" link as /shop, which clears filters
code = code.replace(
  /!categoryFilter \? 'text-\[\#2874f0\] font-bold' : 'text-\[\#212121\] hover:text-\[\#2874f0\]'/,
  "!categoryFilter && !searchQuery ? 'text-[#2874f0] font-bold' : 'text-[#212121] hover:text-[#2874f0]'"
);

fs.writeFileSync('src/pages/Shop.tsx', code);
