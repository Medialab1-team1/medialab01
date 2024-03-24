// import
import React, { useState } from "react";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

// import components
import UploadPopup from "./components/UploadPopup";
// import GraphBox from "./components/GraphBox";

// import css
import "./App.css";

//fake data for now
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

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">Let there be a menu here</header>
      <main className="App-main">
        {/* request data to be uploaded when flag is set to true */}
        {requestDataUpload && <UploadPopup />}
        {/* rest of page follows here*/}
        {/*  temp graph not in component cuz shits giving me headaches*/}
          <h1>Simple Line chart</h1>
          <LineChart width={1000} height={300} data={data}>
              <XAxis dataKey="month"></XAxis>
              <YAxis></YAxis>
              <Tooltip> </Tooltip>
              <Legend></Legend>
              <Line type="monotone" dataKey="loss" stroke="green" />
              <Line type="monotone" dataKey="savings" stroke="red"/>
          </LineChart>
            </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
