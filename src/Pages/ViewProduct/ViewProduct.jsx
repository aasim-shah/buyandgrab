import './ViewProduct.css'
import Navbar from '../../components/Navbar'
import { useParams } from "react-router-dom";
import ViewProductHero from '../../components/ViewProductHero'
import Footer from '../../components/Footer';



function ViewProduct() {
  const {id} = useParams()
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100">
      <ViewProductHero id={id}/>
    </div>

    <Footer/>
    </>
  )
}

export default ViewProduct