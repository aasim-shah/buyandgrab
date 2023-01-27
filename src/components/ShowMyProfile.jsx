import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useSelector } from 'react-redux'
import { RiSearch2Fill } from 'react-icons/ri';
import { FaPen } from 'react-icons/fa'
import { toast } from 'react-toastify';


function ShowMyProfile() {
    const authUser = useSelector((state) => state.auth);
    const userId = authUser.userId;
    const [profileImage, setProfileImage] = useState('')
    const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState('')
    const [userDetails, setUserDetails] = useState(null)
    // con useState({
    //     id : authUser.userId,
    //     firstName : "",
    //     lastName : "", 
    //     email : "",
    //     phone : "",
    //     city : "",
    //     zipCode : "",
    //     address : ""
    // })


    const onchange = async(e) =>{
        setUserDetails((prevData) =>
     ({
        ...prevData,
        [e.target.name] : e.target.value
    })
        )
    }

    const handleSubmit = async () =>{
        if(profileImagePreviewUrl !== ""){

            const data = new FormData();
            data.append("file", profileImage);
            data.append("upload_preset", "okaybosshhh");
        data.append("cloud_name", "dy9crvf1i");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dy9crvf1i/image/upload",
          data
        );
        if(res.status === 200){
            setUserDetails((prevData) => ({...prevData, profilePic : res.data.url }))
            console.log(userDetails)
            console.log(res)
            const ress = await axios.post(
             // `https://ennmartserver.up.railway.app/user/update`
                `http://localhost:8000/user/update`
                , userDetails  , { withCredentials : true})
                if(ress.status === 200){
                    toast.success('profile updated')
                }
            }
        }
        const ress = await axios.post(
            // `https://ennmartserver.up.railway.app/user/update`
               `http://localhost:8000/user/update`
               , userDetails  , { withCredentials : true})
               if(ress.status === 200){
                   toast.success('profile updated')
               }
    }
        

    const handleDelete = async ( )=>{
        const res = await axios.get(
            // `https://ennmartserver.up.railway.app/user/update`
            `http://localhost:8000/user/delete/${userDetails._id}`)
            if(res.status === 201){
                toast.warn('profile deleted')
            }
    }

    const userInfo = async () => {
        const { data } = await axios.get(
            `https://ennmartserver.up.railway.app/user/info/${userId}`
        );
        setUserDetails(data)
        console.log(data)
    };
    
    const handleImageChange = (event)=>{
        if (event.target.files && event.target.files[0]) {
            setProfileImage(event.target.files[0])
            setProfileImagePreviewUrl({
              image: URL.createObjectURL(event.target.files[0])
            });
          }
    }
    useEffect(() => {
        userInfo();
    }, []);
    return (
        <div>
            <div className="bg-gray-200 grid grid-cols-12">
                <div className="col-span-12 md:col-span-3 flex justify-end items-center ">
                    <div className="w-40  bg-yellow-400 rounded-full  flex justify-center items-center h-40  relative">
                        <label for="profilePic" className="absolute right-3 bg-white border-2 border-green-200 p-2 rounded-full  top-3"><FaPen size={21}/></label>
                        <input type="file" className='hidden' id='profilePic' onChange={handleImageChange} />
                        <img src={userDetails?.profileImage || profileImagePreviewUrl.image} alt="" className='w-36 rounded-full h-36'  />
                    </div>
                </div>  
                <div className="col-span-12 md:col-span-1"></div>
                <div className="col-span-12 md:col-span-8 py-2">
                    <div className="flex flex-row justify-center gap-[2rem] ">
                        <div className="flex flex-col mt-2 w-[30%]">
                            <span className="text-sm  w-[100%] mb-1 text-green-500 font-semibold  mx-auto">First Name :</span>
                            <input type="hidden" name="id" value={userDetails?._id} id="" />
                            <input onChange={onchange}  type="text" name="firstName" className="bg-gray-100   outline-blue-400 w-[100%] py-1 px-2 text-center border rounded-md" value={userDetails?.firstName}/>
                        </div>
                        <div className="flex flex-col mt-2 w-[30%]">
                            <span className="text-sm  w-[100%] mb-1 text-green-500 font-semibold  mx-auto">Last Name :</span>
                            <input onChange={onchange}  type="text" name="lastName" className="bg-gray-100  outline-blue-400  w-[100%] py-1 px-2 text-center border rounded-md" value={userDetails?.lastName} />
                        </div>
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-sm  w-[65%] mb-1 text-green-500 font-semibold  mx-auto">Email :</span>
                        <input onChange={onchange}  type="text" name="email" className="bg-gray-100  outline-blue-400  w-[65%]   mx-auto    py-1 px-2 text-center border rounded-md" value={userDetails?.email} />

                    </div>

                    <div className="flex flex-col mt-2">
                        <span className="text-sm  w-[65%] mb-1 text-green-500 font-semibold  mx-auto">Phone :</span>
                        <input onChange={onchange}  type="text" name="phone" className="bg-gray-100  outline-blue-400  w-[65%]   mx-auto    py-1 px-2 text-center border rounded-md" value={userDetails?.phone} />
                    </div>

                    <div className="flex flex-row justify-center gap-[2rem] ">
                        <div className="flex flex-col mt-2 w-[30%]">
                            <span className="text-sm  w-[100%] mb-1 text-green-500 font-semibold  mx-auto">City :</span>
                            <input onChange={onchange}  type="text" name="city" className="bg-gray-100  outline-blue-400  w-[100%] py-1 px-2 text-center border rounded-md" value={userDetails?.city}/>
                        </div>
                        <div className="flex flex-col mt-2 w-[30%]">
                            <span className="text-sm  w-[100%] mb-1 text-green-500 font-semibold  mx-auto">Zip Code :</span>
                            <input onChange={onchange}  type="text" name="zipCode" className="bg-gray-100  outline-blue-400  w-[100%] py-1 px-2 text-center border rounded-md" value={userDetails?.zipCode}/>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <span className="text-sm  w-[65%] mb-1 text-green-500 font-semibold  mx-auto">Address :</span>
                        <input onChange={onchange}  type="text" name="address" className="bg-gray-100 outline-blue-400 w-[65%]   mx-auto    py-1 px-2 text-center border rounded-md" value={userDetails?.address}/>
                    </div>

                    <div className="flex flex-row justify-center mt-2">
                        <button className='py-2 px-4 rounded-md mr-4 font-semibold text-sm bg-red-500' onClick={handleDelete}>Delete Account</button>
                        <button onClick={handleSubmit}  className='py-2 px-4 rounded-md text-sm font-bold bg-yellow-500'>Update</button>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default ShowMyProfile