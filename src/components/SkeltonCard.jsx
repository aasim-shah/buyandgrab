import React from 'react'

export default function SkeltonCard() {
  return (
    <>
      
  <div  className="card-inner w-40 text-start pb-2" >
  <div className=" w-full h-40  mx-auto skelton "></div>
        <div className="mt-4 px-2">
        <p className="text-skelton"></p>
        <p className="text-skelton"></p>
        <p className="text-skelton"></p>
        <p className="text-skelton "></p>   
        </div>
        <div className="flex mt-3 px-2">
        <button className="skelton text-white px-2 py-3 block mx-auto rounded-md w-16 md:w-32"></button>
        <button className="skelton text-white px-2 py-3 block mx-auto rounded-md w-16 ml-2 md:w-32"></button>
        </div>
</div>
    </>
  )
}
