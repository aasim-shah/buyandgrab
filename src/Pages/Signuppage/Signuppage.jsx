import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn, loggedOut, register } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { useFormik } from "formik";
import { SignSchemaValidation } from "../../schemas/SignupSchema";
import "./Signuppage.css";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Signuppage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const isLoading = auth.isLoading;

  const {values , errors , handleBlur  ,touched, handleChange , handleSubmit} = useFormik({
    initialValues : {
      email : "",
      password : "",
      Cpassword : ""
    },
    validationSchema : SignSchemaValidation,
    onSubmit : async(values)=>{
    try {
      const data = {
        email: values.email,
        password: values.password,
        Cpassword: values.Cpassword,
      };
      
      dispatch(register(data)).then(res =>{
        if(res.payload.token){
          console.log(res)
          navigate('/')
        }else{
          setErr(res.payload.msg)
        }
       }).catch(err => {

        console.log(err)
      })
       } catch (error) {
      console.log(error.code);
    }
    }
  })

  

  const handleGoogleBtn = async () =>{
    try {
      // window.open("https://buyandgrab-server.onrender.com/auth/google/" , '_self')
      console.log('chill')
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      {isLoading ? (
        <div className="bg-gray-100 opacity-[0.8] absolute h-[100vh] w-full flex flex-row justify-center items-center">
          <HashLoader color={"#355b7d"} loading={isLoading} size={150} />
        </div>
      ) : (
        ""
      )}
      <Navbar/>
      <div className="signup-container bg-[#355C7D]  md:bg-transparent py-4">
        <img className="bg-img hidden md:flex" src="images/login.jpg" alt="" />
        <div className="signup-form-div">
          <p className="text-white mt-4 font-bold">Signup</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              id="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
    {errors.email && touched.email ?  (<p className="text-red-400 mt-1 w-10/12 text-sm">{errors.email}</p>):""}

            <input
              type="password"
              name="password"
              placeholder="Password ...."
              id="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
                {errors.password && touched.password ?  (<p className="text-red-400 mt-1 w-10/12 text-sm">{errors.password}</p>):""}

            <input
              type="password"
              name="Cpassword"
              placeholder="Confirm Password ...."
              id="cpassword"
              value={values.Cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
                  />
        {errors.Cpassword && touched.Cpassword ?  (<p className="text-red-400 mt-1 w-10/12 text-sm">{errors.Cpassword}</p>):""}
          {err !== "" ? (<p className="text-red-400 mt-1 w-10/12 text-center text-sm">{err}</p>) : ""}
              <button type="submit" className="bg-[#355C7D]">
              signup
            </button>
            <div className="signup-footer mt-2">
              <p className="text-white text-sm">
                Already having account ? <Link to={"/login"} className="text-md underline"> LOGIN</Link>{" "}
              </p>
            </div>
          </form>
          <div className="social-login mb-2">
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
