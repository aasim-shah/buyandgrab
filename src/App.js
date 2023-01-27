import React from 'react'
import Homepage from './Pages/Homepage/Homepage';
import { Routes, Route  , Navigate} from "react-router-dom";
import ViewProduct from './Pages/ViewProduct/ViewProduct';
import Loginpage from './Pages/Loginpage/Loginpage';
import Signuppage from './Pages/Signuppage/Signuppage';
import { useSelector  } from "react-redux";
import Cartpage from './Pages/Cartpage/Cartpage';
import Adminhome from './Pages/Adminhome/Adminhome';
import AdminAddProduct from './Pages/Adminhome/AdminAddProduct';
import AdminEditProduct from './Pages/Adminhome/AdminEditProduct';
import AdminViewProducts from './Pages/Adminhome/AdminViewProducts';
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder';
import NoPageFound from './Pages/NoPageFound';
import ViewProductByCat from './Pages/ViewProduct/ViewProductByCat';
import ViewProductByCatAndSub from './Pages/ViewProduct/ViewProductByCatAndSub';
import Payment from './Pages/Payment/Payment';
import GoogleLoggedin from './Pages/GoogleLoggedin';
import MyOrders from './Pages/Orders/MyOrders';
import MyProfile from './Pages/Profile/MyProfile';

function App() {
  const user = useSelector((state) =>state.auth)
  const isAdmin = user.user.isAdmin
  console.log(isAdmin)
  return (
   
    <Routes>
    <Route path="/"  element={ <Homepage/>} />
    <Route path="/product/:id" element={<ViewProduct />} />
    <Route path="/login"  element={<Loginpage/>}/>
    <Route path="/signup" element={<Signuppage />} />
    <Route path="/category/:category" element={<ViewProductByCat />} />
    <Route path="/category/:category/:subCategory" element={<ViewProductByCatAndSub />} />
    <Route path="/cart" element={<Cartpage />} />
    <Route path="/confirm_order" element={<ConfirmOrder />} />
    <Route path="/loggedin" element={<GoogleLoggedin />} />
    <Route path="/user/my_orders" element={<MyOrders />} />
    <Route path="/user/profile" element={<MyProfile />} />
    <Route path="/payment/:id" element={<Payment />} />
    <Route path="/admin" element={isAdmin ? <Adminhome/> : <Navigate to={'/'} /> } />
    <Route path="/admin/add_product" element={isAdmin ? <AdminAddProduct/> : <Navigate to={'/'} /> } />
    <Route path="/admin/view_products" element={isAdmin ? <AdminViewProducts/> : <Navigate to={'/'} />} />
    <Route path="/admin/edit_product/:id" element={isAdmin ? <AdminViewProducts/> : <Navigate to={'/'} />  } />
    <Route path="/*"  element={ <NoPageFound/>} />
  </Routes>
    )

}

export default App