import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { HashLoader } from 'react-spinners'
function GoogleLoggedin() {
    const [isLoading, setIsLoading] = useState(true)

const getGoogleAuthUser = async()=>{
    const {data} = axios.get("https://ennmart.herokuapp.com/auth/success" , {withCredentials:true})
    console.log(data)
}

useEffect(()=>{
    getGoogleAuthUser()
},[])

  return (
    <div className="flex">
          <HashLoader color={"#355b7d"} loading={isLoading} size={150} />
    </div>
  )
}

export default GoogleLoggedin