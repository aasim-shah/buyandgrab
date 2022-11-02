import axios from 'axios'
import {useState , useEffect} from 'react'
import {BiUser} from "react-icons/bi"
import {FaStar} from 'react-icons/fa'


function AllReviews({product}) {
  const [productt, setProductt] = useState(null)
    console.log(product)
    const getProduct = async () =>{
      const res = await axios.get(`https://ennmart.herokuapp.com/api/v1/products/${product._id}`)
      setProductt(res.data)
    }
    const starsArray  = Array(5).fill(0);
    useEffect(()=>{
      getProduct()
    },[])
  return (
    <>
     <p className="mb-3 themeClrText my-4 mx-3">Reviews  </p>
    {productt && productt.reviews.length > 0 ? productt.reviews.map((review , ind) =>(
  <div className="grid grid-cols-12 mt-3  bg-white w-11/12 mx-auto rounded-md py-2 border-b-2" key={review._id}>
  <div className="col-span-3 flex justify-center items-center">
      <span className='bg-gray-100 rounded-full py-2 px-2'>
      {review.profilePic ? (<img src={review.profilePic} className="w-12 rounded-full h-12"/>) : (<BiUser size={50}/>)}
      </span>
  </div>
  <div className="col-span-9 flex flex-col">
      <div className="flex w-11/12 flex-row justify-between">
          <span className='text-lg font-bold'>{review.userName}</span>
          <span className='flex flex-row gap-1'>{starsArray.map((_, ind) =>(
            <FaStar size={20} key={ind} color={review.rating > ind ? "orange" : "gray"}/>
          ))}</span>
      </div>
      <div className="text-sm pl-2 mt-1">{review.reviewText}</div>

  </div>
</div>

    )) : (<p className='mx-5'>No Review Yet !!</p>)}

  
    </>
  )
}

export default AllReviews