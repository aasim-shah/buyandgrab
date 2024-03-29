import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Token_holders({ selectedRows }) {
    const [data, setData] = useState(null)
    const [sortedData, setSortedData] = useState(null);
    const [sortOrders, setSortOrders] = useState({ name: 'asc', id: 'asc', balance: 'asc' });
    const [filterBy, setFilterBy] = useState("")
    const location = useLocation();
    const [blockNumberINput, setBlockNumberINput] = useState(739284929)
    const [isLoading, setIsLoading] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const tokenId = queryParams.get('tokenId');
    const [actualBlockNumber, setactualBlockNumber] = useState(null)
    const [updateData, setupdateData] = useState(false)


    const fetchData = async () => {
        setIsLoading(true)
        try {
            let response = await axios.get(`https://appslk-second.onrender.com/fetch/token_holders/${tokenId}/${blockNumberINput}`)
            // let response = await axios.get(`http://localhost:5000/fetch/token_holders/${tokenId}/${blockNumberINput}`)
            console.log({ res: response.data })
            setData(response.data.data)
            setSortedData(response.data.data)
            setactualBlockNumber(response.data.CoinBlockNumber)
            setIsLoading(false)
        } catch (error) {
            console.log(`Error ${error}`)
            setIsLoading(false)
        }

    }



    const sortDataByField = (dataToSort, field, order) => {

        const dataArray = Array.isArray(dataToSort) ? dataToSort : [];

        const sorted = [...dataArray].sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];
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


    function addZerosAtEnd(x) {
        if (typeof x !== 'number' || x < 0 || !Number.isInteger(x)) {
            throw new Error('Input must be a non-negative integer');
        }
        const newNumber = '1' + '0'.repeat(x);
        return Number(newNumber)
    }


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
        const nn = parseInt(num)
        return nn.toLocaleString();
    };

    useEffect(() => {
        fetchData()
    }, [updateData])

    console.log({ sortedData })

    return (
        <div className="w-11/12 mx-auto rounded-md overflow-x-scroll bg-gray-50 p-1">
            <div className="flex flex-col sm:flex-row justify-between px-10 items-center">
                {sortedData && sortedData.length > 0 && (
                    <div className="flex flex-col   gap-1">
                        <div className="flex flex-row my-3  items-center">
                            <img src={sortedData[0]?.logo_url} alt="Logo" className='h-8 w-8 mr-3' />

                            <p className="text-sm mr-3">{sortedData[0]?.contract_name}</p>
                            <p className="text-sm text-gray-400">{sortedData[0]?.contract_name}</p>
                        </div>

                        <div className="">
                            <span className='text-sm'>Contract Address</span>
                            <p className="text-sm text-gray-400">{sortedData[0]?.contract_address}</p>
                        </div>
                    </div>
                )}
                <div className="flex flex-row gap-3 ml-0 px-2 py-2 sm:w-[30rem] w-[20rem] overflow-x-scroll sm:overflow-x-auto sm:ml-auto my-2">
                    <div className="min-w-[6rem]">
                        <span className='text-sm'>Inital Block</span>
                        <p className="text-sm text-green-700 font-semibold">{actualBlockNumber}</p>
                    </div>
                    {
                        actualBlockNumber && (
                            <div className="min-w-[6rem]">
                                <span className='text-sm'>Block Height</span>
                                <p className="text-sm text-green-700 font-semibold">{sortedData[0]?.block_height}</p>
                            </div>
                        )
                    }
                    <input type="text" name="" onChange={(event) => {
                        setBlockNumberINput(parseInt(event.target.value));
                    }} id="" className='py-1 px-2 w-[8rem] outline-none bg-white rounded-md border-gray-300 border-2 ml-3' placeholder='Block Count' />
                    <button onClick={() => {
                        setupdateData(prev => !prev)
                    }} className="py-2 ml-1 px-2 bg-cyan-400 rounded-md text-white text-center">Update</button></div>
            </div>
            {isLoading ? (
                <div className="text-center my-12">
                    <p className="text-3xl text-gray-400 font-bold ">Loading</p>

                </div>
            ):(
                <table className="table table-auto   w-full  text-black text-sm font-semibold">
                <thead className='text-[12px]'>
                    <tr className=' '>

                        <th className="px-4 py-2 " onClick={() => handleSort('price_btc')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Investor Address {filterBy === "price_btc" && sortOrders.price_btc === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "price_btc" && sortOrders.price_btc === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>



                        <th className="px-4 py-2 " onClick={() => handleSort('balance')}>
                            <div className="flex flex-row  gap-2 justify-center items-center">
                                Balance {filterBy === "balance" && sortOrders.balance === 'asc' &&
                                    <AiFillCaretDown />
                                }
                                {filterBy === "balance" && sortOrders.balance === 'desc' && (
                                    <AiFillCaretUp />
                                )}
                            </div>
                        </th>




                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.length > 0 ? sortedData.slice(0, selectedRows).map((item, index) => (
                        <tr key={index} className={` py-3 ${index % 2 === 0 && "bg-gray-100"}`}>

                            <td className="px-4 py-2  text-center">

                                <Link to={`/tables/transactions/${item.address}/${item.contract_address}`}>
                                    {item.address}
                                </Link>
                            </td>

                            <td className="px-4 py-2 text-center">{
                                numberWithCommas(Number(item.balance) / addZerosAtEnd(item.contract_decimals))
                            }</td>


                        </tr>

                        
                    )) : (
                        <tr>
                            <td colSpan="12" className='text-center  py-12  font-bold  text-gray-400'>
                                {isLoading ? "Loading..." : "No item found !"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            )}
        </div>
    )
}

export default Token_holders