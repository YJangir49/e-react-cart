import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-1">
          Okay Got it! <img src={logo} />
          <i className="fa fa-home" />
          <i className="fa fa-home" />
          <i className="fa fa-home" />
        </div>
        <div className="col col-md-6">
          Okay Got it!
          <i className="fa fa-home" />
        </div>
      </div>
    </div>
  );
}

export default App;
