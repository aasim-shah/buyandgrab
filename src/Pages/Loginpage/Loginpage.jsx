import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn, loggedOut } from "../../features/authSlice";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Navbar from '../../components/Navbar'
import { LoginSchemaValidation } from "../../schemas/LoginFormSchema";
import { useFormik } from 'formik';


export default function Loginpage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [myErrors, setMyErrors] = useState(null)


 
  



  const {values , handleBlur , handleChange , touched , errors, handleSubmit} = useFormik({
    initialValues : {
      email : "",
      password : ""
    },
    validationSchema : LoginSchemaValidation,
   onSubmit : async(values) =>{
   

    setIsLoading(true);
    try {
      const data = {
        username: values.email,
        password : values.password
      };
      const response = await axios.post(
        `https://ennmart.herokuapp.com/login`,
        // `http://localhost:8000/login`,
        data,{
          withCredentials:true
        }
      );
      if (response.data.success) {
        dispatch(
          loggedIn({ user: response.data.user, token: response.data.token })
        );
        window.location = "/";
      }
      if(response.data.err){
        setMyErrors('Wrong Credentials !')
      }
      console.log(response);
     
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    
    }

   }
  })
  


  const handleGoogleBtn = async () =>{
    try {
    // window.open("https://ennmart.herokuapp.com/auth/google" , '_self')
    console.log('chill')
    // window.open("http://localhost:8000/auth/google" , '_self')
     
    } catch (error) {
      console.log(error)
    }
  }




  
  return (
    // <VerfiyOtpWhatsapp/>
    <>
      {isLoading ? (
        <div className="bg-gray-100 opacity-[0.8] absolute h-[100vh] w-full flex flex-row justify-center items-center">
          <HashLoader color={"#355b7d"} loading={isLoading} size={150} />
        </div>
      ) : (
        ""
      )}
    <Navbar />
      <div className="login-container bg-[#355C7D]  md:bg-transparent">
        <img className="bg-img hidden md:flex" src="images/login.jpg" alt="" />
        <div className="login-form-div">
          <p className="">{auth.isAuthanticated}</p>
          <p className="text-white mt-4 font-bold">LOGIN</p>
          <form className="login-form" onSubmit={handleSubmit} >
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              id="email"
              // onChange={(e) => setEmail(e.target.value)}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email &&  touched.email ? (<p className="text-red-400 mt-1 w-10/12 text-sm">{errors.email}</p>):""}
           
            <input
              type="password"
              name="password"
              placeholder="Password ...."
              id="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              // onChange={(e) => setPassword(e.target.value)}
            />
          
            {errors.password &&  touched.password ? (<p className="text-red-400 mt-1 w-10/12 text-sm">{errors.password}</p>):""}
          {myErrors &&  <p className="text-red-400 pt-3 text-center w-10/12 text-sm">{myErrors}</p>}
           
            <button className="bg-[#355C7D]" type="submit">
              LOGIN
            </button>
            <div className="login-footer mt-2">
              <p className="text-white text-sm">
                Already having account ? <Link to={"/signup"} className="text-md underline"> SIGNUP</Link>{" "}
              </p>
            </div>
          </form>
          <div className="social-login">
            <div onClick={(e)=>{handleGoogleBtn()}} className="social-login-google cursor-pointer">
              <button  className="social-google-head">
                <i className="fa-brands fa-google"></i>
              </button>
              <span className="social-google-tail"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}