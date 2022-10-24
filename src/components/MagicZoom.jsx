import React from "react";
import Zoom from 'react-img-zoom'
import ReactImageZoom from 'react-image-zoom';

export default function MagicZoom({_width , _height , _src}) {


  const options = {width: _width, height: _height,img:_src  , zoomLensStyle : "background-color:gray; opacity : 0.6;"};

  return (
  <> 
<div className="w-5/12">
<ReactImageZoom  {...options} />
</div>
  </>
  );
}
