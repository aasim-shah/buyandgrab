import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth, GoogleProvider } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./Loginpage.css";
import { doc, getDoc } from "firebase/firestore";
import { useSelector , useDispatch } from "react-redux";
import { loggedIn, loggedOut  } from "../../features/authSlice";



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
      const user = await signInWithEmailAndPassword(Auth, email, password);
      if (user.user.uid) {
      
        const docRef = doc(db, "users", user.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(loggedIn({user , isAdmin : docSnap.data().isAdmin })) 
        navigate("/");
        setTimeout(() => {
          dispatch(loggedOut())
        }, 1000 * 60 * 60 * 3 );     
        } else {
          dispatch(loggedIn({user , isAdmin : false })) 
          navigate("/");
          setTimeout(() => {
            dispatch(loggedOut())
          }, 1000 * 60 * 60 * 3 );    
        }


           
      }
    } catch (error) {
      console.log(error);
      setErrors(error.code);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(Auth, GoogleProvider);
    dispatch(loggedIn(result.user)) 
    setTimeout(() => {
      dispatch(loggedOut())
    }, 1000 * 60 * 60 * 3 ); 
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
          <form className="login-form" onSubmit={handleSubmit}>
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
            <div className="social-login-google" onClick={handleGoogleLogin}>
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
