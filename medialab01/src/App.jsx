// import
import { useState } from "react";
import { FocusOn } from "react-focus-on";
import clsx from "clsx";

// import components
import UploadPopup from "./components/UploadPopup/UploadPopup";

// import css
import "./App.css";

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">Let there be a menu here</header>
      <main className="App-main">
        {/* request data to be uploaded when flag is set to true */}
        {requestDataUpload && (
          <div className="App-popup">
            <FocusOn
              enabled={requestDataUpload}
              onEscapeKey={() => {
                console.log(`escape`);
                setRequestDataUpload((v) => !v);
              }}
              onClickOutside={() => {
                console.log(`click`);
                setRequestDataUpload((v) => !v);
              }}
              gapMode="mpadding"
            >
              <UploadPopup
                active={requestDataUpload}
                setRequestDataUpload={setRequestDataUpload}
              />
            </FocusOn>
          </div>
        )}
        {/* rest of page follows here*/}
        Let there be a dashboard here
        <button onClick={() => setRequestDataUpload((v) => !v)}>
          bring popup back
        </button>
      </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
