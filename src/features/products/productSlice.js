import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts,fetchProductById } from "./productThunks";

const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedProduct: null,
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {clearSelectedProduct: (state) => {
        state.selectedProduct = null;
    }},
    extraReducers: (builder) => { // fetch single product by id
        builder  // fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            }) 
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // fetch single product by id
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
        }
    }
)
export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;