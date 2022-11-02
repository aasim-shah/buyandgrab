import React ,{ useState} from 'react'
import ReactModal from 'react-modal'
import {FaTimes , FaStar} from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import { doc, getDoc , setDoc } from "firebase/firestore";
import { db } from '../firebase';

 
function UserDetailsModal() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const [isOpne, setIsOpne] = useState(true)
    const [userDetails , setUserDetails] = useState({
        username : "",
        email : ""
    })
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width : '100vw',
      minHeight : '20vh' ,
      overflow : 'hidden',
      maxHeight : '70vh' ,
      maxWidth : '500px' ,
      boxShadow : "0px 0px 12px gray",
      zIndex : "4" ,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const closeModalFunc = () =>{
  setIsOpne(false)
}
const handleChange = (e)=>{
    setUserDetails({...userDetails , [e.target.name] : e.target.value})
}   

const handleSubmit = async (e) =>{
   setDoc(doc(db , "users" , auth.userId), {
      userName : userDetails.username,
      email : userDetails.email
    }).then(res=>{setIsOpne(false)}).catch(err =>{console.log(err)})
   
}

  return (
    <div>
  
    <ReactModal
    isOpen={isOpne}
    onRequestClose={closeModalFunc}
    style={customStyles}
    >
    <div className="absolute right-1 z-[3] top-1 cursor-pointer py-2 px-3 bg-white " onClick={closeModalFunc}><FaTimes size={23} className="themeClrText"/></div>
    <form>
        <p className="text-gray-400 text-center text-sm mt-3 mb-1">Update Your Profile Info</p>
        <input type="text" name="username" className='py-1 px-2 border-2 w-full outline-none' onChange={(e) =>{handleChange(e)}} placeholder='Username ' id="" />
        <input type="text" name="email" className='py-1 px-2 border-2 w-full mt-2 outline-none'   onChange={(e) =>{handleChange(e)}} placeholder='Email ...' id="" />
        <button type="button" className='mt-3 py-1 px-4 themeClrBg text-white font-bold rounded-md block mx-auto' onClick={()=>{handleSubmit()}}>Update</button>
    </form>
    </ReactModal>

    </div>
  )
}


export default UserDetailsModal