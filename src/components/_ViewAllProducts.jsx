import {useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function _ViewAllProducts() {
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
      <div className=" my-5 w-11/12 mx-auto md:w-[76%] mr-5 ml-auto ">
        {products.length > 0 ? products.map((product) => (
             <div className="grid grid-cols-12  bg-gray-100 mt-2 px-2 justify-center items-center">
            <div className="inline-flex w-20 h-20 justify-center col-span-2">
                <img src={product.image}  alt="" />
            </div>
            <div className=" col-span-6">
                <p>{product.title.slice(0, 70)}</p>
            </div>
            <div className="text-sm col-span-2 text-center">
                <p>{product.price}</p>
            </div>
            <div className="buttons col-span-1">
            <Link  to={`/admin/edit_product/${product._id}`} className='bg-yellow-300 py-1 px-2 rounded-md'>Update</Link>
            </div>
        </div>
        )) : ("No Product Found !")}
          
        </div>
    </>
  )
}
