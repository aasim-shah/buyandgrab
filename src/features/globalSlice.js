import { createSlice } from "@reduxjs/toolkit";


const data = JSON.parse(localStorage.getItem("global"));
const initialState = data || {
    thankingModalOpen  : false,
    darkTheme : false,
    order : {
        products : [],
        couponApplied : false,
        discountedTotal : 0 ,
        coupon : {amount : 0 ,isValid :false , code : "" , _id : ""},
        userDetails : { userId : "" , email : "" , userName : ""}
    }
}

export const globalSlice = createSlice({

    initialState : initialState,
    name : "global",
    reducers : {
        openThankingModal : (state , action)=>{
            state.thankingModalOpen = true
        },
        closeThankingModal : (state , action)=>{
            state.thankingModalOpen = false
        },
        toggleDarkTheme : (state , action) =>{
            state.darkTheme = !state.darkTheme;
        }, 
        confirmOrder  : (state , action) =>{
            state.order.products = action.payload.products
          if(action.payload.coupon?.isValid){
            state.order.coupon._id = action.payload.coupon._id
            state.order.coupon.amount = action.payload.coupon.amount
            state.order.coupon.isValid = action.payload.coupon.isValid
            state.order.coupon.code  = action.payload.coupon.code
          }
          state.order.couponApplied = action.payload.couponApplied
          state.order.discountedTotal = action.payload.discountedTotal
        //   localStorage.setItem("global", JSON.stringify(state));
        },
        addUserDetails : (state , action) =>{
            console.log(action.pay)
        } 

    }

})


export const {openThankingModal , closeThankingModal ,confirmOrder  ,addUserDetails, toggleDarkTheme} = globalSlice.actions
export default globalSlice.reducer