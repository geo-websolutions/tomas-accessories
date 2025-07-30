// store/cartStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,

      // Add item to cart or increment quantity if already exists
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return { 
          cartItems: [...state.cartItems, { 
            ...product, 
            quantity: 1,
            addedAt: new Date().toISOString() // Track when item was added
          }] 
        };
      }),

      // Remove item completely from cart
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),

      // Update quantity of specific item
      updateQuantity: (id, newQuantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure minimum quantity is 1
            : item
        )
      })),

      // Clear all items from cart
      clearCart: () => set({ cartItems: [] }),

      // Toggle cart open/close
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Open cart panel
      openCart: () => set({ isCartOpen: true }),

      // Close cart panel
      closeCart: () => set({ isCartOpen: false }),

      // Calculate total price of all items
      getTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + (item.price * item.quantity), 
          0
        );
      },

      // Get total count of all items (sum of quantities)
      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity, 
          0
        );
      },

      // Check if an item exists in cart
      isInCart: (id) => {
        return get().cartItems.some(item => item.id === id);
      },

      // Get quantity of specific item
      getItemQuantity: (id) => {
        const item = get().cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Can switch to sessionStorage if needed
      partialize: (state) => ({ 
        cartItems: state.cartItems, 
        // Only persist cartItems, not the open state
      }),
      version: 1, // Version for potential future migrations
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Example migration if you need to change structure in future
          // return migrateV0toV1(persistedState);
        }
        return persistedState;
      },
    }
  )
);

export default useCartStore;