import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Token_holders({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [sortOrders, setSortOrders] = useState({ name: 'asc', id: 'asc', price_btc: 'asc' });
    const [filterBy, setFilterBy] = useState("")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tokenId = queryParams.get('tokenId');
    const tokenCount = queryParams.get('tokenCount');
    console.log({tokenId})
    console.log({tokenCount})

 
    const fetchData = async () => {
        try {
          let response = await axios.get(`https://appslk-second.onrender.com/fetch/token_holders/${tokenId}`)
            // let response = await axios.get(`http://localhost:5000/fetch/token_holders/${tokenId}`)
            console.log({ res: response.data })
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

    console.log({ sortedData })

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
                                Wallet_Address {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>

                        <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Contract_address {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>

                        <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Balance {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
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
                    {sortedData && sortedData.length > 0 ? sortedData.slice(0, selectedRows).map((item, index) => (

                        <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-100"}`}>
                            <td className="px-4 py-2 text-center ">{index + 1}</td>

                            <td className="px-4 py-2 text-center">
                                <div className="flex flex-row  items-center">
                                    <img src={item.logo_url} alt="Logo" className='h-8 w-8 mr-3' />

                                    <p className="text-sm mr-3">{item.contract_name}</p>
                                    <p className="text-sm text-gray-400">{item.contract_name}</p>
                                </div>
                            </td>
                            <td className="px-4 py-2  text-center">
                            <Link to={`/tables/transactions/${item.address}/${item.contract_address}`}>
                                {item.address.slice(0, 8)}.....{item.address.slice(38, item.address.length)}
                                </Link>

                                </td>
                                
                            <td className="px-4 py-2 text-center">
                                <Link to={`/tables/transactions/${item.address}/${item.contract_address}`}>
                                    {item.contract_address
                                        .slice(0, 8)}.....{item.contract_address.slice(38, item.contract_address
                                            .length)}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-center">${Number(item.balance).toFixed(9)}</td>


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

export default Token_holders