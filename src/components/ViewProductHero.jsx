import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../features/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { AiFillStar , AiFillHome} from "react-icons/ai";
import AddReview from "./AddReview";
import ThankingModal from "./ThankingModal";
import { Link , useNavigate } from 'react-router-dom'
import { fetchProductById } from "../features/productSlice";
import AllReviews from "./AllReviews";
import {FaStar} from 'react-icons/fa'
import { useEffect } from "react";

export default function ViewProductHero(id) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);
  const {products} = useSelector((state) => state.products);
  const product = products ? products[0] : null
  const [qty, setQty] = useState(1);
  const [clr, setClr] = useState("");
  const [size, setSize] = useState("");
  const [decCollapsed, setDecCollapsed] = useState(true);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null)

  const [clrErr, setClrErr] = useState("");
  const [sizeErr, setSizeErr] = useState("");

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => prev - 1);
  };

  useEffect(()=>{
    dispatch(fetchProductById(id))
    setSelectedImgUrl(null)
  },[id])
  
  const ratingArray = Array(5).fill(0);

  const handleATC = (product) => {
    // here will be condion of  if product.sizes && size === ""
    if (product.sizes.length > 0 && size === "") {
      setSizeErr("Select Your Size First !!");
      // here will be condion of  if product.clrs && clr === ""
    } else if (product.colours.length > 0 && clr === "") {
      setSizeErr("");
      setClrErr("Please Select Your Colour First !!! ");
    } else {
      const tempProduct = {
        qty: qty,
        product: product,
        clr: clr,
        size: size,
      };
      dispatch(addToCart(tempProduct));
      setClrErr("");
      setSizeErr("");
    }
  };

  const handleClr = (event) => {
    setClr(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };

  return (
    <>
      {product ? (
        <div className="viewproduct-hero-main-container hidden md:block">
          <div className="breadcrumb-container ">
            <div className="breadcrumb-inner-main ">
              <span onClick={()=>{navigate('/')}} className="cursor-pointer text-[#1a9cb7] inline-flex pb-2"><AiFillHome size={19}/> </span>
              <span className=" text-[#1a9cb7] ml-2">
                <i className="fa-solid fa-chevron-right themeClrText "></i>
                <Link to={`/category/${product.category}`} className="ml-2">{product.category}</Link>
              </span>
              {product.subCategory !== "" ? (
                <span className=" text-[#1a9cb7] ml-2">
                  <i className="fa-solid fa-chevron-right themeClrText "></i>
                  <Link to={`/category/${product.category}/${product.subCategory}`} className="ml-2">{product.subCategory}</Link>
                </span>
              ) : (
                ""
              )}
              <span className=" text-[#1a9cb7] mr-3">
                <i className="fa-solid fa-chevron-right themeClrText ml-2"></i>
                <span className="ml-2">{product.title}</span>{" "}
              </span>
            </div>
          </div>
          <div className="viewproduct-hero-inner  pb-3 ">
            <div className="viewproduct-hero-inner-left  ">
              <div className="inner-grid">
                <div className="product-imgddd">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="w-[23rem]"
                  >
                    {product.gallary.length > 0 ? (
                      product.gallary.map((gImage) => (
                        <SwiperSlide key={gImage._id}>
                          <img src={selectedImgUrl || gImage.url} alt="" className="w-44ddd h-[35rem] mx-auto" />
                        </SwiperSlide>
                      ))
                    ) : (
                      <img src={selectedImgUrl || product.image} alt="" className="w-44ddd h-[35rem] mx-auto" />
                    )}
                  </Swiper>
                </div>

                
                <div className="product-details mt-3">
                  <div className="product-title">
                    <p className="">{product.title}</p>
                  </div>
                  <div className="product-rating ">
                    <div className="flex flex-row  ml-5">
                      {ratingArray.map((_, ind) => (
                        <AiFillStar
                          key={ind}
                          size={20}
                          color={
                            product.rating.ratings > ind ? "orange" : "gray"
                          }
                        />
                      ))}
                    </div>
                    <small>
                      <span className=" ml-4">
                        ({product.rating.ratingCount} reviews)
                      </span>
                    </small>
                  </div>
                  <div className="product-price my-4">
                    <span className="text-xl ml-4">RS : </span>
                    <span className="text-[1.4rem] themeClrText font-bold mr-4">
                      ${product.price}
                    </span>
                    <span className="del-price">
                      RS :234 <span className="ml-4 text-[1rem]">-30%</span>
                    </span>
                  </div>
                  <div className="my-5">
                    <p className=" ml-3 themeClrText">Details : </p>
                    {product.specifications.length > 0 &&
                      product.specifications
                        .filter((x) => x.heading === "details")
                        .map((spec) => (
                          <div
                            className="grid grid-cols-12  border-b py-1 mt-2 "
                            key={spec._id}
                          >
                            <p className=" col-span-4 ml-2 text-sm uppercase font-bold">
                              {spec.name}{" "}
                            </p>
                            <p className=" col-span-8 text-sm ">
                              {" "}
                              {spec.value}
                            </p>
                          </div>
                        ))}
                  </div>
                </div>
              </div>


              <div className=" h-20 flex flex-row w-7/12">
                    {product?.gallary.length > 0 && product?.gallary.map((img)=>(
                     <div key={img._id} className={selectedImgUrl === img.url ? `w-12 mt-2 mx-2 border-2 rounded-md p-1 border-green-300` : `w-12 mt-2 mx-1 ` }>
                         <img src={img.url} alt="image"  onClick={(e)=>{setSelectedImgUrl(img.url)}} />
                     </div>
                    ))}
                </div>



              <div className="product-desc">
                <p className="mb-3 themeClrText my-4 mx-3">Description </p>
                <p className="mx-3">{product.description}</p>
              </div>
            </div>
            <div className="  viewproduct-hero-inner-right">
              <div className="atc-title">
                <p className="px-2 pt-3">{product.title}</p>
                <p className="px-3 text-sm text-gray-600">{product.category} | {product.subCategory}</p>
              </div>
              {product && product.sizes.length > 0 ? (
                <div className=" ml-4 my-3">
                  <p className="mb-3 themeClrText">
                    sizes <small className="text-red-500 ml-2">{sizeErr}</small>
                  </p>

                  <div className="flex flex-row">
                    {product.sizes.map((_size) => (
                      <div key={_size._id}>
                        <input
                          className="hidden"
                          type="radio"
                          name="desk-size"
                          id={_size.value}
                          value={_size.value}
                          onChange={handleSize}
                          checked={size === _size.value}
                        />
                        <label
                          htmlFor={_size.value}
                          className="lbl lbl-box bg-gray-200"
                        >
                          <span className="size-text">{_size.value}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {product && product.colours.length > 0 ? (
                <div className="ml-4 my-6">
                  <p className="mb-3 themeClrText">
                    Colour <small className="ml-2 text-red-500">{clrErr}</small>
                  </p>

                  <div className="flex flex-row">
                    {product.colours.map((_clr) => (
                      <div key={_clr._id}>
                        <input
                          type="radio"
                          name="colorr"
                          id={_clr.value}
                          className="hidden"
                          value={_clr.value}
                          checked={clr === _clr.value}
                          onChange={handleClr}
                        />
                        <label
                          htmlFor={_clr.value}
                          className={`lbl lbl-box bg-${(_clr.value).toLowerCase()}-400 bg-${_clr.value}`}
                        >
                          <span className={`color-text `}>{_clr.value}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="atc-price product-price ml-4 my-6">
                <div className=" themeClrText">Price</div>
                <span className="del-price">Rs. {product.price * 1.2} </span>
                <span className="font-bold themeClrText ml-4 ">
                  RS : {product.price}
                </span>
                {qty > 1 ? (
                  <small className="">
                    {" "}
                    * {qty} = {product.price * qty}
                  </small>
                ) : (
                  ""
                )}
              </div>

              <div className="atc-quatity text-center ml-4">
                <p className="text-start themeClrText">Quantity</p>
                <button onClick={decQty} className="border-2 px-3 py-1">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="font-bold mx-3">{qty}</span>
                <button onClick={incQty} className="border-2 px-3 py-1">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <div className="atc-cta flex justify-evenly mx-5  mt-6">
                <button
                  onClick={() => {}}
                  className="themeClrBg  text-white w-full mr-2 rounded-sm"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    handleATC(product);
                  }}
                  className="bg-black text-white w-full rounded-sm py-1 font-bold "
                >
                  Add To Bag
                </button>
              </div>
            </div>
          </div>
          <AllReviews id={product._id} />
          <div className="mt-3 ">
            <AddReview
              btnTitle={"Post Review"}
              product={product}
              btnStyle={" py-1 px-3 rounded-md bg-gray-300 font-bold mx-auto"}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="viewproduct-hero-main-container hidden md:flex">
            <div className="viewproduct-hero-inner ">
              <div className="viewproduct-hero-inner-left  ">
                <div className="inner-grid mt-3">
                  <div className="w-24 h-24 mx-auto rounded-full  skelton"></div>
                  <div className="product-details ">
                    <div className="product-title">
                      <p className="text-skelton"></p>
                      <p className="text-skelton"></p>
                      <p className="text-skelton"></p>
                      <p className="text-skelton"></p>
                    </div>

                    <div className="product-colors ">
                      <div className="atc-color ml-4 my-6 ">
                        <p className="mb-3 themeClrText">Colour </p>
                        <label htmlFor="red-l" className="skelton">
                          <input type="radio" name="" id="red-l" />
                          <span className="color-text "></span>
                        </label>
                        <label htmlFor="blue-l" className="skelton">
                          <input type="radio" name="" id="blue-l" />
                          <span className="color-text skelton"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-desc ">
                  <p className="mb-3 themeClrText my-4 mx-3">Description </p>
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                </div>
              </div>
              <div className="  viewproduct-hero-inner-right">
                <div className="atc-title ">
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                  <p className="text-skelton"></p>
                </div>

                <div className="atc-quatity text-center ml-4">
                  <p className="text-start themeClrText">Quantity</p>
                  <button className="border-2 px-3 py-1">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="font-bold mx-3">
                    <input
                      type="text"
                      name="quantity"
                      id=""
                      placeholder="0"
                      className="inline-block w-6 pl-2 "
                    />
                  </span>
                  <button className="border-2 px-3 py-1">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div className="atc-cta flex justify-evenly mx-5 mt-6">
                  <button className="themeClrBg  text-white w-full mr-2 rounded-sm skelton">
                    Buy Now
                  </button>
                  <button className="bg-black  w-full text-white rounded-sm py-1 skelton">
                    Add To Bag
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* skelton for phone */}
          <div className="py-3">
            <div className="skelton rounded-md mx-4 h-48 mb-5"></div>
            <div className="w-10/12 mx-auto">
              <div className=" text-skelton "></div>
              <div className="text-skelton "></div>
              <div className="text-skelton"></div>
              <div className="text-skelton"></div>
              <div className="text-skelton"></div>
            </div>
            <div className="flex  mx-6 py-4">
              <div className="text-skelton py-4"></div>
              <div className="text-skelton py-4"></div>
            </div>
          </div>
        </>
      )}
      <div className="block md:hidden bg-gray-100 pb-3  mt-4">
        {product ? (
          <div className="flex flex-col ">
            <div className="">
              <Swiper navigation={true} modules={[Navigation]}>
                {product.gallary.length > 0 ? (
                  product.gallary.map((gImage) => (
                    <SwiperSlide key={gImage._id}>
                      <img
                        src={selectedImgUrl || gImage.url}
                        className=" rounded-md w-[53vh] mx-auto "
                        alt=""
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <img
                    src={selectedImgUrl || product.image}
                    className=" rounded-md w-[45vh] mx-auto "
                    alt=""
                  />
                )}
              </Swiper>

              <div className=" flex flex-row w-11/12 mx-auto">
                    {product?.gallary.length > 0 && product?.gallary.map((img)=>(
                     <div key={img._id} className={selectedImgUrl === img.url ? `w-12 mt-2 ml-4 border-2 rounded-md p-1 border-green-300` : `w-12 mt-2 ml-4 ` }>
                         <img src={img.url} alt="image"  onClick={(e)=>{setSelectedImgUrl(img.url)}} />
                     </div>
                    ))}
                </div>
            </div>
            <div className="title my-3 px-3">
              <p className="font-bold mt-3 themeClrText ">{product.title}</p>
            </div>
            <div
              className="title  px-3"
              onClick={() => {
                setDecCollapsed((prev) => !prev);
              }}
              title="Click to View More"
            >
              <p className=" text-sm  ">
                {decCollapsed
                  ? product.description.slice(0, 80) + " ....."
                  : product.description}
              </p>
            </div>

            <p className="ml-3 text-gray-400 mt-2">Details :</p>
            {product.specifications.length > 0 ? (
              product.specifications
                .filter((x) => x.heading === "details")
                .map((spec) => (
                  <div
                    className="grid grid-cols-12  border-b py-1 mt-2 "
                    key={spec._id}
                  >
                    <p className=" col-span-4 ml-2 text-sm  uppercase font-bold">
                      {spec.name}{" "}
                    </p>
                    <p className=" col-span-8 text-sm"> {spec.value}</p>
                  </div>
                ))
            ) : (
              <p className="my-1 ml-6 text-sm text-green-800">
                Latest Arrivals
              </p>
            )}

            <div className="flex flex-row mb-3 mt-2 mx-3 gap-4">
              <div className="price">
                <p>
                  <small>From : </small>
                </p>
                <span className=" text-xl font-bold themeClrText mr-2">
                  Rs. {product.price}
                </span>
                <small>
                  <del>Rs. {product.price * 1.2}</del>
                </small>
              </div>
              <div className="rating ml-auto mr-3 ">
              <span className='flex flex-row gap-1'>{ratingArray.map((_, ind) =>(
            <FaStar size={15} key={ind} color={product.rating.ratings > ind ? "orange" : "gray"}/>
            ))}
                <small>( {product.rating.ratingCount} )</small>
            </span>
              </div>
            </div>

            {product && product.sizes.length > 0 ? (
              <>
                <p className="ml-3 text-gray-400">
                  Sizes : <small className="text-red-500"> {sizeErr}</small>
                </p>
                <div
                  id="pScreen-sizes"
                  className="flex flex-row gap-5 mb-4 justify-center "
                >
                  {product.sizes.map((_size) => (
                    <div key={_size._id}>
                      <input
                        type="radio"
                        name="size"
                        className="hidden"
                        id={_size.value}
                        value={_size.value}
                        onChange={handleSize}
                        checked={size === _size.value}
                      />
                      <label
                        htmlFor={_size.value}
                        className="inline-flex lbl  justify-center items-center py-1 px-2 rounded-md border-2 border-grey-400 "
                      >
                        <span className="size-text">{_size.value}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}

            {product && product.sizes.length > 0 ? (
              <>
                <p className="ml-3 text-gray-400">
                  Colours :{" "}
                  <small className="ml-2 text-red-500"> {clrErr}</small>
                </p>
                <div
                  id="pScreen-colors"
                  className="flex flex-row gap-5 mb-4 justify-center  mt-1"
                >
                  {product.colours.map((_clr) => (
                    <div key={_clr._id}>
                      <input
                        type="radio"
                        name="color"
                        checked={clr === _clr.value}
                        className="hidden"
                        value={_clr.value}
                        id={_clr.value}
                        onChange={handleClr}
                      />
                      <label
                        htmlFor={_clr.value}
                        className={`lbl inline-flex justify-center  items-center  py-2 px-3 font-bold border-2 border-white rounded-md bg-${_clr.value}-400 bg-${_clr.value} text-white text-gray-500`}
                      >
                        <span className="text-[12px] font-bold">
                          {_clr.value}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
            <div className="flex gap-2 mx-2">
              <button className="border-2 border-[#355C7D] py-2 rounded-md w-full">
                Buy Now
              </button>
              <button
                onClick={() => {
                  handleATC(product);
                }}
                className="themeClrBg   py-2 w-full rounded-md text-white font-bold"
              >
                Add to Bag
              </button>
            </div>
            <AllReviews product={product}/>
          <div className="mt-3">
          <AddReview  btnTitle={"Post Review"} product={product} btnStyle={" py-1 px-3 rounded-md bg-gray-300 font-bold mx-auto"}/>
          </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* view all reviews */}
      <div className="bg-white w-11/12 mx-auto"></div>

      {/* add review */}
      <div className="">
        <ThankingModal
          btnTitle={""}
          btnStyle={"hidden"}
          modalText={"Thanks For Your Valueable Review  😍🔥"}
        />
      </div>
    </>
  );
}
