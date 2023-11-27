// cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cartItems: [],
  }),
  actions: {
    setCartItems(cartItems) {
      this.cartItems = cartItems;
    },

    loadCartFromLocalStorage() {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      }
    },

    // Function to save cart items to Local Storage
    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    addToCart(product, quantity) {
      this.loadCartFromLocalStorage();

      const existingProduct = this.cartItems.find(item => item.product._id === product._id);

      if (existingProduct) {
        existingProduct.quantity = quantity;

      } else {
        this.cartItems.push({ product, quantity });
      }

      this.saveCartToLocalStorage();
    },

    removeFromCart(productId) {
      const productIndex = this.cartItems.findIndex(item => item.product._id === productId);

      if (productIndex !== -1) {
        this.cartItems.splice(productIndex, 1);
      }

      this.saveCartToLocalStorage();
    },
  },
});
