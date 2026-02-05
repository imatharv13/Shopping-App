import { Route, Routes } from "react-router-dom";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Cart from "../pages/cart";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";
import ProductsDetails from "../pages/ProductsDetails";
import Orders from "../pages/Orders";
import React from 'react'
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import MainLoyout from "../layouts/MainLoyout";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../services/firebase";
// // import { setUser } from "../features/auth/authslice";


const AppRoutes = () => {
 
  return (
    <Routes>
      <Route element={<MainLoyout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/product/:id" element={<ProductsDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route 
        path="/checkout"
        element={
          <ProtectedRoute>
              <Checkout/>
          </ProtectedRoute>
        }/>
         <Route 
        path="/cart"
        element={
          <ProtectedRoute>
              <Cart/>
          </ProtectedRoute>
        }/>
         <Route 
        path="/orders"
        element={
          <ProtectedRoute>
              <Orders/>
          </ProtectedRoute>
        }/>
      </Route>
      </Routes>
  )
}

export default AppRoutes
