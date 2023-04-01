import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {  Fragment, useEffect } from "react";
import { loggedOut } from "../../features/authSlice";
import { addToCart, removeAll, removeItem } from "../../features/cartSlice";
import { MdDeleteSweep } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";



function ConfirmOrderDetails() {
    const dispatch = useDispatch()
    const global = useSelector((state) => state.global);
    const cart = useSelector((state) => state.cart);
    const itemsInCart = cart.itemsInCart;

    console.log({global})
    console.log({cart})
  return (
    <div className='my-5 sm:w-7/12 p-2 bg-white'>
         <div className="cart-products-main border-r-2 w-[95%] mx-auto flex flex-col ">
          <table className="  text-blue-800 ">
            {cart && itemsInCart.length > 0 ? (
              <thead className="text-blue-800">
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </thead>
            ) : (
              ""
            )}
            {cart && itemsInCart.length > 0 ? (
              itemsInCart.map((cartItem, ind) => (
                <Fragment key={ind}>
                  <tbody>
                    <tr className="">
                      <td>&nbsp;</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          key={cartItem.id}
                          className="w-28 h-28 rounded-md"
                          src={cartItem.image}
                          alt=""
                        />
                      </td>
                      <td className="font-semibold text-sm">
                        {cartItem.title.slice(0, 52)} ....
                        <div className="flex justify-between mt-4 mx-5 w-9/12 md:5/12 ">
                          <div className="left">
                            <small className="text-blue-800">
                              {cartItem.clr !== "" ? (
                                <>
                                  <span>Colour : </span> {cartItem.clr}
                                </>
                              ) : (
                                ""
                              )}
                            </small>
                          </div>
                          <div className="right">
                            <small className="text-blue-800">
                              {cartItem.size !== "" ? (
                                <>
                                  <span>Size : </span> {cartItem.size}
                                </>
                              ) : (
                                ""
                              )}
                            </small>
                          </div>
                        </div>
                      </td >
                        <td className="text-center">
                        <button
                          onClick={() => {
                            dispatch(removeItem(cartItem));
                          }}
                          className="py-1 px-2 bg-yellow-300 text-black rounded-sm "
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-3 font-bold ">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => {
                            dispatch(
                              addToCart({
                                product: cartItem,
                                qty: 0,
                                clr: cartItem.clr,
                                size: cartItem.size,
                              })
                            );
                          }}
                          className="py-1 px-2 bg-yellow-300 text-black rounded-sm "
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td className="">{cartItem.priceSum.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Fragment>
              ))
            ) : (
              <div className="ec-container my-6 mx-auto">
                <div className="ec-img">
                  <img
                    src="../images/empty-cart2.png"
                    alt="empty cart"
                    className="mx-auto"
                  />
                </div>
              </div>
            )}
          </table>
          {cart && itemsInCart.length > 0 ? (
            <div className="lajsdlfjsldfjs">
              <div className="flex justify-between  mr-4 pt-3 border-t-4 mt-5">
                <div className="hh"></div>
                <div className="">
                  <span className="text-blue-800  mr-3">SubTotal : </span>
                  <span className="text-blue-800  text-xl font-bold">
                   {cart.totalCount.toFixed(2)}
                  </span>
                
                  <small className="curr ml-2 text-blue-800">PKR</small>
                </div>
              
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
    </div>
  )
}

export default ConfirmOrderDetails