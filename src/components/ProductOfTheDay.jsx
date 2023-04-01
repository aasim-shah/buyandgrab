import axios from 'axios';
import {useState , useEffect} from 'react'
import { AiFillStar , AiFillHome} from "react-icons/ai";
import { useDispatch , useSelector } from "react-redux/es/exports";
import { fetchAllProducts } from '../features/productSlice';
import Countdown from 'react-countdown';
import { addToCart } from "../features/cartSlice";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ProductOfTheDay() {
    const [size, setSize] = useState("");
    const [clrErr, setClrErr] = useState("");
  const [sizeErr, setSizeErr] = useState("");
  const [clr, setClr] = useState("");
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const {products} = useSelector((state) => state.products);
  const handleClr = (event) => {
    setClr(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
    const ratingArray = Array(5).fill(0);
    const [product, setProduct] = useState(null)
    const getProductOfTheDay = async()=>{
    const {data} = await axios.get('https://buyandgrab-server.onrender.com/api/v1/random_product')
    setProduct(data)
}

const [selectedImgUrl, setSelectedImgUrl] = useState('')
useEffect(() => {
    // getProducts();
    dispatch(fetchAllProducts())
  }, [dispatch]);

  const handlescrollY = ()=>{
    document.getElementById('sc').scrollBy(0 , 50)
  }

  const handleATC = (product) => {
    // here will be condion of  if product.sizes && size === ""
    if (product.sizes.length > 0 && size === "") {
      toast.warn("Select Your Size First !!");
      setSizeErr("Select Your Size First !!");
      // here will be condion of  if product.clrs && clr === ""
    } else if (product.colours.length > 0 && clr === "") {
      setSizeErr("");
      toast.warn("Please Select Your Colour First !!! ");
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



useEffect(()=>{
    getProductOfTheDay()
    setSelectedImgUrl('')
},[])
  return (
    <div className='my-10 w-11/12 mx-auto'>
        <div className="grid grid-cols-12 gap-4 ">
            <div className="border-2 border-[#355b7d] hover:shadow-lg  rounded-md  col-span-12 sm:col-span-9 py-3 px-2">
            <p className=" border-b mb-6 text-xl py-4 mx-5 themeClrText font-black">Hot Product Of The Day 🔥</p>
            <div className=" grid grid-cols-12 ">
            <div className="col-span-12 sm:col-span-6 bg-gray-100 flex flex-col sm:flex-row">
                <div className=" sm:w-[6rem] flex flex-row sm:flex-col justify-center sm:justify-start my-1">
                    {product?.gallary.length > 0 && product?.gallary.map((img)=>(
                     <div key={img._id} className={selectedImgUrl === img.url ? `w-16 mt-2 mx-1 border-2 rounded-md p-1 border-green-300` : `w-12 mt-2 mx-1 ` }>
                         <img src={img.url} alt="image" onClick={(e)=>{setSelectedImgUrl(img.url)}} />
                     </div>
                    ))}
                </div>
                <div className="min-h-[20rem] flex mx-auto">
                    <img src={selectedImgUrl || product?.image} className="h-[25rem]"  alt="" />
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 px-2">
                <div className="flex flex-col">
                    <p className="text-xl font-bold py-4 h-16 border-b-2 px-2"> {product?.title} </p>
                    <p className="text-[1.4rem] font-black mt-3 px-2"> <span className='mr-2 text-sm'>PKR</span>{product?.price} </p>
                    <p className="text-[1rem] font-bold my-2  px-2"> <span className='text-sm'>Offer Ends in : </span> <span className='text-xl ml-3 font-bold text-red-600'> <Countdown date={Date.now()  + 1000*3300*23}  /></span> </p>
                    
                    <div className="flex flex-row gap-2 mt-1 mx-2">
                    <div className="flex flex-row">
                      {ratingArray.map((_, ind) => (
                        <AiFillStar
                          key={ind}
                          size={20}
                          color={
                            product?.rating.ratings > ind ? "orange" : "gray"
                          }
                        />
                      ))}
                    </div>
                    <small>
                      <span className="">
                        ({4} reviews)
                      </span>
                    </small>
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
                <div className="my-6">
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
                          className={`lbl lbl-box bg-${_clr.value}-400 bg-${_clr.value}`}
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


                </div>


                        <div className="flex justify-center items-center my-6">
                            <button
                            
                            onClick={() => {
                              handleATC(product);
                            }}
                            className='bg-yellow-400 py-2 font-bold w-8/12 px-2 rounded-md'>ADD TO CART</button>
                        </div>

            </div>
            </div>
            </div>

            <div className="col-span-12 sm:col-span-3 border-2 border-[#355b7d] rounded-md">
                <p className=" border-b text-xl py-4 mx-5 themeClrText font-black">Top 5 Best Sellers</p>
                <div className="flex flex-col justify-center items-center p-4 relative">
                   <div id='sc' className="scrollYProduct-of-the-day ">
                   {products?.length > 0 && products.slice(0,10).map((item)=>(
                     <Link to={`/product/${item._id}`} key={item._id} className="card flex w-11/12 mx-auto mt-4 flex-row">
                     <div className="h-28 w-28 bg-gray-200  mx-auto">
                     <img src={item.image} alt="" className='w-full rounded-md' />
                     </div>
                     <div className="flex flex-col w-full ml-1 justify-center items-center">
                      <p className="font-bold text-lg">{item.title}</p>
                      <div className="flex flex-row"> {ratingArray.map((_, ind) => (
                      <AiFillStar
                        key={ind}
                        size={20}
                        color={
                          item?.rating.ratings > ind ? "orange" : "gray"
                        }
                      />
                    ))}</div>
                    <p className="text-lg"><span className='text-sm mr-1'>PKR.</span>{item.price}</p>
                     </div>
                  </Link>
                   ))}
                   </div>
                   <button  onClick={()=>{handlescrollY()}} className="absolute left-30 bottom-1 py-1 px-3  rounded-md  bg-gray-200 ">
                   <i className="fa-solid fa-chevron-down font-bold"></i>
                   </button>
                </div>
            </div>
        </div>

    </div>
  )
}
