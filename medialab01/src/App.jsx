// import
import { useState } from "react";
import { FocusOn } from "react-focus-on";
import clsx from "clsx";


//import contexts
import { DataContextProvider } from "./contexts/DataContext";

import { PatientContextProvider } from "./contexts/PatientContext";

// import components
import UploadPopup from "./components/UploadPopup/UploadPopup";
import DataChecker from "./components/DataChecker/DataChecker";
import PieChartNeedle from "./components/PieChartNeedle/PieChartNeedle";
import PatientChecker from "./components/PatientChecker/PatientChecker";
import SvgHandler from "./components/SvgHandler";

// import css
import "./App.css";
import GraphBox from "./components/GraphBox/GraphBox";

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
      
        <div className="sidebar">
          <div class="logo-container">
            <a href="/">
              <img src="/logo_dashboard.png" alt="Logo" class="logo-image" />
            </a>
          </div>
          <a href="/">Line Chart</a>
          <a href="/">Activity Chart</a>
          <button onClick={() => setRequestDataUpload((v) => !v)}>
            <SvgHandler name={"upload"} color={"#fff"} />
            Bring popup back
          </button>

          <div className="footer-items">
            <p>Made by:</p>
            <ul>
              <li>Daan van Rossum</li>
              <li>Kevin Molendijk</li>
              <li>Pim van Milt</li>
              <li>Sasha Salmon</li>
              <li>Wessel van Beek</li>
              <span>CMGT 2024</span>
            </ul>
            
          </div>
        </div>
      </header>

      <main className="App-main">
        <PatientContextProvider>
          <DataContextProvider>
            {/* request data to be uploaded when flag is set to true */}
            {requestDataUpload && (
              <div className="App-popup">
                <FocusOn
                  enabled={requestDataUpload}
                  onEscapeKey={() => {
                    setRequestDataUpload((v) => !v);
                  }}
                  onClickOutside={() => {
                    setRequestDataUpload((v) => !v);
                  }}
                  gapMode="mpadding"
                >
                  <UploadPopup setRequestDataUpload={setRequestDataUpload} />
                </FocusOn>
              </div>
            )}
            {/* rest of page follows here*/}
            <div className="App-graph-container">
              <GraphBox />
            </div>
            <div className="App-graph-container">
              <PieChartNeedle />
            </div>
            {/* dev stuff down here */}
            {/* just some checkers to check if the contexts are getting updated properly */}
            {/* <DataChecker />
            <PatientChecker /> */}
            {/* button to bring the popup back */}

            {/* Delete dev stuff above */}
          </DataContextProvider>
        </PatientContextProvider>
      </main>
    </div>
  );
}

export default App;
