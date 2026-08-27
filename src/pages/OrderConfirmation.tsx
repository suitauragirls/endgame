import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  useEffect(() => {
    if (!state?.orderData) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.orderData) return null;

  const { orderId, orderData, total } = state;

  return (
    <div className="min-h-[80vh] pt-32 pb-20 bg-white flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-8"
      >
        <CheckCircle size={40} className="text-green-500" strokeWidth={1.5} />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-bold text-4xl text-gray-900 mb-4 text-center"
      >
        Thank You for Your Order
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 mb-8 max-w-md text-center leading-relaxed"
      >
        Your order <span className="font-medium text-gray-900">#{orderId}</span> has been confirmed. We've sent an email with the details to {orderData.fullName}.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 border border-gray-100 p-8 w-full max-w-lg mb-10"
      >
        <h3 className="font-medium uppercase tracking-widest text-sm text-gray-900 mb-6 border-b border-gray-200 pb-2">Order Details</h3>
        
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2">
            <span className="text-gray-500">Total Amount:</span>
            <span className="font-medium text-gray-900">₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-gray-500">Payment Method:</span>
            <span className="font-medium text-gray-900 capitalize">Online (Razorpay)</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-gray-500">Shipping To:</span>
            <span className="font-medium text-gray-900">
              {orderData.fullName}<br/>
              {orderData.houseFlat}, {orderData.area}<br/>
              {orderData.city}, {orderData.state} - {orderData.pinCode}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4"
      >
        <Link to={`/order/${orderId}`} className="px-8 py-4 border border-gray-900 text-gray-900 uppercase tracking-widest text-[11px] font-medium hover:bg-gray-50 transition-colors inline-block">
          View Order
        </Link>
        <Link to="/shop" className="px-8 py-4 bg-gray-900 text-white uppercase tracking-widest text-[11px] font-medium hover:bg-[#C5A059] transition-colors inline-block">
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};
