import {
  showCart,
  addToCart,
  removeAll,
  removeItem,
} from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {confirmOrder} from '../features/globalSlice'
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { Fragment } from "react";

export default function CartComponent() {
  const [inputCouponCode, setInputCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const global = useSelector((state) => state.global);
  const itemsInCart = cart.itemsInCart;
  const hideCart = () => {
    dispatch(showCart());
  };
  setTimeout(() => {
    dispatch(removeAll());
  }, 1000 * 60 * 60 * 8);

  const validiateCoupon = async () => {
    const data = { code: inputCouponCode };
    const res = await axios.post(
      "https://ennmartserver.up.railway.app/api/v1/validateCoupon",
      // "http://localhost:8000/api/v1/validateCoupon",
      data
    );
    console.log(res);
    if (res.data) {
      setCouponData({
        code: res.data.code,
        amount: res.data.amount,
        isValid: res.data.isValid,
        _id : res.data._id
      });
    } else {
      setCouponData({ code: "", isValid: false, amount: 0  , _id : ''});
    }
  };

  const handleProccedToPay = async() =>{
    let couponApplied = false;
    let discountedTotal = cart.totalCount;
       if(couponData && couponData.isValid ){
         couponApplied = true ;
         discountedTotal = Number(cart.totalCount - (cart.totalCount * couponData.amount/100)).toFixed(2)
      }
    dispatch(confirmOrder({products : cart.itemsInCart , coupon :  couponData , couponApplied , discountedTotal  }))
      hideCart()
    window.location = "/confirm_order"
  }
  return (
    <>
      <div onClick={hideCart} id="overlay" className="hidden md:block"></div>
      <div className="cart-container rounded-md  hidden md:block absolute  right-0 bg-[#355b7d] min-h-[90vh]  top-[3rem] w-8/12 z-[3] ">
        <div className="cart-inner py-3 flex bg-[#6e94b6ba] mb-5 text-white justify-between">
          <div className="okay"> </div>
          <p className="text-xl font-bold ">Shopping Cart</p>
          <button onClick={hideCart} className="cross mx-4   font-bold text-xl">
            <FaTimes />
          </button>
        </div>

        <div className="cart-products-main w-[95%] mx-auto flex flex-col ">
          <table className="  text-white ">
            {cart && itemsInCart.length > 0 ? (
              <thead className="text-yellow-400">
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </thead>
            ) : (
              ""
            )}
            {cart && itemsInCart.length > 0 ? (
              itemsInCart.map((cartItem , ind) => (
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
                      <td className="  font-semibold text-sm">
                        {cartItem.title.slice(0, 52)} ....
                        <div className="flex justify-between mx-5 w-9/12 md:5/12 pt-3">
                          <div className="left">
                            <small className="text-yellow-300">
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
                            <small className="text-yellow-300">
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
                      </td>
                      <td>
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
                <div className="clearCart ">
                  <button
                    onClick={() => dispatch(removeAll())}
                    className={
                      " px-2 text-sm text-red-500 bg-white py-1  rounded-md"
                    }
                  >
                    {" "}
                    <span className="pt-1"> </span> <MdDeleteSweep size={30} />
                  </button>
                </div>
                <div className="">
                  <span className="text-white  mr-3">SubTotal : </span>
                  <span className="text-yellow-300  text-xl font-bold">
                    {couponData && couponData.isValid ? Number(cart.totalCount - (cart.totalCount * couponData.amount/100)).toFixed(2)  : cart.totalCount.toFixed(2)}
                  </span>
                  <span className="text-green-300 text-sm ml-2">{couponData  && couponData.isValid ?  (" -" + couponData.amount)  + "%": ""}</span>
                  <small className="curr ml-2 text-white">PKR</small>
                </div>
              </div>
              <div className="flex flex-row ">
                <div className="flex flex-row ml-4  mt-10">
                  <div className="flex flex-col">
                    <p className="text-sm  font-bold my-1">
                      {couponData ? couponData.isValid ? (
                        <span className="text-green-400">* Coupon Applied</span>
                      ) : (
                        <span className="text-red-400">
                          {" "}
                          * Coupon is NOT Valid
                        </span>
                      ) : (
                        <span className="text-gray-300 font-normal">
                          * Apply Coupon for More Discounts 
                          </span>
                      )} 
                    </p>
                    <input
                      type="text"
                      name=""
                      onChange={(e) => setInputCouponCode(e.target.value)}
                      placeholder="Coupon Code .."
                      className="h-8 px-2 outline-none rounded-md"
                      value={inputCouponCode}
                      autoComplete={false}
                      id=""
                    />
                  </div>
                  <button

                    type="button"
                    onClick={() => {
                      validiateCoupon();
                    }}
                    className="py-1 px-3 rounded-md bg-orange-400  font-bold h-8  mt-7 ml-2"
                  >
                    Validate
                  </button>
                </div>

                <div className="flex  mt-8 w-3/12 py-3 flex-col justify-end items-center ml-auto">
                  <select
                    name="paymentMethod"
                    id=""
                    className="py-1 px-3 outline-none w-11/12 rounded-md"
                  >
                    <option>Select Payment Method</option>
                    <option value="cashOnDelivery">Cash On Delivery</option>
                  </select>
                  <button
                    onClick={handleProccedToPay}
                    className="bg-orange-400 py-1 px-4 rounded-md mt-3 font-bold"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

// <div className="cart-row flex flex-row  justify-between my-4 bg-green-200 items-center">
// <img src={'images/ecom.png'} className="w-32 h-32 " alt="" />
// <div className="title">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint?
// </div>
// <div className="qty">
//     4
// </div>

// <div className="price">
//     3423423$
// </div>

// </div>
