import React from 'react';
import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones Active Noise Cancelling',
    price: 299.99,
    originalPrice: 349.99,
    description: 'Experience pure sound with our industry-leading noise cancellation technology and premium build quality.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    brand: 'SonicGlow',
    rating: 4.8,
    reviewsCount: 1245,
    stock: 50,
    sku: 'SG-HP-001',
    isFeatured: true,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch Series X',
    price: 199.50,
    description: 'Track your fitness, stay connected, and look stylish with our sleek minimalist smartwatch featuring a retina display.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Accessories',
    brand: 'WristTech',
    rating: 4.5,
    reviewsCount: 856,
    stock: 120,
    sku: 'WT-SW-X',
    isNew: true,
    isTrending: true,
  },
  {
    id: '3',
    name: 'Ergonomic Mesh Office Chair',
    price: 149.00,
    originalPrice: 199.00,
    description: 'Work in comfort all day with our breathable mesh back, adjustable lumbar support, and sleek modern design.',
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Furniture',
    brand: 'ComfyWorkspace',
    rating: 4.7,
    reviewsCount: 432,
    stock: 30,
    sku: 'CW-CH-02',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Professional DSLR Camera Lens 50mm f/1.4',
    price: 499.00,
    description: 'Capture stunning portraits and low-light scenes with beautiful bokeh using this professional-grade prime lens.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    brand: 'OpticPro',
    rating: 4.9,
    reviewsCount: 215,
    stock: 15,
    sku: 'OP-L-50',
  },
  {
    id: '5',
    name: 'Organic Cotton Classic T-Shirt',
    price: 24.99,
    originalPrice: 29.99,
    description: 'A wardrobe staple made from 100% organic cotton. Soft, breathable, and sustainably sourced.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Clothing',
    brand: 'EcoWear',
    rating: 4.3,
    reviewsCount: 3420,
    stock: 500,
    sku: 'EW-TS-W',
    isTrending: true,
  },
  {
    id: '6',
    name: 'Aesthetic Ceramic Coffee Mug',
    price: 18.00,
    description: 'Start your morning right with this beautiful, handcrafted ceramic mug. Microwave and dishwasher safe.',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Home & Kitchen',
    brand: 'ArtisanHome',
    rating: 4.6,
    reviewsCount: 150,
    stock: 80,
    sku: 'AH-MUG-01',
    isNew: true,
  },
  {
    id: '7',
    name: 'Ultra-Slim Laptop Pro 14"',
    price: 1299.00,
    originalPrice: 1499.00,
    description: 'Power through your workday with our thinnest, lightest, and fastest professional laptop yet. Features an all-day battery.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    brand: 'TechNova',
    rating: 4.9,
    reviewsCount: 843,
    stock: 45,
    sku: 'TN-LP-14',
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Urban Streetwear Sneakers',
    price: 89.99,
    description: 'Step up your style game with these comfortable and durable streetwear sneakers. Perfect for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Clothing',
    brand: 'StreetVibe',
    rating: 4.4,
    reviewsCount: 520,
    stock: 200,
    sku: 'SV-SNK-01',
    isTrending: true,
  },
  {
    id: '9',
    name: 'RGB Mechanical Gaming Keyboard',
    price: 129.50,
    originalPrice: 159.00,
    description: 'Elevate your gaming experience with tactile mechanical switches and customizable per-key RGB lighting.',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    brand: 'GamePro',
    rating: 4.8,
    reviewsCount: 1120,
    stock: 85,
    sku: 'GP-KB-RGB',
  },
  {
    id: '10',
    name: 'Minimalist Brass Desk Lamp',
    price: 65.00,
    description: 'Add a touch of elegance to your workspace with this sleek brass desk lamp featuring adjustable brightness.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Home & Kitchen',
    brand: 'Lumina',
    rating: 4.5,
    reviewsCount: 310,
    stock: 60,
    sku: 'LM-DL-BR',
    isNew: true,
  },
  {
    id: '11',
    name: 'Classic Leather Bifold Wallet',
    price: 45.00,
    originalPrice: 55.00,
    description: 'Handcrafted from premium full-grain leather, this bifold wallet offers plenty of space while maintaining a slim profile.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Accessories',
    brand: 'Heritage',
    rating: 4.7,
    reviewsCount: 650,
    stock: 150,
    sku: 'HR-WL-BF',
  },
  {
    id: '12',
    name: 'Polarized Aviator Sunglasses',
    price: 115.00,
    description: 'Protect your eyes in style with these timeless aviator sunglasses featuring premium polarized lenses.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Accessories',
    brand: 'SunGuard',
    rating: 4.6,
    reviewsCount: 420,
    stock: 90,
    sku: 'SG-AV-PZ',
    isTrending: true,
  },
  {
    id: '13',
    name: 'Modern Ceramic Flower Vase',
    price: 35.00,
    description: 'A beautiful, minimalist ceramic vase that effortlessly complements any interior design style.',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Home & Kitchen',
    brand: 'ArtisanHome',
    rating: 4.4,
    reviewsCount: 185,
    stock: 40,
    sku: 'AH-VS-MC',
  },
  {
    id: '14',
    name: 'Eco-Friendly Cork Yoga Mat',
    price: 55.00,
    originalPrice: 70.00,
    description: 'Find your balance on this sustainable, non-slip cork yoga mat. Naturally antimicrobial and extra thick for comfort.',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Accessories',
    brand: 'ZenLifestyle',
    rating: 4.9,
    reviewsCount: 890,
    stock: 110,
    sku: 'ZL-YM-CK',
    isFeatured: true,
  },
  {
    id: '15',
    name: 'Ergonomic Wireless Mouse',
    price: 49.99,
    description: 'Reduce wrist strain with our ergonomically designed wireless mouse, featuring customizable buttons and precision tracking.',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Electronics',
    brand: 'TechNova',
    rating: 4.5,
    reviewsCount: 340,
    stock: 250,
    sku: 'TN-WM-ER',
  },
  {
    id: '16',
    name: 'Water-Resistant Travel Backpack',
    price: 85.00,
    originalPrice: 100.00,
    description: 'The ultimate travel companion. Features a dedicated laptop compartment, hidden security pockets, and water-resistant materials.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
    ],
    category: 'Accessories',
    brand: 'Wanderlust',
    rating: 4.8,
    reviewsCount: 760,
    stock: 130,
    sku: 'WL-BP-WR',
    isTrending: true,
  },
];
