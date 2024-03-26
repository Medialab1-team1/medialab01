import React, { useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { DataContext } from '../../contexts/DataContext';

const RADIAN = Math.PI / 180;
const chartData = [
  { name: 'A', value: 33, color: 'green' },
  { name: 'B', value: 34, color: 'orange' },
  { name: 'C', value: 33, color: 'red' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const needle = (value, chartData, cx, cy, iR, oR, color) => {
  let total = 0; // needle total (should be 0?)
  chartData.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const PieChartNeedle = () => {
  const { data } = useContext(DataContext);
  console.log("data" + data)
  const value = data.legs.left.knee.above.length > 0 ? data.legs.left.knee.above.length : 0; 

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={chartData}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {value && needle(value, chartData, cx, cy, iR, oR, '#d0d000')}
    </PieChart>
  );
};

export default PieChartNeedle;