import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'


function TrendingTable({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [sortOrders, setSortOrders] = useState({ name: 'asc', id: 'asc' ,  price_btc : 'asc'});
    const [filterBy, setFilterBy] = useState("")

    const fetchData = async () => {
        try {
            let response = await axios.get('https://appslk-second.onrender.com/fetch/trending')
            // let response = await axios.get('http://localhost:5000/fetch/trending')
            console.log({res : response.data})
            setData(response.data)
            setSortedData(response.data)
        } catch (error) { console.log(`Error ${error}`) }

    }



    const sortDataByField = (dataToSort, field, order) => {
      
        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        const sorted = [...dataArray].sort((a, b) => {
            let valueA = a.item[field];
            let valueB = b.item[field];

            
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
            const sorted = sortDataByField(data, field, newSortOrder);
            setSortedData(sorted)
            setFilterBy(field)
        }
    };



  
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>
                    <th className="px-4 py-2" >
                            Rank
                        </th>

                        <th className="px-4 py-2 flex flex-row gap-2 w-[15rem] justify-center items-center" onClick={() => handleSort('name')}>
                           Name     
                              {filterBy === "name" && sortOrders.name === 'asc' &&
                            <AiFillCaretDown />
                        }
                            {filterBy === "name" && sortOrders.name === 'desc' && (
                                <AiFillCaretUp />
                            )}</th>
                        
                        
                        <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                               Price {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                        
                        
                       
                       
                    
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? sortedData.slice(0,selectedRows).map(({item}, index) => (
                
                        <tr key={item.id} className={` py-3 ${index % 2=== 0 && "bg-gray-100"}`}>
                            <td className="px-4 py-2 text-center ">{item.market_cap_rank}</td>
                           
                            <td className="px-4 py-2 text-center">
                            <div className="flex flex-row  items-center">
                            <img src={item.small} alt="Logo" className='h-8 w-8 mr-3' />

                                <p className="text-sm mr-3">{item.name}</p>
                                <p className="text-sm text-gray-400">{item.symbol}</p>
                            </div>
                                </td>
                            <td className="px-4 py-2 text-center">${Number(item.price_btc).toFixed(9)}</td>
                            
                           
                          
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

export default TrendingTable