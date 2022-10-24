
import axios from 'axios';
import {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import SkeltonCard from './SkeltonCard';
import { useDispatch  } from 'react-redux/es/exports';



function SuggestedProducts() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();


// get data from api
  const getProducts = async () => {
    const res = await axios.get('http://localhost:3001/api/v1/');
    console.log(res.data)
    setProducts(res.data);
  }

//useEffect is a hook that runs a piece of code based on a specific condition.
  useEffect(() => {
    getProducts();
  } , []);


  return (
    <>
    <div className="desktop hidden md:block">
      <div className="course-heading">
        <p className="heading-text ">
          Recommended Products 
        </p>
      </div>
      <div className="card-container ">
       {products.length > 0 ? (products.slice(0, 14).map((product , index) => (
          <div className="card-inner" key={product._id}>
            <Link to={`/product/${product._id}`}   className="card-inner-a">
            <img src={product.image} alt="" className="card-img-a" />
            <small className="free-courses">{product.category}</small>
            <div className="card-title">
              {product.title.slice(0, 36) + " ..."}
            </div></Link>
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
  
                <div className="card-ratings flex justify-between items-center mt-2">
                <div className="l">  <span className="rating-stars">{product.rating.ratings}<i className="fa-solid fa-star text-sm ml-2 text-yellow-600"></i> </span>
                  <span className="rating-count text-[13px] ml-1">{product.rating.ratingCount}</span></div>
                  {/* <button onClick={()=>{dispatch(addToCart({qty : 1, product : product}))}} className='border-2 z-[4] border-[#355C7D] hover:themeClrBg  hover:text-white   flex flex-row justify-between items-center rounded-[2rem] px-3 py-1'><FaPlus/><span className='ml-3'>Add</span></button> */}

                </div>
              </div>
            </div>
          </div>
  ))) : ( 
<>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
</>  
 )
}


       
        
      </div>
      </div>

      {/* below code is for phone's screen */}



      <div className="onPhone block md:hidden">
      <div className="flex justify-between my-3 mx-5">
        <p className="font-bold mb-0 pt-2">
          Recommended  
        </p>
        <div className="viewMore themeClrBg  py-1 px-4 rounded-[2rem] text-white font-bold">
          More
        </div>
      </div>
      <div className="card-container ">
       {products.length > 0 ? (products.slice(0, 6).map((product , index) => (
          <div className="card-inner-phone" key={product._id}>
            <Link to={`/product/${product._id}`}   className="card-inner-a">
            <img src={product.image} alt="" className="card-img-a mx-auto" />
            <small className="free-courses">{product.category}</small>
            <div className="text-sm text-blue-400">
              {product.title.slice(0, 25) + " ..."}
            </div></Link>
            <div className="card-footer ml-2">
                
                <div className="card-discounted-price">
                  <span className="del-text">RS : {Number(product.price * 1.3).toFixed(2)}</span>
                  <span className="del-text ml-2">{Number(product.price * 0.2).toFixed(2)}%</span>
                </div>
                <div className="text-md">
                  <span>RS : </span>
                  <span className='text-green-800'>{"$"+product.price}</span>
                </div>
                {/* <button onClick={()=>{dispatch(addToCart({qty : 1, product : product}))}} className=' flex flex-row justify-center py-1 px-2 rounded-md mt-2 text-white font-bold  themeClrBg   w-full items-center '><FaPlus/><span className='ml-3'>Add</span></button> */}
            </div>
          </div>
  ))) : ( 
<>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
<SkeltonCard/>
</>  
 )
}


       
        
      </div>
      </div>
    </>
  );
}

export default SuggestedProducts;
