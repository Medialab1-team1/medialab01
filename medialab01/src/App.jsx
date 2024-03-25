// import
import { useContext, useState } from "react";
import { FocusOn } from "react-focus-on";
import clsx from "clsx";

//import contexts
import { DataContextProvider } from "./contexts/DataContext";
import { PatientContext } from "./contexts/PatientContext";

// import components
import UploadPopup from "./components/UploadPopup/UploadPopup";
import DataChecker from "./components/DataChecker/DataChecker";
import SvgHandler from "./components/SvgHandler";

// import css
import "./App.css";



function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header"><SvgHandler name ={"menu"} color={"#fff"}/>Let there be a menu here  </header>
     
      <main className="App-main">
        <PatientContext.Provider>
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
            <SvgHandler name={"upload"} color={"#fff"}/>
            <button onClick={() => setRequestDataUpload((v) => !v)}>
              bring popup back
            </button>
            <DataChecker />
          </DataContextProvider>
        </PatientContext.Provider>
      </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
