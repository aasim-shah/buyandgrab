import React from 'react'
import ReactZoomify from 'react-zoomify'



function MagicZoom() {
  return (
    <div className="">
   <ReactZoomify 
               width={300} 
               src='images/ecom.png'
               s={150} 
               magnification={4}
               zoomedImgLeft={500}
               zoomedImgTop={100}
               />
    </div>
  )
}

export default MagicZoom