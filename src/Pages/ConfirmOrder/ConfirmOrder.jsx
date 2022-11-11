import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import ThankingModal from "../../components/ThankingModal";
import { useSelector, useDispatch } from "react-redux";
import { ImFrustrated } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function ConfirmOrder() {
  const global = useSelector((state) => state.global);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [InputErr, setInputErr] = useState(null);

  const getUserData = async () => {
    const res = await axios.get(
      `https://ennmart.herokuapp.com/user/info/${auth.user._id}`
    );
    setUserData(res.data);
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
      products: global.order.products.map((item) => {
        return item._id;
      }),
      couponApplied: global.order.couponApplied,
      totalAmount: global.order.discountedTotal,
      user: auth.userId,
      userInfo: userInfo,
    };
    if (global.order.couponApplied) {
      data.coupon = global.order.coupon._id;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
        jwt_Token: auth.token,
      };

      const res = await axios.post(
        "https://ennmart.herokuapp.com/api/v1/place_order",
        data,
        {
          headers: headers,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Order Places Successfully :)");
        window.location = `/payment/${res.data._id}`;
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing Went Wrong !");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  return (
    <>
      <Navbar />

      <div className="flex flex-col justify-center items-center mx-auto my-5 w-11/12 md:w-5/12">
        <p className="text-gray-400 my-2">Confirm Your ORDER Please !</p>
        <div className="flex flex-row justify-between bg-gray-200 my-2 py-1 w-full">
          <span className="text-sm">
            Number of Products : {global.order.products.length}
          </span>
          <span className="text-sm">
            Total Price : {global.order.discountedTotal}
          </span>
        </div>
        {userData && userData.phone !== "" ? "" : (<form>
          <div className="flex flex-row w-full">
            <input
              required
              type="text"
              name="firstName"
              value={userData?.firstName || userInfo.firstName}
              onChange={(e) => handleChange(e)}
              className="w-full py-1 px-4 border-2 rounded-md mr-2"
              placeholder="First Name .."
              id=""
            />
            <input
              required
              type="text"
              name="lastName"
              value={userData?.lastName || userInfo.lastName}

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
              value={userData?.email || userInfo.email}
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
              value={userData?.phone || userInfo.phone}
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
                value={userData?.city || userInfo.city}
                onChange={(e) => handleChange(e)}
                className="w-full py-1 px-4 border-2 rounded-md mr-2"
                placeholder="City .."
                id=""
              />
              <input
                type="text"
                name="zipCode"
                value={userData?.zipCode || userInfo.zipCode}
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
              value={userData?.address || userInfo.address}
              onChange={(e) => handleChange(e)}
              className="w-full py-6 px-4 border-2 rounded-md"
              placeholder="Address"
              id=""
            />
          </div>
          <div className="w-full flex flex-row justify-start my-2 text-red-500 text-sm">
          {InputErr}
          </div>
        </form>)}

        
            <button
              className="py-1 px-5 themeClrBg text-white font-bold rounded-md"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Confirm
            </button>
      </div>

      <ThankingModal
        btnTitle={""}
        btnStyle={"hidden"}
        modalText={"Thanks Trusting Us Again 😍🔥"}
      />

      <Footer />
    </>
  );
}
