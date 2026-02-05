import { createSlice } from "@reduxjs/toolkit";

// Helper functions for user-specific cart storage
const getCartKey = (userEmail) => `cart_${userEmail || 'guest'}`;

const loadCartFromLocalStorage = (userEmail) => {
  try {
    const key = getCartKey(userEmail);
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : null;
  } catch (e) {
    return null;
  }
};

const saveCartToLocalStorage = (state, userEmail) => {
  try {
    const key = getCartKey(userEmail);
    const serialized = JSON.stringify({
      items: state.items,
      totalPrice: state.totalPrice,
      totalQuantity: state.totalQuantity,
    });
    localStorage.setItem(key, serialized);
  } catch (e) {
    // ignore write errors
  }
};

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  currentUser: null, // Track current user for cart persistence
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load cart data for a specific user
    loadUserCart: (state, action) => {
      const userEmail = action.payload;
      const userCart = loadCartFromLocalStorage(userEmail);

      if (userCart) {
        state.items = userCart.items || [];
        state.totalPrice = userCart.totalPrice || 0;
        state.totalQuantity = userCart.totalQuantity || 0;
      } else {
        // New user - start with empty cart
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0;
      }
      state.currentUser = userEmail;
    },

    // Clear current user (on logout)
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      state.totalQuantity++;
      state.totalPrice += newItem.price;

      // persist to user-specific storage
      if (state.currentUser) {
        saveCartToLocalStorage(state, state.currentUser);
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }

      // persist to user-specific storage
      if (state.currentUser) {
        saveCartToLocalStorage(state, state.currentUser);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += existingItem.price * quantityDifference;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;

        // if quantity becomes 0, remove the item
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }

      // persist to user-specific storage
      if (state.currentUser) {
        saveCartToLocalStorage(state, state.currentUser);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      // persist to user-specific storage
      if (state.currentUser) {
        saveCartToLocalStorage(state, state.currentUser);
      }
    },
  },
});

export const { loadUserCart, clearCurrentUser, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
