import { useSelector, useDispatch } from "react-redux/es/exports";
import { useState } from "react";
import {
  addToCart,
  removeAll,
  showCart,
  removeItem,
} from "../features/cartSlice";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import {BsArrowLeft} from 'react-icons/bs'
import { Link } from "react-router-dom";

export default function CartOnPhonescreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

 

  return (
    <><div id="overlay" onClick={()=>{dispatch(showCart())}}></div>
      <div id="pcart-container" className="block md:hidden pcart-container z-[5] fixed  bottom-0 h-[70vh] bg-white w-full">
        <div className="flex justify-between py-4 px-3">
          <span className="font-bold ">Your Cart</span>
          <span
            onClick={() => {
              dispatch(removeAll());
            }}
            className="flex flex-row  justify-between items-center w-20 py-1 px-2 rounded-full font-bold bg-red-400"
          >
            <small>clear</small>
            <AiFillDelete />
          </span>
        </div>
        <div className="scrolable flex flex-col items-center">
          {cart && cart.itemsInCart.length > 0
            ? cart.itemsInCart.map((cartItem) => (
                <div key={cartItem.id} className="pcart-inner grid grid-cols-12 my-2 py-1 border-b  w-11/12 ">
                  <div className="col-span-3 relative">
                    <input
                      className="bg-blue-400  rounded-[5px] text-white mx-1 text-[12px] text-center w-6 h-6  absolute"
                      value={cartItem.quantity}
                    />
                    <img
                      src={cartItem.image}
                      alt=""
                      className="w-[5rem] h-[5rem] mx-auto"
                    />
                  </div>
                  <div className="col-span-9 flex bg-gray-100 relative flex-col">
                    <p className="title px-1 py-2 h-12  text-[14px] font-bold ">
                    <span>{cartItem.title.slice(0, 40)} ...</span>  
                    </p>
                    <div className="absolute top-7 right-4">
                      <small>clr : {cartItem.clr}<span className={`inline-flex w-3 h-3 mx-1 rounded-sm bg-${cartItem.clr}-500`}></span></small>, 
                      <small className="ml-2"> size : {cartItem.size} </small>
                    </div>
                    <div className="qty-price  flex  mx-3  mt-1 flex-row justify-between">
                      <div className="qty flex flex-row gap-5">
                        <AiOutlineMinus
                          color="green"
                          onClick={() => {
                            dispatch(removeItem(cartItem ));
                          }}
                          size={20}
                        />
                        <AiOutlinePlus
                          color="green"
                          onClick={()=>{
                            dispatch(addToCart({product : cartItem , qty :0 , clr: cartItem.clr , size : cartItem.size}))
                          }}
                          size={20}
                        />
                      </div>
                      <div className="price">Rs. {cartItem.priceSum.toFixed(2)}</div>
                      <div className="empty"  onClick={() => {
                            dispatch(removeItem(cartItem));
                          }}>
                        <AiFillDelete color="green" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ''}
        </div>
        {cart && cart.itemsInCart.length > 0 ? (     <div className="cart-footer ">
          <div className="border-t-2 mt-3 pt-2 font-[500] text-[0.9rem] border-green-500 mx-3 flex flex-row justify-between">
            <span>SubTotal</span>
            <span>RS. {cart.totalCount.toFixed(2)}</span>
          </div>
          <div className=" text-[14px] mt-2 mx-3  flex flex-row justify-between">
            <span>Deliver Charges</span>
            <span>RS. 0.00</span>
          </div>
          <div className=" mx-3  text-[1rem] mt-2 font-bold flex flex-row justify-between">
            <span>Grand Total</span>
            <span>RS. {cart.totalCount.toFixed(2)}</span>
          </div>
          <div className="checkout flex flex-row justify-center mt-2">
            <Link to="/comfirm_order" className="bg-green-800 w-11/12 flex flex-row justify-center text-white py-2 rounded-md  font-bold">
              CheckOut
            </Link>
          </div>
        </div>) : (<>
                <div className="w-full absolute">

                <img src="../images/empty-cart2.png" alt="" />
                  <button onClick={()=>{dispatch(showCart())}} className="continue  mt-12 flex flex-row items-center my-3 justify-between bg-[#355b7d] text-white font-bold py-2 px-3 rounded-md mb-2 w-fit  mx-auto">
                    <span><BsArrowLeft size={25}/></span>
                    <span className="ml-4">continue to shopping</span>
                  </button>
                  </div>
            </>)}
   
      </div>
    </>
  );
}
