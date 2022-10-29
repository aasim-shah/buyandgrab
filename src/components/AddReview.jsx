import React ,{ useState} from 'react'
import ReactModal from 'react-modal'
import {FaTimes , FaStar} from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import {openThankingModal , closeThankingModal , toggleDarkTheme} from "../features/globalSlice"


function AddReview({btnTitle , btnStyle}) {

    const dispatch = useDispatch()
    const ThankingModalRedux = useSelector((state) => state.global)
        const [selectedRating, setSelectedRating] = useState(null)
        const [hoveredRating, setHoveredRating] = useState(null)
    const [openModal, setOpenModal] = useState(false)


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

const handleSubmit = () =>{
    dispatch(openThankingModal())

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
            <textarea name="reviewText" id="" cols="80" rows="5" className='border-2 mt-5 py-3 px-3 rounded-md outline-none' placeholder='Post Your Review Here !!'></textarea>
        </div>
        <div className="flex flex-row justify-center mt-5">
            <button className='themeClrBg rounded-md text-white font-bold py-1 px-4' onClick={handleSubmit}>Submit</button>
        </div>
    </div>

    </ReactModal>

    </div>
  )
}

export default AddReview