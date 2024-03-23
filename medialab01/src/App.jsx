// import
import { useState } from "react";
import { FocusOn } from "react-focus-on";

//import contexts
import { DataContextProvider } from "./contexts/DataContext";

import { PatientContextProvider } from "./contexts/PatientContext";

// import components
import UploadPopup from "./components/UploadPopup/UploadPopup";
import DataChecker from "./components/DataChecker/DataChecker";
import PatientChecker from "./components/PatientChecker/PatientChecker";

// import css
import "./App.css";

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">Let there be a menu here</header>
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
            Let there be a dashboard here
            {/* dev stuff down here */}
            {/* just some checkers to check if the contexts are getting updated properly */}
            <DataChecker />
            <PatientChecker />
            {/* button to bring the popup back */}
            <button onClick={() => setRequestDataUpload((v) => !v)}>
              bring popup back
            </button>
            {/* Delete dev stuff above */}
          </DataContextProvider>
        </PatientContextProvider>
      </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
