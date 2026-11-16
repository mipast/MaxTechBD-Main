export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  sku: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Packed' | 'Ready For Shipment' | 'Shipped' | 'Out For Delivery' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type PaymentMethod = 'Cash On Delivery' | 'Card Payment' | 'Mobile Banking' | 'Bank Transfer';

export interface OrderTimelineEvent {
  status: OrderStatus;
  date: string;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  billingAddress: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  coupon?: string;
  shippingCharge: number;
  tax: number;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNumber?: string;
  courierService?: string;
  customerNote?: string;
  adminNote?: string;
  timeline: OrderTimelineEvent[];
}
