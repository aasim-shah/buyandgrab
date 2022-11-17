import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const data = JSON.parse(localStorage.getItem("jwt_Token"));
const initialState = data || {
    isAuthanticated : false,
    user : {},
    token : "",
    userId : ""
}

export const UpdateUser = createAsyncThunk('auth/updateUser',async (id)=>{
    const {data} = await axios.get(`https://ennmart.herokuapp.com/user/info/${id}`)
    return data
})


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
        
    },
    extraReducers : {
        // [UpdateUser.pending] : (state , {payload})  =>{
        //     state.isAuthanticated  = false;
        //     state.user = {};
        //     state.userId = '';
        //     console.log('first')
        //     state.token   = ''
        //     localStorage.removeItem('jwt_Token')
        // },                  
        [UpdateUser.fulfilled] : (state , {payload})  =>{
            state.isAuthanticated  = true;
          
            state.userId = payload._id;
            state.user = payload;
            state.token   = payload.tokens[payload.tokens.length -1].token
            localStorage.setItem('jwt_Token' , JSON.stringify(state))
        }
    }

})




export const {loggedIn , loggedOut} = authSlice.actions
export default authSlice.reducer