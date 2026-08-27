import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, AlertCircle } from 'lucide-react';
import { Order } from '../types';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Note: In a real app with auth, you'd fetch only the logged-in user's orders
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#FAF9F6] flex justify-center">
        <div className="text-[12px] uppercase tracking-widest text-[#1A1A1A]">Loading Orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-[#1A1A1A] mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#F0EAD6]">
            <Package size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="font-serif text-xl text-[#1A1A1A] mb-2">No orders found</p>
            <p className="text-neutral-500 font-sans text-sm mb-6">Looks like you haven't placed an order yet.</p>
            <Link to="/shop" className="inline-block bg-[#1A1A1A] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Link 
                key={order.id} 
                to={`/order/${order.id}`}
                className="block bg-white border border-[#F0EAD6] hover:border-[#C5A059] transition-colors"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-[#F0EAD6] pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-sans text-sm font-medium text-[#1A1A1A]">{order.id}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                          order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 font-sans">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-neutral-500">Total</div>
                        <div className="font-serif text-lg">₹{order.total.toLocaleString('en-IN')}</div>
                      </div>
                      <ChevronRight className="text-neutral-300" />
                    </div>
                  </div>

                  <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 shrink-0 w-64">
                        <div className="w-16 aspect-[3/4] bg-[#FAF9F6] border border-[#F0EAD6] shrink-0">
                          <img 
                            src={
                              item.selectedColor && item.product.colors 
                                ? item.product.images[item.product.colors.indexOf(item.selectedColor)] || item.product.images[0]
                                : item.product.images[0]
                            } 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="font-sans py-1">
                          <div className="text-xs text-[#1A1A1A] line-clamp-2 leading-relaxed mb-1">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            Qty: {item.quantity} {item.selectedSize && `| Size: ${item.selectedSize}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F0EAD6] flex justify-between items-center">
                    <div className="flex items-center text-sm font-sans">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        order.orderStatus === 'Delivered' ? 'bg-green-500' :
                        order.orderStatus === 'Cancelled' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-[#1A1A1A]">{order.orderStatus}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059]">View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
