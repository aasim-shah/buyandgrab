import { useEffect, useState } from 'react'
import LatestTable from '../../components/LatestTable';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChartComponent from '../../components/ChartComponent';

function Tables() {
  const [cointType, setCointType] = useState("USD")
  const { tableContentType } = useParams();

  const handleOptionChange = (event) => {
    setCointType(event.target.value);
  };


  const chartData = [{
    value : 4,
    name : "l32jl3"
  },
{
    value : 19,
    name : "l32jl3"
  }]



  return (
    <div className="mx-auto  w-full  flex flex-col" >
      <div className="w-11/12 mx-auto bg-gray-300 mt-12 flex justify-center items-center mb-4 h-[20rem]">
      <p className="text-lg font-semibold text-gray-500">
        Image
      </p>
      </div>

      <div className="flex flex-row my-2 justify-between w-11/12 mx-auto items-center ">
        <div className="flex flex-row justify-center items-center gap-4">
          <Link to={`/tables/spotlight`}  className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'spotlight' && 'text-blue-600 bg-gray-100' }`}>Spotlight</Link>

          <Link to={`/tables/gainers`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'gainers' && 'text-blue-600 bg-gray-100' }`} >Gainers</Link>

          <Link to={`/tables/losers`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'losers' && 'text-blue-600 bg-gray-100' }`} >Losers</Link>

          <Link  to={`/tables/trending`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'trending' && 'text-blue-600 bg-gray-100' }`} >Trending</Link>

          <Link  to={`/tables/most-visited`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'most-visited' && 'text-blue-600 bg-gray-100' }`}>Most Visited</Link>

          <Link  to={`/tables/recently-added`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'recently-added' && 'text-blue-600 bg-gray-100' }`}>Recently Added</Link>

        </div>
        <div className="flex flex-row items-center justify-between gap-3">
          <p className="text-[12px]">Coin Type</p>
          <select value={cointType} onChange={handleOptionChange} name="coinType" className='py-1 px-1 bg-gray-200 rounded-md text-[12px] font-semibold outline-none' id="">
            <option value="USD">USD</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
      </div>
    {tableContentType === "spotlight" && (
      <LatestTable coinType={cointType} />     
    )}
    </div>
  );
}

export default Tables