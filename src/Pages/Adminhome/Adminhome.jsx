import AdminNavbar from '../../components/AdminNavbar'
import axios from 'axios'
import _StatisticsCard from '../../components/_StatisticsCard'
import _StatisticsTable from '../../components/_StatisticsTable'
import _StatisticsProduct from '../../components/_StatisticsProduct'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AdminSidebar from '../../components/AdminSidebar'
import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa'

export default function Adminhome() {
  const [viewSidebar, setViewSidebar] = useState(true)

const user = useSelector((state) => state.auth)
console.log(user)
  const navigate = useNavigate()
  const checkIsAdmin = async () => {
    try {
      const ress = await axios.get('http://localhost:8000/user/admin',{
        headers: {
          jwt_token : user.token
        }
      })
      console.log(ress)
      if (!ress.status === 200) {
        navigate('/')

      }

    } catch (error) {
      console.log(error)
      navigate('/')
    }
  }

  useEffect(() => {
    checkIsAdmin()
  }, [navigate ,user.user])

  return (
    <div className='bg-gray-100'>
      <AdminNavbar setViewSidebar={setViewSidebar} />
      {viewSidebar ? <AdminSidebar viewSidebar={viewSidebar} setViewSidebar={setViewSidebar}  /> : ""}

      <div className="form-main-container my-5  grid grid-cols-12 mx-auto sm:w-[76%] sm:mr-5 ml-auto ">
      <_StatisticsCard title={'Revenue'} icon={<FaArrowUp/>}  amount={42424}/>
      <_StatisticsCard title={'Sales'} icon={<FaArrowDown color='red'/>} amount={42424}/>
      <_StatisticsCard title={'Products'}  icon={<FaArrowUp />} amount={42424}/>
      <_StatisticsCard title={'Products'} icon={<FaArrowDown color='red'/>}  amount={42424}/>
      </div>

      <div className="form-main-container my-5   grid grid-cols-12 mx-auto sm:w-[76%] sm:mr-5 ml-auto ">
      <_StatisticsProduct />
      <_StatisticsTable />
      </div>
    </div>
  )
}
