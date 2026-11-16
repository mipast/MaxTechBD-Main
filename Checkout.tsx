import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../lib/utils';
import { CheckCircle2, ChevronRight, MapPin, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const { cart, cartTotal, clearCart, addOrder } = useStore();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCompleteOrder = () => {
    addOrder({
      id: '#LX-' + Math.floor(10000 + Math.random() * 90000),
      invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }),
      customerName: 'Guest User',
      customerEmail: 'guest@example.com',
      customerPhone: '+8801234567890',
      shippingAddress: '123 Main St, Dhaka',
      billingAddress: '123 Main St, Dhaka',
      items: cart,
      subtotal,
      discount: 0,
      shippingCharge: shipping,
      tax,
      amount: total,
      paymentMethod: 'Cash On Delivery',
      paymentStatus: 'Pending',
      status: 'Pending',
      timeline: [{ status: 'Pending', date: new Date().toLocaleString() }]
    });
    
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-slate-500 mb-6">
            Thank you for your purchase. Your order #LX-{Math.floor(100000 + Math.random() * 900000)} has been received and is being processed.
          </p>
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="h-2 bg-slate-200 rounded w-1/4"></div>
            <div className="h-2 bg-slate-200 rounded w-1/4"></div>
            <div className="h-2 bg-slate-200 rounded w-1/4"></div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Steps */}
        <div className="flex-grow">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 transition-all duration-500"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= num ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
                }`}
              >
                {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-lg"><MapPin className="w-5 h-5 text-indigo-600" /></div>
                  <h2 className="text-2xl font-bold text-slate-900">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="123 Luxury Lane" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="New York" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="10001" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setStep(2)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                    Continue to Delivery <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Delivery Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border-2 border-indigo-600 rounded-xl bg-indigo-50/30 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="delivery" defaultChecked className="w-4 h-4 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-slate-900">Standard Delivery</p>
                        <p className="text-sm text-slate-500">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-900">$15.00</span>
                  </label>
                  <label className="flex items-center justify-between p-4 border-2 border-slate-100 rounded-xl hover:border-indigo-200 cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="delivery" className="w-4 h-4 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-slate-900">Express Delivery</p>
                        <p className="text-sm text-slate-500">1-2 Business Days</p>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-900">$25.00</span>
                  </label>
                </div>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="text-slate-500 font-medium hover:text-slate-900">Back</button>
                  <button onClick={() => setStep(3)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-lg"><CreditCard className="w-5 h-5 text-indigo-600" /></div>
                  <h2 className="text-2xl font-bold text-slate-900">Payment</h2>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl mb-6">
                  <div className="flex items-center gap-2 text-green-600 mb-4 text-sm font-medium">
                    <Lock className="w-4 h-4" /> Secure Payment Processing
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">CVC</label>
                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(2)} className="text-slate-500 font-medium hover:text-slate-900">Back</button>
                  <button onClick={handleCompleteOrder} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Pay {formatPrice(total)}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4">In your cart</h3>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg p-1 border border-slate-100 flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center mt-2">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-bold text-xl text-indigo-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
