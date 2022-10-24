import { useSelector, useDispatch } from "react-redux/es/exports";

export default function CartOnPhonescreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <>

    {cart && cart.itemsInCart.length > 0 ? (cart.itemsInCart.map((cartItem)=>(
      <div className="pcart-container absolute bottom-3 bg-gray-300 w-full">
        <div className="pcart-inner grid grid-cols-12">
          <div className="col-span-3 bg-gray-200 ">
            <img src={cartItem.image} alt="" className="w-[5rem] h-[5rem] mx-auto" />
          </div>
          <div className="col-span-9 bg-green-200  flex flex-col">
            <p className="title px-1 py-2">
              {cartItem.title}
            </p>
            <div className="qty-price  flex  mx-3  mt-1 flex-row justify-between">
              <div className="qty">
                <button className="py-1 px-2 bg-yellow-300 rounded-sm">-</button>
                <input type="text" name="qty"  className="w-8 text-center mx-3" value={'0'} id="" />
                <button className="py-1 px-2 bg-yellow-300 rounded-sm">+</button>
              </div>
              <div className="price">{cartItem.priceSum}</div>
            </div>
          </div>
        </div>
        <div className="border-t-4 border-black mx-2 my-4 flex flex-row justify-between">
          <div className="clear">clear</div>
          <div className="subTotal">SubTotal : 009809</div>
        </div>
      </div>
    ))) : (' cart is emtpy')}
      
    </>
  );
}
