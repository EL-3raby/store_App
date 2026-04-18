import { create } from 'zustand';
import type { Product, CartItem } from '@/types';

interface AppState {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Checkout
  checkoutStep: 'form' | 'success';
  setCheckoutStep: (step: 'form' | 'success') => void;
  lastOrderNumber: string;
  setLastOrderNumber: (num: string) => void;

  // Coupon
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Notification
  notification: { message: string; type: 'success' | 'error' } | null;
  showNotification: (message: string, type: 'success' | 'error') => void;
  clearNotification: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart
  cartItems: [],
  addToCart: (product, quantity = 1) => {
    const { cartItems } = get();
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      set({
        cartItems: cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ cartItems: [...cartItems, { product, quantity }] });
    }
  },
  removeFromCart: (productId) => {
    set({ cartItems: get().cartItems.filter(item => item.product.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cartItems: get().cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ cartItems: [] }),
  cartTotal: () => {
    const { cartItems, couponDiscount } = get();
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return Math.round(subtotal * (1 - couponDiscount) * 100) / 100;
  },
  cartCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

  // Wishlist
  wishlistIds: [],
  toggleWishlist: (productId) => {
    const { wishlistIds } = get();
    if (wishlistIds.includes(productId)) {
      set({ wishlistIds: wishlistIds.filter(id => id !== productId) });
    } else {
      set({ wishlistIds: [...wishlistIds, productId] });
    }
  },
  isInWishlist: (productId) => get().wishlistIds.includes(productId),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart Drawer
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  // Checkout
  checkoutStep: 'form',
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  lastOrderNumber: '',
  setLastOrderNumber: (num) => set({ lastOrderNumber: num }),

  // Coupon
  appliedCoupon: null,
  couponDiscount: 0,
  applyCoupon: (code) => {
    if (code.toUpperCase() === 'سلطان استور10') {
      set({ appliedCoupon: code, couponDiscount: 0.1 });
      return true;
    }
    return false;
  },
  removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),

  // Notification
  notification: null,
  showNotification: (message, type) => set({ notification: { message, type } }),
  clearNotification: () => set({ notification: null }),
}));
