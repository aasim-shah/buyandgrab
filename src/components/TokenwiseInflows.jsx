
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import ChartComponent from './ChartComponent';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



function TokenwiseInflows({ selectedRows }) {
    console.log({ selectedRows })
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const platform = queryParams.get('platform');
    const limit = queryParams.get('limit');

    const [sortOrders, setSortOrders] = useState({
        name: 'asc',
        value: 'asc',
        value_1_hour: 'asc',
        value_3_hours: "asc",
        value_24_hours: "asc",

    });
    const [filterBy, setFilterBy] = useState("")


    if (!platform) {
        console.log('no plate')
    }


    const fetchData = async () => {
        try {
            // let response = await axios.get(`http://localhost:5000/fetch/tokenwise_inflows`)
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/tokenwise_inflows`)
            setData(response.data)
            setSortedData(response.data)
        } catch (error) { console.log(`Error ${error}`) }

    }






    const sortDataByField = (dataToSort, field, order) => {

        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        const sorted = [...dataArray].sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            if (valueA === undefined) {
                valueA = a.quote.USD[field]
            }
            if (valueB === undefined) {
                valueB = b.quote.USD[field]
            }

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

    useEffect(() => {
        fetchData()
    }, [selectedRows, platform])

    console.log({ sortedData })
    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            <div className="flex flex-row my-3  items-center w-11/12 mx-auto">
                <img src={`${sortedData && sortedData[0]?.token_logo}`} className={`w-8 h-8 mr-3`} alt="" />
                <p className="font-semibold mr-3">{sortedData && sortedData[0]?.token_name}</p>
                <p className="text-sm text-gray-400">{sortedData && sortedData[0]?.token_symbol}</p>
            </div>

            <div className=" w-full sm:w-11/12 mx-auto">
                <span className='text-sm'> Investor</span>
                <p className="text-sm text-gray-400">{sortedData && sortedData[0].address}</p>
            </div>

            <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>


                        <th className="px-4 py-2 flex flex-row gap-2 w-[15rem] justify-center items-center"
                            onClick={() => handleSort('name')}>
                            Name
                            {filterBy === "name" && sortOrders.name === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "name" && sortOrders.name === 'desc' && (
                                <AiFillCaretUp />
                            )}</th>


                        {/* <th className="px-4 py-2"  onClick={() => handleSort('value')}>
                        <div className="flex flex-row  gap-2 justify-center items-center">

                            Value
                            {filterBy === "value" && sortOrders.value === 'asc' &&
                                <AiFillCaretDown />
                            }
                            {filterBy === "value" && sortOrders.value === 'desc' && (
                                <AiFillCaretUp />
                            )}</div>
                             </th> */}

                        {/* <th className="px-4 py-2 " onClick={() => handleSort('value_1_hour')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                1h  {filterBy === "value_1_hour" && sortOrders.value_1_hour === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "value_1_hour" && sortOrders.value_1_hour === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}

                        {/* <th className="px-4 py-2 " onClick={() => handleSort('value_3_hours')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                3h  {filterBy === "value_3_hours" && sortOrders.value_3_hours === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "value_3_hours" && sortOrders.value_3_hours === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}
                        {/* <th className="px-4 py-2 " onClick={() => handleSort('value_24_hours')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                1d  {filterBy === "value_24_hours" && sortOrders.value_24_hours === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "value_24_hours" && sortOrders.value_24_hours === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th> */}
                        <th className="px-4 py-2 " >
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Contract Address
                            </div>
                        </th>
                        <th className="px-4 py-2 " >
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Transaction Hash
                            </div>
                        </th>
                        <th className="px-4 py-2 " >
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Token Amount Transfered
                            </div>
                        </th>


                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? sortedData.slice(0, selectedRows).map((item, index) => (

                        <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-100"}`}>

                            <td className="px-4 py-2 text-center">

                                <Link to={`/tables/token_holders?tokenId=${item.token_name}`} className="flex flex-row  items-center">
                                    <img src={`${item.token_logo}`} alt="Logo" className='h-8 w-8 mr-3' />
                                    <p className="text-sm mr-3">{item.token_name}</p>
                                    <p className="text-sm text-gray-400">{item.token_symbol}</p>
                                </Link>

                            </td>

                            {/* <td className="px-4 py-2 ">

                                <span>
                                    {numberWithCommas(Number(item.value))}

                                </span>
                            </td> */}

                            {/* <td className="px-4 py-2 text-center ">
                            {numberWithCommas(Number(item.value_1_hour.value) / addZerosAtEnd(Number(item.token_decimals)))}
                            </td> */}

                            {/* <td className="px-4 py-2 text-center ">
                            {numberWithCommas(Number(item.value_3_hours.value) / addZerosAtEnd(Number(item.token_decimals)))}
                            </td> */}

                            {/* <td className="px-4 py-2 text-center ">
                            {numberWithCommas(Number(item.value_24_hours.value) / addZerosAtEnd(Number(item.token_decimals)))}                            
                            </td> */}

                            <td className="px-4 py-2 text-center ">
                                {item.from_address
                                    .slice(0, 8)}........{item.from_address.slice(37, item.from_address
                                        .length)}
                            </td>
                            <td className="px-4 py-2 text-center ">
                                {item.transaction_hash
                                    .slice(0, 8)}........{item.transaction_hash.slice(60, item.transaction_hash
                                        .length)}
                            </td>
                            <td className="px-4 py-2 text-center ">
                                {numberWithCommas(Number(item.value) / addZerosAtEnd(Number(item.token_decimals)))}
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

export default TokenwiseInflows