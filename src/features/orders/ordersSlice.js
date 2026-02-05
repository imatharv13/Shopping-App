import { createSlice } from "@reduxjs/toolkit";

// Helper functions for user-specific orders storage
const getOrdersKey = (userEmail) => `orders_${userEmail || 'guest'}`;

const loadOrdersFromLocalStorage = (userEmail) => {
  try {
    const key = getOrdersKey(userEmail);
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    return [];
  }
};

const saveOrdersToLocalStorage = (orders, userEmail) => {
  try {
    const key = getOrdersKey(userEmail);
    const serialized = JSON.stringify(orders);
    localStorage.setItem(key, serialized);
  } catch (e) {
    // ignore write errors
  }
};

const initialState = {
  orders: [],
  currentUser: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Load orders data for a specific user
    loadUserOrders: (state, action) => {
      const userEmail = action.payload;
      const userOrders = loadOrdersFromLocalStorage(userEmail);

      state.orders = userOrders || [];
      state.currentUser = userEmail;
    },

    // Clear current user (on logout)
    clearCurrentUserOrders: (state) => {
      state.currentUser = null;
      state.orders = [];
    },

    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        ...action.payload,
        orderDate: new Date().toISOString(),
        status: 'Placed'
      };

      state.orders.unshift(newOrder); // Add to beginning of array

      // persist to user-specific storage
      if (state.currentUser) {
        saveOrdersToLocalStorage(state.orders, state.currentUser);
      }
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;

        // persist to user-specific storage
        if (state.currentUser) {
          saveOrdersToLocalStorage(state.orders, state.currentUser);
        }
      }
    },

    clearOrders: (state) => {
      state.orders = [];

      // persist to user-specific storage
      if (state.currentUser) {
        saveOrdersToLocalStorage(state.orders, state.currentUser);
      }
    },
  },
});

export const { loadUserOrders, clearCurrentUserOrders, addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;