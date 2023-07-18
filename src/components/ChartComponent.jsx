import React from 'react';
import { LineChart, CartesianGrid, Line } from 'recharts';

const ChartComponent = ({chartData}) => {
    console.log(chartData)
    const generateRandomData = (count) => {
        const data = [];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
        for (let i = 0; i < count; i++) {
          const randomMonthIndex = Math.floor(Math.random() * months.length);
          const randomSales = Math.floor(Math.random() * 100) + 1; // Generating sales between 1 and 100
      
          data.push({ name: months[randomMonthIndex], sales: randomSales });
        }
      
        return data;
      };
    const data = generateRandomData(5)
    return (
    <LineChart width={100} height={50} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      {/* <XAxis dataKey="name" /> */}
      {/* <YAxis /> */}
      {/* <Tooltip /> */}
      {/* <Legend /> */}
      <Line  type="monotone" stroke="#8884d8" dot={false} activeDot={false}  dataKey="sales" fill="#8884d8" />
    </LineChart>
  );
};

export default ChartComponent;
