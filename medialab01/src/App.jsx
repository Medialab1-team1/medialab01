// import
import { useState } from "react";
import { FocusOn } from "react-focus-on";
// import clsx from "clsx";

// import components
import ContextsProvider from "./components/ContextsProvider/ContextsProvider";
import UploadPopup from "./components/UploadPopup/UploadPopup";
import DataChecker from "./components/DataChecker/DataChecker";
import PieChartNeedle from "./components/PieChartNeedle/PieChartNeedle";
import PatientChecker from "./components/PatientChecker/PatientChecker";
import GraphBox from "./components/GraphBox/GraphBox";
import SvgHandler from "./components/SvgHandler";

// import css
import "./App.css";
import ActivityChecker from "./components/ActivityChecker/ActivityChecker";

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <SvgHandler name={"menu"} color={"#fff"} />
        Let there be a menu here{" "}
      </header>

      <main className="App-main">
        <ContextsProvider>
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
                gapMode="padding"
              >
                <UploadPopup setRequestDataUpload={setRequestDataUpload} />
              </FocusOn>
            </div>
          )}
          {/* rest of page follows here*/}
          <PieChartNeedle />
          <GraphBox />
          Let there be a dashboard here
          {/* dev stuff down here */}
          {/* just some checkers to check if the contexts are getting updated properly */}
          <DataChecker />
          <PatientChecker />
          <ActivityChecker />
          {/* button to bring the popup back */}
          <SvgHandler name={"upload"} color={"#fff"} />
          <button onClick={() => setRequestDataUpload((v) => !v)}>
            bring popup back
          </button>
          {/* Delete dev stuff above */}
        </ContextsProvider>
      </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
