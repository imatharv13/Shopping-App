import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'
import {auth} from './services/firebase'
import AppRoutes from './routes/AppRoutes'
import { setUser } from './features/auth/authslice'
import { loadUserCart, clearCurrentUser } from './features/cart/cartSlice'

function App() {
  const dispatch = useDispatch();

  // Listen to Firebase auth state changes and sync with Redux
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(userData));
        // Load user's cart from localStorage
        dispatch(loadUserCart(user.email));
      } else {
        // User is signed out
        dispatch(setUser(null));
        // Clear current user from cart (but keep data in localStorage)
        dispatch(clearCurrentUser());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
