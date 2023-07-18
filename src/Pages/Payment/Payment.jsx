import axios from 'axios'
import {AiFillCloseCircle } from 'react-icons/ai'
import { TiTick} from 'react-icons/ti'
import {  useParams , useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast , ToastContainer } from 'react-toastify'


function Payment() {
    const navigate = useNavigate()

const params = useParams()
    const handleClick = async (status) =>{
        let data = {}
        if(status === 'accepted'){
             data = {
                _id : params.id,
                status : status,
                paid : true
         }
            toast.success('Thanks for ordering !')
        }else{
            data = {
                _id : params.id,
                status : "pending",
                paid : false
         }
            toast.warning('Something Went Wrong !')
        }
    const res = await axios.post('https://buyandgrab-serverv.onrender.com/api/v1/update/order' , data )
    console.log(res)
    
    }
  return (
    <div>
        <div className="bg-gray-200 w-full h-[100vh] flex justify-center items-center" >
            <button  onClick={()=>{handleClick('accepted')}} className='w-14 h-14 bg-green-400 rounded-full flex justify-center items-center mr-3'><TiTick  size={50}/></button>
            <button onClick={()=>{handleClick('rejected')}} className='w-14 h-14 bg-red-400 rounded-full flex justify-center items-center ml-3'><AiFillCloseCircle  size={50}/></button>
        </div>
        <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
rtl={false}
/>    </div>
  )
}

export default Payment