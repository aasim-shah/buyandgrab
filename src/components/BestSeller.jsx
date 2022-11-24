// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchAllProducts } from "../features/productSlice";
import { Navigation  , Autoplay} from 'swiper';
import { useDispatch , useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeltonCard from "./SkeltonCard";

export default function BestSeller() {
  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.products)


  //useEffect is a hook that runs a piece of code based on a specific condition.
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <div className="allCategories-heading hidden md:flex">
        <p className="heading-text">Top Sales</p>
      </div>
      <div className="onPhone block md:hidden">
        <p className="wings text-center relative my-4">Top Sales</p>
      </div>

      <div className=" hidden sm:grid grid-cols-12">
        <div className="col-span-12 sm:col-span-3 bg-gray-400">banner</div>
        <div className="flex flex-wrap col-span-12 py-2  sm:col-span-9  bg-gray-100 ">
        {products &&  products.slice(1, 5).reverse().map((product, index) => (
          <div className="card-inner sm:min-w-[25rem] bs-slider  " key={product._id}>
            <Link to={`/product/${product._id}`} className="card-inner-a mt-1">
             
                <img
                src={product.image}
                alt=""
                className=" w-[29rem] h-[25rem] mx-auto mb-3 rounded-md"
              />
                
            <small className="free-courses">{product.category}</small> | <small className="free-courses">{product.subCategory}</small>
              <div className="card-title pl-3">
                {product.title.slice(0, 36) + " ..."}
              </div>
              <div className="card-footer">
                <div className="card-footer-left">
                  <div className="card-price">
                    <span>RS : </span>
                    <span>{"$" + product.price}</span>
                  </div>
                  <div className="card-discounted-price">
                    <span className="del-text">
                      RS : {Number(product.price * 1.3).toFixed(2)}
                    </span>
                    <span className="del-text ml">
                      {Number(product.price * 0.2).toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex flex-row justify-between my-2 items-center">
                   <div className="left">
                   <span className="rating-stars">
                      {product.rating.ratings}
                      <i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i>{" "}
                    </span>
                    <span className="rating-count ml">
                      ({product.rating.ratingCount})
                    </span>
                   </div>
                    
                    <button className="w-32 rounded-md py-2 mr-5 text-white font-bold themeClrBg ">  Add To Bag</button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}</div>
      </div>

      {/* for phone screen */}
      <Swiper
        className="w-11/12 flex md:hidden"
        spaceBetween={20}
        modules={[Navigation , Autoplay]}
        navigation={true}
        autoplay={{delay:4000 , disableOnInteraction:true}}
        slidesPerView={1}
      >
        <div className="card-container">
          {products &&  products.slice(0, 14).map((product, index) => (
            <SwiperSlide className="card-inner bs-slider " key={product._id}>
              <Link to={`/product/${product._id}`} className="card-inner-a">
                <img
                  src={product.image}
                  alt=""
                  className="mx-auto mb-3 rounded-md"
                />
                <small className="free-courses">{product.category}</small>  | 
                <small className="free-courses">{product.subCategory}</small>
                <div className="card-title px-2">
                  {product.title.slice(0, 36) + " ..."}
                </div>
                <div className="card-footer">
                  <div className="card-footer-left">
                    <div className="card-price">
                      <span>RS : </span>
                      <span>{"$" + product.price}</span>
                    </div>
                    <div className="card-discounted-price">
                      <span className="del-text">
                        RS : {Number(product.price * 1.3).toFixed(2)}
                      </span>
                      <span className="del-text ml">
                        {Number(product.price * 0.2).toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex flex-row justify-between items-center my-2">
                      <div className="lect">
                      <span className="rating-stars">
                        {product.rating.ratings}
                        <i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i>{" "}
                      </span>
                      <span className="rating-count ml">
                        ({product.rating.ratingCount})
                      </span>
                      </div>
                      <button className="w-32 rounded-md py-2 mr-5 text-white font-bold themeClrBg ">  Add To Bag</button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}
