import React from 'react'

export default function SkeltonCard() {
  return (
    <>
      
  <div  className="card-inner text-start" >
  <div className=" w-24 h-24 rounded-full mx-auto skelton"></div>
        <div className="mt-4">
        <p className="text-skelton"></p>
        <p className="text-skelton"></p>
        <p className="text-skelton"></p>
        <p className="text-skelton "></p>   
        </div>
        <div className="flex mt-3">
        <button className="skelton text-white px-2 py-1 mx-auto rounded-md">Add To Bag</button>
        </div>
</div>
    </>
  )
}
