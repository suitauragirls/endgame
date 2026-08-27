import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';


interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { customImages } = useProducts();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentColor = product.colors && product.colors[currentImageIndex] ? product.colors[currentImageIndex] : '';
  const customImg = currentColor && customImages[product.id] && customImages[product.id][currentColor] ? customImages[product.id][currentColor] : null;
  
  const displayImage = customImg || product.images[currentImageIndex] || product.images[0];
  
  const nextColor = product.colors && product.colors[currentImageIndex + 1] ? product.colors[currentImageIndex + 1] : '';
  const customHoverImg = nextColor && customImages[product.id] && customImages[product.id][nextColor] ? customImages[product.id][nextColor] : null;
  const displayImageHover = customHoverImg || product.images[currentImageIndex + 1] || product.images[1] || displayImage;

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-lg md:rounded-xl overflow-hidden hover:shadow-[0_16px_36px_rgba(90,32,57,0.12)] transition-all duration-500 relative border border-[#eadfe0] hover:border-[#d9a7b7] hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f9fa] group-hover:bg-[#f1f3f6] transition-colors duration-300">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          {displayImage ? <img src={displayImage} alt={product.name} className="object-contain w-full h-full object-center group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-[#9d3658]">Image pending</div>}
        </Link>
      
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
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/95 hover:bg-white text-gray-400 hover:text-red-500 hover:shadow-lg transition-all duration-300 z-10 shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:scale-110"
          aria-label="Wishlist"
        >
          <Heart size={18} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
        </button>
</div>
      
      <div className="flex flex-col p-3 md:p-4">
        <Link to={`/product/${product.id}`} className="text-[13px] md:text-[15px] font-medium text-[#2b1a21] hover:text-[#9d3658] line-clamp-2 leading-tight md:leading-snug mb-1.5 md:mb-2 transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center flex-wrap gap-1.5 md:gap-2 pt-1">
          <span className="text-[15px] md:text-[17px] font-bold text-[#212121]">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <>
              <span className="text-[11px] md:text-[13px] text-[#878787] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-[11px] md:text-[13px] font-bold text-[#388e3c] tracking-wide">{discountPercent}% off</span>
            </>
          )}
        </div>
        
        {/* Colors (keeping functional as user requested not to break color variants) */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 pt-3">
            {product.colors.map((color, idx) => (
              <button 
                key={idx}
                onMouseEnter={() => {
                  if (idx < product.images.length) {
                    setCurrentImageIndex(idx);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (idx < product.images.length) {
                    setCurrentImageIndex(idx);
                  }
                }}
                className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all ${currentImageIndex === idx ? 'ring-1 ring-[#2874f0] ring-offset-1' : 'border-gray-200'}`}
                style={{ 
                  backgroundColor: color.toLowerCase().replace(' ', ''),
                  ...(color === 'Light Blue' && { backgroundColor: '#ADD8E6' }),
                  ...(color === 'Baby Pink' && { backgroundColor: '#F4C2C2' }),
                  ...(color === 'Royal Blue' && { backgroundColor: '#4169E1' }),
                  ...(color === 'Hot Pink' && { backgroundColor: '#FF69B4' }),
                  ...(color === 'Light Green' && { backgroundColor: '#90EE90' }),
                  ...(color === 'Bottle Green' && { backgroundColor: '#006A4E' }),
                  ...(color === 'Wine' && { backgroundColor: '#722F37' }),
                  ...(color === 'Peach' && { backgroundColor: '#FFCBA4' }),
                }}
                title={color}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">+{product.colors.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};
