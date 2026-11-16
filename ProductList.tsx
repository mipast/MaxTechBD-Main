import React, { useState } from 'react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star, Heart, ShoppingCart, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ProductList() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, toggleWishlist, wishlist, products } = useStore();

  const filteredProducts = products.filter(p => {
    if (categoryFilter && p.category.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{categoryFilter ? categoryFilter : 'All Products'}</h1>
          <p className="text-slate-500 mt-2">Showing {filteredProducts.length} products</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              {['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Kitchen', 'Furniture'].map(cat => (
                <li key={cat}>
                  <Link 
                    to={cat === 'All' ? '/products' : `/products?category=${cat}`}
                    className={`text-sm hover:text-indigo-600 transition-colors ${categoryFilter === cat || (cat === 'All' && !categoryFilter) ? 'font-semibold text-indigo-600' : 'text-slate-600'}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full accent-indigo-600" />
              <div className="flex items-center gap-4">
                <input type="number" placeholder="Min" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
                <span className="text-slate-400">-</span>
                <input type="number" placeholder="Max" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id} 
                  className="group bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-slate-600">{product.rating}</span>
                    </div>
                    
                    <Link to={`/product/${product.id}`} className="flex-grow">
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">{product.brand}</p>
                    </Link>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="font-bold text-slate-900">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
