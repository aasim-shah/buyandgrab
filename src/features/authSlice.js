import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import authService from "../services/auth.service";


const data = JSON.parse(localStorage.getItem("user"));
const initialState = data || {
    isAuthanticated: false,
    isLoading : false,
    msg: "",
    user :null
}

export const register = createAsyncThunk("/auth/register", async ({ email, password }) => {
    const {  data } = await authService.register({ email, password })
    return data
})

export const login = createAsyncThunk("/auth/login", async ({ username, password }) => {
    const { data } = await authService.login({ username, password })
    console.log(data)
    return data
})


export const UpdateUser = createAsyncThunk('auth/updateUser', async (id) => {
    const { data } = await axios.get(`https://buyandgrab-server.onrender.com/user/info/${id}`)
    return data
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedOut: (state, action) => {
            state.isAuthanticated = false;
            state.user = {};
            localStorage.removeItem('user')
            toast.warning('Your are logged out  !')
        },

    },
    extraReducers: (builder) => {
        builder.addCase(UpdateUser.fulfilled, (state, { payload }) => {
            state.isAuthanticated = true;
            state.userId = payload._id;
            state.user = payload;
            state.token = payload.tokens[payload.tokens.length - 1].token
            localStorage.setItem('user', JSON.stringify(state))
        })
        builder.addCase(register.pending, (state, { payload }) => {
            console.log('pending')
            state.isLoading=true;
        })
        
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.isAuthanticated = true;
            state.isLoading=false;
            state.msg="Welcome :)"
            state.user={"token" : payload.token}
            localStorage.setItem('user', JSON.stringify(state))
            
        })
        builder.addCase(register.rejected, (state, { payload }) => {
            state.msg="Signup Failed !"
            state.isLoading=false;
        })
        builder.addCase(login.pending, (state, { payload }) => {
            console.log('pending')
            state.isLoading=true;
        })
        
            builder.addCase(login.fulfilled, (state, { payload }) => {
                state.isAuthanticated = true;
                 state.user={"token" : payload.token}
                 state.isLoading=false;
                state.msg="You are IN :)"
                localStorage.setItem('user', JSON.stringify(state))
                
            })
            builder.addCase(login.rejected, (state, { payload }) => {
               state.msg="Login Failed !"
                state.isLoading=false;
            })

    }

})




export const { loggedIn, loggedOut } = authSlice.actions
export default authSlice.reducer