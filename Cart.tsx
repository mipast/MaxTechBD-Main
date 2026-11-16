import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

  const subtotal = cartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our premium collections and find something you love.
        </p>
        <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/product/${item.id}`} className="font-semibold text-lg text-slate-900 hover:text-indigo-600 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-slate-500 mt-1">Brand: {item.brand}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-bold text-lg text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping estimate</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax estimate</span>
                <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-slate-900">Total</span>
                <span className="font-bold text-2xl text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="mt-4 text-center">
              <Link to="/products" className="text-sm text-slate-500 hover:text-indigo-600 font-medium">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
