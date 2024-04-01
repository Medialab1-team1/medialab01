import React, { useContext, useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ActivityContext } from "../../contexts/ActivityContext";
import styles from "./GraphBox.module.css";
import clsx from "clsx";

const GraphBox = () => {
  const { activity } = useContext(ActivityContext);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    // Preprocess the data
    console.log("Activity changed");
    const tempChartData =
      activity?.averages?.legs?.left?.knee?.above?.minute?.map(
        (entry, index) => ({
          index: index, // X-axis based on the index of the array
          yaw: parseFloat(entry[2]),
          pitch: parseFloat(entry[3]),
          roll: parseFloat(entry[4]), // Use the third data entry for the graph
        })
      );
    setChartData(tempChartData);
  }, [activity]);

  return (
    <div className={clsx([styles.chartContainer])}>
      <h1 className={clsx([styles.title])}>Line Chart</h1>
      {chartData && (
        <>
          {console.log("chartData", chartData)}
          <LineChart
            width={1000}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="index" tickCount={chartData.length} interval={0} />
            <YAxis tickCount={4} />
            <Tooltip />
            {/* <Legend color="#29298a"/> */}
            <Line
              type="monotone"
              dataKey="yaw"
              stroke="#29298a"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pitch"
              stroke="#63cae3"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="roll"
              stroke="#282c34"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </>
      )}
    </div>
  );
};

export default GraphBox;
