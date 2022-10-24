// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch  } from 'react-redux/es/exports';
import { Navigation} from 'swiper';
import { Link } from 'react-router-dom';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



import axios from 'axios';
import {useState , useEffect} from 'react';


export default function NewArrivals() {
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
  <div className="grid grid-cols-12 mt-4 md:w-11/12 mx-auto">
    <div className="col-span-2 hidden md:flex flex justify-center flex-col items-center py-3 bg-green-400 rounded-md">
    <p className="text-[1.5rem]  font-bold px-2">New Arrivals</p>
        <div className="viewAll py-1 px-3 bg-violet-600 text-white font-bold rounded-[2rem] mt-4">View All</div>
    </div>
    <div className="col-span-12 md:col-span-10">
    <div className="onPhone block md:hidden">
        <p className="wings text-center relative my-4">New Arrivals</p>
      </div>
    <Swiper  className='w-11/12 hidden md:flex'
     spaceBetween={20}
     slidesPerView={5}

    >
    {products && products.reverse().map((product)=>(
        <SwiperSlide  key={product.id} className='top-offer-slide bg-gray-100 pb-2 rounded-md'>
                    <Link to={`/product/${product.id}`}>

       <div className="to-img mb-2">
        <img src={product.image} className='w-full h-40' alt="" />
       </div>
       <div className="to-title text-center ml-2 font-bold">
            <p className="text-sm ">Lorem ipsum dolor sit amet  </p>
        </div>
       <div className="to-price ml-4">
        <span>From</span>
        <span className='ml-2'> RS.3432</span>
       </div> </Link>
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
       </div>
       {/* <button onClick={()=>{dispatch(addToCart({qty : 1, product : product}))}} className=' flex flex-row justify-center py-1 w-20  py-2 rounded-md mt-2 text-white font-bold  bg-[#355C7D]  mx-auto items-center '><FaCartPlus/></button> */}
       </Link>
    </SwiperSlide>
    ))}
</Swiper>

    </div>
  </div>
    
    </>
  )
}
