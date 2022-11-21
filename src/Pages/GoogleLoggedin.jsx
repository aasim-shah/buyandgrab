import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { HashLoader } from 'react-spinners'
function GoogleLoggedin() {
    const [isLoading, setIsLoading] = useState(false)

const getGoogleAuthUser = async()=>{
    setIsLoading(true)
    const {data} = axios.get("https://ennmart.herokuapp.com/auth/success" , {withCredentials:true})
    console.log(data)
    if(data.success){
        setIsLoading(false)
    }
}

useEffect(()=>{
    getGoogleAuthUser()
},[])

  return (
    <div className="text-center font-bold bg-[#355b7d] flex justify-center items-center h-[100vh]">
          <HashLoader color={"white"} loading={isLoading} size={150} />
    </div>
  )
}

export default GoogleLoggedin