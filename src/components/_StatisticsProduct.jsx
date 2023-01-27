import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { GrLineChart} from 'react-icons/gr'



const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function _StatisticsProduct() {


    
  return (
    <div className=' col-span-12 min-w-[20rem] mx-auto mb-3 sm:col-span-4 rounded-md bg-white shadow-lg shadow-blue-200 h-[22rem]'>
    <p className="text-xl font-bold mt-5  flex flex-row mx-3">Products Graph <span className='ml-4'><GrLineChart /></span></p>
    <div className="w-36  mt-3">
      <ul className='list-style-none ml-3'>
        <li className='flex flex-row  items-center'><span className='rounded-full h-4 mr-2 w-4 block bg-[#0088FE]'></span> <span>Total</span> </li>
       
        <li className='flex flex-row  items-center'><span className='rounded-full mr-2 h-4 w-4 block bg-[#00C49F]'></span> <span>InStock</span> </li>

        <li className='flex flex-row  items-center'><span className='rounded-full mr-2 h-4 w-4 block bg-[#FFBB28]'></span> <span>Ordered</span> </li>

        <li className='flex flex-row  items-center'><span className='rounded-full mr-2 h-4 w-4 block bg-[#FF8042]'></span> <span>Out Of Stock</span> </li>
      </ul>
    </div>


    <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="30%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default _StatisticsProduct