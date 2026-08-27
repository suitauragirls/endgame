import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Shop: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const categoryFilter = searchParams.get('category');
  const saleFilter = searchParams.get('sale') === 'true';
  const urlSearchQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  useEffect(() => { setSearchQuery(urlSearchQuery); }, [urlSearchQuery]);
  const { products, categories } = useProducts();

  let filteredProducts = products;
  
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }

  if (saleFilter) {
    filteredProducts = filteredProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
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
  }

  return (
    <div className="min-h-screen pt-4 pb-8 bg-[#f1f3f6]">
      {/* Shop Header */}
      

      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-2 md:gap-4 mt-2">
        
        {/* Filters Sidebar */}
        <div className="w-full md:w-[280px] shrink-0 bg-white shadow-sm">
          <div className="sticky top-[120px] p-4">
            <h3 className="text-lg font-medium text-[#212121] mb-4 border-b border-gray-200 pb-3">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/shop" className={`text-sm font-medium ${!categoryFilter && !searchQuery ? 'text-[#2874f0] font-bold' : 'text-[#212121] hover:text-[#2874f0]'}`}>All Products</Link>
              </li>
              {categories.map(category => (
                <li key={category}>
                  <Link to={`/shop?category=${category}`} className={`text-sm font-medium ${categoryFilter === category ? 'text-[#2874f0] font-bold' : 'text-[#212121] hover:text-[#2874f0]'}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 bg-white shadow-sm p-4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="relative flex items-center w-full h-12 rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:border-[#2874f0] focus-within:ring-1 focus-within:ring-[#2874f0] transition-all shadow-sm">
              <div className="pl-4 pr-2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, color, or feature..."
                className="w-full h-full outline-none text-gray-700 text-sm md:text-base pr-4"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          {searchQuery && (
            <div className="mb-4 pb-2 border-b border-gray-200">
              <h2 className="text-lg font-bold text-[#212121]">Search results for "{searchQuery}"</h2>
              <p className="text-[#878787] text-sm">{filteredProducts.length} items found</p>
            </div>
          )}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#878787]">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};
