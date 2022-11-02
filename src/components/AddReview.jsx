import React ,{ useState} from 'react'
import ReactModal from 'react-modal'
import {FaTimes , FaStar} from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import { doc, getDoc , setDoc } from "firebase/firestore";
import axios from 'axios'
import {openThankingModal , closeThankingModal , toggleDarkTheme} from "../features/globalSlice"
import { db } from '../firebase'
import UserDetailsModal from './UserDetailsModal';


function AddReview({btnTitle , btnStyle , product}) {
    const productId = product?._id;
    const dispatch = useDispatch()
    const ThankingModalRedux = useSelector((state) => state.global)
    const auth = useSelector((state) => state.auth)
        const[reviewErr , setReviewErr] = useState()
        const [selectedRating, setSelectedRating] = useState(null)
        const [hoveredRating, setHoveredRating] = useState(null)
        const [inputText , setInputText] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [openUserDetailModal, setOpenUserDetailModal] = useState(false)


    const ratings = Array(5).fill(0);
    const ratingClrs = {
        orange : "orange",
        gray :   "gray"
    }

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width : '80%',
      minHeight : '40vh' ,
      overflow : 'hidden',
      maxHeight : '80vh' ,
      boxShadow : "0px 0px 12px gray",
      zIndex : "4" ,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const openModalFunc = () =>{
    setOpenModal(true)
}

const closeModalFunc = () =>{
    setOpenModal(false)
}

const handleSubmit = async() =>{
    if(auth.userId) {
        const docRef = doc(db, "users", auth.userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const userName = docSnap.data().userName;
            const profilePic = docSnap.data().profilePic;
          if(inputText !== null  && selectedRating !== null ){
            const res =await axios.post('http://localhost:8000/api/v1/product/add_review' , {
                userId : auth.userId,
                userName : userName,
                profilePic : profilePic,
                reviewText : inputText,
                rating : selectedRating,
                productId : productId
            })
            console.log(res)
            if(res.data.success){
                dispatch(openThankingModal())
                setHoveredRating(null)
                setInputText('')
                setSelectedRating(null)
                closeModalFunc()
            }else{
                setInputText(res.data.yourReview.reviewText)
                setSelectedRating(res.data.yourReview.rating)
                setReviewErr(res.data.msg)
            }
          }else{
            setReviewErr('Fill All Field Properly !')
          }

        }else{
           setOpenUserDetailModal(true)
        }

    }


    // dispatch(openThankingModal())

}

const onStarClick = (value) => {
    console.log(value)
    setSelectedRating(value)
}

const onStarHover = value =>{
    setHoveredRating(value)
}

  return (
    <div>
        <div className="flex flex-row">
        <button onClick={openModalFunc} className={btnStyle}>{btnTitle}</button>
        </div>
    <ReactModal
    isOpen={openModal}
    ariaHideApp={false}
    contentLabel="Add Review"
    onRequestClose={closeModalFunc}
    style={customStyles}
    >
    <div className="absolute right-7 top-3 cursor-pointer py-2 px-3 bg-white" onClick={closeModalFunc}><FaTimes size={27}/></div>
    <div className="content py-2  ">
        <div className="flex flex-row justify-center my-6">

        {ratings.map( (_, ind) => (
             <FaStar key={ind}  color={(selectedRating || hoveredRating) > ind ? ratingClrs.orange : ratingClrs.gray} size={32}
             onMouseOver={()=>{onStarHover(ind+1)}}
             onClick={()=> onStarClick(ind+1)}
             onMouseLeave={()=>{setHoveredRating(null)}}
             className="ml-2"/> 

        ))}
          
        </div>

        <div className="textArea">
            <textarea name="reviewText" id="" className='border-2 w-9/12 mx-auto block h-24 mt-5 py-3 px-3 rounded-md outline-none' placeholder='Post Your Review Here !!' onChange={(e)=>{setInputText(e.target.value)}} value={inputText}></textarea>
        </div>
        <div className="flex flex-col justify-center mt-5">
            <button className='themeClrBg rounded-md text-white w-32 mx-auto font-bold py-1 px-4' onClick={handleSubmit}>Submit</button>
            <p className="text-center text-sm text-red-600 mt-3">{reviewErr}</p>
        </div>
    </div>

    </ReactModal>
            {openUserDetailModal ? <UserDetailsModal/> : ""}
    </div>
  )
}

export default AddReview