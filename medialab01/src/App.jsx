import { useState } from "react";

import "./App.css";
import UploadPopup from "./components/UploadPopup";

function App() {
  const [requestDataUpload, setRequestDataUpload] = useState(true);

  return (
    <div className="App">
      <header className="App-header">Let there be a menu here</header>
      <main className="App-main">
        {/* request data to be uploaded when flag is set to true */}
        {requestDataUpload && <UploadPopup />}
        {/* rest of page follows here*/}
        Let there be a dashboard here
      </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
