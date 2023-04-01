import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import ThankingModal from "../../components/ThankingModal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { loggedOut } from "../../features/authSlice";


function ConfirmOrderForm() {
    const global = useSelector((state) => state.global);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [InputErr, setInputErr] = useState(null);
  
  
  
    const getUserData = async () => {
      const res = await axios.get(
        `https://buyandgrab-server.onrender.com/user/info/${auth.user?._id}`
      );
      setUserInfo({
        firstName : res.data.firstName,
        lastName : res.data.lastName,
        email : res.data.email,
        phone : res.data.phone,
        city : res.data.city,
        zipCode : res.data.zipCode,
        address : res.data.address
      });
    };
  
    const [userInfo, setUserInfo] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      zipCode: "",
      address: "",
    });
  
    const handleChange = (e) => {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!auth.isAuthanticated) {
        return (window.location = "/login");
      }
      if (
        userInfo.firstName === "" ||
        userInfo.email === "" ||
        userInfo.phone === "" ||
        userInfo.address === ""
      ) {
        setInputErr("* Fill All Required Fields Properly !");
        return;
      }
      
  
   
  
      let data = {
        // products : global.order.products.map((item) => {
        //   return item._id;
        // }),
  
        products : global.order.products,
        couponApplied: global.order.couponApplied,
        totalAmount: global.order.discountedTotal,
        user: auth.userId,
        userInfo: userInfo,
        coupon : global.order.coupon._id
  
      };
     
      try {
        const headers = {
          "Content-Type": "application/json",
          jwt_token: auth.token,
        };
  
        const res = await axios.post(
          "https://buyandgrab-server.onrender.com/api/v1/place_order",
          data,
          {
            headers: headers,
          }
        );
        console.log(res);
        if (res.data.success) {
          toast.success("Order Places Successfully :)");
          window.location = `/payment/${res.data.order._id}`;
          return;
        }
      } catch (error) {
        console.log(error);
        toast.error("Token Expired Please Login Again to order !");
        dispatch(loggedOut())
  
      }
    };
  
    useEffect(() => {
      getUserData();
    }, []);
    
  return (
    <div>

<div className="flex flex-col justify-center items-center mx-auto my-5 w-11/12">
        <p className="font-semibold my-2 text-blue-800">Confirm Your ORDER Please !</p>
        <form>
          <div className="flex flex-row w-full">
            <input
              required
              type="text"
              name="firstName"
              value={ userInfo.firstName}
              onChange={(e) => handleChange(e)}
              className="w-full py-1 px-4 border-2 rounded-md mr-2"
              placeholder="First Name .."
              id=""
            />
            <input
              required
              type="text"
              name="lastName"
              value={userInfo.lastName}

              onChange={(e) => handleChange(e)}
              className="w-full py-1 px-4 border-2 rounded-md ml-2"
              placeholder="Last Name ..."
              id=""
            />
          </div>
          <div className="w-full mt-3">
            <input
              required
              type="text"
              name="email"
              value={userInfo.email}
              onChange={(e) => handleChange(e)}
              className="w-full py-1 px-4 border-2 rounded-md"
              placeholder="Email Address ...."
              id=""
            />
          </div>
          <div className="w-full mt-3">
            <input
              required
              type="number"
              name="phone"
              value={userInfo.phone}
              onChange={(e) => handleChange(e)}
              className="w-full py-1 px-4 border-2 rounded-md"
              placeholder="Phone Number ..."
              id=""
            />
          </div>
          <div className="w-full mt-3">
            <div className="flex flex-row w-full">
              <input
                required
                type="text"
                name="city"
                value={userInfo.city}
                onChange={(e) => handleChange(e)}
                className="w-full py-1 px-4 border-2 rounded-md mr-2"
                placeholder="City .."
                id=""
              />
              <input
                type="text"
                name="zipCode"
                value={ userInfo.zipCode}
                onChange={(e) => handleChange(e)}
                className="w-full py-1 px-4 border-2 rounded-md ml-2"
                placeholder="Zip code ..."
                id=""
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <input
              type="text"
              name="address"
              value={ userInfo.address}

              onChange={(e) => handleChange(e)}
              className="w-full py-6 px-4 border-2 rounded-md"
              placeholder={"Address"}
              id=""
            />
          </div>
          <p className="text-red-500 text-sm px-3">{InputErr}</p>
          <div className="w-full flex flex-row justify-center mt-3">
            <button
              className="py-1 px-5 themeClrBg text-white font-bold rounded-md"
              onClick={(e) => {
                handleSubmit(e);
              }}
              >
              Confirm
            </button>
              </div>
        </form>        
      </div>

    </div>
  )
}

export default ConfirmOrderForm