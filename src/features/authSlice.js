import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const data = JSON.parse(localStorage.getItem("jwt_Token"));
const initialState = data || {
    isAuthanticated : false,
    user : {},
    token : "",
    userId : ""
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loggedIn : (state , action) =>{
            state.isAuthanticated  = true;
            state.userId = action.payload.user._id;
            state.user = action.payload.user;
            state.token   = action.payload.token
            localStorage.setItem('jwt_Token' , JSON.stringify(state))
            
        },
        loggedOut : (state , action) =>{
            state.isAuthanticated  = false;
            state.user = {};
            state.userId = '';
            state.token   = ''
            localStorage.removeItem('jwt_Token')
            toast.warning('Your are logged out  !')
        },
        
    }
})




export const {loggedIn , loggedOut} = authSlice.actions
export default authSlice.reducer