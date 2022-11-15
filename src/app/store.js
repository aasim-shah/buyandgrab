import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'
import globalReducer from "../features/globalSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        auth : authReducer,
        products : productReducer,
        global : globalReducer
    }
})