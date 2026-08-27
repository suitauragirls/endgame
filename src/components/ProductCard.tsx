import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';


const getRatingAndReviews = (id: string) => {
  const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4.0 + ((sum % 10) / 10);
  const reviews = (sum * 13 % 3000) + 150;
  return { rating: rating.toFixed(1), reviews: reviews.toLocaleString('en-IN') };
};

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

  const { rating, reviews } = getRatingAndReviews(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-lg md:rounded-xl overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-300 relative border border-gray-100/80 hover:border-[#2874f0]/20 hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f9fa] group-hover:bg-[#f1f3f6] transition-colors duration-300">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="object-contain w-full h-full object-center group-hover:scale-105 transition-transform duration-500"
          />
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
        <Link to={`/product/${product.id}`} className="text-[13px] md:text-[15px] font-medium text-[#1a1a1a] hover:text-[#2874f0] line-clamp-2 leading-tight md:leading-snug mb-1.5 md:mb-2">
          {product.name}
        </Link>
        <div className="flex items-center space-x-1 mb-1">
           <span className="bg-[#388e3c] text-white text-[10px] md:text-[11px] font-bold px-1 md:px-1.5 py-0.5 rounded-sm flex items-center">
             {rating} ★
           </span>
           <span className="text-[#878787] text-[10px] md:text-xs">({reviews})</span>
           <img width="50" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="ml-1 md:ml-2 h-[14px] md:h-auto object-contain" />
        </div>
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
