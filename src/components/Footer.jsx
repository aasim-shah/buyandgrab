import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomTabBarPhone from './BottomTabBarPhone';
import {  useSelector } from 'react-redux/es/exports';
import CartOnPhonescreen from './CartOnPhonescreen';

export default function Footer() {
  const cart = useSelector((state)=>state.cart)
  const cartHidden = cart.hidden;
  const handleScroll = ()=> window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
rtl={false}
/>
    <div className="footer-container  bg-gray-100 py-20 ">

        <div className="footer-inner grid grid-cols-1 md:grid-cols-3 w-11/12 mx-auto">
          <div className=" grid-col col-span-2  flex flex-row justify-around">
            <div className="shop flex flex-col">
              <p className="th font-bold mb-4">Shop</p>
              <p className="td">Shop Men</p>
              <p className="td">Shop Women</p>
              <p className="td">Shop Kids</p>
            </div>
            <div className="links">
            <p className="th font-bold mb-4">Links</p>
              <p className="td">About Us</p>
              <p className="td">Contact Us</p>
              <p className="td">Login Page</p>
              <p className="td">Track My Order</p>
            </div>
            <div className="help">
            <p className="th font-bold mb-4">Policy</p>
              <p className="td">Shipping Policy</p>
              <p className="td">Return Policy</p>
              <p className="td">Privacy Policy</p>
              <p className="td">Terms of Service</p>
            </div>
          </div>
          <div className=" col grid-col-span-1 mt-5 md:mt-0  pl-5">
          <p className="th font-bold mb-4 ">Newsletter </p>

            <div className="form ">
              <input type="text" name="email" className='relative py-2 px-3 w-8/12' placeholder='Enter Your Email...' id="" />
              <button type="submit" className='py-2 px-4 bg-violet-700 text-white font-bold absolute'>submit</button>
              <p className='text-sm mt-2'>Sign up to receive a 10% discount on your next order.</p>
            </div>

            <div className="icons  mb-12 text-[24px] flex justify-around mt-5 w-5/12 mx-auto">
            <i className="fa-brands fa-facebook "></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
            </div>
          </div>

        </div>

        <button className='scroll-btn ' onClick={handleScroll}><i className="fa-solid fa-chevron-up"></i></button>
    </div>
    <BottomTabBarPhone/>
    {cart && cartHidden ? (<CartOnPhonescreen/>) : ('')}

    </>
  )
}
