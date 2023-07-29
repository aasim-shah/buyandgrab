
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import ChartComponent from './ChartComponent';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment';



function TokenwiseInflows6({ selectedRows }) {
    console.log({ selectedRows })
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [rawData, setRawData] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const platform = queryParams.get('platform');
    const limit = queryParams.get('limit');

    const [sortOrders, setSortOrders] = useState({
        sender_name: 'asc',
        value: 'asc',
        pretty_value_quote: 'asc',

    });
    const [filterBy, setFilterBy] = useState("")



    const fetchData = async () => {
        try {
            // let response = await axios.get(`http://localhost:8000/fetch/get_trxs`)
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/get_trxs`)
            const dd = response.data
            const myArray = [];
            for (const key in dd) {
                myArray.push(dd[key]);
            }
            console.log(myArray)
            console.log(typeof myArray)
            setData(response.data)

            setSortedData(response.data)
            setRawData(response.data)
        } catch (error) { console.log(`Error ${error}`) }

    }






    const sortDataByField = (dataToSort, field, order) => {

        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        console.log({dataArray})
        const sorted = [...dataArray].sort((a, b) => {
            console.log({a : a})
            let valueA = a.log_events[0].decoded.params[2][field];
            let valueB = b.log_events[0].decoded.params[2][field];

            if (valueA === undefined && field === "pretty_value_quote") {
                valueA = a.data[0][field]
            }
            if (valueB === undefined && field === "pretty_value_quote") {
                valueB = b.data[0][field]
            }
            if (valueA === undefined && field === "sender_name") {
                valueA =  a.log_events[0][field]
            }
            if (valueB === undefined && field === "sender_name") {
                valueB =  b.log_events[0][field]
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
        // handleSort("percent_change_1h")
        return sorted
    };



    // Function to toggle the sort order when the name column is clicked
    const handleSort = (field) => {
        const newSortOrder = sortOrders[field] === 'asc' ? 'desc' : 'asc';
        // Sort the data with the new order and specified field
        if (data) {
            const sortedData = sortDataByField(data, field, newSortOrder);
            setSortedData(sortedData);
            setFilterBy(field)
        }
    };




    function addZerosAtEnd(x) {
        if (typeof x !== 'number' || x < 0 || !Number.isInteger(x)) {
            throw new Error('Input must be a non-negative integer');
        }
        const newNumber = '1' + '0'.repeat(x);
        return Number(newNumber)
    }


    const numberWithCommas = (num) => {
        const nn = Number(num);
        return nn.toLocaleString();
    };
    const stingWithCommas = (num) => {
        const nn = num;
        return nn.toLocaleString();
    };

    // useEffect(() => {
    //     fetchData()
    // }, [selectedRows, platform])

    useEffect(() => {
        const timerId = setTimeout(() => {
          // Place the code you want to run after 10 seconds here
        //   console.log('useEffect ran after 10 seconds');
        fetchData()
        }, 1000*60); // 10000 milliseconds = 10 seconds
    
        // Clean up the timer when the component unmounts or when the effect is re-run
        return () => clearTimeout(timerId);
      }, []); 

      
    console.log({ sortedData })
    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
           
            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>




                        <th className="px-4 py-2">
                            <div className="flex flex-row  gap-2  items-center">

                                Logo
                              </div>
                        </th>

                        <th className="px-4 py-2" onClick={() => handleSort('sender_name')}>
                            <div className="flex flex-row  gap-2  items-center">

                                Token
                                {filterBy === "sender_name" && sortOrders.sender_name === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "sender_name" && sortOrders.sender_name === 'desc' && (
                                    <AiFillCaretUp />
                                )}</div>
                        </th>

                      



                        <th className="px-4 py-2 "
                           >
                            <div className="flex flex-row  gap-2  items-center">
Date
                               </div>
                               </th>
                     
                        <th className="px-4 py-2  " >
                            <div className="flex flex-row w-[14rem]  gap-2 justify-center items-center">
                                Interacted Address
                            </div>
                        </th>

                        <th className="px-4 py-2 " >
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Transaction Hash
                            </div>
                        </th>
                        <th className="px-4 py-2 "
                            onClick={() => handleSort('value')}>
                            <div className="flex flex-row  gap-2  items-center">

                                Tokens Transfered
                                {filterBy === "value" && sortOrders.value === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "value" && sortOrders.value === 'desc' && (
                                    <AiFillCaretUp />
                                )}</div></th>
                     
                     


                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? sortedData.map((item, index) => (

                       item.log_events[0].decoded && item.log_events[0].sender_name  &&  item.log_events[0].sender_logo_url &&  item.log_events[0].decoded.name === "Transfer"  && item.log_events[0].sender_name !== "ETHDEX" &&  ( 
                            <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-100"}`}>
                                <td className="px-4 py-2 text-center ">
                                    <Link to={`#`} className="flex flex-row  items-center">
                                        {/* <img src={`https://logos.covalenthq.com/tokens/${item.log_events[0].sender_address}.png`} alt="" className='h-8 w-8 mr-3' /> */}

                                        <img src={`${item.log_events[0]?.sender_logo_url}`} alt="" className='h-8 w-8 mr-3' />
                                    </Link>
                                </td>

                                <td className="px-4 py-2">
                                    {item.log_events[0].sender_name}
                                </td>

                                
                                <td className="px-4 py-2">
                                        {moment(item.block_signed_at).format("DD/MM/YYYY - HH:MM:SS")}
                                </td>

                                <td className="px-4 py-2 text-center ">
                                    {item.from_address?.slice(0, 8)}........{item.from_address?.slice(37, item.from_address?.length)}
                                </td>
                                <td className="px-4 py-2 text-center ">
                                    {item.tx_hash?.slice(0, 8)}........{item.tx_hash?.slice(60, item.tx_hash?.length)}
                                </td>
                                <td className="px-4 py-2  ">
                                    {numberWithCommas(item.log_events[0]?.decoded.params[2]?.value / addZerosAtEnd(
                                         Number(
                                            item.log_events[0]?.sender_contract_decimals || 0
                                        )
                                    ))}
                                </td>
                            



                            </tr>
                        

                    ))) : (
                        <tr>
                            <td colSpan="12" className='text-center  py-12  font-bold  text-gray-400'>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TokenwiseInflows6