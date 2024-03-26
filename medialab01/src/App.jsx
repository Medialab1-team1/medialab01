// import
import React, { useState } from "react";

// import components
import UploadPopup from "./components/UploadPopup";
import GraphBox from "./components/GraphBox";

// import css
import "./App.css";

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
          <GraphBox />
            </main>
      <footer className="App-footer">and I'm a footer</footer>
    </div>
  );
}

export default App;
