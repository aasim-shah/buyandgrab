import {useState}from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ThankingModal from '../../components/ThankingModal';
import {openThankingModal , closeThankingModal , toggleDarkTheme} from "../../features/globalSlice"
import {useSelector , useDispatch} from 'react-redux'


export default function ConfirmOrder() {
  const dispatch = useDispatch()
  
  return (
    <>
    <Navbar />
    <div className="flex flex-col justify-center items-center mx-auto my-5 w-11/12 md:w-5/12">
        <p className="text-gray-400 my-2">Confirm Your ORDER Please !</p>
          <form >
        <div className="flex flex-row w-full">

            <input required type="text" n ame="" className='w-full py-1 px-4 border-2 rounded-md mr-2' placeholder='First Name ..' id="" />
            <input required type="text" n ame="" className='w-full py-1 px-4 border-2 rounded-md ml-2' placeholder='Last Name ...' id="" />
        </div>
            <div className="w-full mt-3">
            <input required type="text" n ame="" className='w-full py-1 px-4 border-2 rounded-md' placeholder='Email Address ....' id="" />
            </div>
            <div className="w-full mt-3">
            <input required type="number"  name="" className='w-full py-1 px-4 border-2 rounded-md' placeholder='Phone Number ...' id="" />
            </div>
            <div className="w-full mt-3">
            <div className="flex flex-row w-full">
            <input required type="text" n ame="" className='w-full py-1 px-4 border-2 rounded-md mr-2' placeholder='City ..' id="" />
            <input  type="number" n ame="" className='w-full py-1 px-4 border-2 rounded-md ml-2' placeholder='Zip code ...' id="" />
        </div>
            </div>
            <div className="w-full mt-3">
            <input type="text" name="" className='w-full py-6 px-4 border-2 rounded-md' placeholder='Address' id="" />
            </div>
            <div className="w-full flex flex-row justify-center mt-3">
               <button  className="py-1 px-5 themeClrBg text-white font-bold rounded-md" onClick={()=>{ dispatch(openThankingModal())
}}>Confirm</button>
            </div>
</form>
        
    </div>
    

    <ThankingModal btnTitle={""} btnStyle={"hidden"} modalText={"Thanks Trusting Us Again 😍🔥"} />

      <Footer />
    </>
  )
}
