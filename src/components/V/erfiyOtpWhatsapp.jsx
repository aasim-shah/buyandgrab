import axios from 'axios'
import {useState} from 'react'

function VerfiyOtpWhatsapp() {
  const [phone, setPhone] = useState(0)



  return (
    <div>

      <input type="number"  value={phone} onChange={(e)=>setPhone(e.target.value)} name="phone" id="" />
      <a href="https://api.whatsapp.com/send?phone=+923179936736&text=urlencodedtext">send otp</a>
    </div>
  )
}

export default VerfiyOtpWhatsapp