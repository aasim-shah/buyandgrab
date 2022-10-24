import {useState} from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminNavbar() {
const [viewSidebar, setViewSidebar] = useState(true)

  return (
    <>
    <div className=" flex flex-row justify-between py-2 bg-gray-300 px-5">
        <div className="flex sm:hidden"  onClick={()=>{setViewSidebar(true)}}>barss</div>
        <div className="">LOGO</div>
        <div className=""> logout</div>
    </div>
    {viewSidebar ? <AdminSidebar viewSidebar={viewSidebar} setViewSidebar={setViewSidebar}  /> : ""}
    </>
  )
}
