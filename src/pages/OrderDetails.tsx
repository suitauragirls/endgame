import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { Order } from '../types';
import { getProductImage, useProducts } from '../context/ProductContext';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { customImages } = useProducts();

  useEffect(() => {
    const loadOrder = () => fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrder(data.order);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    loadOrder();
    const timer = window.setInterval(loadOrder, 10000);
    return () => window.clearInterval(timer);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 bg-[#FAF9F6] flex justify-center text-[12px] uppercase tracking-widest">Loading...</div>;
  }

  

  if (!order) {
    return <div className="min-h-screen pt-32 pb-20 bg-[#FAF9F6] text-center text-red-500">Order not found</div>;
  }

  const timelineSteps = [
    'Order Placed', 'Payment Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'
  ];
  const currentStepIndex = timelineSteps.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/orders')} className="flex items-center text-[10px] uppercase tracking-[0.2em] font-sans text-neutral-500 hover:text-[#C5A059] mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to My Orders
        </button>

        <div className="bg-white p-6 md:p-8 border border-[#F0EAD6] mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-[#F0EAD6] pb-6 mb-8">
            <div>
              <h1 className="font-serif text-2xl text-[#1A1A1A] mb-1">Order Details</h1>
              <p className="text-sm text-neutral-500 font-sans">Order ID: {order.id}</p>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <p className="text-sm text-neutral-500 font-sans">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
              </p>
            </div>
          </div>

          {/* Tracking Timeline */}
          {order.orderStatus !== 'Cancelled' && (
            <div className="mb-12 overflow-x-auto hide-scrollbar pb-4">
              <div className="min-w-[600px] flex items-center justify-between relative pt-8">
                <div className="absolute top-10 left-8 right-8 h-[2px] bg-[#F0EAD6] -z-10"></div>
                <div 
                  className="absolute top-10 left-8 h-[2px] bg-green-500 -z-10 transition-all duration-500"
                  style={{ width: `${Math.max(0, (currentStepIndex / (timelineSteps.length - 1)) * 100)}%`, right: '2rem' }}
                ></div>
                
                {timelineSteps.map((step, idx) => {
                  const isCompleted = currentStepIndex >= idx;
                  const isCurrent = currentStepIndex === idx;
                  
                  return (
                    <div key={step} className="flex flex-col items-center w-24 relative">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-3 transition-colors ${
                        isCompleted ? 'bg-green-500' : 'bg-[#F0EAD6]'
                      }`}>
                        {isCompleted && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-[10px] text-center font-sans tracking-wide ${
                        isCurrent ? 'text-[#1A1A1A] font-medium' : 
                        isCompleted ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {order.orderStatus === 'Cancelled' && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 font-sans border border-red-100 flex items-center">
              <AlertCircle size={20} className="mr-3" />
              This order has been cancelled.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Items */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Items Ordered</h3>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 border border-[#F0EAD6]">
                  <div className="w-20 aspect-[3/4] bg-[#FAF9F6] shrink-0">
                    <img 
                      src={getProductImage(item.product, customImages, item.selectedColor)} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 font-sans">
                    <Link to={`/product/${item.product.id}`} className="text-sm text-[#1A1A1A] hover:text-[#C5A059] transition-colors line-clamp-2 mb-2">
                      {item.product.name}
                    </Link>
                    <div className="grid grid-cols-2 gap-y-1 text-xs text-neutral-500">
                      <div>Color: {item.selectedColor || 'N/A'}</div>
                      <div>Size: {item.selectedSize || 'N/A'}</div>
                      <div>Qty: {item.quantity}</div>
                      <div className="text-[#1A1A1A] font-medium">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="font-sans border border-[#F0EAD6] p-6 bg-[#FAF9F6]">
              <h3 className="flex items-center text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
                <MapPin size={14} className="mr-2" /> Delivery Address
              </h3>
              <p className="font-medium text-[#1A1A1A] mb-1">{order.customer.name}</p>
              <p className="text-sm text-neutral-600 mb-1">{order.address.houseFlat}, {order.address.area}</p>
              {order.address.address && <p className="text-sm text-neutral-600 mb-1">{order.address.address}</p>}
              <p className="text-sm text-neutral-600 mb-3">{order.address.city}, {order.address.state} - {order.address.pinCode}</p>
              <div className="text-xs text-neutral-500 mb-1">Mobile: <span className="text-[#1A1A1A]">{order.customer.mobile}</span></div>
              <div className="text-xs text-neutral-500">Email: <span className="text-[#1A1A1A]">{order.customer.email}</span></div>
            </div>

            {/* Payment Summary */}
            <div className="font-sans border border-[#F0EAD6] p-6 bg-[#FAF9F6]">
              <h3 className="flex items-center text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
                <CreditCard size={14} className="mr-2" /> Payment Summary
              </h3>
              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-[#E5E0D8]">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Charge</span>
                  <span>{order.deliveryCharge === 0 ? 'Free' : `₹${order.deliveryCharge.toLocaleString('en-IN')}`}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-[#1A1A1A] pt-2">
                  <span>Total Amount</span>
                  <span>₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-neutral-500">
                <div className="flex justify-between">
                  <span>Payment Status</span>
                  <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Method</span>
                  <span>Online (Razorpay)</span>
                </div>
                {order.razorpayPaymentId && (
                  <div className="flex justify-between mt-2 pt-2 border-t border-[#E5E0D8]">
                    <span>Txn ID</span>
                    <span className="font-mono text-[10px] text-neutral-400">{order.razorpayPaymentId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
