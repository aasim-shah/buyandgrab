// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import axios from 'axios';
import {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import SkeltonCard from './SkeltonCard';


export default function BestSeller() {

  const [products, setProducts] = useState([]);

  // get data from api
    const getProducts = async () => {
      const res = await axios.get('https://fakestoreapi.com/products/');
      setProducts(res.data);
    }
  
  //useEffect is a hook that runs a piece of code based on a specific condition.
    useEffect(() => {
      getProducts();
    } , []);
  
  
  return (
    <>
  <div className="allCategories-heading hidden md:flex">
        <p className="heading-text">Top Sales</p>
      </div>
      <div className="onPhone block md:hidden">
        <p className="wings text-center relative my-4">Top Sales</p>
      </div>
  <Swiper
  className='w-11/12 hidden md:flex'
     spaceBetween={20}
    
     slidesPerView={3}

    >
            <div className="card-container">
     {
      products.slice(0, 14).map((product , index) => (
        <SwiperSlide className="card-inner bs-slider " key={product.id}>
          <Link to={`/product/${product.id}`}   className="card-inner-a">
          <img src={product.image} alt="" className="card-img-a mx-auto mb-3 rounded-md" />
          <small className="free-courses">{product.category}</small>
          <div className="card-title">
            {product.title.slice(0, 36) + " ..."}
          </div>
          <div className="card-footer">
            <div className="card-footer-left">
              <div className="card-price">
                <span>RS : </span>
                <span>{"$"+product.price}</span>
              </div>
              <div className="card-discounted-price">
                <span className="del-text">RS : {Number(product.price * 1.3).toFixed(2)}</span>
                <span className="del-text ml">{Number(product.price * 0.2).toFixed(2)}%</span>
              </div>

              <div className="card-ratings my-2">
                <span className="rating-stars">{product.rating.rate}<i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i> </span>
                <span className="rating-count ml">({product.rating.count})</span>
                <div className='themeClrBg  text-white font-bold py-2 px-6 inline-flex rounded-md ml-12  '>Add To Bag</div>
              </div>
             
            </div>
          </div></Link>
        </SwiperSlide>
))
     }</div>
    </Swiper>



{/* for phone screen */}
<Swiper
  className='w-11/12 flex md:hidden'
     spaceBetween={20}
     slidesPerView={1}

    >
            <div className="card-container">
     {
      products.slice(0, 14).map((product , index) => (
        <SwiperSlide className="card-inner bs-slider " key={product.id}>
          <Link to={`/product/${product.id}`}   className="card-inner-a">
          <img src={product.image} alt="" className="card-img-a mx-auto mb-3 rounded-md" />
          <small className="free-courses">{product.category}</small>
          <div className="card-title">
            {product.title.slice(0, 36) + " ..."}
          </div>
          <div className="card-footer">
            <div className="card-footer-left">
              <div className="card-price">
                <span>RS : </span>
                <span>{"$"+product.price}</span>
              </div>
              <div className="card-discounted-price">
                <span className="del-text">RS : {Number(product.price * 1.3).toFixed(2)}</span>
                <span className="del-text ml">{Number(product.price * 0.2).toFixed(2)}%</span>
              </div>

              <div className="card-ratings my-2">
                <span className="rating-stars">{product.rating.rate}<i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i> </span>
                <span className="rating-count ml">({product.rating.count})</span>
                <div className='themeClrBg  text-white font-bold py-2 px-6 inline-flex rounded-md ml-12  '>Add To Bag</div>
              </div>
             
            </div>
          </div></Link>
        </SwiperSlide>
))
     }</div>
    </Swiper>



    </>
  )
}
