import React ,{ useState} from 'react'
import ReactModal from 'react-modal'
import {FaTimes , FaStar} from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import {openThankingModal , closeThankingModal} from "../features/globalSlice"
 
function ThankingModal({btnTitle , btnStyle , modalText}) {
    const dispatch = useDispatch()
    const ThankingModalRedux = useSelector((state) => state.global)

        console.log(ThankingModalRedux)
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width : '78%',
      minHeight : '20vh' ,
      overflow : 'hidden',
      maxHeight : '80vh' ,
      boxShadow : "0px 0px 12px gray",
      zIndex : "4" ,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const closeModalFunc = () =>{
    dispatch(closeThankingModal())
}


setTimeout(() => {
    dispatch(closeThankingModal())
}, 2000);
  return (
    <div>
  
    <ReactModal
    isOpen={ThankingModalRedux.thankingModalOpen}
    onRequestClose={closeModalFunc}
    style={customStyles}
    >
    {/* <div className="absolute right-7 top-3 cursor-pointer py-2 px-3 bg-white " onClick={closeModalFunc}><FaTimes size={27}/></div> */}
    <p className="text-green-600 flex justify-center items-center bg-white  text-white font-bold text-2xl  absolute right-0 left-0 top-0 bottom-0">{modalText}</p>
    </ReactModal>

    </div>
  )
}

export default ThankingModal