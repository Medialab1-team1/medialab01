import React, { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis, Legend } from "recharts";
import Papa from "papaparse";

const GraphBox = () => {
    const [data, setData] = useState([]);

    return (
        <div>
            <h1>Simple Line chart</h1>
            <LineChart width={1000} height={300} data={data}>
                <XAxis dataKey="month"></XAxis>
                <YAxis></YAxis>
                <Tooltip> </Tooltip>
                <Legend></Legend>
                <Line type="monotone" dataKey="loss" stroke="green" />
                <Line type="monotone" dataKey="savings" stroke="red" />
            </LineChart>
        </div>
    );
};

export default GraphBox;


