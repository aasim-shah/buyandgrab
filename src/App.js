import React from 'react'
import Homepage from './Pages/Homepage/Homepage';
import { Routes, Route, Link  , Navigate} from "react-router-dom";
import ViewProduct from './Pages/ViewProduct/ViewProduct';
import Loginpage from './Pages/Loginpage/Loginpage';
import Signuppage from './Pages/Signuppage/Signuppage';
import { useSelector , useDispatch } from "react-redux";
import Cartpage from './Pages/Cartpage/Cartpage';
import Adminhome from './Pages/Adminhome/Adminhome';
import AdminAddProduct from './Pages/Adminhome/AdminAddProduct';
import AdminEditProduct from './Pages/Adminhome/AdminEditProduct';
import AdminViewProducts from './Pages/Adminhome/AdminViewProducts';
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder';
import NoPageFound from './Pages/NoPageFound';
import ViewProductByCat from './Pages/ViewProduct/ViewProductByCat';
import axios from 'axios';
import ViewProductByCatAndSub from './Pages/ViewProduct/ViewProductByCatAndSub';
import Payment from './Pages/Payment/Payment';
import { useEffect  , useState} from 'react';
import  io from 'socket.io-client'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  let socket;



  useEffect(() => {
    socket = io('https://ennmart.herokuapp.com');
    socket.on('receiveGreet', (data) => {
      console.log('data::', data);
    });
  }, []);
  console.log(socket)
  return (
   
    <Routes>
    <Route path="/"  element={ <Homepage/>} />
    <Route path="/product/:id" element={<ViewProduct />} />
    <Route path="/login"  element={auth.isAuthanticated ? <Navigate to='/' />  : <Loginpage/>}/>
    <Route path="/signup" element={<Signuppage />} />
    <Route path="/category/:category" element={<ViewProductByCat />} />
    <Route path="/category/:category/:subCategory" element={<ViewProductByCatAndSub />} />
    <Route path="/cart" element={<Cartpage />} />
    <Route path="/confirm_order" element={<ConfirmOrder />} />
    <Route path="/payment/:id" element={<Payment />} />
    <Route path="/admin" element={auth.user.isAdmin  ?<Adminhome/> : <Navigate to='/login' />  } />
    <Route path="/admin/add_product" element={auth.user.isAdmin  ?<AdminAddProduct/> : <Navigate to='/login' />  } />
    <Route path="/admin/view_products" element={auth.user.isAdmin  ?<AdminViewProducts/> : <Navigate to='/login' />  } />
    <Route path="/admin/edit_product/:id" element={auth.user.isAdmin  ?<AdminEditProduct/> : <Navigate to='/login' />  } />
    <Route path="/*"  element={ <NoPageFound/>} />
  </Routes>
    )

}

export default App