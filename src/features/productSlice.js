import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    products : [],
    loading : '',
    error : ""

}



export const fetchAllProducts = createAsyncThunk('product/fetchAll' , async() =>{
    const { data } = await axios.get('https://buyandgrab-server.onrender.com/api/v1/')
    return data
    }
)



export const fetchProductById = createAsyncThunk('product/fetchById' , async({id}) =>{
    const { data } = await axios.get(`https://buyandgrab-server.onrender.com/api/v1/product/${id}`)
    return  data
    }
)

export const addReview = createAsyncThunk('product/addReview' , async(reviewData) =>{
    const {data} = await axios.post(`https://buyandgrab-server.onrender.com/api/v1/product/add_review` , reviewData)
    toast.success('Review Updated')
    console.log(data)
    return data
    }
)

const productSlice = createSlice({
    name : 'products',
    initialState ,
    reducers : {},
    extraReducers : {
        [fetchAllProducts.pending] : (state , {payload}) => {
            state.products = [];
           
        },
        [fetchAllProducts.fulfilled] : (state , {payload}) => {
            state.products = payload;
         
        },

        [fetchProductById.pending] : (state , {payload}) => {
            state.products = [];
           
        },
        [fetchProductById.fulfilled] : (state , {payload}) => {
            state.products = [payload];
          
        },

        [addReview.pending] : (state , {payload}) => {
            console.log('review add pending')
            state.products = [];
            
        },
        [addReview.fulfilled] : (state , {payload}) => {
            console.log('review add fullfled')
            state.products = [payload]
        }

    } 
})

export default productSlice.reducer


