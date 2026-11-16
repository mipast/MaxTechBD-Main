import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order } from '../types';

interface StoreState {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  setUser: (user: User | null) => void;
  cartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
      cart: [],
      wishlist: [],
      user: null,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === id ? { ...o, status } : o)
      })),
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          if (exists) {
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },
      setUser: (user) => set({ user }),
      cartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'ecommerce-storage',
    }
  )
);
