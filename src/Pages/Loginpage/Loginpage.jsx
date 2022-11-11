import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import { useSelector , useDispatch } from "react-redux";
import { loggedIn, loggedOut  } from "../../features/authSlice";
import axios from "axios";



export default function Loginpage() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username : email,
        password 
      }
     const response  = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login` ,data )
     if(response.data.success){
      dispatch(loggedIn({user : response.data.user , token : response.data.token}))
      window.location = '/'
     }
      console.log(response)
      if(response.data.err){
        setErrors('Wrong Credintials !')
      }
      if(response.data._id){
        // window.location = "/"
      }
    } catch (error) {
      console.log(error);
      setErrors(error.code);
    }
  };


  return (
    <>
    <div className="back-navigator">
      <span onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left-long text-xl"></i></span>
      <span className="logo">LOGO</span>
    </div>
      <div className="login-container bg-[#355C7D]  md:bg-transparent">
        <img className="bg-img hidden md:flex" src="images/login.jpg" alt="" />
        <div className="login-form-div">
          <p className="">{auth.isAuthanticated}</p>
          <p className="text-white mt-4 font-bold">LOGIN To AA-MART</p>
          <form className="login-form" method="post" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password ...."
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors && <small className="text-red-400 mt-3">{errors}</small>}
            <button type="submit" className="bg-[#355C7D]">
              LOGIN
            </button>
            <div className="login-footer mt-2">
              <p className="text-white">
                Already having account ? <Link to={"/signup"}> SIGNUP</Link>{" "}
              </p>
            </div>
          </form>
          <div className="social-login">
            <div className="social-login-google">
              <button
                className="social-google-head"
                
              >
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
