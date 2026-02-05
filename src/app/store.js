import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authslice'
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';

const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        orders:ordersReducer,
    }
});

export default store;