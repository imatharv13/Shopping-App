import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";


// Register User Thunk
// Creates user account but immediately signs them out
// User must manually login after registration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async({name, email, password}, thunkAPI) =>{
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Update the user's display name
            await updateProfile(userCredentials.user, {
                displayName: name
            });

            // After successful registration, sign out the user
            // so they need to login manually
            await signOut(auth);

            // Return success message instead of user data
            return { success: true, message: "Account created successfully. Please login." };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Login User
export const logUser = createAsyncThunk(
    'auth/loginUser',
    async({email,password}, thunkAPI) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
         const user = userCredentials.user

            //Serializable user object
            return{
                uid: user.uid,
                email: user.email,
                displayName : user.displayName,
                photoURL: user.photoURL,

            };
        } catch (error) {
        return thunkAPI.rejectWithValue(error.message);

    }
});

// Google Login
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async(_, thunkAPI) => {    // "_" means no parameters are needed
        try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(
                auth,
                provider
            );
        const user = result.user;
         return {
            uid : user.uid,
            email : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL,
         }
        } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// Logout
export const logOutUser = createAsyncThunk(
    'auth/logOutUser',
    async(_, thunkAPI) => {   // "_" means no parameters are needed
        try {
        await signOut(auth);
         return null ;
        } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});