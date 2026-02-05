import { createAsyncThunk } from "@reduxjs/toolkit";
import customProducts from "./customProducts";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const apiProducts = await res.json();

      // Merge API products + your products
      return [...apiProducts, ...customProducts];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

