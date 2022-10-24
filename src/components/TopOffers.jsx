// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper';
import {MdArrowForwardIos} from 'react-icons/md'
import { useDispatch  } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



import axios from 'axios';
import {useState , useEffect} from 'react';



export default function TopOffers() {
  const dispatch = useDispatch();


    const [products, setProducts] = useState([]);

    // get data from api
      const getProducts = async () => {
        const res = await axios.get('http://localhost:3001/api/v1');
        setProducts(res.data);
      }
    
    //useEffect is a hook that runs a piece of code based on a specific condition.
      useEffect(() => {
        getProducts();
      } , []);
    
    
  return (
    <>
  <div className="grid grid-cols-12 mt-5  mx-auto md:w-11/12">
    <div className="col-span-2 relative hidden md:flex flex justify-center flex-col items-center py-3 bg-amber-400 rounded-md">
    <p className="text-[1.5rem] font-bold mb-6">Top Offers</p>
        <div className="viewAll py-1 px-3 bg-violet-600 text-white font-bold rounded-[2rem] mt-4">View All</div>
    <div className="absolute right-0 py-3 px-3 bg-black text-white  opacity-[0.5]"><MdArrowForwardIos size={20}/></div>
    </div>
    <div className="col-span-12 md:col-span-10">
    <div className="onPhone block md:hidden">
        <p className="wings text-center relative my-4">Top Offers</p>
      </div>
    <Swiper  className='w-11/12 hidden md:flex'
     spaceBetween={20}
     slidesPerView={5}
  
    >
    {products && products.map((product)=>(
        <SwiperSlide  key={product.id} className='top-offer-slide bg-gray-100 pb-2 rounded-md'>
          <Link to={`/product/${product._id}`}>
       <div className="to-img mb-2">
        <img src={product.image} className='w-full h-40' alt="" />
       </div>
       <div className="to-title text-center ml-2 font-bold">
            <p className="text-sm ">Lorem ipsum dolor sit amet  </p>
        </div>
       <div className="to-price ml-4">
        <span>From</span>
        <span className='ml-2'> RS.3432</span>
       </div></Link>
    </SwiperSlide>
    ))}
</Swiper>



{/* show on phone screen only */}
<Swiper  className='w-11/12 flex md:hidden'
     spaceBetween={10}
     slidesPerView={3}
     modules={[Navigation]}
     navigation={true}
 
    >
    {products && products.map((product)=>(
        <SwiperSlide key={product.id} className='top-offer-slide bg-gray-100 pb-2 rounded-md'>
          <Link to={`/product/${product.id}`}>
       <div className="to-img mb-2">
        <img src={product.image} className='w-full h-40' alt="" />
       </div>
       <div className="to-title text-center ml-2 font-bold">
            <p className="text-sm ">Lorem ipsum dolor sit amet  </p>
        </div>
        <div className="to-price ml-4">
        <small>From</small>
        <span className='ml-2'> Rs.3432</span>
       </div></Link>
       {/* <button onClick={()=>{dispatch(addToCart({qty : 1, product : product}))}} className=' flex flex-row justify-center py-1 w-20  py-2 rounded-md mt-2 text-white font-bold  themeClrBg   mx-auto items-center '><FaCartPlus/></button> */}
    </SwiperSlide>
    ))}
</Swiper>

    </div>
  </div>
    
    </>
  )
}
