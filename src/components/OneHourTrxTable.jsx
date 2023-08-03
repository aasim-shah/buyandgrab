
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import ChartComponent from './ChartComponent';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment';


import { RiseLoader } from 'react-spinners';




function OneHourTrxTable({ selectedRows }) {
    console.log({ selectedRows })
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [fetch1H, setFetch1H] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [fetch3H, setFetch3H] = useState(false)
    const [fetch24H, setFetch24H] = useState(false)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const platform = queryParams.get('platform');
    const limit = queryParams.get('limit');

    const [sortOrders, setSortOrders] = useState({
        sender_name: 'asc',
        value: 'asc',
        value_1h: 'asc',
        pretty_value_quote: 'asc',

    });
    const [filterBy, setFilterBy] = useState("")



    const fetchData = async () => {
        setisLoading(true)
        try {
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/getOneHourTrxs?timeframe=240`)
            // let response = await axios.get(`http://localhost:8000/fetch/getOneHourTrxs?timeframe=240 `)
            const dd = response.data
            const myArray = [];
            for (const key in dd) {
                myArray.push(dd[key]);
            }
            const flatArray = myArray.flat()
            // console.log(flatArray)   
            console.log(typeof myArray)
            setData(flatArray)

            setSortedData(flatArray)
            setRawData(response.data)
            setisLoading(false)
        } catch (error) {setisLoading(false) }

    }

    





    const sortDataByField = (dataToSort, field, order) => {

        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        console.log({ dataArray })
        const sorted = [...dataArray].sort((a, b) => {
            console.log({ a: a })
            let valueA;
            let valueB;
            console.log({ field })
            if (field === "value_1h") {
                valueA = a.log_events[0].decoded?.params[2]?.value;
                valueB = b.log_events[0].decoded?.params[2]?.value;
            }

            if (valueA === undefined && field === "pretty_value_quote") {
                valueA = a.data[0][field]
                valueB = b.data[0][field]
            }

            if (valueA === undefined && field === "sender_name") {
                valueA = a.log_events[0][field]
                valueB = b.log_events[0][field]
            }


            console.log({ valueA })
            console.log({ valueB })
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

    const handleSort1H = (field) => {
        if (fetch1H) {
            console.log("Already fetched 1h")
            const newSortOrder = sortOrders[field] === 'asc' ? 'desc' : 'asc';
            // Sort the data with the new order and specified field
            if (data) {
                const sortedData = sortDataByField(data, field, newSortOrder);
                setSortedData(sortedData);
                setFilterBy(field)
            }
        } else {
            fetchDataByTimefram(1)
            setFetch1H(true)
            console.log("fetching 1h")
        }
    }



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

    const fetchDataByTimefram = async (timeFrame) => {
        try {
            let response = await axios.get(`http://localhost:8000/fetch/getOneHourTrxs`)
            // let response = await axios.get(`https://appslk-second.onrender.com/fetch/tokenwise_inflows`)
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

    useEffect(() => {
       fetchData()
    }, []);


    //   const combinedArray = sortedData.flat();

    // useEffect(() => {
    //     fetchData()
    // }, [selectedRows])

    console.log({ sortedData })
    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            <div className="flex justify-end items-center gap-3 px-5 my-4">
                {/* <div className="">
                    <p className="font-bold">
                        Total One Hour Tranasctions Amount
                    </p>
                    <p className="text-gray-500 max-w-[13rem] overflowX-scroll">
                        =  {sortedData?.totalSum.toLocaleString()}
                    </p>

                </div> */}
                <div className="flex flex-row gap-3">
                    <Link to={"/tables/tokenwise_inflows"} className='py-1 hover:bg-gray-200 px-3 rounded-md border-gray-400  border-2'>One Hour</Link>
                    <Link to={"/tables/threeHoursTrxs"} className='py-1 hover:bg-gray-200 px-3 rounded-md border-gray-400  border-2'>Three Hours</Link>
                    <Link to={"/tables/twentyFourHoursTrxs"} className='py-1 hover:bg-gray-200 px-3 rounded-md border-gray-400  border-2'>TwentyFour Hours</Link>
                </div>
            </div>
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

                                Token Name
                                {filterBy === "sender_name" && sortOrders.sender_name === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "sender_name" && sortOrders.sender_name === 'desc' && (
                                    <AiFillCaretUp />
                                )}</div>
                        </th>
                        <th className="px-4 py-2" onClick={() => handleSort1H('value_1h')}>
                            <div className="flex flex-row  gap-2  items-center">

                                1 Hour
                                {filterBy === "value_1h" && sortOrders.value_1h === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "value_1h" && sortOrders.value_1h === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData ? sortedData.slice().sort((a, b) => a.block_height - b.block_height).map((item, index) => (
                     item.oneHourValue &&  item.oneHourValue > 0 ?   (

                            <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-100"}`}>
                                <td className="px-4 py-2 text-center ">
                                    <Link to={`/tables/token_holders`} className="flex flex-row  items-center">
                                        {/* <img src={`${item.log_events && item.log_events[0]?.sender_logo_url}`} alt="" className='h-8 w-8 mr-3' /> */}

                                        <img src={`https://logos.covalenthq.com/tokens/${item.to_address}.png`} alt="" className='h-8 w-8 mr-3' />

                                    </Link>
                                </td>

                                <td className="px-4 py-2">
                                    {item.log_events && item.log_events[0].sender_name}
                                </td>


                                <td className="px-4 py-2  ">
                                   {item.oneHourValue ? item.oneHourValue : 0}
                                </td>

                            </tr>
                        ) : null)) : (
                        <tr>
                             <td ></td>
                            <td className='w-full block  my-20 text-center' colSpan={12}>
                                {isLoading ?  <RiseLoader color="green"  size={20}/> : (<p>No Data Found for current TimeFrame :(</p>)}
                            </td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default OneHourTrxTable