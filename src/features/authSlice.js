import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("auth"));
const initialState = data || {
    isAuthanticated : false,
    isAdmin : false,
    userId : ""
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loggedIn : (state , action) =>{
            state.isAuthanticated  = true;
            state.isAdmin  = action.payload.isAdmin;
            state.userId = action.payload.user.uid;
            localStorage.setItem('auth' , JSON.stringify(state))
           
        },
        loggedOut : (state , action) =>{
            state.isAuthanticated  = false;
            state.userId = {};
            localStorage.removeItem('auth')
        }
    }
})




export const {loggedIn , loggedOut} = authSlice.actions
export default authSlice.reducer