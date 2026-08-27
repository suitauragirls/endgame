const fs = require('fs');
let code = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');

// Container
code = code.replace(
  '<div className="flex flex-col lg:flex-row gap-10">',
  '<div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">'
);

// Back to Cart button
code = code.replace(
  'className="flex items-center text-[10px] uppercase tracking-[0.2em] font-sans text-[#878787] hover:text-[#2874f0] mb-8 transition-colors"',
  'className="flex items-center text-[12px] uppercase font-semibold text-gray-500 hover:text-[#2874f0] mb-6 md:mb-8 transition-colors"'
);

// Delivery Details Card
code = code.replace(
  'className="bg-white p-8 border border-gray-200"',
  'className="bg-white p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 rounded-xl"'
);

// Delivery Details Heading
code = code.replace(
  '<h2 className="font-serif text-2xl text-[#212121] mb-8 flex items-center">',
  '<h2 className="text-xl md:text-[24px] font-bold text-[#1a1a1a] tracking-tight mb-6 md:mb-8 flex items-center border-b border-gray-100 pb-4">'
);
code = code.replace(
  '<ShieldCheck size={20} className="ml-2 text-[#2874f0]" />',
  '<ShieldCheck size={22} className="ml-2 text-[#388e3c]" />'
);

// Form Fields Spacing & Label
code = code.replace(
  'className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-sans"',
  'className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 mb-8"'
);

code = code.replace(/<label className="block text-sm font-medium text-\[\#878787\] mb-1">/g, '<label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">');

// Form Input styles
code = code.replace(/className="w-full w-full border border-gray-300 rounded-sm px-3 py-2 outline-none focus:border-\[\#2874f0\] text-sm"/g, 'className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"');

// Textarea style
code = code.replace(
  'className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gray-300 transition-colors bg-transparent resize-none rounded-none text-sm"',
  'className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all resize-none text-[14px]"'
);

// Payment Method Section
code = code.replace(
  '<h2 className="text-gray-500 uppercase font-medium text-sm border-b border-gray-200 pb-2 mb-4 mt-8 flex items-center">',
  '<h2 className="text-lg md:text-[20px] font-bold text-[#1a1a1a] tracking-tight border-b border-gray-100 pb-4 mb-4 mt-10 flex items-center">'
);

code = code.replace(
  '<Lock size={18} className="ml-2 text-[#2874f0]" />',
  '<Lock size={18} className="ml-2 text-[#388e3c]" />'
);

code = code.replace(
  '<div className="space-y-4 font-sans mb-8">',
  '<div className="space-y-4 mb-8">'
);

code = code.replace(
  '<label className="flex items-center p-4 border border-gray-300 cursor-pointer bg-white">',
  '<label className="flex items-center p-5 border border-[#2874f0]/30 rounded-lg cursor-pointer bg-blue-50/40 hover:bg-blue-50/60 transition-colors shadow-sm">'
);

code = code.replace(
  '<span className="block text-[11px] uppercase tracking-widest text-[#212121]">Online Payment (Razorpay Secure)</span>',
  '<span className="block text-[14px] font-bold text-[#1a1a1a] tracking-wide mb-1">Online Payment <span className="text-[#878787] font-medium ml-1">via Razorpay</span></span>'
);
code = code.replace(
  '<span className="block text-[10px] text-green-600 mt-1 uppercase tracking-wider">UPI, Cards, NetBanking available</span>',
  '<span className="block text-[12px] text-[#388e3c] font-medium">✓ UPI, Cards, NetBanking available</span>'
);

// Secure trust visual
const trustVisual = `
              <div className="flex items-center justify-center gap-2 mt-6 mb-2">
                <ShieldCheck size={16} className="text-[#388e3c]" />
                <span className="text-[12px] font-medium text-gray-500 uppercase tracking-widest">100% Secure Payments</span>
              </div>
`;
code = code.replace(
  '<div className="mt-10">',
  trustVisual + '<div className="mt-4">'
);

// Submit Button
code = code.replace(
  'className="w-full h-12 flex items-center justify-center bg-[#fb641b] text-white font-bold text-base shadow-sm hover:bg-[#e65a18] transition-colors mt-4 disabled:opacity-50"',
  'className="w-full h-12 md:h-14 flex items-center justify-center bg-[#fb641b] text-white font-bold text-[15px] uppercase tracking-wide rounded-lg shadow-[0_4px_14px_rgba(251,100,27,0.3)] hover:shadow-[0_6px_20px_rgba(251,100,27,0.4)] hover:bg-[#f3570b] hover:-translate-y-0.5 transition-all duration-300 mt-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"'
);

