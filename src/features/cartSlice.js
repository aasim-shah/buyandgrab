import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {  toast } from "react-toastify";

const data = JSON.parse(localStorage.getItem("cart"));
const initialState = data || {
  hidden: false,
  cartItems: 0,
  itemsInCart: [],
  quantity: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      const {  uuid } = action.payload;
      let matchedItem = state.itemsInCart.find((item) => item.uuid === uuid  );
      if (matchedItem.quantity > 0) {
        matchedItem.quantity -= 1;
        matchedItem.priceSum -= matchedItem.price;
        state.totalCount -= matchedItem.price;
      }
      if (matchedItem.quantity === 0) {
        state.itemsInCart = state.itemsInCart.filter((item) => item.uuid !== uuid );
        state.cartItems -= 1 ;
      }
      localStorage.setItem("cart", JSON.stringify(state));
      toast.warning(`${action.payload.title} removed from cart !`);
    },
    removeAll: (state) => {

      state.cartItems = 0;
      state.itemsInCart = [];
      state.totalCount = 0;
      localStorage.removeItem("cart");
      toast.error("Cart is empty now");
    },
    addToCart: (state, action) => {
      const itemInCart = state.itemsInCart.find(
         (item) => item.id === action.payload.product.id && item.clr === action.payload.clr && item.size === action.payload.size );
      if (itemInCart) {
          itemInCart.quantity++;
          itemInCart.priceSum = itemInCart.price * itemInCart.quantity;
          state.totalCount += action.payload.product.price;
          toast.success(`${itemInCart.quantity} Products added !`);
       
      } else {
        state.itemsInCart.push({
          ...action.payload.product,
          uuid : uuidv4(), 
          quantity: action.payload.qty,
          clr : action.payload.clr,
          size : action.payload.size,
          priceSum: action.payload.product.price * action.payload.qty,
        });
        state.cartItems += 1;
        state.totalCount += action.payload.product.price * action.payload.qty;
        toast.success(`${action.payload.product.title} Added to Cart !`);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    showCart: (state) => {
      state.hidden = !state.hidden;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { showCart, addToCart, removeAll, removeItem } = cartSlice.actions;
export default cartSlice.reducer;










// const itemInCart = state.itemsInCart.find(
//   (item) => item.id === action.payload.id
// );
// if (itemInCart) {
//   itemInCart.quantity++;
//   itemInCart.priceSum = itemInCart.price * itemInCart.quantity;
//   state.totalCount += action.payload.price;
//   toast.success(`${itemInCart.quantity} Products added !`);
// } else {
//   state.itemsInCart.push({
//     ...action.payload,
//     quantity: 1,
//     priceSum: action.payload.price,
//   });
//   state.cartItems += 1;
//   state.totalCount += action.payload.price;
//   toast.success(`${action.payload.title} Added to Cart !`);
// }
// localStorage.setItem("cart", JSON.stringify(state));