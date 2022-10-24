import { doc, setDoc  } from "firebase/firestore"; 
import { db } from '../firebase';
import { useSelector, useDispatch } from "react-redux";
import { useState , useEffect } from 'react';
import _AddProduct from "./_AddProduct";

export default function AdminRole() {
    const auth = useSelector((state) => state.auth);
    console.log(auth.user.uid)
    const userId = auth.user.user.uid
    const [isAdmin, setisAdmin] = useState(false)
    const dispatch = useDispatch();

    const handleAdd = async(e)=>{
        setisAdmin(e.target.value)
        console.log(isAdmin)
        await setDoc(doc(db, "users", userId), {
            isAdmin : isAdmin
            });
        
    }
   
    
  return (
    <>
    <div className="main-container ">
        <form  className="flex justify-center">
        <select name="check_admin" id="" className="w-11/12  py-1 px-2 bg-gray-100" onChange={handleAdd}>
            <option value="false">Set Admin</option>
            <option value="true">Not Admin</option>
        </select>
        </form>

        <_AddProduct/>
    </div>
    </>
  )
}
