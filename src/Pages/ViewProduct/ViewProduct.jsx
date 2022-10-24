import './ViewProduct.css'
import {useEffect , useState} from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from "react-router-dom";
import ViewProductHero from '../../components/ViewProductHero'
import axios from "axios";
import Footer from '../../components/Footer';



function ViewProduct() {
  const [singleProduct, setSingleProduct] = useState(null)
  const {id} = useParams()
const getProductDetails = async()=>{
  const ress = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
  setSingleProduct(ress.data)
}
useEffect(() => {
 getProductDetails();
}, [])
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100">
      <ViewProductHero product={singleProduct}/>
    </div>

    <Footer/>
    </>
  )
}

export default ViewProduct