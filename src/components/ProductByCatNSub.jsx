import {useEffect ,useState} from 'react'
import axios from 'axios'
import { useParams , Link , useNavigate } from 'react-router-dom'
import SkeltonCard from './SkeltonCard'
import { AiFillHome } from 'react-icons/ai'


function ProductByCatNSub() {
  const navigate = useNavigate()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    console.log(params.category , params.subCategory)
const getProducts = async()=>{
    setIsLoading(true)
    const productsByCatNSub = await axios.get(`https://buyandgrab-serverv.onrender.com/api/v1/category/${params.category}/${params.subCategory}` )
    if(productsByCatNSub.data){
        setIsLoading(false)
        setProducts(productsByCatNSub.data)
    }
}


useEffect(()=>{
    getProducts()
},[])

 
return (
    <>
      <div className="breadcrumb-inner-main ">
              <span onClick={()=>{navigate('/')}} className="cursor-pointer text-[#1a9cb7] inline-flex pb-2"><AiFillHome size={19}/> </span>
              <span className=" text-[#1a9cb7] ml-2">
                <i className="fa-solid fa-chevron-right themeClrText "></i>
                <Link to={`/category/${params.category}`} className="ml-2">{params.category}</Link>
              </span>
              {params.subCategory !== "" ? (
                <span className=" text-[#1a9cb7] ml-2">
                  <i className="fa-solid fa-chevron-right themeClrText "></i>
                  <Link to={`/category/${params.category}/${params.subCategory}`} className="ml-2">{params.subCategory}</Link>
                </span>
              ) : (
                ""
              )}
            </div>
      <div className="desktop hidden md:block">
        <div className="card-container ">
          {products.length > 0 ? (
            products.slice(0, 14).map((product, index) => (
              <div className="card-inner" key={product._id}>
                <Link to={`/product/${product._id}`} className="card-inner-a">
                  <img src={product.image} alt="" className="card-img-a" />
                  <small className="free-courses">{product.category} | {product.subCategory}</small>
                  <div className="text-center ">
                    {product.title.slice(0, 36) + " ..."}
                  </div>
                </Link>
                <div className="card-footer">
                  <div className="flex flex-row justify-between  mx-4 pb-3">
                    <div className="card-price mt-3">
                      <span className="text-sm">RS : </span>
                      <span className="themeClrText">{"$" + product.price}</span>
                    </div>
                   
                    <div className="card-ratings flex justify-between items-center mt-2 ">
                        <span className="rating-stars">
                          {(product.rating.ratings).toFixed(2)}
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
            {isLoading ? (<>
                <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
            </>) :  (<p className='mx-4 text-red-600'>No Product Found</p>)}
             
            </>
          )}
        </div>
      </div>

      {/* below code is for phone's screen */}

      <div className="onPhone block md:hidden">
        <div className="card-container ">
          {products.length > 0 ? (
            products.slice(0, 6).map((product, index) => (
              <div className="card-inner-phone" key={product._id}>
                <Link to={`/product/${product._id}`} className="card-inner-a">
                  <img
                    src={product.image}
                    alt=""
                    className="card-img-a mx-auto"
                  />
                  <div className="text-sm text-blue-400 mx-1">
                    {product.title.slice(0, 25) + " ..."}
                  </div>
                </Link>
                <div className="flex flex-row justify-between mx-1 my-1 mx-1">
                  
                  <div className="text-md">
                    <span className="text-sm">Rs . </span>
                    <span className="text-green-800">
                      {"$" + product.price}
                    </span>
                  </div>
                  <div className="card-ratings flex justify-between items-center ">
                        <span className="rating-stars">
                          {product.rating.ratings}
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
            {isLoading ? (<>
                <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
              <SkeltonCard />
            </>) : (<p className='mx-4 text-red-600'>No Product Found</p>)}
             
            </>
          )}
        </div>
      </div>
    </>
  );
}


export default ProductByCatNSub