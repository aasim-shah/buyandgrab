import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

function TransactionTable({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null); 
    const [sortOrders, setSortOrders] = useState({ block_signed_at: 'asc', id: 'asc', price_btc: 'asc' , pretty_delta_quote : "asc"  , delta : "asc"});
    const [filterBy, setFilterBy] = useState("")
    const { tableContentType, address, contract_address } = useParams();
    const [apiResp, setapiResp] = useState(null)
    console.log({ tableContentType })
    console.log({ address })
    console.log({ contract_address })
    const fetchData = async () => {
        try {
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/transactions/${address}/${contract_address}`)
            // let response = await axios.get(`http://localhost:5000/fetch/transactions/${address}/${contract_address}`)
            console.log({ res: response.data })
            setapiResp(response.data)
            setData(response.data.items)
            setSortedData(response.data.items)
        } catch (error) { console.log(`Error ${error}`) }

    }



    const sortDataByField = (dataToSort, field, order) => {
        console.log("sortDataByField")
        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];
        console.log({dataArray})
        const sorted = [...dataArray].sort((a, b) => {
            console.log({a})
            let valueA = a[field];
            let valueB = b[field]; 
            if(valueA === undefined){
                valueA = a.transfers[0][field]
            }
            if(valueB === undefined){
                valueB = b.transfers[0][field]
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
        console.log({newSortOrder})
        console.log({field})
        // Sort the data with the new order and specified field
        if (data) {
            const sorted = sortDataByField(data, field, newSortOrder);
            setSortedData(sorted)
            setFilterBy(field)
        }
    };
    const numberWithCommas = (num) => {
        const nn = Number(num)
        return nn.toLocaleString()
    };


    function addZerosAtEnd(x) {
        if (typeof x !== 'number' || x < 0 || !Number.isInteger(x)) {
          throw new Error('Input must be a non-negative integer');
        }
      const newNumber = '1' + '0'.repeat(x);
        return parseInt(newNumber)
      }



    useEffect(() => {
        fetchData()
    }, [])

    console.log({ sortedData })

    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            {sortedData && sortedData.length > 0 && (
                <div className="flex flex-col sm:flex-row  justify-start sm:justify-between   px-10 items-center">

                    <div className="flex flex-row my-3  items-center w-full">
                    <img src={`${sortedData[0].transfers[0].logo_url}`} className={`w-8 h-8 mr-3`} alt="" />
                        <p className="font-semibold mr-3">{sortedData[0]?.transfers[0].contract_name}</p>
                        <p className="text-sm text-gray-400">{sortedData[0]?.transfers[0].contract_ticker_symbol}</p>
                    </div>

                    <div className=" w-full sm:w-4/12">
                        <span className='text-sm'> Investor</span>
                        <p className="text-sm text-gray-400">{sortedData[0]?.address}</p>
                    </div>

                </div>
            )}
            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>
                    <th className="px-4 py-2 text-start"  onClick={() => handleSort('block_signed_at')}>
                           <div className="flex justify-start gap-3 items-center flex-row">
                           Signed Date
                              {filterBy === "block_signed_at" && sortOrders.block_signed_at === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "block_signed_at" && sortOrders.block_signed_at === 'desc' && (
                                <AiFillCaretUp />
                            )}
                           </div>
                        </th>
                   
                   
                   
                       
                        <th className="px-4 py-2 text-start" >
                                Transaction Hash
                        </th>
                     
                        <th className="px-4 py-2" >
                        Transaction Method
                        </th>
                        <th className="px-4 py-2 text-start"  onClick={() => handleSort('delta')}>
                           <div className="flex justify-start gap-3 items-center flex-row">
                           Transaction Amount
                              {filterBy === "delta" && sortOrders.delta === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "delta" && sortOrders.delta === 'desc' && (
                                <AiFillCaretUp />
                            )}
                           </div>
                        </th>
                        <th className="px-4 py-2 text-start"  onClick={() => handleSort('pretty_delta_quote')}>
                           <div className="flex justify-start gap-3 items-center flex-row">
                           Quote
                              {filterBy === "pretty_delta_quote" && sortOrders.pretty_delta_quote === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "pretty_delta_quote" && sortOrders.pretty_delta_quote === 'desc' && (
                                <AiFillCaretUp />
                            )}
                           </div>
                        </th>
                       




                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? sortedData.slice(0, selectedRows).map((item, index) => (

                        <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-200"}`}>
                            <td className="px-4 py-2 ">{
                                moment(item.block_signed_at).format('Y-MM-DD .  hh:mm a')
                                
                            }</td>
                           
                           
                            <td className="px-4 py-2">
                                <a  href={`https://etherscan.io/tx/${item.tx_hash}`}>
                                    {item.tx_hash
                                        .slice(0, 8)}........{item.tx_hash.slice(60, item.tx_hash
                                            .length)}
                                </a>
                            </td>
                            
                            <td className="px-4 py-2 text-center ">
                                {apiResp.address === item.transfers[0].to_address && (
                                    <span>IN</span>
                                )}
                                {apiResp.address === item.transfers[0].from_address && (
                                    <span>OUT</span>
                                )}
                            </td>
                            <td className="px-4 py-2 ">{
                                numberWithCommas(Number(item.transfers[0].delta).toFixed() / addZerosAtEnd(Number(item.transfers[0].contract_decimals)))
                            }</td>
                            <td className="px-4 py-2  text">
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