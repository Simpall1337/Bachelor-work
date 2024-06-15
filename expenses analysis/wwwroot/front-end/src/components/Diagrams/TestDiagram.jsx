import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
//import mergeData from '../../methods/MergeData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

// Function to merge data with same category
const mergeData=(data)=> {
  const mergedData = data.reduce((acc, item) => {
    const found = acc.find(entry => entry.category === item.category);
    if (found) {
      found.amout_money += item.amout_money;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);
  return mergedData;
};

const SimpleLineChart = (props) => {
  const mergedData = mergeData(props.data);
  return (
    <div style={{ width: '100%', height: '400px', textAlign: 'center' }}>
      <ResponsiveContainer >
        <PieChart>
          <Pie
            data={mergedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={170}
            fill="#8884d8"
            dataKey="amout_money"
          >
            {mergedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ fontSize: '16px' }}>
        {mergedData.map((entry, index) => (
          <span key={`text-${index}`} style={{ color: COLORS[index % COLORS.length], marginRight: '10px', display: 'inline-block' }}>
             <NavLink to={`/category?category=${entry.category}`} className="header-link header-right-text">
              {entry.category}: {entry.amout_money}
            </NavLink>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleLineChart;
