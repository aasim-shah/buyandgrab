import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Link , useParams } from 'react-router-dom';

function TransactionTable({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [sortOrders, setSortOrders] = useState({ name: 'asc', id: 'asc', price_btc: 'asc' });
    const [filterBy, setFilterBy] = useState("")
    const { tableContentType, address ,contract_address } = useParams();
    console.log({tableContentType})
    console.log({address})
    console.log({contract_address})
    const fetchData = async () => {
        try {
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/transactions/${address}/${contract_address}`)
            // let response = await axios.get(`http://localhost:5000/fetch/transactions/${address}/${contract_address}`)
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
    const numberWithCommas = (num) => {
        const nn = Number(num)
        return nn.toFixed(3)
      };
      



    useEffect(() => {
        fetchData()
    }, [])

    console.log({ sortedData })

    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
              {sortedData && sortedData.items.length > 0 && (
                <div className="flex flex-row justify-between px-10 items-center">

                    <div className="flex flex-row my-3  items-center">

                        <p className="font-semibold mr-3">{sortedData.items[0]?.transfers[0].contract_name}</p>
                        <p className="text-sm text-gray-400">{sortedData.items[0]?.transfers[0].contract_ticker_symbol}</p>
                    </div>

                    <div className="">
                        <span className='text-sm'> Address</span>
                        <p className="text-sm text-gray-400">{sortedData?.address}</p>
                    </div>
                   
                </div>
            )}
            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>
                        <th className="px-4 py-2" >
                            Rank
                        </th>
                        <th className="px-4 py-2" >
                            Name
                        </th>

                        <th className="px-4 py-2 " >
                            Value
                            {/* {filterBy === "name" && sortOrders.name === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "name" && sortOrders.name === 'desc' && (
                                <AiFillCaretUp />
                            )} */}
                           </th>
                        <th className="px-4 py-2 flex flex-row gap-2 w-[15rem] justify-center items-center" >
                        <div className="flex flex-row  gap-2 justify-center items-center">
                                Transaction Hash
                            </div>
                           </th>
                           <th className="px-4 py-2" >
                            From Address
                        </th>
                           <th className="px-4 py-2" >
                            To Address
                        </th>
                           <th className="px-4 py-2" >
                            Delta Quote
                        </th>
{/* 
                        <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Wallet_Address {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}

                        {/* <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Contract_address {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}

                        {/* <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Balance {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}




                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.items.length > 0 ? sortedData.items.slice(0, selectedRows).map((item, index) => (

                        <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-200"}`}>
                            <td className="px-4 py-2 text-center ">{index + 1}</td>
                            <td className="px-4 py-2 text-center ">{item.transfers[0].contract_name}</td>
                            <td className="px-4 py-2 ">{
                              numberWithCommas( Number(item.transfers[0].delta).toFixed(3) / Number(item.transfers[0].contract_decimals))
                            }</td>
                            <td className="px-4 py-2 text-center ">
                            <Link to={`#`}>
                                    {item.tx_hash
                                        .slice(0, 8)}........{item.tx_hash.slice(60, item.tx_hash
                                            .length)}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-center ">
                            <Link to={`#`}>
                                    {item.from_address
                                        .slice(0, 8)}........{item.from_address.slice(38, item.from_address
                                            .length)}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-center ">
                            <Link to={"#"}>
                                    {item.to_address
                                        .slice(0, 8)}........{item.to_address.slice(38, item.to_address
                                            .length)}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-center ">
                            {item.transfers[0].pretty_delta_quote}
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

export default TransactionTable