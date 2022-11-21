import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn, loggedOut } from "../../features/authSlice";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Navbar from '../../components/Navbar'

export default function Loginpage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        username: email,
        password,
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
      console.log(response);
      if (response.data.err) {
        setErrors("Wrong Credintials !");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrors(error.code);
    }
  };




  const handleGoogleBtn = async () =>{
    try {
    // window.open("https://ennmart.herokuapp.com/auth/google" , '_self')
    window.open("http://localhost:8000/auth/google" , '_self')
     
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
    <Navbar />
      <div className="login-container bg-[#355C7D]  md:bg-transparent">
        <img className="bg-img hidden md:flex" src="images/login.jpg" alt="" />
        <div className="login-form-div">
          <p className="">{auth.isAuthanticated}</p>
          <p className="text-white mt-4 font-bold">LOGIN</p>
          <form className="login-form" method="post" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email..."
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password ...."
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors && <small className="text-red-400 mt-3">{errors}</small>}
            <button type="submit" className="bg-[#355C7D]">
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
