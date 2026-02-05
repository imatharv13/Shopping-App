import {createSlice} from '@reduxjs/toolkit'
import { registerUser, logUser, googleLogin, logOutUser } from './authThunks';
import { loadUserOrders, clearCurrentUserOrders } from '../orders/ordersSlice';

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        clearAuthError:(state) =>{
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
        // Register User   
        .addCase(registerUser.pending, (state) => { 
            // when the async action is initiated
            state.loading = true;
            state.error = null;
        }) 
        .addCase(registerUser.fulfilled, (state, action) => {
             // when the async action is successful
            state.loading = false;
            // Registration successful but user is signed out
            // Don't set user or isAuthenticated
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => { 
            // when the async action fails
            state.loading = false;
            state.error = action.payload;
        }) 
        // Login User 
        .addCase(logUser.pending, (state) => { 
            state.loading = true;
            state.error = null;
        }) 
        .addCase(logUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(logUser.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        // Google Login
        .addCase(googleLogin.pending, (state) => { 
            state.loading = true;
            state.error = null;
    }) 
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(googleLogin.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })   
        // Logout User 
        .addCase(logOutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        // no pending case for logout as it's usually quick
        .addCase(logOutUser.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        })
    },
});
// export actions if needed
export const {clearAuthError, setUser, logout} = authSlice.actions;  
export default authSlice.reducer;