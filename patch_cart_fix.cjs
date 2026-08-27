const fs = require('fs');
let code = fs.readFileSync('src/pages/Cart.tsx', 'utf8');

// 1. Wrapper and Header
const oldWrapper = `<div className="flex-1 bg-white shadow-sm p-4 md:p-6">
            <div className="hidden">`;
const newWrapper = `<div className="flex-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-xl p-4 md:p-8 border border-gray-100/50">
            <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
              <h2 className="text-xl md:text-[26px] font-bold text-[#1a1a1a] tracking-tight">My Cart ({cart.reduce((total, item) => total + item.quantity, 0)} Items)</h2>
            </div>
            <div className="hidden">`;
code = code.replace(oldWrapper, newWrapper);

code = code.replace('<div className="flex flex-col lg:flex-row gap-12">', '<div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">');

// 2. Product Item Wrapper
code = code.replace(
  /className="flex flex-col md:grid md:grid-cols-12 items-center gap-4 border-b border-gray-200 pb-6 relative"/g,
  'className="flex flex-col md:grid md:grid-cols-12 items-center gap-4 md:gap-6 border-b border-gray-100 pb-6 md:pb-8 relative group"'
);

// 3. Remove button mobile (top right)
const oldMobileRemove = `<button 
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="absolute top-0 right-0 md:hidden p-2 text-neutral-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>`;
const newMobileRemove = `<button 
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="absolute top-0 right-0 md:hidden p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>`;
code = code.replace(new RegExp(oldMobileRemove.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newMobileRemove);

// 4. Thumbnail
const oldThumb = `<Link to={\`/product/\${item.product.id}\`} className="w-24 aspect-[3/4] shrink-0 bg-white border border-gray-200 block">`;
const newThumb = `<Link to={\`/product/\${item.product.id}\`} className="w-28 md:w-32 aspect-[3/4] shrink-0 bg-[#f8f9fa] border border-gray-100/80 rounded-md overflow-hidden block group-hover:border-[#2874f0]/20 transition-colors">`;
code = code.replace(new RegExp(oldThumb.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newThumb);

// 5. Title, Color, Size
const oldTitleDetails = `<div className="flex flex-col pt-2">
                      <Link to={\`/product/\${item.product.id}\`} className="text-base text-[#212121] hover:text-[#2874f0] transition-colors mb-1 pr-6 md:pr-0 line-clamp-1">
                        {item.product.name}
                      </Link>
                      {item.selectedColor && <span className="font-sans text-[10px] tracking-widest uppercase text-[#878787]">Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span className="font-sans text-[10px] tracking-widest uppercase text-[#878787]">Size: {item.selectedSize}</span>}
                      
                      <div className="md:hidden mt-4 flex items-center justify-between w-full pr-4"> 
                         <span className="font-sans text-sm text-[#212121]">₹{item.product.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>`;
const newTitleDetails = `<div className="flex flex-col pt-1">
                      <Link to={\`/product/\${item.product.id}\`} className="text-sm md:text-base font-semibold text-[#1a1a1a] hover:text-[#2874f0] transition-colors mb-2 pr-8 md:pr-0 line-clamp-2 leading-snug">
                        {item.product.name}
                      </Link>
                      <div className="flex flex-wrap gap-2 md:gap-4 mt-1">
                        {item.selectedColor && <span className="text-[11px] md:text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">Color: <span className="text-gray-800">{item.selectedColor}</span></span>}
                        {item.selectedSize && <span className="text-[11px] md:text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">Size: <span className="text-gray-800">{item.selectedSize}</span></span>}
                      </div>
                      <div className="md:hidden mt-5 flex items-center justify-between w-full"> 
                         <span className="text-base font-bold text-[#212121]">₹{item.product.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>`;
code = code.replace(new RegExp(oldTitleDetails.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newTitleDetails);


// 6. Price (desktop)
code = code.replace(
  'className="hidden md:block col-span-2 text-center font-sans text-sm text-[#212121]"',
  'className="hidden md:block col-span-2 text-center text-[15px] font-bold text-[#212121]"'
);

// 7. Quantity Control
const oldQty = `<div className="flex items-center border border-gray-200 h-10 w-28 bg-white">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-8 h-full flex items-center justify-center text-neutral-400 hover:text-[#212121] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex-1 text-center font-sans text-sm">{item.quantity}</div>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-8 h-full flex items-center justify-center text-neutral-400 hover:text-[#212121] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>`;
const newQty = `<div className="flex items-center border border-gray-200 h-9 w-28 bg-white rounded-full overflow-hidden shadow-sm hover:border-gray-300 transition-colors">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-[#2874f0] hover:bg-[#f1f3f6] transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex-1 text-center text-[13px] font-bold text-[#212121]">{item.quantity}</div>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-[#2874f0] hover:bg-[#f1f3f6] transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>`;
code = code.replace(new RegExp(oldQty.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newQty);

// 8. Remove button desktop
const oldDesktopRemove = `<div className="hidden md:flex col-span-2 justify-end items-center gap-4 font-sans text-sm text-[#212121]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-neutral-400 hover:text-red-500 transition-colors ml-2"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>`;
const newDesktopRemove = `<div className="hidden md:flex col-span-2 justify-end items-center gap-4 text-[15px] font-bold text-[#212121]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors ml-2"
                      title="Remove"
                    >
                      <X size={18} />
                    </button>
                  </div>`;
code = code.replace(new RegExp(oldDesktopRemove.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newDesktopRemove);

// 9. Order Summary Card
const oldSummary = `{/* Order Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="bg-white p-8 border border-gray-200">
              <h2 className="font-serif text-xl text-[#212121] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 font-sans text-sm">
                <div className="flex justify-between text-[#878787]">
                  <span>Subtotal</span>
                  <span className="text-[#212121]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#878787]">
                  <span>Shipping</span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-[#388e3c] font-medium">Free</span>
                  ) : (
                    <span className="text-[#212121]">₹{SHIPPING_COST.toLocaleString('en-IN')}</span>
                  )}
                </div>
                {SHIPPING_COST > 0 && (
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">Add ₹{(1000 - cartTotal).toLocaleString('en-IN')} more for free shipping!</p>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-sans text-[10px] text-[#212121] uppercase tracking-[0.2em]">Total</span>
                  <span className="font-serif text-2xl text-[#212121]">₹{(cartTotal + SHIPPING_COST).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] tracking-widest uppercase font-sans text-neutral-400 text-right mt-1">Includes all taxes</p>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full h-12 flex items-center justify-center bg-[#fb641b] text-white font-bold text-base shadow-sm hover:bg-[#e65a18] transition-colors mt-4 group"
              >
                PLACE ORDER <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>`;
const newSummary = `{/* Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 rounded-xl sticky top-28">
              <h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-6 tracking-tight border-b border-gray-100 pb-4">Price Details</h2>
              
              <div className="space-y-4 mb-6 text-[15px]">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({cart.reduce((total, item) => total + item.quantity, 0)} Items)</span>
                  <span className="text-[#1a1a1a] font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-[#388e3c] font-medium tracking-wide">FREE Delivery</span>
                  ) : (
                    <span className="text-[#1a1a1a] font-medium">₹{SHIPPING_COST.toLocaleString('en-IN')}</span>
                  )}
                </div>
                {SHIPPING_COST > 0 && (
                  <p className="text-[12px] text-[#2874f0] font-medium bg-[#2874f0]/5 p-2 rounded-md border border-[#2874f0]/10">Shop for ₹{(1000 - cartTotal).toLocaleString('en-IN')} more to get free delivery!</p>
                )}
              </div>
              <div className="border-t border-dashed border-gray-300 py-5 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#1a1a1a]">Total Amount</span>
                  <span className="text-xl md:text-2xl font-bold text-[#1a1a1a]">₹{(cartTotal + SHIPPING_COST).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-right mt-1 font-medium">Inclusive of all taxes</p>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full h-12 md:h-14 flex items-center justify-center bg-[#fb641b] text-white font-bold text-[15px] rounded-lg shadow-[0_4px_14px_rgba(251,100,27,0.3)] hover:shadow-[0_6px_20px_rgba(251,100,27,0.4)] hover:bg-[#f3570b] hover:-translate-y-0.5 transition-all duration-300 mt-2 group uppercase tracking-wide"
              >
                PLACE ORDER <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>`;
code = code.replace(new RegExp(oldSummary.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'), 'g'), newSummary);

// Replace Empty Cart state styling
code = code.replace(
  'className="font-serif text-4xl text-[#212121] mb-4"',
  'className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 tracking-tight"'
);
code = code.replace(
  'className="font-sans text-sm tracking-wide text-[#878787] mb-8 max-w-md"',
  'className="text-[15px] text-gray-500 mb-8 max-w-md"'
);
code = code.replace(
  'className="px-10 py-4 bg-[#2874f0] text-white uppercase tracking-widest text-[13px] font-medium shadow-sm hover:bg-[#1a5bbf] transition-colors"',
  'className="px-8 py-3.5 bg-[#2874f0] text-white text-[14px] rounded-full font-bold tracking-wide shadow-[0_4px_12px_rgba(40,116,240,0.25)] hover:shadow-[0_6px_16px_rgba(40,116,240,0.35)] hover:bg-[#1a5bbf] hover:-translate-y-0.5 transition-all duration-300"'
);

fs.writeFileSync('src/pages/Cart.tsx', code);