// Price Details Card
code = code.replace(
  '<div className="w-full lg:w-[400px]">',
  '<div className="w-full lg:w-[380px] shrink-0">'
);
code = code.replace(
  '<div className="bg-white shadow-sm p-4 sticky top-[130px]">',
  '<div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 rounded-xl p-5 md:p-8 sticky top-[130px]">'
);
code = code.replace(
  '<h3 className="text-gray-500 uppercase font-medium text-sm border-b border-gray-200 pb-3 mb-4">Price Details</h3>',
  '<h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-6 tracking-tight border-b border-gray-100 pb-4">Price Details</h2>'
);

// Mini Cart items style
code = code.replace(
  '<div className="flex flex-col gap-4 mb-6 overflow-y-auto max-h-60 hide-scrollbar">',
  '<div className="flex flex-col gap-4 mb-6 overflow-y-auto max-h-[320px] hide-scrollbar pr-2">'
);
code = code.replace(
  '<div className="w-16 aspect-[3/4] bg-white border border-gray-200 shrink-0">',
  '<div className="w-16 aspect-[3/4] bg-[#f8f9fa] border border-gray-100/80 rounded-md overflow-hidden shrink-0">'
);
code = code.replace(
  '<div className="flex-1 flex flex-col justify-center font-sans">',
  '<div className="flex-1 flex flex-col justify-center">'
);
code = code.replace(
  '<span className="text-xs text-[#212121] line-clamp-1">{item.product.name}</span>',
  '<span className="text-[13px] font-semibold text-[#1a1a1a] line-clamp-2 leading-tight mb-1">{item.product.name}</span>'
);
code = code.replace(
  '<span className="text-[10px] text-[#878787] tracking-wider">Qty: {item.quantity} {item.selectedSize && `| Size: ${item.selectedSize}`}</span>',
  '<span className="text-[11px] font-medium text-gray-500">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</span>'
);
code = code.replace(
  '<span className="text-sm text-[#212121] mt-1">₹{(item.product.price * item.quantity).toLocaleString(\'en-IN\')}</span>',
  '<span className="text-[13px] font-bold text-[#212121] mt-1">₹{(item.product.price * item.quantity).toLocaleString(\'en-IN\')}</span>'
);

// Totals Summary Area
code = code.replace(
  '<div className="border-t border-gray-200 pt-4 space-y-3 font-sans text-sm">',
  '<div className="border-t border-gray-100 pt-5 space-y-4 text-[15px]">'
);
code = code.replace(
  '<div className="flex justify-between text-[#878787]">',
  '<div className="flex justify-between text-gray-600">'
);
code = code.replace(
  '<span className="text-[#212121]">₹{cartTotal.toLocaleString(\'en-IN\')}</span>',
  '<span className="text-[#1a1a1a] font-medium">₹{cartTotal.toLocaleString(\'en-IN\')}</span>'
);

code = code.replace(
  '<div className="flex justify-between text-[#878787]">',
  '<div className="flex justify-between text-gray-600">'
);
code = code.replace(
  '<span className="text-[#2874f0] uppercase tracking-widest text-[10px]">Free</span>',
  '<span className="text-[#388e3c] font-medium tracking-wide">FREE Delivery</span>'
);
code = code.replace(
  '<span className="text-[#212121]">₹{SHIPPING_COST.toLocaleString(\'en-IN\')}</span>',
  '<span className="text-[#1a1a1a] font-medium">₹{SHIPPING_COST.toLocaleString(\'en-IN\')}</span>'
);

code = code.replace(
  '<div className="border-t border-gray-200 pt-4 mt-2">',
  '<div className="border-t border-dashed border-gray-300 py-4 mt-2 mb-[-10px]">'
);
code = code.replace(
  '<span className="font-medium text-[#212121] text-base">Total</span>',
  '<span className="text-lg font-bold text-[#1a1a1a]">Total Amount</span>'
);
code = code.replace(
  '<span className="font-bold text-xl text-[#212121]">',
  '<span className="text-xl md:text-2xl font-bold text-[#1a1a1a]">'
);


fs.writeFileSync('src/pages/Checkout.tsx', code);
