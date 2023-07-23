import { useEffect, useState } from 'react'
import LatestTable from '../../components/LatestTable';
import { useParams  , useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChartComponent from '../../components/ChartComponent';
import Token_holders from '../../components/Token_holders';
import TrendingTable from '../../components/TrendingTable';
import TransactionTable from '../../components/TransactionsTable';
import TokenByPlatform from '../../components/TokenByPlatform';
import TokensWithPotential from '../../components/TokenswithPotential';
import TokenwiseInflows from '../../components/TokenwiseInflows';

function Tables() {
  const { tableContentType } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const table2ContentType = queryParams.get('platform');
  
  const [selectedRows, setSelectedRows] = useState(50); // Default selected rows

  // Event handler to update the selected rows
  const handleRowChange = (event) => {
    setSelectedRows(parseInt(event.target.value));
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
      <div className="w-11/12 mx-auto bg-black mt-12 flex justify-center items-center mb-4 h-[20rem]">
    <img src="https://media.discordapp.net/attachments/1008571037862080542/1132273520588619797/NFTHouse9_coins_cyber_punk_theme_bf196595-8813-4948-8f88-357a8ec61f40.png?width=1025&height=284" className='w-full h-[20rem]' alt="" />
      </div>

      <div className="flex flex-col sm:flex-row my-2 gap-4 justify-between w-11/12 mx-auto items-center   ">
        <div className="flex flex-row justify-start  w-[20rem] sm:w-full overflow-x-scroll sm:overflow-x-auto items-center   gap-4">
          <Link to={`/tables/overall`}  className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'overall' && 'text-blue-600 bg-gray-100' }`}>Overall Tokens</Link>

          <Link  to={`/tables/most-visited`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'most-visited' && 'text-blue-600 bg-gray-100' }`}>Most Visited</Link>


        

          <Link  to={`/tables/TokensWithPotential`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'TokensWithPotential' && 'text-blue-600 bg-gray-100' }`}>Tokens with potential</Link>
         
          <Link  to={`/tables/tokenwise_inflows`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${tableContentType === 'tokenwise_inflows' && 'text-blue-600 bg-gray-100' }`}> Tokenwise Inflows</Link>
         

        </div>
        <div className="flex flex-row items-center min-w-[8rem]  w-11/12 sm:w-[8rem]  py-1 justify-end gap-3">
            <p className="text-[12px]">Rows</p>
          <select value={selectedRows} onChange={handleRowChange} name="coinType" className='py-1 px-1 bg-gray-200 rounded-md text-[12px] font-semibold outline-none' id="">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row my-2 gap-4 justify-between w-11/12 mx-auto items-center   ">
        <div className="flex flex-row justify-center items-center   gap-4">
          <Link to={`/tables/tokenByPlatform?platform=Ethereum&limit=100`}  className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${table2ContentType === 'Ethereum' && 'text-blue-600 bg-gray-100' }`}>Ethereum</Link>

          <Link to={`/tables/tokenByPlatform?platform=Binance&limit=100`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${table2ContentType === 'Binance' && 'text-blue-600 bg-gray-100' }`} >Binance</Link>

          <Link to={`/tables/tokenByPlatform?platform=Polygon&limit=100`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${table2ContentType === 'Polygon' && 'text-blue-600 bg-gray-100' }`} >Polygon</Link>

          <Link  to={`/tables/tokenByPlatform?platform=Arbitrum&limit=100`} className={`py-1 px-2 rounded-md hover:bg-gray-100 text-[11px] font-semibold ${table2ContentType === 'Arbitrum' && 'text-blue-600 bg-gray-100' }`} >Arbitrum</Link>

         
        </div>
        </div>
    {tableContentType === "overall" && (
      <LatestTable selectedRows={selectedRows} />     
    )}
    {tableContentType === "most-visited" && (
      <TrendingTable selectedRows={selectedRows} />     
    )}
    {tableContentType === "token_holders" && (
      <Token_holders selectedRows={selectedRows} />     
    )}
    {tableContentType === "transactions" && (
      <TransactionTable selectedRows={selectedRows} />     
    )}
    {tableContentType === "tokenByPlatform" && (
      <TokenByPlatform selectedRows={selectedRows} />     
    )}
    {tableContentType === "TokensWithPotential" && (
      <TokensWithPotential selectedRows={selectedRows} />     
    )}
    {tableContentType === "tokenwise_inflows" && (
      <TokenwiseInflows selectedRows={selectedRows} />     
    )}
    </div>
  );
}

export default Tables