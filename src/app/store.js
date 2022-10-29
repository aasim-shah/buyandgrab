import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'
import globalReducer from "../features/globalSlice";


export const store = configureStore({
    reducer : {
        cart : cartReducer,
        auth : authReducer,
        global : globalReducer
    }
})