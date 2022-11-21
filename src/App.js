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
import { loggedIn } from './features/authSlice';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const getAuthUser = async()=>{
    const {data} = await axios.get('https://ennmart.herokuapp.com/auth/success' , {withCredentials : true})
    console.log(data)
     if(data.success){
      dispatch(
        loggedIn({ user: data.user, token: data.token })
      );
     }
  }


  useEffect(() => {
    getAuthUser()
  }, []);
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