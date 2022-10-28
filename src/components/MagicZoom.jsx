import React from "react";
import ReactImageZoom from 'react-image-zoom';

export default function MagicZoom({_width , _height , _src}) {


  const options = {width: _width, height: _height, img:_src  , zoomLensStyle : "background-color:gray; opacity : 0.6;" , zoomStyle : ""} ;

  return (
  <> 
<div className="w-full mx-auto">
<ReactImageZoom  {...options} />
</div>
  </>
  );
}
