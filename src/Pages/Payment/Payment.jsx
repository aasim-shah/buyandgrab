import { async } from '@firebase/util'
import axios from 'axios'
import {AiFillCloseCircle } from 'react-icons/ai'
import { TiTick} from 'react-icons/ti'
import { useParams } from 'react-router-dom'
import { toast , ToastContainer } from 'react-toastify'


function Payment() {
const params = useParams()
    const handleClick = async (status) =>{
        if(status === 'accepted'){
            toast.success('Thanks for ordering !')
        }else{
            toast.warning('Something Went Wrong !')
        }
    const data = {
        _id : params.id,
        status : status
    }
    const res = await axios.post('https://ennmart.herokuapp.com/api/v1/update/order' , data )
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