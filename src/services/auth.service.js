import axios from "axios";

// const API_URL = "http://localhost:8000/"
const API_URL =  `https://buyandgrab-serverv.onrender.com/`;

const login = async({username , password})=>{
    return axios.post(API_URL+"login" , {username  , password})
}


const register = async({email , password})=>{
    return axios.post(API_URL+"signup" , {email , password})
}


const authService = {
    login,
    register
}
export default authService