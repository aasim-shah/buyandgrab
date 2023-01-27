import {useState} from 'react'
import AdminSidebar from './AdminSidebar'
import {CgMenuLeft} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'


export default function AdminNavbar({setViewSidebar}) {

  return (
    <>
    <div className=" flex flex-row justify-between py-2 bg-white shadow-lg shadow-blue-200  px-5">
        <div className="flex sm:hidden"  onClick={()=>{setViewSidebar(true)}}><CgMenuLeft size={28}/></div>
        <div className="">LOGO</div>
        <div className=" bg-gray-100"> <FiLogOut size={22} color={'red'} /></div>
    </div>
    </>
  )
}
