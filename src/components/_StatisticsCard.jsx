import React from 'react'
import { GrLineChart } from 'react-icons/gr'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';





const data = [
    {
        amt: 100,
    },
    {
        amt: 3410,
    },
    {
        amt: 1010,
    },
    {
        amt: 2290,
    }
];


function _StatisticsCard(props) {
    const { title, icon, amount } = props
    return (
        <div className='bg-white shadow-lg rounded-md shadow-blue-200 col-span-12 sm:col-span-3 mb-4  min-w-[20rem] mx-auto sm:min-w-[14.3rem]   h-36'>
            <div className="flex flex-row justify-between w-10/12 my-2 mx-auto">
                <p className="text-2xl font-black pt-2 text-blue-500">{title}</p>
                <div className="w-10 h-10 flex justify-center items-center shadow-lg  shadow-blue-100  rounded-[2rem]">
                    <span className='font-black text-xl text-green-500'>{icon}</span>
                </div>
            </div>

            <div className="flex flex-row justify-between mt-7 w-10/12 mx-auto">
                <p className="text-3xl font-black text-black mt-4">{amount}</p>
                <div className="h-18 w-24 flex justify-center items-center   ml-5 ">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="amt" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}

export default _StatisticsCard