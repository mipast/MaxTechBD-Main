import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="categories" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          {/* Placeholder routes for other links */}
          <Route path="wishlist" element={<ProductList />} />
          <Route path="account" element={<div className="p-24 text-center">Account Page Coming Soon</div>} />
        </Route>
        
        {/* Admin Route outside of main layout for full screen */}
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
