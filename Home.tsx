import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useStore } from '../store/useStore';

export function Home() {
  const { addToCart, toggleWishlist, wishlist, products } = useStore();
  
  const featuredProducts = products.filter(p => p.isFeatured);
  const trendingProducts = products.filter(p => p.isTrending);

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1618220179428-22790b46a013?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white space-y-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold tracking-wider border border-indigo-500/30 backdrop-blur-sm">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Elevate Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Lifestyle.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
              Discover curated premium products designed to bring elegance and functionality to your everyday life.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 group">
                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/categories" className="bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors">
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Shop by Category</h2>
            <p className="text-slate-500 mt-2">Find exactly what you need.</p>
          </div>
          <Link to="/categories" className="text-indigo-600 font-medium hover:text-indigo-700 hidden sm:block">
            View All Categories
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: 'Electronics', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop' },
            { name: 'Apparel', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop' },
            { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop' },
            { name: 'Accessories', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop' }
          ].map((cat, i) => (
            <Link to={`/products?category=${cat.name}`} key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 block">
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-bold text-xl">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Collections</h2>
            <p className="text-slate-500 mt-2">Handpicked premium items just for you.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => addToCart(product)}
              onToggleWishlist={() => toggleWishlist(product)}
              isWishlisted={wishlist.some(w => w.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')] opacity-20 object-cover bg-center" />
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale is Live</h2>
              <p className="text-indigo-100 text-lg mb-8">Get up to 50% off on selected items. Limited time offer.</p>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-slate-50 transition-colors">
                Explore Deals
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-500 mt-2">What everyone is talking about.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trendingProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => addToCart(product)}
              onToggleWishlist={() => toggleWishlist(product)}
              isWishlisted={wishlist.some(w => w.id === product.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

// Product Card Component
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-md z-10">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-md z-10">
            Sale
          </span>
        )}
        
        <button 
          onClick={onToggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm text-slate-400 hover:text-rose-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick Add overlay */}
        <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={onAddToCart}
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
          <span className="text-xs text-slate-400">({product.reviewsCount})</span>
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
  );
}
