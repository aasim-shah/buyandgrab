import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { loggedIn, loggedOut  } from "../../features/authSlice";
import { useSelector , useDispatch } from "react-redux";
import  HashLoader from 'react-spinners/HashLoader'

import "./Signuppage.css";
import axios from "axios";

export default function Signuppage() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, setErrorr] = useState('')
  const [cpassword, setCpassword] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const data ={
        email : email,
        password : password ,
        Cpassword : cpassword
      }
      const res = await axios.post(`https://ennmart.herokuapp.com/signup` ,data )
      dispatch(loggedIn({user : res.data.user , token : res.data.token}))
      window.location = '/'
      if(res.data.err){
        setErrorr('Passwords Does not matchs')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.code)
      setErrorr(error.code)
      setIsLoading(false)

        }
  };

  return (
    <>
    {isLoading ? ( <div className="bg-gray-100 opacity-[0.8] absolute h-[100vh] w-full flex flex-row justify-center items-center">
    <HashLoader
        color={"#355b7d"}
        loading={isLoading}
        size={150}
      />
    </div>) : ""}
      <div className="back-navigator">
      <span onClick={()=>navigate(-1)}><i className="fa-solid fa-arrow-left-long text-xl"></i></span>
      <span className="logo">LOGO</span>
    </div>
      <div className="signup-container bg-[#355C7D]  md:bg-transparent">
        <img className="bg-img hidden md:flex" src="images/login.jpg" alt="" />
        <div className="signup-form-div">
          <p className="text-white mt-4 font-bold">signup To AA-MART</p>
          <form className="signup-form" onSubmit={handleSubmit}>
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
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password ...."
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
           {errorr &&  <small className="text-red-400 mt-2">{errorr}</small>}
            <button type="submit" className="bg-[#355C7D]">
              signup
            </button>
            <div className="signup-footer mt-2">
              <p className="text-white">
                Already having account ? <Link to={"/login"}> LOGIN</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
     

    </>
  );
}
