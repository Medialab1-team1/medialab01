import React, { useContext } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { DataContext } from "../../contexts/DataContext";

const GraphBox = () => {
    const { data } = useContext(DataContext);

    // Preprocess the data
    const chartData = data.legs.left.knee.above.map((entry, index) => ({
        index: index, // X-axis based on the index of the array
        value: parseFloat(entry[2]) // Use the third data entry for the graph
    }));

    return (
        <div>
            <h1>Simple Line chart</h1>
            <LineChart width={1000} height={300} data={chartData}>
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="green" />
            </LineChart>
        </div>
    );
};

export default GraphBox;