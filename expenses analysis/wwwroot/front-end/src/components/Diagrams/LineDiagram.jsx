import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineDiagram = (props) => {
    console.log(props)
  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Установите явные размеры контейнера */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amout_money" stroke="#8884d8" activeDot={{ r: 8 }} name="Сумма витрати" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineDiagram;
