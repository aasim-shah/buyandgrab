import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    thankingModalOpen  : false,
    darkTheme : false
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
        } 
    }

})


export const {openThankingModal , closeThankingModal , toggleDarkTheme} = globalSlice.actions
export default globalSlice.reducer