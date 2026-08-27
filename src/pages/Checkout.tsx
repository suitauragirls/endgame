import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductImage, useProducts } from '../context/ProductContext';
import { CheckoutData } from '../types';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { coupons, customImages } = useProducts();
  const navigate = useNavigate();

  const SHIPPING_COST = cartTotal > 999 ? 0 : 99;
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const TOTAL = cartTotal + SHIPPING_COST - discount;

  const [formData, setFormData] = useState<CheckoutData>(() => {
    const saved = localStorage.getItem('suit_aura_checkout_address');
    if (saved) { try { return JSON.parse(saved); } catch { return { fullName: '', mobile: '', email: '', address: '', houseFlat: '', area: '', city: '', state: '', pinCode: '', addressType: 'Home' }; } }
    return { fullName: '', mobile: '', email: '', address: '', houseFlat: '', area: '', city: '', state: '', pinCode: '', addressType: 'Home' };
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pinMessage, setPinMessage] = useState('');
  const [pinLoading, setPinLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('suit_aura_checkout_address', JSON.stringify(formData));
  }, [formData]);

  const applyCoupon = () => {
    const coupon = coupons.find(item => item.code === couponCode.trim().toUpperCase() && item.active);
    if (!coupon) { setDiscount(0); setCouponMessage('Coupon code is not valid.'); return; }
    if (cartTotal < coupon.minimumOrder) { setDiscount(0); setCouponMessage(`Add ₹${(coupon.minimumOrder - cartTotal).toLocaleString('en-IN')} more to use this coupon.`); return; }
    const amount = Math.round(cartTotal * coupon.discountPercent / 100);
    setDiscount(amount);
    setCouponMessage(`Coupon applied. You saved ₹${amount.toLocaleString('en-IN')}.`);
  };

  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePinChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinCode = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData(previous => ({ ...previous, pinCode }));
    setPinMessage('');
    if (pinCode.length !== 6) return;
    setPinLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
      const result = await response.json();
      const office = result?.[0]?.PostOffice?.[0];
      if (!office) {
        setPinMessage('Please enter a valid Indian PIN code.');
        setFormData(previous => ({ ...previous, city: '', state: '', area: '' }));
      } else {
        setFormData(previous => ({ ...previous, city: office.District, state: office.State, area: office.Name }));
        setPinMessage(`${office.District}, ${office.State}`);
      }
    } catch {
      setPinMessage('PIN lookup is unavailable. Please try again.');
    } finally { setPinLoading(false); }
  };

  const handlePaymentSuccess = async (response: any, orderId: string) => {
    try {
      const verifyRes = await fetch('/api/orders/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          orderId
        })
      });
      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        clearCart();
        navigate('/order-confirmation', { 
          state: { 
            orderData: formData, 
            total: TOTAL,
            orderId: orderId 
          } 
        });
      } else {
        setError('Payment verification failed. Please contact support.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during verification.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pinCode.length !== 6 || pinLoading || !pinMessage || pinMessage.startsWith('Please') || pinMessage.startsWith('PIN')) {
      setError('Please enter a valid Indian PIN code and wait for the address to be verified.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const orderPayload = {
        items: cart,
        subtotal: cartTotal,
        deliveryCharge: SHIPPING_COST,
        discount: 0,
        total: TOTAL,
        customer: {
          name: formData.fullName,
          mobile: formData.mobile,
          email: formData.email
        },
        address: {
          houseFlat: formData.houseFlat,
          area: formData.area,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          addressType: formData.addressType
        }
      };

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      
      if (data.success) {
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: 'Suit Aura Girls',
          description: 'Purchase Order',
          order_id: data.razorpayOrderId,
          handler: function (response: any) {
            handlePaymentSuccess(response, data.orderId);
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.mobile
          },
          theme: {
            color: '#1A1A1A'
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          setError('Payment failed. ' + response.error.description);
          setLoading(false);
        });
        rzp.open();
      } else {
        setError(data.error || 'Failed to create order');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Network error while placing order');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#f1f3f6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/cart')} className="flex items-center text-[12px] uppercase font-semibold text-gray-500 hover:text-[#2874f0] mb-6 md:mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Cart
        </button>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 rounded-xl">
              <h2 className="text-xl md:text-[24px] font-bold text-[#1a1a1a] tracking-tight mb-6 md:mb-8 flex items-center border-b border-gray-100 pb-4">
                Delivery Details
                <ShieldCheck size={22} className="ml-2 text-[#388e3c]" />
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 mb-8">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Full Name</label>
                  <input 
                    required type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Mobile Number</label>
                  <input 
                    required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}"
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Email Address</label>
                  <input 
                    required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                    placeholder="For order updates"
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">House / Flat No.</label>
                  <input 
                    required type="text" name="houseFlat" value={formData.houseFlat} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Area / Locality</label>
                  <input 
                    required type="text" name="area" value={formData.area} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Landmark / Street (Optional)</label>
                  <textarea 
                    name="address" value={formData.address} onChange={handleChange} rows={2}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all resize-none text-[14px]"
                  ></textarea>
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">City</label>
                  <input 
                    required type="text" name="city" value={formData.city} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">State</label>
                  <input 
                    required type="text" name="state" value={formData.state} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">PIN Code</label>
                  <input 
                    required type="text" name="pinCode" value={formData.pinCode} onChange={handlePinChange} pattern="[0-9]{6}"
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  />
                  {pinLoading && <p className="text-xs text-neutral-500 mt-1">Checking PIN...</p>}
                  {!pinLoading && pinMessage && <p className={`text-xs mt-1 ${pinMessage.startsWith('Please') || pinMessage.startsWith('PIN') ? 'text-red-600' : 'text-green-700'}`}>{pinMessage}</p>}
                </div>
                <div className="col-span-1">
                  <label className="block text-[13px] font-semibold text-[#1a1a1a] mb-1.5">Address Type</label>
                  <select 
                    name="addressType" value={formData.addressType} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 outline-none focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20 transition-all text-[14px]"
                  >
                    <option value="Home">Home (All day delivery)</option>
                    <option value="Work">Work (10 AM - 6 PM)</option>
                  </select>
                </div>
              </div>

              <h2 className="text-lg md:text-[20px] font-bold text-[#1a1a1a] tracking-tight border-b border-gray-100 pb-4 mb-4 mt-10 flex items-center">
                Payment Method
                <Lock size={18} className="ml-2 text-[#388e3c]" />
              </h2>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-center p-5 border border-[#2874f0]/30 rounded-lg cursor-pointer bg-blue-50/40 hover:bg-blue-50/60 transition-colors shadow-sm">
                  <input 
                    type="radio" name="paymentMethod" value="prepaid" 
                    checked={true} readOnly
                    className="w-4 h-4 text-[#2874f0] focus:ring-[#C5A059] border-gray-200"
                  />
                  <div className="ml-4">
                    <span className="block text-[14px] font-bold text-[#1a1a1a] tracking-wide mb-1">Online Payment <span className="text-[#878787] font-medium ml-1">via Razorpay</span></span>
                    <span className="block text-[12px] text-[#388e3c] font-medium">✓ UPI, Cards, NetBanking available</span>
                  </div>
                </label>
              </div>

              
              <div className="flex items-center justify-center gap-2 mt-6 mb-2">
                <ShieldCheck size={16} className="text-[#388e3c]" />
                <span className="text-[12px] font-medium text-gray-500 uppercase tracking-widest">100% Secure Payments</span>
              </div>
<div className="mt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 md:h-14 flex items-center justify-center bg-[#fb641b] text-white font-bold text-[15px] uppercase tracking-wide rounded-lg shadow-[0_4px_14px_rgba(251,100,27,0.3)] hover:shadow-[0_6px_20px_rgba(251,100,27,0.4)] hover:bg-[#f3570b] hover:-translate-y-0.5 transition-all duration-300 mt-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {loading ? 'Processing...' : 'Place Order & Pay'}
                </button>
              </div>
            </form>
          </div>

          {/* Mini Cart Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 rounded-xl p-5 md:p-8 sticky top-[130px]">
              <h2 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-6 tracking-tight border-b border-gray-100 pb-4">Price Details</h2>
              <div className="mb-6 border-b border-gray-100 pb-5"><p className="text-sm font-semibold text-[#1a1a1a] mb-3">Have a coupon?</p><div className="flex gap-2"><input value={couponCode} onChange={event => setCouponCode(event.target.value)} placeholder="Enter code" className="min-w-0 flex-1 border border-gray-200 px-3 py-2 text-sm uppercase outline-none focus:border-[#9d3658]" /><button type="button" onClick={applyCoupon} className="px-4 py-2 bg-[#9d3658] text-white text-xs font-semibold">Apply</button></div>{couponMessage && <p className={`text-xs mt-2 ${discount ? 'text-green-700' : 'text-red-600'}`}>{couponMessage}</p>}</div>
              
              <div className="flex flex-col gap-4 mb-6 overflow-y-auto max-h-[320px] hide-scrollbar pr-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 aspect-[3/4] bg-[#f8f9fa] border border-gray-100/80 rounded-md overflow-hidden shrink-0">
                      <img 
                                src={getProductImage(item.product, customImages, item.selectedColor)} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[13px] font-semibold text-[#1a1a1a] line-clamp-2 leading-tight mb-1">{item.product.name}</span>
                      <span className="text-[11px] font-medium text-gray-500">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</span>
                      <span className="text-[13px] font-bold text-[#212121] mt-1">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-4 text-[15px]">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-[#1a1a1a] font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-[#388e3c] font-medium tracking-wide">FREE Delivery</span>
                  ) : (
                    <span className="text-[#1a1a1a] font-medium">₹{SHIPPING_COST.toLocaleString('en-IN')}</span>
                  )}
                </div>
                
                <div className="border-t border-dashed border-gray-300 py-4 mt-2 mb-[-10px]">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-[#1a1a1a]">Total Amount</span>
                    <span className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                      ₹{TOTAL.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
