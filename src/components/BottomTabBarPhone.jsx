import {AiFillHome} from 'react-icons/ai'
import {BiCategory , BiSupport} from 'react-icons/bi'
import {FaSearch , FaTimes} from 'react-icons/fa'
import {ImCart} from 'react-icons/im'
import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux/es/exports';
import { showCart } from '../features/cartSlice';
import {Link} from 'react-router-dom'


export default function BottomTabBarPhone() {
    const [times, setTimes] = useState(true)
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    const showcartBtn = ()=> {
        dispatch(showCart())
      }
    const toggleSearch = ()=>{
        let searchBarPhone =  document.getElementById('searchBarPhone')
        if(times){
         (searchBarPhone.style.top = "0px")
        }else{
           (searchBarPhone.style.top = "-10rem")
        }
        setTimes((prev) => !prev)
    }


    const showHideTabbar = () =>{
      window.onscroll = function(e) {
      const BottmBar = document.getElementById('bottomTabbar')
      // print "false" if direction is down and "true" if up
      if(this.oldScroll < this.scrollY){
        BottmBar.style.bottom = '-5rem'
      }
      if(this.oldScroll > this.scrollY){
        BottmBar.style.bottom = '0px'
      }
      this.oldScroll = this.scrollY;
    }
    }
    showHideTabbar()



  return (
    <>
    <div id='bottomTabbar' className="bottomTabbar fixed  right-1 left-1 z-[4] flex md:hidden  bottom-0 ">
    <div className="flex flex-row justify-between py-3 opacity-[0.93] text-white px-4 bg-[#355b7d] w-full">
        <button className="iconBtn">
           <Link to='/'>
           <AiFillHome size={25}/>
            <small>Home</small>
            </Link>
        </button>
        <button className="iconBtn">
            <BiCategory size={25}/>
            <small>Categories</small>
        </button>
        <button className="iconBtn  ">
           
        </button>
        <button  onClick={toggleSearch} className="iconBtn iconBtn-search ">
       {times ?  <FaSearch size={25}/> :  <FaTimes size={25}/>}
        </button>
        <button onClick={showcartBtn} className="iconBtn iconBtn-cart">
           <span className='iconBtn-count'>{cart.cartItems}</span>
            <ImCart size={25}/>
            <small>Cart</small>
        </button>
        <button className="iconBtn">
            <BiSupport size={25}/>
            <small>Support</small>
        </button>
    </div>
    </div>
    </>
  )
}
