import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Users, Settings, BarChart, PackageOpen, TrendingUp, DollarSign, Activity, Plus as PlusIcon } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';
import { AdminOrders } from './AdminOrders';

export function AdminDashboard() {
  const { orders, products, addProduct } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    brand: ''
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const stats = [
    { name: 'Total Revenue', value: formatPrice(totalRevenue), change: '0%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Total Sales', value: orders.length.toString(), change: '0%', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Active Users', value: '1', change: '0%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Products', value: products.length.toString(), change: '0%', icon: PackageOpen, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    addProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      category: newProduct.category || 'Uncategorized',
      images: newProduct.image ? [newProduct.image] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'],
      brand: newProduct.brand || 'Generic',
      rating: 5,
      reviewsCount: 0,
      stock: 100,
      sku: 'SKU-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      isNew: true
    });
    
    setShowAddForm(false);
    setNewProduct({ name: '', price: '', description: '', category: '', image: '', brand: '' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight">Admin Console</h2>
          <p className="text-slate-400 text-sm mt-1">Max Tech BD Management</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <ShoppingBag className="w-5 h-5" /> Orders
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <PackageOpen className="w-5 h-5" /> Products
          </button>
        </nav>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-grow p-8 max-h-screen overflow-y-auto">
        {activeTab === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.name} 
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-4 text-center text-slate-500">No orders yet</td></tr>
                    ) : orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
                        <td className="px-6 py-4 text-slate-900">{order.customerName}</td>
                        <td className="px-6 py-4 text-slate-500">{order.date}</td>
                        <td className="px-6 py-4 text-slate-900 font-medium">{formatPrice(order.amount)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <AdminOrders />
        )}

        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Products Management</h1>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>

            {showAddForm && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <h3 className="text-lg font-bold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Product Name" className="border p-2 rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                  <input type="number" placeholder="Price" className="border p-2 rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                  <input type="text" placeholder="Category" className="border p-2 rounded" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                  <input type="text" placeholder="Brand" className="border p-2 rounded" value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} />
                  <input type="text" placeholder="Image URL" className="border p-2 rounded" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                  <input type="text" placeholder="Description" className="border p-2 rounded md:col-span-2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <button type="submit" className="bg-indigo-600 text-white p-2 rounded md:col-span-2">Save Product</button>
                </form>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-medium text-slate-900">{product.name}</h4>
                    <p className="text-indigo-600 font-bold">{formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
