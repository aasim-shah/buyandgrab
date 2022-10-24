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


function Navbar() {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const cartItems = cart.cartItems;
  const dispatch = useDispatch();
  const cartHidden = cart.hidden;
  const showcartBtn = () => {
    dispatch(showCart());
  };

  //initialise search value
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:3001/api/v1");
    setProducts(res.data);
  };
  //whenever search value gets updated, we will update patience list
  useEffect(() => {
    if (searchValue !== "") {
      const newPacientes = products.filter((value) =>
        value.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFiltered(newPacientes);
      getProducts();
    }
  }, [searchValue]);

  const toggeSrcRusultPhone = () =>{
    setFiltered([]);
    console.log('toggeSrcRusultPhone');
  }
  return (
    <>
      <div className="black-strap">Limited Stocks remaining. Shop Now</div>
      <div className="nav py-3 px-6">
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
          <div className="search-btn">
            <i className=" text-xl  fa-solid fa-magnifying-glass"></i>
          </div>

          <div  className="showSrcResults  w-full  max-h-32 overflow-hidden absolute z-[5]">
            {filtered && filtered.length > 0
              ? filtered.map((item) => (
                  <div className="showSrcResults bg-white  border-b-2 py-3 flex flex-row justify-between px-3 ">
                    <div className="img w-6 h-6 flex justify-center items-center">
                      <img src={item.image} alt="" />
                    </div>

                    <div className="title">{item.title.slice(0, 33)} ...</div>
                    <div className="price">{item.price}</div>
                  </div>
                ))
              : ""}
          </div>
        </div>

        <div className="menu">
          <ul className="menu-list">
            <li className="list-item text-[2rem]">
              {auth.isAuthanticated ? (
                <button
                  onClick={() => {
                    dispatch(loggedOut());
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              ) : (
                <Link to={"/login"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </li>

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
        <span className="bg-gray-200  h-12 top-10 w-16 rounded-md flex items-center justify-center absolute right-4 ">
         {searchValue !== '' ? (<FaTimes size={20}  onClick={toggeSrcRusultPhone}/>) : (<RiSearchLine size={20}/>)}
        </span>
        <div id="showSrcResultsPhone" className="showSrcResultsPhone  scrolable  w-full absolute  max-h-32 overflow-hidden z-[5]">
          {filtered && filtered.length > 0
            ? filtered.map((item) => (
                <div className="  w-11/12 mx-auto  border-b-2 py-5 mt-2 flex flex-row justify-between px-3 ">
                  <div className="img w-6 h-6 flex justify-center items-center">
                    <img src={item.image} alt="" />
                  </div>

                  <div className="title text-white">
                    {item.title.slice(0, 26)} ...
                  </div>
                  <div className="price text-white">{item.price}</div>
                </div>
              ))
            : ""}
        </div>
      </div>

      {cart && cartHidden ? <CartComponent /> : ""}
    </>
  );
}

export default Navbar;
