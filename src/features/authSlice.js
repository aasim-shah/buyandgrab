import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("jwt_Token"));
const initialState = data || {
    isAuthanticated : false,
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
            state.token   = action.payload.token
            localStorage.setItem('jwt_Token' , JSON.stringify(state))
            
        },
        loggedOut : (state , action) =>{
            state.isAuthanticated  = false;
            state.userId = {};
            state.token   = ''
            localStorage.removeItem('jwt_Token')
        }
    }
})




export const {loggedIn , loggedOut} = authSlice.actions
export default authSlice.reducer