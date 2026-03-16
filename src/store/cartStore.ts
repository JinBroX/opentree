import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/copy';

// Flat cart item for easy access
export type CartItem = Product & {
  quantity: number;
  selectedVariants: Record<string, string>;
  cartItemId: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, variants?: Record<string, string>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalCount: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedVariants = {}) => {
        const cartItemId = `${product.id}-${JSON.stringify(selectedVariants)}`;
        const existing = get().items.find((i) => i.cartItemId === cartItemId);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.cartItemId === cartItemId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity, selectedVariants, cartItemId }],
            isOpen: true,
          });
        }
      },

      removeItem: (cartItemId) => {
        set({ items: get().items.filter((i) => i.cartItemId !== cartItemId) });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.cartItemId === cartItemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'opentree-cart-v2' }
  )
);
