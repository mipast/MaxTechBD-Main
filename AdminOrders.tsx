import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Eye, Edit, Trash2, Printer, Download, SearchIcon, MapPin, Phone, Mail, ShoppingBag, Clock, FileText, CheckCircle2, XCircle, Truck, DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { Order, OrderStatus } from '../types';

export function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = [
    'Pending', 'Confirmed', 'Processing', 'Packed', 'Ready For Shipment',
    'Shipped', 'Out For Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const processingOrders = orders.filter(o => o.status === 'Processing').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      case 'Returned':
      case 'Refunded': return 'bg-slate-100 text-slate-700';
      case 'Shipped':
      case 'Out For Delivery': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-indigo-100 text-indigo-700';
    }
  };

  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              &larr; Back to Orders
            </button>
            <h2 className="text-2xl font-bold text-slate-900">Order {selectedOrder.id}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
              {selectedOrder.status}
            </span>
          </div>
          <div className="flex gap-3">
            <select 
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
              value={selectedOrder.status}
              onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value as OrderStatus)}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900 flex justify-between">
                <span>Order Items</span>
                <span>{selectedOrder.items.length} items</span>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div>
                          <h4 className="font-medium text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="font-medium text-slate-900">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping Charge</span>
                    <span>{formatPrice(selectedOrder.shippingCharge)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax</span>
                    <span>{formatPrice(selectedOrder.tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Discount</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-100">
                    <span>Grand Total</span>
                    <span>{formatPrice(selectedOrder.amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">
                Order Timeline
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {selectedOrder.timeline?.map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                        {idx !== selectedOrder.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200 absolute top-3"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{event.status}</p>
                        <p className="text-sm text-slate-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">
                Customer Information
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400"><User className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{selectedOrder.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm text-slate-600">{selectedOrder.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm text-slate-600">{selectedOrder.customerPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">
                Shipping Address
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-slate-400"><MapPin className="w-5 h-5" /></div>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedOrder.shippingAddress}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-900">
                Payment Info
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Method</span>
                  <span className="font-medium text-slate-900">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className={`font-medium ${selectedOrder.paymentStatus === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Total Orders</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">{pendingOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Delivered</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">{deliveredOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-lg text-red-600">
              <XCircle className="w-5 h-5" />
            </div>
            <h3 className="text-slate-500 text-sm font-medium">Cancelled</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">{cancelledOrders}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by ID, Name, Phone, Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
                    <td className="px-6 py-4 text-slate-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{formatPrice(order.amount)}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{order.paymentMethod}</div>
                      <div className={`text-xs font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                        {order.paymentStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                        className={`px-2 py-1 rounded-md text-xs font-medium outline-none border border-transparent hover:border-slate-200 cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-2"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
