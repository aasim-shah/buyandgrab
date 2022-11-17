import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showCart } from "../features/cartSlice";
import CartComponent from "./CartComponent";
import { useState, useEffect } from "react";
import { loggedOut } from "../features/authSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {FaTimes} from "react-icons/fa"
import {RiSearchLine} from "react-icons/ri"
import { fetchAllProducts } from "../features/productSlice";
import userEvent from "@testing-library/user-event";


function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const {products} = useSelector((state) => state.products);
  const cartItems = cart.cartItems;
  const dispatch = useDispatch();
  const cartShowen = cart.hidden;
  const showcartBtn = () => {
    dispatch(showCart());
  };

  //initialise search 
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  //whenever search value gets updated, we will update patience list
  useEffect(() => {
    if (searchValue !== "") {
      const newPacientes = products.filter((value) =>
        value.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFiltered(newPacientes);
      dispatch(fetchAllProducts());
    }
  }, [searchValue]);

function handleLogOut (){
  setShowProfileMenu(false)
  dispatch(loggedOut())
}

  const toggeSrcRusultPhone = () =>{
    setFiltered([]);
  setSearchValue('')
    console.log('toggeSrcRusultPhone');
  }
  return (
    <>
      <div className="black-strap  ">Limited Stocks remaining. Shop Now</div>
      <div className="nav py-3 px-6 ">
        <div>
          <Link to="/" className="text-xl font-bold themeClrText"> Buy And Grab</Link>
        </div>
        <div className="search-bar hidden relative md:block">
          <input
            type="text"
            name=""
            placeholder="Seach Store"
            className="search-input"
            id=""
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <div className="search-btnd ">
            <i className=" text-xl  fa-solid fa-magnifying-glass"></i>
          </div>

            <div  className="showSrcResults  w-full  max-h-32 overflow-hidden absolute z-[5]">
            {searchValue !== "" &&  filtered && filtered.length > 0
              ? filtered.map((item) => (
                    <Link to={'/product/'+ item._id} >
                  <div className="showSrcResults bg-white  border-b-2 py-3 flex flex-row justify-between px-3 ">
                    <div className="img w-6 h-6 flex justify-center items-center">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="title">{item.title.slice(0, 33)} ...</div>
                    <div className="price">{item.price}</div>
                  </div>
                    </Link>
                ))
              : ""}

          </div>
        </div>

        <div className="menu">
          <ul className="menu-list">
        

            <li
              onClick={showcartBtn}
              className="hidden md:block list-item text-[2rem] cart-li"
            >
              <span className="cart-count">{cartItems}</span>
              <button>
                <i className=" fa-solid fa-cart-shopping"></i>
              </button>
              <Link to="/cart">
                <i className="inline-block md:hidden fa-solid fa-cart-shopping"></i>
              </Link>
            </li>

            <li className=" text-[2.1rem] relative ml-5">
           {auth.isAuthanticated ? (
            <div className="cursor-pointer" onClick={() =>{setShowProfileMenu(prev => !prev)}}>
            <i  className="fa-solid fa-user"></i>
            </div>
              ) : (
                <Link to={"/login"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              )}
                 {showProfileMenu ? (
              <div className=" relative z-[3]">
                <ul className="absolute bg-white w-48 flex flex-col justify-center items-center right-[-13px] top-2 rounded-md">
                  <li className="text-sm mt-3 flex w-11/12 mx-auto flex-row justify-between  items-center">
                    <span className="">Welcome</span>
                    <span className="themeClrText ">{auth.user.firstName}</span>
                    </li>
                  <li ><Link className="w-40  flex justify-center bg-white shadow-md text-sm py-2 px-3 mt-2 rounded-md" to=''>Show Profile</Link></li>
                
                  <li ><Link className="w-40 flex justify-center bg-white shadow-md text-sm py-2 px-3 mt-2 rounded-md" to=''>My Orders</Link></li>
                  <li><button onClick={(e)=>{handleLogOut()}} className="w-40 flex bg-red-400 mb-2 justify-center bg-white shadow-md text-sm py-1 font-bold text-white px-3 mt-2 rounded-md">LOGOUT</button></li>
                </ul>
              </div>
            ) : ""}
            </li>
          </ul>
        </div>
      </div>
      <div
        className="onPhone fixed z-[7] h-32   flex w-full bg-[#355b7d] md:hidden"
        id="searchBarPhone"
      >
        <input
          type="text"
          name="search"
          className="h-12 px-2 rounded-md my-auto border-2 w-11/12 mx-auto"
          placeholder="Search store"
          id=""
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <span onClick={toggeSrcRusultPhone} className="bg-gray-200  h-12 top-10 w-16 rounded-md flex items-center justify-center absolute right-4 ">
         {searchValue !== '' ? (<FaTimes size={20}  />) : (<RiSearchLine size={20}/>)}
        </span>
        <div id="showSrcResultsPhone" className="showSrcResultsPhone  scrolable  w-full absolute  max-h-32 overflow-hidden z-[5]">
          {filtered && filtered.length > 0
            ? filtered.map((item) => (
                <Link   to={`/product/${item._id}`} className="  w-11/12 mx-auto  border-b-2 py-5 mt-2 flex flex-row justify-between px-3 ">
                  <div className="img w-6 h-6 flex justify-center items-center">
                    <img src={item.image} alt="" />
                  </div>

                  <div className="title text-white">
                    {item.title.slice(0, 26)} ...
                  </div>
                  <div className="price text-white">{item.price}</div>
              </Link>
              ))
            : ""}
        </div>
      </div>

      {cart && cartShowen ? <CartComponent /> : ""}
    </>
  );
}

export default Navbar;
