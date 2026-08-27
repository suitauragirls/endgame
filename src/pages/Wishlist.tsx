import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-4">
        <div className="bg-white shadow-sm p-4 md:p-6 mb-4">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
            <h1 className="text-xl font-bold text-[#212121]">My Wishlist ({wishlist.length})</h1>
          </div>
          
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-32 h-32 mb-6">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-lg font-bold text-[#212121] mb-2">Empty Wishlist</h2>
              <p className="text-[#878787] mb-6">You have no items in your wishlist. Start adding!</p>
              <Link 
                to="/shop" 
                className="px-6 py-3 bg-[#2874f0] text-white font-medium shadow-sm hover:bg-[#1a5bbf] transition-colors rounded-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
