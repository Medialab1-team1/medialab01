import React, { useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { DataContext } from '../../contexts/DataContext';
import styles from "./PieChartNeedle.module.css";
import clsx from "clsx";

import { ActivityContext } from "../../contexts/ActivityContext";
import { DifferenceContext } from "../../contexts/DifferenceContext";

const RADIAN = Math.PI / 180;
const chartData = [
  { name: 'A', value: 0.2, color: 'red' },
  { name: 'B', value: 0.8, color: 'orange' },
  { name: 'C', value: 1, color: 'green' },
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

  const { activity } = useContext(ActivityContext);
  const { difference } = useContext(DifferenceContext);

  // Extract the hour array and flatten it
  const hourArray = activity?.categorised?.legs?.left?.knee?.above?.hour ?? [];
  const flattenedHours = hourArray.flat().map(Number);

  // Extract the minute array and flatten it
  const minuteArray = activity?.categorised?.legs?.left?.knee?.above?.minute ?? [];
  const flattenedMinutes = minuteArray.flat().map(Number);

  // Total of all intensity numbers in minute array
  const filteredMinutes = flattenedMinutes.slice(2);
  const totalMinutes = filteredMinutes.reduce((acc, curr) => acc + curr, 0);

  // Remove first 2 as they are always 0 and calculate total intensity
  const filteredHours = flattenedHours.slice(2);
  const totalHours = filteredHours.reduce((acc, curr) => acc + curr, 0);

  // Calculate the average intensity level (for hours)
  const averageIntensity = totalHours / filteredHours.length;

    // Calculate the average intensity level (for minutes)
  const averageIntensityMinutes = totalMinutes / filteredMinutes.length;

  // Round the average
  const roundedAverageIntensity = Math.round(averageIntensity);

  const value = roundedAverageIntensity > 0 ? roundedAverageIntensity : 0;

  return (
    <>
    <div className={clsx([styles.chartContainer])}>
      <h1 className={clsx([styles.title])}>Activity Chart</h1>
        <PieChart width={400} height={300}>
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
    </div>
      
    </>
   
  );
};

export default PieChartNeedle;
