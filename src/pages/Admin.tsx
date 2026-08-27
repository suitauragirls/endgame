import React, { useEffect, useState } from 'react';
import { ShieldCheck, Search, Package, Edit, Check } from 'lucide-react';
import { Order } from '../types';

export const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editTracking, setEditTracking] = useState('');

  const fetchOrders = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: editStatus, trackingNumber: editTracking })
      });
      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        fetchOrders();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(search.toLowerCase()) || 
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.mobile.includes(search);
    const matchesStatus = filterStatus === 'All' || o.orderStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <ShieldCheck size={28} className="text-[#C5A059] mr-3" />
          <h1 className="font-serif text-3xl text-[#1A1A1A]">Admin Orders Dashboard</h1>
        </div>

        <div className="bg-white p-6 border border-[#F0EAD6] mb-8 flex flex-col md:flex-row gap-4 justify-between font-sans">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-3 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Name, or Phone..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[#F0EAD6] focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 text-sm border border-[#F0EAD6] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Payment Confirmed">Payment Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[10px] uppercase tracking-widest text-neutral-500">Loading Orders...</div>
        ) : (
          <div className="bg-white border border-[#F0EAD6] overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#FAF9F6] border-b border-[#F0EAD6] text-[10px] uppercase tracking-widest text-neutral-500">
                <tr>
                  <th className="p-4 font-normal">Order ID / Date</th>
                  <th className="p-4 font-normal">Customer</th>
                  <th className="p-4 font-normal">Items</th>
                  <th className="p-4 font-normal">Amount</th>
                  <th className="p-4 font-normal">Payment</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAD6]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-neutral-500">No orders found.</td>
                  </tr>
                ) : filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="p-4 align-top">
                      <div className="font-medium text-[#1A1A1A] mb-1">{order.id}</div>
                      <div className="text-[10px] text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-[#1A1A1A]">{order.customer.name}</div>
                      <div className="text-xs text-neutral-500">{order.customer.mobile}</div>
                      <div className="text-xs text-neutral-400 mt-1 line-clamp-2">{order.address.city}, {order.address.state}</div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center text-xs text-neutral-600">
                        <Package size={14} className="mr-1" /> {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-[#1A1A1A]">₹{order.total.toLocaleString()}</div>
                    </td>
                    <td className="p-4 align-top">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                        order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700' : 
                        order.paymentStatus === 'Failed' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      {editingId === order.id ? (
                        <div className="space-y-2">
                          <select 
                            value={editStatus} 
                            onChange={e => setEditStatus(e.target.value)}
                            className="w-full p-1 text-xs border border-[#C5A059] outline-none"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Payment Confirmed">Payment Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <input 
                            type="text" 
                            placeholder="Tracking #" 
                            value={editTracking}
                            onChange={e => setEditTracking(e.target.value)}
                            className="w-full p-1 text-xs border border-[#F0EAD6] outline-none"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-[#1A1A1A]">{order.orderStatus}</div>
                          {order.trackingNumber && <div className="text-[10px] text-neutral-500 mt-1">Trk: {order.trackingNumber}</div>}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      {editingId === order.id ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleUpdate(order.id)} className="p-1.5 bg-green-50 text-green-700 hover:bg-green-100 transition-colors" title="Save">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors text-xs" title="Cancel">
                            X
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setEditingId(order.id);
                            setEditStatus(order.orderStatus);
                            setEditTracking(order.trackingNumber || '');
                          }} 
                          className="p-1.5 text-neutral-400 hover:text-[#C5A059] transition-colors"
                          title="Edit Status"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
