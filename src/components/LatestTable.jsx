import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import ChartComponent from './ChartComponent';


function LatestTable({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [extendedData, setExtendedData] = useState([]);
    const [sortOrders, setSortOrders] = useState({ 
    name: 'asc', id: 'asc', cmc_rank: "asc"  , 
    percent_change_1h : "asc",
    percent_change_24h : "asc",
    percent_change_7d : "asc",
    market_cap : "asc"
});
    const [filterBy, setFilterBy] = useState("")

    const fetchData = async () => {
        try {
            // let response = await axios.get('https://appslk-second.onrender.com/fetch/latest')
            let response = await axios.get('http://localhost:5000/fetch/latest')
            setData(response.data)
            setSortedData(response.data)
        } catch (error) { console.log(`Error ${error}`) }

    }



    const sortDataByField = (dataToSort, field, order) => {
      
        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        const sorted = [...dataArray].sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            if(valueA === undefined){
                valueA = a.quote.USD[field]
            }
            if(valueB=== undefined){
                valueB = b.quote.USD[field]
            }
            console.log({valueA})
            console.log({valueB})
            if (order === 'asc') {
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueA - valueB;
                }
            } else {
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueB.localeCompare(valueA);
                } else {
                    return valueB - valueA;
                }
            }
        });

        // setSortedData(sorted);
        // Update sortOrders with the new sort order for the specific field
        setSortOrders((prevSortOrders) => ({
            ...prevSortOrders,
            [field]: order,
        }));
        return sorted
    };



    // Function to toggle the sort order when the name column is clicked
    const handleSort = (field) => {
        const newSortOrder = sortOrders[field] === 'asc' ? 'desc' : 'asc';
        // Sort the data with the new order and specified field
        if (data) {
            const sortedData = sortDataByField(extendedData, field, newSortOrder);
            setExtendedData(sortedData);
            setFilterBy(field)
        }
    };


    // const getCoinInfo = async (id) =>{
    //  try {
    //     const resp = await axios.get(`http://localhost:5000/fetch/info/${id}`)
    //     console.log({resp})
    //     return resp.data
    //  } catch (error) {
    //     console.log(error)
    //  }
    // }

    
  useEffect(() => {
    // Fetch further data for each item based on item.id
    const fetchExtendedData = async () => {
      try {
        const extendedDataPromises = sortedData?.slice(0, selectedRows).map(async (item) => {
          const response = await axios.get(`http://localhost:5000/fetch/info/${item.id}`);
          const newItem = {...item ,  logo : [response.data]}
          return newItem; // Assuming the server response is the extended data for the given item.id
        });

        const extendedDataArray = await Promise.all(extendedDataPromises);
        setExtendedData(extendedDataArray);
      } catch (error) {
      }
    };

    if (sortedData?.length > 0) {
      fetchExtendedData();
    }
  }, [data , selectedRows]);

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>
                    <th className="px-4 py-2 " onClick={() => handleSort('cmc_rank')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Rank  {filterBy === "cmc_rank" && sortOrders.cmc_rank === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "cmc_rank" && sortOrders.cmc_rank === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        
                        <th className="px-4 py-2 flex flex-row gap-2 w-[15rem] justify-center items-center" onClick={() => handleSort('name')}>
                           Name
                              {filterBy === "name" && sortOrders.name === 'asc' &&
                            <AiFillCaretDown />
                        }
                            {filterBy === "name" && sortOrders.name === 'desc' && (
                                <AiFillCaretUp />
                            )}</th>
                        
                        
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2 " onClick={() => handleSort('percent_change_1h')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                1h%  {filterBy === "percent_change_1h" && sortOrders.percent_change_1h === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "percent_change_1h" && sortOrders.percent_change_1h === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                       
                        <th className="px-4 py-2 " onClick={() => handleSort('percent_change_24h')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                24h%  {filterBy === "percent_change_24h" && sortOrders.percent_change_24h === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "percent_change_24h" && sortOrders.percent_change_24h === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        <th className="px-4 py-2 " onClick={() => handleSort('percent_change_7d')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                7d%  {filterBy === "percent_change_7d" && sortOrders.percent_change_7d === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "percent_change_7d" && sortOrders.percent_change_7d === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        <th className="px-4 py-2 " onClick={() => handleSort('market_cap')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Market Cap  {filterBy === "market_cap" && sortOrders.market_cap === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "market_cap" && sortOrders.market_cap === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        <th className="px-4 py-2 " onClick={() => handleSort('volume_24h')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Volume (24h)  {filterBy === "volume_24h" && sortOrders.volume_24h === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "volume_24h" && sortOrders.volume_24h === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        <th className="px-4 py-2 " >
                            7 days 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {extendedData && extendedData.length > 0 ? extendedData.slice(0,selectedRows).map((item, index) => (
                
                        <tr key={item.id} className={` py-3 ${index % 2=== 0 && "bg-gray-100"}`}>
                            <td className="px-4 py-2 text-center ">{item.cmc_rank}</td>
                           
                            <td className="px-4 py-2 text-center">
                            <div className="flex flex-row  items-center">
                                {item.logo && (
                             <img src={item.logo[0]} alt="Logo" className='h-8 w-8 mr-3' />
                                )}
                                <p className="text-sm mr-3">{item.name}</p>
                                <p className="text-sm text-gray-400">{item.symbol}</p>
                            </div>
                                </td>
                            <td className="px-4 py-2 text-center">${item.quote.USD.price.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center ">
                                {item.quote.USD.percent_change_1h?.toFixed(2) > 0 ? (
                                    <p className="text-green-500">{item.quote.USD.percent_change_1h?.toFixed(2)}%</p>
                                ) : (
                                    <p className="text-red-500">{item.quote.USD.percent_change_1h?.toFixed(2)}%</p>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center ">
                                {item.quote.USD.percent_change_24h?.toFixed(2) > 0 ? (
                                    <p className="text-green-500">{item.quote.USD.percent_change_24h?.toFixed(2)}%</p>
                                ) : (
                                    <p className="text-red-500">{item.quote.USD.percent_change_24h?.toFixed(2)}%</p>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center ">
                                {item.quote.USD.percent_change_7d?.toFixed(2) > 0 ? (
                                    <p className="text-green-500">{item.quote.USD.percent_change_7d?.toFixed(2)}%</p>
                                ) : (
                                    <p className="text-red-500">{item.quote.USD.percent_change_7d?.toFixed(2)}%</p>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center ">{item.quote.USD.market_cap?.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center ">{item.quote.USD.volume_24h?.toFixed(2)}</td>
                            <td>
                            <ChartComponent chartData={[
                                {value : Number(item.quote.USD.market_cap?.toFixed()) , name : '7days'}
                            ]}/>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="12" className='text-center  py-12  font-bold  text-gray-400'>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LatestTable