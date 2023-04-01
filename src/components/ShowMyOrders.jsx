import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";

function ShowMyOrders() {
  const authUser = useSelector((state) => state.auth);
  const userId = authUser.userId;
  const [ordersList, setOrdersList] = useState([]);
  const getMyOrders = async () => {
    const { data } = await axios.get(
      `https://buyandgrab-server.onrender.com/user/${userId}/showOrders`
    );
    console.log(data);
    setOrdersList(data.orders);
  };

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div>
      <p className="text-lg font-bold text-gray-400">My Orders </p>
      <div className="flex w-11/12 flex-col mx-auto bg-gray-100">
        <p className="text-gray-400">All my orders will be shown here !</p>
        <div className="card grid grid-cols-12 mt-3">
          <div className="hidden sm:flex sm:col-span-6  text-center font-bold text-lg">
          Products 
          </div>
          <div className="col-span-4 sm:col-span-2  text-center font-bold text-lg">order Price</div>
          <div className="col-span-4 sm:col-span-2 text-center font-bold text-lg">Order status</div>
          <div className="col-span-4 sm:col-span-2 text-center font-bold text-lg">Actions</div>
        </div>

      {ordersList && ordersList.length > 0  ? ordersList.map((order,ind)=>(  <div key={ind} className="card grid grid-cols-12 mt-3 bg-gray-200 py-2 rounded-md px-1">
          <div className="col-span-12 mb-2 sm:mb-0 sm:col-span-6 ">
           {order.products.length > 0 ? order.products.map((product , ind)=>(<div key={ind}>
           <div className="grid grid-cols-12 mt-0 sm:mt-2 justify-center items-center">
            <img src={product.productId.image} className="h-12 w-12 col-span-2 sm-col-span-2" alt="" />
            <p className="text-sm text-black col-span-2 sm-col-span-2"><small className="text-gray-800 mr-1">Qty :</small> {product.qty}</p>
            <p className="text-sm text-black col-span-8 sm-col-span-8" >{product.productId.title}</p>

           </div>

            </div>)) : "No Order Found !"}
          </div>
          <div className="col-span-4 sm:col-span-2 flex justify-center items-center"><span className="text-sm text-gray-800 mr-2">PKR.</span><span className="text-lg font-bold">{order.totalAmount.toFixed(2)}</span></div>
          <div className="col-span-4 sm:col-span-2 flex flex-col justify-center items-center">
            <span className="text-sm text-gray-400"> Order Date : <br/> {moment(order.createdAt).format('lll')}</span>
            {order.status}</div>
          <div className="col-span-4 sm:col-span-2 flex flex-col justify-center items-center">
          <button className="py-1 px-3 rounded-md border-2 text-sm mt-2 hover:bg-green-400 border-green-400">Tract Order</button>
          </div>
        </div>)) : ""}
      </div>
    </div>
  );
}

export default ShowMyOrders;
