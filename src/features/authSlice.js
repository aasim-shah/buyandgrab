import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("auth"));
const initialState = data || {
    isAuthanticated : false,
    isAdmin : false,
    user : {}
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loggedIn : (state , action) =>{
            state.isAuthanticated  = true;
            state.isAdmin  = action.payload.isAdmin;
            state.user = action.payload.user;
            localStorage.setItem('auth' , JSON.stringify(state))
           
        },
        loggedOut : (state , action) =>{
            state.isAuthanticated  = false;
            state.user = {};
            localStorage.removeItem('auth')
        }
    }
})




export const {loggedIn , loggedOut} = authSlice.actions
export default authSlice.reducer