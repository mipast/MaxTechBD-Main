import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, Plus, Minus, Home, Share2, Maximize2, Zap, RotateCcw, CheckCircle2, ChevronDown, Clock, Search, Settings, Gift } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, products } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-indigo-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(w => w.id === product.id);
  const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  // Mock features for demonstration based on the image
  const features = [
    { icon: Clock, text: 'নীরব (Silent) মুভমেন্ট' },
    { icon: Search, text: 'পরিষ্কার ও বড় ডায়াল' },
    { icon: Settings, text: 'উচ্চ মানের উপকরণ' },
    { icon: Zap, text: 'সহজে দেয়ালে স্থাপনযোগ্য' },
    { icon: CheckCircle2, text: 'দীর্ঘস্থায়ী ও টেকসই' },
    { icon: Gift, text: 'উপহার হিসেবে উপযুক্ত' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fafafa]">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-[#8b5a2b] transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-[#8b5a2b] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[#8b5a2b] font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors bg-white ${isWishlisted ? 'border-rose-200 text-rose-500' : 'border-slate-200 text-slate-600 hover:border-[#8b5a2b] hover:text-[#8b5a2b]'}`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#8b5a2b] hover:text-[#8b5a2b] bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#8b5a2b] hover:text-[#8b5a2b] bg-white transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
        
        {/* Left Section - Images */}
        <div className="flex gap-4 lg:w-1/2 h-full">
          {/* Thumbnails (Vertical) */}
          <div className="hidden sm:flex flex-col gap-4 overflow-y-auto w-24 flex-shrink-0 hide-scrollbar">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-[#8b5a2b]' : 'border-transparent hover:border-slate-300'} bg-[#f6f4f1]`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-2" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative bg-[#f6f4f1] rounded-2xl flex items-center justify-center aspect-[4/5] overflow-hidden group">
            {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-[#8b5a2b] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-md z-10">
                Best Seller
              </span>
            )}
            
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply p-4"
              />
            </AnimatePresence>
            
            {/* Hover to Zoom Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Search className="w-4 h-4" /> Hover to Zoom
            </div>
          </div>
          
          {/* Mobile Thumbnails (Horizontal) */}
          <div className="flex sm:hidden gap-3 overflow-x-auto mt-4 pb-2 w-full">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 aspect-square rounded-xl overflow-hidden border-2 flex-shrink-0 transition-colors ${activeImage === idx ? 'border-[#8b5a2b]' : 'border-transparent'} bg-[#f6f4f1]`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply p-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="bg-[#f0eadd] text-[#8b5a2b] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded w-fit mb-4">
            {product.brand}
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-snug">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-800">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviewsCount} Reviews)</span>
          </div>

          <div className="flex items-end gap-4 mb-6">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
            )}
            {product.originalPrice && (
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1.5 rounded mb-1.5 ml-2">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Features */}
          <div className="border-t border-slate-100 pt-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-4 text-base">বৈশিষ্ট্যসমূহ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700 text-sm">
                  <div className="text-[#8b5a2b]"><feature.icon className="w-4 h-4" /></div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-900 text-sm">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-l-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-slate-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-r-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              In Stock
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-[#8b5a2b] text-white py-3.5 px-6 rounded-xl font-bold text-base hover:bg-[#734b24] transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-900/20"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              onClick={() => {
                addToCart(product, quantity);
                navigate('/checkout');
              }}
              className="flex-1 bg-white border-2 border-[#8b5a2b] text-[#8b5a2b] py-3.5 px-6 rounded-xl font-bold text-base hover:bg-[#fcfaf8] transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-current" /> Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-[#8b5a2b] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold text-slate-900 text-xs">Free Shipping</p>
                <p className="text-[10px] text-slate-500">On order over ৳999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-8 h-8 text-[#8b5a2b] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold text-slate-900 text-xs">Easy Returns</p>
                <p className="text-[10px] text-slate-500">7 days return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#8b5a2b] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold text-slate-900 text-xs">Secure Payment</p>
                <p className="text-[10px] text-slate-500">100% secure payment</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Information Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 mb-6">
            {['Description', 'Additional Information', `Reviews (${product.reviewsCount})`, 'Shipping & Returns'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                className={`px-4 py-3 text-sm font-bold transition-colors relative ${activeTab === tab.toLowerCase().split(' ')[0] ? 'text-white bg-[#8b5a2b] rounded-t-lg' : 'text-slate-600 hover:text-[#8b5a2b]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="text-slate-600 text-[15px] leading-relaxed">
            {activeTab === 'description' && (
              <div>
                {product.brand} ঘর সাজানোর দেয়াল ঘড়ি আপনার বাসা, অফিস বা যেকোনো ইন্টেরিয়রে আধুনিক ও নান্দনিক সৌন্দর্য যোগ করবে। প্রিমিয়াম ডিজাইন, পরিষ্কার ডায়াল এবং নিখুঁত সময় প্রদর্শনের মাধ্যমে এটি শুধু একটি ঘড়ি নয়, বরং আপনার ঘরের সাজসজ্জার একটি আকর্ষণীয় অংশ।<br/><br/>
                {product.description}<br/><br/>
                <button className="text-[#8b5a2b] font-bold flex items-center gap-1 mt-2 hover:underline">
                  View More <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
            {activeTab === 'additional' && <p>Detailed specifications will be listed here.</p>}
            {activeTab === 'reviews' && <p>Customer reviews will be displayed here.</p>}
            {activeTab === 'shipping' && <p>Shipping and return policies will be shown here.</p>}
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-[#fafafa] rounded-2xl p-6 sm:p-8 self-start border border-slate-100">
          <div className="space-y-5 text-sm">
            <div className="flex items-start">
              <span className="w-28 font-bold text-slate-900 flex-shrink-0">SKU:</span> 
              <span className="text-slate-600">{product.sku || `${product.brand.substring(0,3).toUpperCase()}-001`}</span>
            </div>
            <div className="flex items-start">
              <span className="w-28 font-bold text-slate-900 flex-shrink-0">Category:</span> 
              <span className="text-slate-600">{product.category}</span>
            </div>
            <div className="flex items-start">
              <span className="w-28 font-bold text-slate-900 flex-shrink-0">Brand:</span> 
              <span className="text-slate-600">{product.brand}</span>
            </div>
            <div className="flex items-start">
              <span className="w-28 font-bold text-slate-900 flex-shrink-0 mt-1">Tags:</span> 
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-200/60 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium">Wall Clock</span>
                <span className="bg-slate-200/60 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium">Home Decor</span>
                <span className="bg-slate-200/60 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium">Modern</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

