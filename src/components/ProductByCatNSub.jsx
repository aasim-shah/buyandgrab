






import {useEffect ,useState} from 'react'
import axios from 'axios'
import { useParams , Link } from 'react-router-dom'
import SkeltonCard from './SkeltonCard'

function ProductByCatNSub() {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    console.log(params.category , params.subCategory)
const getProducts = async()=>{
    setIsLoading(true)
    const productsByCatNSub = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/category/${params.category}/${params.subCategory}` )
    console.log(productsByCatNSub)
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
      <div className="desktop hidden md:block">
        <div className="text-lg font-bold mx-4 my-4">
          <p className="">Products by category : {params.category} & subCategory : {params.subCategory}</p>
        </div>
        <div className="card-container ">
          {products.length > 0 ? (
            products.slice(0, 14).map((product, index) => (
              <div className="card-inner" key={product._id}>
                <Link to={`/product/${product._id}`} className="card-inner-a">
                  <img src={product.image} alt="" className="card-img-a" />
                  <small className="free-courses">{product.category} | {product.subCategory}</small>
                  <div className="text-center">
                    {product.title.slice(0, 36) + " ..."}
                  </div>
                </Link>
                <div className="card-footer">
                  <div className="flex flex-row justify-between  mx-2">
                    <div className="card-price mt-3">
                      <span className="text-sm">RS : </span>
                      <span className="themeClrText">{"$" + product.price}</span>
                    </div>
                   
                    <div className="card-ratings flex justify-between items-center mt-2">
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
            </>) : "No Product Found"}
             
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
                    alt=""
                    className="card-img-a mx-auto"
                  />
                  <div className="text-sm text-blue-400">
                    {product.title.slice(0, 25) + " ..."}
                  </div>
                </Link>
                <div className="flex flex-row justify-between mx-1 my-1">
                  
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
            </>) : "No Product Found"}
             
            </>
          )}
        </div>
      </div>
    </>
  );
}


export default ProductByCatNSub