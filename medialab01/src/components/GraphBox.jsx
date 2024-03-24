import React from "react";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
} from "recharts";


export default function GraphBox() {
    const data = [
        {
            month: 'January',
            savings: 5000,
            loss: 500
        },
        {
            month: 'February',
            savings: 8000,
            loss: 300
        },
        {
            month: 'March',
            savings: 3000,
            loss: 800
        },
        {
            month: 'April',
            savings: 6000,
            loss: 100
        },
        {
            month: 'May',
            savings: 4000,
            loss: 700
        },
        {
            month: 'June',
            savings: 9000,
            loss: 1200
        },
    ]

    return (
        <>
            <h1>Simple Line chart</h1>
            <LineChart width={1000} height={300} data={data}>
                <XAxis dataKey="month"></XAxis>
                <YAxis></YAxis>
                <Tooltip> </Tooltip>
                <Legend></Legend>
                <Line type="monotone" dataKey="loss" stroke="green" />
                <Line type="monotone" dataKey="savings" stroke="red"/>
            </LineChart>
        </>
    )
}

