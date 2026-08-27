import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Clock, Share2, Copy, Heart, Star, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';


const nameList = ["Neha", "Pooja", "Sneha", "Riya", "Simran", "Komal", "Ayesha", "Shreya", "Nisha", "Kavya", "Muskan", "Tanya", "Sakshi", "Mehak", "Divya", "Anjali", "Kritika", "Payal", "Isha", "Radhika"];
const lastNames = ["S.", "M.", "K.", "R.", "P.", "D.", "V.", "J.", "A.", "G.", "B."];

const getReviewerNames = (productId: string | undefined) => {
  const sum = (productId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const idx1 = sum % nameList.length;
  const idx2 = (sum + 7) % nameList.length;
  const ln1 = lastNames[sum % lastNames.length];
  const ln2 = lastNames[(sum + 3) % lastNames.length];
  return [`${nameList[idx1]} ${ln1}`, `${nameList[idx2]} ${ln2}`];
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, customImages, uploadCustomImage } = useProducts();
  const product = products.find(p => p.id === id);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchParams] = useSearchParams();
  const initialColor = searchParams.get('color') || '';

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [error, setError] = useState('');
  const inWishlist = product ? isInWishlist(product.id) : false;
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareSuccess, setShareSuccess] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviews, setReviews] = useState(() => {
    const pNames = getReviewerNames(id);
    return [
      { id: 1, name: pNames[0], rating: 5, text: 'Amazing quality!', date: 'Aug 12, 2026' },
      { id: 2, name: pNames[1], rating: 4, text: 'Looks exactly like the picture.', date: 'Aug 05, 2026' }
    ];
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName.trim() && reviewText.trim()) {
      const newReview = {
        id: Date.now(),
        name: reviewerName,
        rating,
        text: reviewText,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setReviews([newReview, ...reviews]);
      setReviewText('');
      setReviewerName('');
      setRating(5);
    }
  };


  const handleShare = async () => {
    const url = new URL(window.location.href);
    if (selectedColor) {
      url.searchParams.set('color', selectedColor);
    }
    const shareUrl = url.toString();
    const shareData = {
      title: product?.name,
      text: `Check out ${product?.name} for ₹${product?.price.toLocaleString('en-IN')}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or failed
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    const url = new URL(window.location.href);
    if (selectedColor) {
      url.searchParams.set('color', selectedColor);
    }
    navigator.clipboard.writeText(url.toString());
    setShareSuccess('Copied!');
    setTimeout(() => {
      setShareSuccess('');
      setShowShareMenu(false);
    }, 2000);
  };

  const shareWhatsApp = () => {
    const url = new URL(window.location.href);
    if (selectedColor) {
      url.searchParams.set('color', selectedColor);
    }
    const text = `Check out ${product?.name} for ₹${product?.price.toLocaleString('en-IN')} - ${url.toString()}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    setShowShareMenu(false);
  };

  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({});


  const handleImageUpload = (color: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !product) return;

    setIsUploading(prev => ({ ...prev, [color]: true }));
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      try {
        await uploadCustomImage(product.id, color, base64Data);
        // If this is the currently selected color, update main image
        if (selectedColor === color) {
          setMainImage(base64Data);
        }
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setIsUploading(prev => ({ ...prev, [color]: false }));
      }
    };
    reader.readAsDataURL(file);
  };

  if (!product) {
    return <div className="min-h-screen pt-32 text-center pb-20">Product not found.</div>;
  }


  
  React.useEffect(() => {
    if (product) {
      const colorToUse = selectedColor || product.colors?.[0];
      if (colorToUse) {
        if (!selectedColor) setSelectedColor(colorToUse);
        if (customImages[product.id] && customImages[product.id][colorToUse]) {
          setMainImage(customImages[product.id][colorToUse]);
        } else {
          const colorIdx = product.colors?.indexOf(colorToUse) ?? -1;
          if (colorIdx >= 0 && colorIdx < product.images.length) {
            setMainImage(product.images[colorIdx]);
          }
        }
      }
    }
  }, [product, customImages]);


  const handleAddToCart = (buyNow = false) => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('Please select a size');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setError('Please select a color');
      return;
    }
    
    setError('');
    addToCart(product, quantity, selectedSize, selectedColor);
    
    if (buyNow) {
      navigate('/checkout');
    } else {
      // Optional: show a mini-cart slider or toast here
      alert('Added to cart successfully!');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f1f3f6]">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Breadcrumb */}
        <nav className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#212121] mb-8 flex space-x-2">
          <span className="hover:text-[#2874f0] cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span className="hover:text-[#2874f0] cursor-pointer transition-colors" onClick={() => navigate('/shop')}>Shop</span>
          <span>/</span>
          <span className="hover:text-[#2874f0] cursor-pointer transition-colors" onClick={() => navigate(`/shop?category=${product.category}`)}>{product.category}</span>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Product Images */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-[600px] lg:h-[700px]">
            {/* Thumbnail Sidebar */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 hide-scrollbar">
              {product.images.map((originalImg, idx) => {
                const color = product.colors?.[idx];
                const customImg = color && customImages[product.id] && customImages[product.id][color] ? customImages[product.id][color] : null;
                const img = customImg || originalImg;
                
                return (
                  <button 
                    key={idx}
                    onClick={() => {
                      setMainImage(img);
                      if (color) {
                        setSelectedColor(color);
                      }
                    }}
                    className={`w-20 md:w-24 aspect-[3/4] shrink-0 border transition-colors overflow-hidden ${mainImage === img ? 'border-[#C5A059]' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 relative bg-gray-50 overflow-hidden h-[400px] md:h-full">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[60%] flex flex-col p-4">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-medium text-[#212121] leading-tight mb-2 flex-1">{product.name}</h1>

                <button 
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <Heart size={20} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
                </button>
            </div>
            
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-[#212121] tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-base text-[#878787] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-bold text-[#388e3c]">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            <div className="relative mb-6">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans border border-gray-200 px-4 py-2 hover:border-[#C5A059] transition-colors"
              >
                <Share2 size={14} /> Share Product
              </button>
              
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-lg z-10 w-48 p-2">
                  <button 
                    onClick={copyLink}
                    className="w-full flex items-center justify-between text-left px-3 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                  >
                    <span>Copy Link</span>
                    {shareSuccess ? <span className="text-green-600 text-xs">{shareSuccess}</span> : <Copy size={14} />}
                  </button>
                  <button 
                    onClick={shareWhatsApp}
                    className="w-full flex items-center justify-between text-left px-3 py-2 text-sm text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                  >
                    <span>WhatsApp</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </button>
                </div>
              )}
            </div>


            <p className="font-sans text-sm tracking-wide text-[#212121] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Includes */}
            {product.includes && product.includes.length > 0 && (
              <div className="mb-6 border-t border-gray-200 pt-6">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-sans text-[#1A1A1A] mb-3">What's Included</span>
                <ul className="list-disc list-inside font-sans text-sm tracking-wide text-[#212121] space-y-1">
                  {product.includes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-sans text-[#1A1A1A] mb-3">Product Features</span>
                <ul className="list-disc list-inside font-sans text-sm tracking-wide text-[#212121] space-y-1">
                  {product.features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[#878787] w-24">Color</span>
                  <span className="text-sm font-bold text-[#212121]">{selectedColor || 'Select'}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <div key={color} className="flex flex-col gap-2">
                      <button
                        onClick={() => { 
                          setSelectedColor(color); 
                          setError(''); 
                          if (customImages[product.id] && customImages[product.id][color]) {
                            setMainImage(customImages[product.id][color]);
                          } else {
                            const colorIdx = product.colors.indexOf(color);
                            if (colorIdx >= 0 && colorIdx < product.images.length) {
                              setMainImage(product.images[colorIdx]);
                            }
                          }
                        }}
                        className={`px-4 py-2 text-sm border transition-all ${selectedColor === color ? 'border-[#2874f0] text-[#2874f0] bg-[#f1f3f6]' : 'border-gray-200 text-[#212121] hover:border-[#2874f0]'}`}
                      >
                        {color}
                      </button>
                      
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[#878787] w-24">Size</span>
                  <button className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#2874f0] hover:underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setError(''); }}
                      className={`w-12 h-12 flex items-center justify-center text-sm border transition-all ${selectedSize === size ? 'border-[#2874f0] text-[#2874f0] bg-[#f1f3f6]' : 'border-gray-200 text-[#212121] hover:border-[#2874f0]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 border border-red-100">{error}</div>}

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 pt-6 pb-2">
              {/* Quantity */}
              <div className="flex items-center border border-gray-200 bg-white h-14 md:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-[#878787] hover:text-[#2874f0] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-sans">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-[#878787] hover:text-[#2874f0] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex-1 flex gap-4">
                <button 
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 h-14 flex items-center justify-center rounded-md bg-[#ff9f00] text-white font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <ShoppingBag size={16} className="mr-2" /> Add to Cart
                </button>
                <button 
                  onClick={() => handleAddToCart(true)}
                  className="flex-1 h-14 flex items-center justify-center rounded-md bg-[#fb641b] text-white font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200">
                <Truck size={20} className="text-[#2874f0] mb-2" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#878787] w-24">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200">
                <ShieldCheck size={20} className="text-[#2874f0] mb-2" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#878787] w-24">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-200">
                <Clock size={20} className="text-[#2874f0] mb-2" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#878787] w-24">Easy Returns</span>
              </div>
            </div>

          
            {/* Reviews Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-[#212121] mb-6">Ratings & Reviews</h2>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="text-4xl font-bold text-[#212121]">
                  {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                </div>
                <div>
                  <div className="flex text-[#388e3c]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="text-sm text-[#878787] mt-1">{reviews.length} Ratings & Reviews</div>
                </div>
              </div>

              {/* Submit Review Form */}
              <div className="bg-[#f1f3f6] p-4 rounded-sm mb-8">
                <h3 className="font-medium text-[#212121] mb-4">Rate this product</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 ${star <= rating ? 'text-[#ff9f00]' : 'text-gray-300'}`}
                      >
                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 outline-none focus:border-[#2874f0] text-sm"
                    />
                    <textarea 
                      placeholder="Write a review..." 
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 outline-none focus:border-[#2874f0] text-sm resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#2874f0] text-white px-6 py-2 rounded-sm font-medium text-sm shadow-sm hover:bg-[#1a5bbf]"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center">
                        {review.rating} <Star size={10} fill="currentColor" className="ml-1" />
                      </span>
                      <span className="text-sm font-bold text-[#212121]">{review.name}</span>
                    </div>
                    <p className="text-sm text-[#212121] mb-2">{review.text}</p>
                    <div className="text-xs text-[#878787] flex items-center gap-2">
                      <span>{review.date}</span>
                      <span className="flex items-center gap-1">
                        <img width="14" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="verified" className="grayscale opacity-50" />
                        Certified Buyer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
