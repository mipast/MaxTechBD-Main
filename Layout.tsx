import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  const { cart, wishlist } = useStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.site-logo-link');
      if (target) {
        // Add beautiful burst class
        target.classList.remove('animate-beautiful-click');
        void (target as HTMLElement).offsetWidth; // trigger reflow
        target.classList.add('animate-beautiful-click');

        // Add ripple effect
        const rect = target.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-span');
        
        if (window.getComputedStyle(target).position === 'static') {
          (target as HTMLElement).style.position = 'relative';
        }
        (target as HTMLElement).style.overflow = 'hidden';
        
        target.appendChild(circle);

        setTimeout(() => {
          target.classList.remove('animate-beautiful-click');
          circle.remove();
        }, 2000);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        Free shipping on all orders over $100! âœ¨
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 site-logo-link">
                <div className="w-10 h-10 drop-shadow-lg transform transition-transform hover:scale-105">
                  <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shopping%20bags/3D/shopping_bags_3d.png" alt="Max Tech BD" className="w-full h-full object-contain" />
                </div>
                <span className="text-3xl text-3d-logo tracking-tighter uppercase">MAX TECH BD</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/products" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Shop</Link>
              <Link to="/categories" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Categories</Link>
              <Link to="/admin" className="text-slate-400 hover:text-indigo-600 font-medium transition-colors text-sm">Admin</Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <button className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              
              <Link to="/wishlist" className="text-slate-500 hover:text-slate-900 transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="text-slate-500 hover:text-slate-900 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <Link to="/account" className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </Link>

              <button 
                className="md:hidden text-slate-500"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 flex flex-col">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-slate-600 font-medium py-2 border-b border-slate-100">Home</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/products" className="text-slate-600 font-medium py-2 border-b border-slate-100">Shop</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/categories" className="text-slate-600 font-medium py-2 border-b border-slate-100">Categories</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/account" className="text-slate-600 font-medium py-2 border-b border-slate-100">Account</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/admin" className="text-indigo-600 font-medium py-2">Admin Dashboard</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4 site-logo-link">
                <div className="w-8 h-8 drop-shadow-md">
                  <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Shopping%20bags/3D/shopping_bags_3d.png" alt="Max Tech BD" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl text-3d-logo tracking-tighter uppercase">MAX TECH BD</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed">
                Premium e-commerce destination for quality products, seamless shopping experience, and modern aesthetics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/products" className="hover:text-indigo-600">All Products</Link></li>
                <li><Link to="/products?category=electronics" className="hover:text-indigo-600">Electronics</Link></li>
                <li><Link to="/products?category=clothing" className="hover:text-indigo-600">Clothing</Link></li>
                <li><Link to="/products?category=home" className="hover:text-indigo-600">Home & Living</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-600">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-indigo-600">Track Order</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Newsletter</h4>
              <p className="text-slate-500 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 outline-none transition-colors" />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2026 Max Tech BD. All rights reserved.</p>
            <div className="flex space-x-4 text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
