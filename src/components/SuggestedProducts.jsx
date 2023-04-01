import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeltonCard from "./SkeltonCard";
import { useDispatch , useSelector } from "react-redux/es/exports";
import { fetchAllProducts  } from "../features/productSlice";

function SuggestedProducts() {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const {products} = useSelector((state) => state.products);
  // get data from api
  const getProducts = async () => {
    const res = await axios.get(`https://buyandgrab-server.onrender.com/api/v1`);
    // setProducts(res.data);
    // console.log(res)
  };

  //useEffect is a hook that runs a piece of code based on a specific condition.
  useEffect(() => {
    // getProducts();
    dispatch(fetchAllProducts())
  }, [dispatch]);

  return (
    <>
      <div className="desktop hidden md:block">
        <div className="course-heading">
          <p className="heading-text ">Recommended Products</p>
        </div>
        <div className="card-container ">
          {products.length > 0 ? (
            products.slice(0, 14).reverse().map((product, index) => (
              <div className="card-inner" key={product._id}>
                <Link to={`/product/${product._id}`} className="card-inner-a">
                  <img src={product.image} alt="" className="card-img-a" 
                    onMouseEnter={e=>e.currentTarget.src = product.hoverImage ? product.hoverImage : product.image}
                    onMouseLeave={e=>e.currentTarget.src = product.image }
                  />
                  <small className="free-courses">{product.category} | {product.subCategory}</small>
                  <div className="pl-3 pr-1">
                    {product.title.slice(0, 36) + " ..."}
                  </div>
                </Link>
                <div className="card-footer">
                  <div className="flex flex-row pb-2 justify-between  items-center mx-4">
                    <div className="card-price mt-3">
                      <span className="text-sm">RS : </span>
                      <span className="themeClrText text-start text-xl">{product.price}</span>
                  <span className="del-text text-sm ml-4 font-noraml text-gray-400">RS : {Number(product.price * 1.2).toFixed(2)}</span>
                  {/* <span className="del-text ml">{Number(product.price * 0.2).toFixed(2)}%</span> */}
                </div>
  
                    <div className="card-ratings flex justify-between items-center mt-2">
                        <span className="rating-stars">
                          {(product.rating.ratings).toFixed()}
                          <i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i>{" "}
                        </span>
                        <span className="rating-count text-[13px] ml-2">
                          {product.rating.ratingCount}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
            </>
          )}
        </div>
      </div>

      {/* below code is for phone's screen */}

      <div className="onPhone block md:hidden">
        <div className="flex justify-between my-3 mx-5">
          <p className="font-bold mb-0 pt-2">Recommended</p>
        
        </div>
        <div className="card-container ">
          {products.length > 0 ? (
            products.slice(0, 6).map((product, index) => (
              <div className="card-inner-phone" key={product._id}>
                <Link to={`/product/${product._id}`} className="card-inner-a">
                  <img
                    src={product.image}
                    onMouseEnter={e=>e.currentTarget.src = product.hoverImage ? product.hoverImage : product.image}
                    onMouseLeave={e=>e.currentTarget.src = product.image }
                    alt=""
                    className="card-img-a mx-auto"
                  />
                  <div className="text-sm text-blue-400 px-1 my-1">
                    {product.title.slice(0, 25) + " ..."}
                  </div>
                </Link>
                <div className="flex flex-row justify-between mx-1 my-1 px-1">
                  
                  <div className="text-md">
                    <span className="text-sm">Rs . </span>
                    <span className="text-green-800">
                      { product.price}
                    </span>
                  </div>
                  <div className="card-ratings flex justify-between items-center ">
                        <span className="rating-stars">
                          {product.rating.ratings.toFixed()}
                          <i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i>{" "}
                        </span>
                        <span className="rating-count text-[13px] ml-2">
                          {product.rating.ratingCount}
                        </span>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SuggestedProducts;
