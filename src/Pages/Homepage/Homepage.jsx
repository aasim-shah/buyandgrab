import {useState} from 'react'
import "../../App.css"
import "./Homepage.css"
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import TopCategories from '../../components/TopCategories'
import SuggestedProducts from '../../components/SuggestedProducts'
import Banner from '../../components/Banner'
import AllCategories from '../../components/AllCategories'
import Highlights from '../../components/Highlights'
import Footer from '../../components/Footer'
import BestSeller from '../../components/BestSeller'
import TopOffers from '../../components/TopOffers'
import NewArrivals from '../../components/NewArrivals'
import CartComponent from '../../components/CartComponent'
import {useDispatch ,useSelector} from 'react-redux'



function Homepage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const cartHidden = cart.hidden;

  return (
    <>
    <Navbar/>
    <Hero/>
    <TopCategories/>
    <SuggestedProducts/>
    <AllCategories/>
    {/* <BestSeller/> */}
    <TopOffers/>
    <NewArrivals/>
    <Banner/>
    <Highlights/>
    <Footer/>
    </>
  )
}

export default Homepage